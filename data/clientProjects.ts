/**
 * RÉALISATIONS CLIENTS, HARMONY SOLUTIONS
 * ----------------------------------------------------------------
 * Visuel affiché, par ordre de priorité :
 *   1. capture renseignée dans `screenshot.src`
 *   2. capture déposée à l'emplacement conventionnel /public/clients/<slug>/home.(png|webp|jpg)
 *      (générée automatiquement par `npm run captures`)
 *   3. aperçu réel du site dans un cadre navigateur si `livePreview` est actif
 *   4. sinon, aucune fausse interface : la réalisation apparaît dans la liste "mise en ligne à venir"
 */
export type ClientProject = {
  name: string;
  slug: string;
  sector: string;
  location?: string | null;
  type: string | null;
  url: string | null;
  screenshot: { src: string | null; alt: string };
  livePreview?: boolean;
  /** Ce que contient réellement le site, relevé sur la version en ligne */
  scope?: string[];
};

export const clientProjects: ClientProject[] = [
  {
    name: "Royale Auto-école",
    slug: "royale-auto-ecole",
    sector: "Auto-école",
    location: "Breuil-le-Vert (60)",
    type: "Site multi-pages",
    url: "https://royale-one.vercel.app/",
    screenshot: { src: null, alt: "Page d'accueil du site Royale Auto-école" },
    livePreview: true,
    scope: ["Formations", "Réglementation & documents", "Sécurité routière et mini quiz", "Conseils", "Contact et inscription"],
  },
  {
    name: "Noa Café Paris",
    slug: "noa-cafe",
    sector: "Café",
    location: "Paris",
    type: "Website concept, site vitrine",
    url: "https://noa-cafe-one.vercel.app/",
    screenshot: { src: null, alt: "Page d'accueil du site Noa Café Paris" },
    livePreview: true,
  },
  {
    name: "Poulet Station",
    slug: "poulet-station",
    sector: "Restauration rapide halal",
    location: "Creil (60)",
    type: "Site vitrine",
    url: "https://ps-nine-theta.vercel.app/",
    screenshot: { src: null, alt: "Page d'accueil du site Poulet Station" },
    livePreview: true,
  },
  {
    name: "Le Merveille de Rantigny",
    slug: "le-merveille-de-rantigny",
    sector: "Boulangerie, pâtisserie",
    location: "Rantigny (60)",
    type: null,
    url: "[MERVEILLE_URL]",
    screenshot: { src: null, alt: "Site du Merveille de Rantigny" },
  },
  {
    name: "Le Duo d'Artisans",
    slug: "le-duo-d-artisans",
    sector: "Boulangerie, pâtisserie",
    location: null,
    type: null,
    url: "[DUO_URL]",
    screenshot: { src: null, alt: "Site du Duo d'Artisans" },
  },
];
