export const navigation = [
  { id: "projets", label: "Projets" },
  { id: "expertises", label: "Expertises" },
  { id: "parcours", label: "Parcours" },
  { id: "harmony", label: "Harmony Solutions" },
  { id: "contact", label: "Contact" },
] as const;

export type NavId = (typeof navigation)[number]["id"];
