/**
 * Coordonnées et liens.
 * Remplace les valeurs entre crochets par les vraies URL.
 * Tant qu'une valeur est un placeholder, le lien n'est pas affiché sur le site en production.
 */
export const socials = {
  email: "contact@harmony-solutions.fr",
  phoneDisplay: "06 51 08 08 33",
  phoneHref: "tel:+33651080833",
  linkedin: "[LINKEDIN]",
  github: "[GITHUB]",
  harmonyUrl: "[HARMONY_URL]",
  cv: "[CV]",
} as const;
