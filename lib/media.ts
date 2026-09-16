import fs from "node:fs";
import path from "node:path";

const EXT = ["webp", "png", "jpg", "jpeg", "avif"];

/**
 * Cherche une capture réelle dans /public au moment du build.
 * `base` sans extension, ex. "/projects/centrium/home".
 * Retourne le chemin public si le fichier existe, sinon null.
 */
export function localShot(base: string): string | null {
  for (const ext of EXT) {
    const rel = `${base}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

/** Capture explicitement renseignée dans /data, sinon fichier trouvé à l'emplacement conventionnel. */
export function resolveShot(src: string | null, base: string): string | null {
  return src ?? localShot(base);
}
