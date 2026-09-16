export const profile = {
  name: "Salim El Rhalmani",
  firstName: "Salim",
  brand: "Harmony Solutions",
  country: "France",

  headline: "I build systems.",
  subheadline: "From infrastructure to digital products.",
  roles: ["Systems & Network Administrator", "Digital Builder", "Founder, Harmony Solutions"],
  intro:
    "Réseaux, serveurs, applications : je conçois et j'administre des systèmes, de l'infrastructure jusqu'à l'interface.",

  /** Photo : déposer le fichier dans /public/profile puis renseigner le chemin, ex. "/profile/salim.jpg" */
  photo: "[PROFILE_PHOTO]",

  seo: {
    title: "Salim El Rhalmani | Administrateur systèmes et réseaux, Harmony Solutions",
    description:
      "Portfolio de Salim El Rhalmani, administrateur systèmes et réseaux et fondateur de Harmony Solutions : infrastructure réseau, Active Directory, Home Lab, SaaS et création de sites internet.",
    keywords: [
      "Salim El Rhalmani",
      "Harmony Solutions",
      "Administrateur systèmes réseaux",
      "Administrateur réseau",
      "Administrateur systèmes",
      "IT Support",
      "Portfolio informatique",
      "Infrastructure réseau",
      "SaaS",
      "Création site internet",
    ],
  },
} as const;

/** Entreprise : informations issues de la carte Harmony Solutions. */
export const company = {
  name: "Harmony Solutions",
  activity: "Création de sites internet",
  siren: "985 222 603",
  address: {
    street: "66 Avenue Jean Jaurès",
    postalCode: "60290",
    city: "Rantigny",
    country: "FR",
  },
} as const;
