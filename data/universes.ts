/** Les trois facettes du profil, présentées juste après le hero. */
export type Universe = {
  index: string;
  id: string;
  title: string;
  line: string;
  keywords: string[];
  href: string;
  cta: string;
};

export const universes: Universe[] = [
  {
    index: "01",
    id: "infrastructure",
    title: "Infrastructure & réseaux",
    line: "Concevoir, administrer et documenter des environnements systèmes et réseaux.",
    keywords: ["Windows Server", "Active Directory", "Linux", "VLAN", "OSPF", "VPN", "pfSense", "Microsoft 365"],
    href: "#expertises",
    cta: "Voir l'ingénierie IT",
  },
  {
    index: "02",
    id: "produits",
    title: "Produits & SaaS",
    line: "Transformer une idée métier en produit numérique structuré.",
    keywords: ["Centrium", "Lumely", "Aequitas", "Skillora", "Odyssea", "Tilawa"],
    href: "#projets",
    cta: "Voir les projets",
  },
  {
    index: "03",
    id: "web",
    title: "Web & Harmony Solutions",
    line: "Créer des expériences numériques utiles aux entreprises et aux commerces.",
    keywords: ["Sites vitrines", "Applications", "Expériences web", "Solutions pour professionnels"],
    href: "#harmony",
    cta: "Découvrir Harmony",
  },
];
