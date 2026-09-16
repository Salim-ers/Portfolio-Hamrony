/**
 * Les quatre projets mis en avant sur la page d'accueil.
 * Textes courts : le détail appartient aux pages /projets/<slug>.
 * `layout` détermine la composition, chacune différente.
 */
export type FeaturedLayout = "full" | "split" | "navy" | "immersive";

export type Featured = {
  slug: string;
  type: string;
  line: string;
  stack: string[];
  layout: FeaturedLayout;
  /** Colonne éditoriale affichée à la place d'une capture quand il n'y en a pas */
  points?: string[];
};

export const featured: Featured[] = [
  {
    slug: "centrium",
    type: "SaaS / ERP pour ESN",
    line: "La salle de pilotage des ESN et cabinets de conseil : consultants, missions, CRA et facturation dans un seul flux.",
    stack: ["Next.js", "CV Optimizer (IA)", "Hébergement européen"],
    layout: "full",
  },
  {
    slug: "lumely",
    type: "SaaS pour photographes",
    line: "Une séance photo suivie de bout en bout, du contrat signé jusqu'à l'archivage des fichiers HD.",
    stack: ["Next.js", "Supabase", "Stripe Connect", "Cloudflare R2"],
    layout: "split",
  },
  {
    slug: "aequitas",
    type: "SaaS / Facturation électronique",
    line: "La facturation électronique dans le cadre administratif français : documents, workflows et suivi de conformité.",
    stack: ["Facturation", "Documents", "Conformité"],
    layout: "navy",
    points: ["Entreprises et documents centralisés", "Workflows de validation", "Suivi de conformité"],
  },
  {
    slug: "odyssea",
    type: "Plateforme de voyage",
    line: "On indique où, quand et avec qui : Odyssea compose les vols, l'hébergement et chaque journée, heure par heure.",
    stack: ["Multi-escales", "Vols & hébergement", "Programme heure par heure"],
    layout: "immersive",
  },
];
