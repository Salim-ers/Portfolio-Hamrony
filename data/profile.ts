/**
 * Identité et contact.
 *
 * Ce site est le portfolio personnel de Salim El Rhalmani. Harmony
 * Solutions y figure comme sa dimension entrepreneuriale, pas comme une
 * agence : le discours commercial appartiendra au futur site Harmony.
 */
export const profile = {
  name: "Salim El Rhalmani",
  firstName: "Salim",
  lastName: "El Rhalmani",
  role: "Administrateur systèmes & réseaux",
  secondRole: "Créateur de produits numériques",
  location: "France · Île-de-France",

  /** Phrase d'accroche du hero. Une seule, courte. */
  lede:
    "Je conçois et j'administre des infrastructures, j'expérimente dans mon laboratoire personnel, et je construis des produits numériques avec Harmony Solutions.",

  /** Repères affichés sous le hero et dans « À propos ». */
  facts: [
    { label: "Poste visé", value: "Administrateur systèmes & réseaux" },
    { label: "Diplôme", value: "Titre RNCP niveau 6" },
    { label: "Formation", value: "OpenClassrooms, 2025 — 2026" },
    { label: "Entreprise", value: "Harmony Solutions" },
  ],

  /** Les deux pratiques, présentées après la présentation personnelle. */
  universes: {
    creation: {
      href: "/creation",
      index: "01",
      title: "Création numérique",
      line: "Sites, applications et produits SaaS, conçus et mis en ligne.",
      keywords: ["Sites web", "Applications", "SaaS", "Produits", "Harmony Solutions"],
      cta: "Explorer mes réalisations",
    },
    systems: {
      href: "/systemes",
      index: "02",
      title: "Systèmes & réseaux",
      line: "Infrastructure, administration, support et laboratoire personnel.",
      keywords: ["Infrastructure", "Administration", "Support", "Home lab", "Microsoft 365", "Réseaux"],
      cta: "Explorer mon parcours IT",
    },
  },
} as const;

export const company = {
  name: "Harmony Solutions",
  activity: "Création de sites internet et solutions informatiques",
  siren: "985 222 603",
  /** Ce que Harmony représente dans ce portfolio : l'atelier, pas la vitrine. */
  line:
    "J'ai créé Harmony Solutions pour transformer mes idées et mes compétences techniques en projets concrets : sites, applications et produits SaaS.",
  fields: ["Sites web", "Applications", "SaaS", "Solutions numériques"],
  address: {
    street: "66 Avenue Jean Jaurès",
    postalCode: "60290",
    city: "Rantigny",
    country: "FR",
  },
} as const;

/**
 * Une valeur entre crochets est un emplacement vide : le lien
 * correspondant n'est alors pas affiché (`realValue` dans lib/utils).
 */
export const contact = {
  email: "salim.elrs@gmail.com",
  /** Adresse liée à l'activité Harmony Solutions */
  companyEmail: "contact@harmony-solutions.fr",
  phoneDisplay: "06 51 08 08 33",
  phoneHref: "tel:+33651080833",
  github: "https://github.com/Salim-ers",
  linkedin: "https://www.linkedin.com/in/salim-ers",
  cv: "/cv-salim-el-rhalmani.pdf",
} as const;

export const seo = {
  title: "Salim El Rhalmani — Administrateur systèmes & réseaux, créateur de produits numériques",
  description:
    "Portfolio de Salim El Rhalmani : infrastructure, administration systèmes et réseaux, laboratoire personnel, et produits numériques construits avec Harmony Solutions.",
  keywords: [
    "Salim El Rhalmani",
    "Administrateur systèmes et réseaux",
    "Windows Server",
    "Active Directory",
    "Home lab",
    "Support informatique N1 N2",
    "Microsoft 365",
    "Harmony Solutions",
    "Développement web",
    "SaaS",
  ],
} as const;
