/**
 * PROJETS PRODUITS
 * ----------------------------------------------------------------
 * Règle : ne rien inventer. Un champ inconnu reste `null` ou vide :
 * la section correspondante n'est alors pas affichée.
 *
 * status  : "Live" | "Demo" | "Prototype" | "In Development" | "Concept" | null
 * feature.state :
 *   "working"     fonctionnel aujourd'hui
 *   "in-progress" en cours de développement
 *   "planned"     prévu
 *   "scope"       périmètre du produit, état non encore précisé
 *
 * Captures : déposer les fichiers dans /public/projects/<slug>/
 * puis renseigner `src` (ex. "/projects/centrium/dashboard.png").
 */

export type ProjectStatus = "Live" | "Demo" | "Prototype" | "In Development" | "Concept";
export type FeatureState = "working" | "in-progress" | "planned" | "scope";
export type RepositoryVisibility = "public" | "private";

export type Screenshot = {
  src: string | null;
  alt: string;
  /** Composition souhaitée */
  frame: "browser" | "full" | "detail" | "mobile";
  width?: number;
  height?: number;
  caption?: string;
};

export type Feature = { label: string; detail?: string; state: FeatureState };

export type Project = {
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  category: string | null;
  year: string | null;
  status: ProjectStatus | null;
  stack: string[];
  /** Nuance sur la stack, ex. "Stack envisagée" */
  stackNote?: string;
  screenshots: Screenshot[];
  url: string | null;
  /** Affiche le site réel dans un cadre navigateur tant qu'aucune capture n'est déposée */
  livePreview?: boolean;
  github: string | null;
  githubRepository?: string | null;
  repositoryVisibility?: RepositoryVisibility | null;
  repositoryUrl?: string | null;
  role: string | null;
  problem?: string | null;
  approach?: string | null;
  features: Feature[];
  /** Enchaînement métier, affiché comme un flux */
  workflow?: string[];
  architecture: { summary: string | null; layers: { name: string; items: string[] }[] } | null;
  lessons: string[];
  metadata?: { language?: string; framework?: string; architecture?: string };
  /** Couleur propre au projet, utilisée uniquement dans ses visuels */
  accent: string;
  featured?: boolean;
};

const scope = (labels: string[]): Feature[] => labels.map((label) => ({ label, state: "scope" }));

