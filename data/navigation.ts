export const navigation = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "homelab", label: "Home Lab" },
  { id: "journey", label: "Journey" },
  { id: "stack", label: "Stack" },
  { id: "harmony", label: "Harmony" },
  { id: "contact", label: "Contact" },
] as const;

export type NavId = (typeof navigation)[number]["id"];
