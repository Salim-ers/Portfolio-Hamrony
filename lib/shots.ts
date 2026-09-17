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

/* ==================================================================
   Sélection et nommage des écrans d'un projet
================================================================== */

export type ScreenKind = "home" | "full" | "page" | "section" | "mobile";

export type Screen = Shot & { name: string; kind: ScreenKind };

/**
 * Les noms de fichiers viennent des URLs des sites capturés : ils ont
 * perdu leurs accents. Ce dictionnaire les restitue pour que les textes
 * alternatifs restent du français correct.
 */
const WORDS: Record<string, string> = {
  a: "à",
  propos: "propos",
  securite: "sécurité",
  routiere: "routière",
  reglementation: "réglementation",
  fonctionnalites: "fonctionnalités",
  realisations: "réalisations",
  apropos: "à propos",
  demarrer: "démarrer",
  decouvrir: "découvrir",
  reserver: "réserver",
  evenements: "événements",
  activites: "activités",
  hebergement: "hébergement",
  itineraire: "itinéraire",
  destinations: "destinations",
  methode: "méthode",
  references: "références",
  equipe: "équipe",
  ecole: "école",
  ecurie: "écurie",
  demo: "démonstration",
  demande: "demande",
  demarche: "démarche",
  electronique: "électronique",
  essai: "essai",
  plateforme: "plateforme",
  engagements: "engagements",
  conseils: "conseils",
};

function humanize(slug: string): string {
  return slug
    .split("-")
    .map((w) => WORDS[w] ?? w)
    .join(" ");
}

const ORDINALS = ["", "", "deuxième", "troisième", "quatrième", "cinquième"];

/** Libellé lisible d'un écran, utilisé dans le texte alternatif et la légende. */
export function screenLabel(name: string): string {
  if (name === "home") return "page d'accueil";
  if (name === "full") return "page d'accueil, vue complète";
  if (name === "mobile") return "version mobile";
  if (/^s\d+$/.test(name)) {
    const i = Number(name.slice(1));
    return `${ORDINALS[i] ?? "autre"} partie de la page d'accueil`;
  }
  if (name.startsWith("p-")) return `page ${humanize(name.slice(2))}`;
  return humanize(name);
}

function kindOf(name: string): ScreenKind {
  if (name === "home") return "home";
  if (name === "full") return "full";
  if (name === "mobile") return "mobile";
  if (name.startsWith("p-")) return "page";
  return "section";
}

/**
 * Tous les écrans réellement capturés pour un projet, classés dans un
 * ordre de lecture : accueil, pages internes, sections, version mobile.
 * `labels` permet de remplacer un libellé généré par un libellé écrit.
 */
export function projectScreens(
  slug: string,
  projectName: string,
  labels: Record<string, string> = {}
): Screen[] {
  const order: Record<ScreenKind, number> = { home: 0, page: 1, section: 2, mobile: 3, full: 4 };
  return availableShots(slug)
    .map((name) => ({ name, kind: kindOf(name) }))
    .filter((s) => s.kind !== "full")
    .sort((a, b) => order[a.kind] - order[b.kind] || a.name.localeCompare(b.name, "fr"))
    .map(({ name, kind }) => {
      const label = labels[name] ?? screenLabel(name);
      const found = shot(slug, name, `${projectName}, ${label}`);
      return found ? { ...found, name, kind } : null;
    })
    .filter((s): s is Screen => s !== null);
}
