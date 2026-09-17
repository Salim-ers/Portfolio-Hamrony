import fs from "node:fs";
import path from "node:path";

/**
 * Accès aux captures réelles produites par `npm run captures`.
 *
 * Règle stricte du portfolio : aucune interface n'est fabriquée. Si le
 * fichier n'existe pas dans /public/shots, la fonction renvoie null et le
 * composant affiche une absence assumée plutôt qu'une fausse capture.
 *
 * Les dimensions sont lues dans l'en-tête du fichier au moment du build,
 * ce qui permet de réserver la place exacte de l'image (pas de saut de mise
 * en page au chargement).
 */

export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

const PUBLIC = path.join(process.cwd(), "public");

/** Lit largeur/hauteur dans les marqueurs SOF d'un JPEG. */
function jpegSize(file: string): { width: number; height: number } | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return null;
  }
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;

  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    // SOF0..SOF15, hors marqueurs non dimensionnels (DHT, JPG, DAC)
    const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) {
      i += 2;
      continue;
    }
    const length = buf.readUInt16BE(i + 2);
    if (length < 2) return null;
    i += 2 + length;
  }
  return null;
}

const cache = new Map<string, Shot | null>();

/**
 * Récupère une capture par slug de projet et nom de vue.
 * `shot("odyssea", "home", "Page d'accueil d'Odyssea")`
 */
export function shot(slug: string, name: string, alt: string, caption?: string): Shot | null {
  const key = `${slug}/${name}`;
  if (!cache.has(key)) {
    const rel = `/shots/${slug}/${name}.jpg`;
    const abs = path.join(PUBLIC, rel);
    const size = fs.existsSync(abs) ? jpegSize(abs) : null;
    cache.set(key, size ? { src: rel, width: size.width, height: size.height, alt: "" } : null);
  }
  const base = cache.get(key) ?? null;
  return base ? { ...base, alt, ...(caption ? { caption } : {}) } : null;
}

/** Première capture disponible parmi plusieurs noms de vue. */
export function firstShot(slug: string, names: string[], alt: string): Shot | null {
  for (const name of names) {
    const found = shot(slug, name, alt);
    if (found) return found;
  }
  return null;
}

/** Toutes les vues demandées qui existent réellement, dans l'ordre. */
export function shots(slug: string, wanted: { name: string; alt: string; caption?: string }[]): Shot[] {
  return wanted.map((w) => shot(slug, w.name, w.alt, w.caption)).filter((s): s is Shot => s !== null);
}

/** Vues réellement présentes sur le disque pour un projet. */
export function availableShots(slug: string): string[] {
  const dir = path.join(PUBLIC, "shots", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".jpg"))
    .map((f) => f.replace(/\.jpg$/, ""));
}
