/** Les couches du profil, de ce que voit l'utilisateur jusqu'à ce qui fait tourner le produit. */
export const layers = [
  { name: "Product", text: "Décider ce qu'un outil doit résoudre, pour qui, et dans quel ordre.", href: "#products", link: "Index des produits" },
  { name: "SaaS", text: "Comptes, abonnements, données métier : Centrium, Lumely, Aequitas.", href: "#projects", link: "Projets" },
  { name: "Web", text: "Interfaces en Next.js et React, sites vitrines pour des commerces.", href: "#client-work", link: "Réalisations" },
  { name: "Cloud", text: "Étude et expérimentations sur AWS, Azure et Google Cloud.", href: "#case-cloud", link: "Cloud" },
  { name: "Security", text: "Pare-feu, tunnel IPsec, laboratoire d'audit Active Directory.", href: "#case-security-lab", link: "Security lab" },
  { name: "Networks", text: "VLAN, OSPF, ACL : un réseau conçu pour trois bâtiments.", href: "#case-three-buildings", link: "Réseau" },
  { name: "Systems", text: "Windows Server, Active Directory, GPO, Linux, sauvegardes.", href: "#case-active-directory", link: "Active Directory" },
] as const;
