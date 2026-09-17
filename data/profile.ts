/**
 * Identité et points de contact.
 *
 * Le contact est distinct selon l'univers consulté :
 *  - création numérique → demande de projet, adresse Harmony Solutions
 *  - systèmes & réseaux → opportunité professionnelle, adresse personnelle
 * Les deux ne sont jamais mélangés dans un même texte.
 */
export const profile = {
  name: "Salim El Rhalmani",
  firstName: "Salim",
  country: "France",

  /** Les deux pratiques, telles qu'annoncées à l'entrée du site. */
  universes: {
    creation: {
      id: "creation",
      href: "/creation",
      title: "Web & applications",
      line: "Sites vitrines, logiciels et produits numériques.",
      cta: "Explorer mes créations",
    },
    systems: {
      id: "systems",
      href: "/systemes",
      title: "Systèmes & réseaux",
      line: "Infrastructure, sécurité et support utilisateurs.",
      cta: "Explorer mon parcours IT",
    },
  },
} as const;

export const company = {
  name: "Harmony Solutions",
  activity: "Création de sites internet et solutions informatiques",
  siren: "985 222 603",
  address: {
    street: "66 Avenue Jean Jaurès",
    postalCode: "60290",
    city: "Rantigny",
    country: "FR",
  },
} as const;

/**
 * Une valeur entre crochets est un emplacement vide : le lien correspondant
 * n'est alors pas affiché (voir `realValue` dans lib/utils).
 */
export const contact = {
  /** Demandes de projet, côté création */
  projectEmail: "contact@harmony-solutions.fr",
  /** Opportunités professionnelles, côté systèmes & réseaux */
  jobEmail: "salim.elrs@gmail.com",
  phoneDisplay: "06 51 08 08 33",
  phoneHref: "tel:+33651080833",
  github: "https://github.com/Salim-ers",
  linkedin: "https://www.linkedin.com/in/salim-ers",
  cv: "/cv-salim-el-rhalmani.pdf",
} as const;

export const seo = {
  title: "Salim El Rhalmani — Création web & applications · Systèmes, réseaux et support IT",
  description:
    "Deux pratiques, une même signature. D'un côté la conception de sites, d'applications et de produits SaaS. De l'autre l'administration systèmes, réseaux et le support utilisateurs.",
  keywords: [
    "Salim El Rhalmani",
    "Création site internet",
    "Développement application web",
    "SaaS",
    "Administrateur systèmes et réseaux",
    "Support informatique N1 N2",
    "Active Directory",
    "Windows Server",
    "Home lab",
    "Harmony Solutions",
  ],
} as const;