export const projects: Project[] = [
  {
    name: "Centrium",
    slug: "centrium",
    tagline: "La plateforme métier des ESN.",
    description:
      "La plateforme métier des ESN et cabinets de conseil : bibliothèque de consultants, CV Optimizer assisté par IA, CRM commercial, matching consultants et appels d'offres, CRA et facturation. Hébergement européen.",
    category: "SaaS / ERP",
    year: null,
    status: null,
    stack: ["Next.js"],
    screenshots: [
      { src: null, alt: "Centrium, vue dashboard", frame: "browser" },
      { src: null, alt: "Centrium, détail d'un module", frame: "detail" },
      { src: null, alt: "Centrium, second détail d'interface", frame: "detail" },
    ],
    url: "https://www.centrium-platform.com/",
    livePreview: true,
    github: null,
    githubRepository: null,
    repositoryVisibility: null,
    repositoryUrl: null,
    role: null,
    features: scope([
      "Consultants",
      "CV Optimizer (IA)",
      "Matching & appels d'offres",
      "Missions",
      "CRA",
      "Facturation",
      "CRM commercial",
      "Notifications",
      "Abonnements",
    ]),
    architecture: null,
    lessons: [],
    accent: "#7fa7a3",
    featured: true,
  },
  {
    name: "Lumely",
    slug: "lumely",
    tagline: "Le parcours complet d'un photographe, du contrat à l'archivage.",
    description:
      "SaaS destiné aux photographes. Lumely suit une séance de bout en bout : contrat, signature, acompte, shooting, galerie de sélection, paiement, livraison HD et archivage.",
    category: "SaaS",
    year: null,
    status: null,
    stack: ["Next.js", "Supabase", "Stripe Connect", "Cloudflare R2"],
    stackNote: "Stack envisagée",
    workflow: [
      "Contrat",
      "Signature",
      "Acompte",
      "Shooting",
      "Upload",
      "Galerie",
      "Sélection",
      "Paiement",
      "HD",
      "Archivage",
    ],
    screenshots: [
      { src: null, alt: "Lumely, galerie client", frame: "full" },
      { src: null, alt: "Lumely, version mobile", frame: "mobile" },
    ],
    url: "[LUMELY_URL]",
    github: null,
    role: null,
    features: [],
    architecture: {
      summary: null,
      layers: [
        { name: "Application", items: ["Next.js"] },
        { name: "Données", items: ["Supabase"] },
        { name: "Paiements", items: ["Stripe Connect"] },
        { name: "Stockage objet", items: ["Cloudflare R2"] },
      ],
    },
    lessons: [],
    accent: "#d8b89a",
    featured: true,
  },
  {
    name: "Aequitas",
    slug: "aequitas",
    tagline: "Facturation électronique française.",
    description:
      "Plateforme orientée facturation électronique, conçue pour le cadre administratif français : entreprises, documents, workflows et suivi de conformité.",
    category: "SaaS / Facturation",
    year: null,
    status: null,
    stack: [],
    screenshots: [
      { src: null, alt: "Aequitas, tableau de bord", frame: "browser" },
      { src: null, alt: "Aequitas, détail d'un document", frame: "detail" },
    ],
    url: "[AEQUITAS_URL]",
    github: null,
    role: null,
    features: scope(["Facturation", "Entreprises", "Documents", "Workflows", "Dashboard", "Conformité"]),
    architecture: null,
    lessons: [],
    accent: "#9fb0cc",
    featured: true,
  },
  {
    name: "Skillora",
    slug: "skillora",
    tagline: "Matching intelligent entre un CV et une offre.",
    description:
      "Skillora compare un CV à une offre d'emploi : analyse du CV, scoring, matching et pistes d'optimisation.",
    category: "SaaS / Recrutement",
    year: null,
    status: null,
    stack: [],
    screenshots: [{ src: null, alt: "Skillora, écran de score", frame: "browser" }],
    url: "[SKILLORA_URL]",
    github: null,
    role: null,
    features: scope(["Analyse CV", "Scoring", "Matching", "Optimisation"]),
    architecture: null,
    lessons: [],
    accent: "#b5c47a",
    featured: true,
  },
  {
    name: "Studio One",
    slug: "studio-one",
    tagline: "Plateforme de création vidéo IA.",
    description:
      "Plateforme de création vidéo assistée par IA. Outils et approches étudiés : Remotion pour la composition vidéo en code, Higgsfield pour la génération, ElevenLabs pour la voix.",
    category: "Plateforme créative",
    year: null,
    status: null,
    stack: ["Remotion", "Higgsfield", "ElevenLabs"],
    stackNote: "Outils et concepts étudiés",
    screenshots: [{ src: null, alt: "Studio One, éditeur", frame: "full" }],
    url: "[STUDIO_ONE_URL]",
    github: null,
    role: null,
    features: [],
    architecture: null,
    lessons: [],
    accent: "#e0876a",
  },
  {
    name: "Tilawa",
    slug: "tilawa",
    tagline: "Écouter, lire et comprendre le Coran.",
    description:
      "Application autour du Coran : reconnaissance audio, transcription, traduction, en français, en arabe et en phonétique.",
    category: "Application",
    year: null,
    status: null,
    stack: [],
    screenshots: [{ src: null, alt: "Tilawa, écran de lecture", frame: "mobile" }],
    url: "[TILAWA_URL]",
    github: null,
    role: null,
    features: scope(["Reconnaissance audio", "Transcription", "Traduction", "Français", "Arabe", "Phonétique"]),
    architecture: null,
    lessons: [],
    accent: "#9dbfa6",
  },
  {
    name: "Odyssea",
    slug: "odyssea",
    tagline: "Le voyage sur mesure, sans les semaines de préparation.",
    description:
      "On indique où, quand et avec qui : Odyssea compose les vols, l'hébergement et chaque journée heure par heure, avec plusieurs escales possibles et des dates souples.",
    category: "Voyage",
    year: null,
    status: null,
    stack: [],
    screenshots: [{ src: null, alt: "Odyssea, itinéraire", frame: "browser" }],
    url: "https://odyssea-ten.vercel.app/",
    livePreview: true,
    github: null,
    role: null,
    features: scope([
      "Composition du voyage",
      "Destinations multi-escales",
      "Vols",
      "Hébergement",
      "Activités",
      "Programme heure par heure",
      "Espace Mes voyages",
      "eSIM",
      "Affiliation",
    ]),
    architecture: null,
    lessons: [],
    accent: "#7fb3bf",
  },
  {
    name: "Equaris",
    slug: "equaris",
    tagline: "SaaS vertical pour le secteur équestre.",
    description: "Également appelé Horse Ledger. Présentation détaillée à venir.",
    category: "SaaS vertical",
    year: null,
    status: null,
    stack: [],
    screenshots: [],
    url: "[EQUARIS_URL]",
    github: null,
    role: null,
    features: [],
    architecture: null,
    lessons: [],
    accent: "#b99373",
  },
  {
    name: "Lystra",
    slug: "lystra",
    tagline: null,
    description: null,
    category: null,
    year: null,
    status: null,
    stack: [],
    screenshots: [],
    url: null,
    github: null,
    role: null,
    features: [],
    architecture: null,
    lessons: [],
    accent: "#a9a2c9",
  },
  {
    name: "Soonly",
    slug: "soonly",
    tagline: null,
    description: null,
    category: null,
    year: null,
    status: null,
    stack: [],
    screenshots: [],
    url: null,
    github: null,
    role: null,
    features: [],
    architecture: null,
    lessons: [],
    accent: "#c9b36f",
  },
  {
    name: "Fleura Paris",
    slug: "fleura-paris",
    tagline: null,
    description: null,
    category: null,
    year: null,
    status: null,
    stack: [],
    screenshots: [],
    url: null,
    github: null,
    role: null,
    features: [],
    architecture: null,
    lessons: [],
    accent: "#d19ea4",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
