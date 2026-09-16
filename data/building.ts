/** Currently building : trois éléments maximum. status : "Building" | "Shipping" | "Prototype" | "Exploring" | null */
export type BuildingStatus = "Building" | "Shipping" | "Prototype" | "Exploring";

export const currentlyBuilding: { name: string; href: string; text: string; status: BuildingStatus | null }[] = [
  { name: "Lumely", href: "/projects/lumely", text: "Le parcours complet d'un photographe, du contrat à l'archivage.", status: null },
  { name: "Centrium", href: "/projects/centrium", text: "Gestion des consultants, missions et facturation pour les ESN.", status: null },
  { name: "Harmony Solutions", href: "#harmony", text: "Sites, applications et support informatique pour les professionnels.", status: null },
].slice(0, 3);
