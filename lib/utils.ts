export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Une valeur est un placeholder si elle est vide ou de la forme [NOM_EN_MAJUSCULES].
 * Tout lien/valeur placeholder est masqué en production et signalé en développement.
 */
export function isPlaceholder(value: string | null | undefined): value is null | undefined {
  if (!value) return true;
  return /^\[[A-Z0-9_]+\]$/.test(value.trim());
}

export function realValue(value: string | null | undefined): string | null {
  return isPlaceholder(value) ? null : (value as string);
}

export const isDev = process.env.NODE_ENV !== "production";

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
