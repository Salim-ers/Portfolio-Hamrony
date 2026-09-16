/**
 * HOME LAB
 * ----------------------------------------------------------------
 * Le diagramme est entièrement généré depuis ce fichier.
 * Rien n'est inventé : chaque valeur entre crochets est à remplacer.
 *
 * Positionnement : x et y en pourcentage de la zone du diagramme (0 à 100).
 * status : "online" | "offline" | "maintenance" | null
 */

export type HomelabStatus = "online" | "offline" | "maintenance";

export type HomelabNode = {
  id: string;
  label: string;
  hostname: string;
  role: string;
  os: string;
  ip: string;
  network: string;
  services: string[];
  status: HomelabStatus | null;
  x: number;
  y: number;
  kind: "edge" | "gateway" | "switch" | "host" | "service";
};

export type HomelabLink = { from: string; to: string; label?: string; network?: string };

export const homelab = {
  /** false tant que les vraies données ne sont pas saisies : affiche la mention "documentation en cours" */
  documented: false,
  networks: [{ id: "lan", name: "[NETWORK_NAME]", cidr: "[CIDR]", vlan: "[VLAN_ID]" }],
  vlans: [] as { id: string; name: string }[],
  machines: [] as { id: string; name: string; specs: string }[],
  nodes: [
    { id: "wan", label: "Accès internet", hostname: "[HOSTNAME]", role: "[ROLE]", os: "[OS]", ip: "[IP]", network: "WAN", services: [], status: null, x: 8, y: 50, kind: "edge" },
    { id: "gateway", label: "Passerelle", hostname: "[HOSTNAME]", role: "[ROLE]", os: "[OS]", ip: "[IP]", network: "[NETWORK]", services: [], status: null, x: 30, y: 50, kind: "gateway" },
    { id: "lan", label: "Réseau local", hostname: "[HOSTNAME]", role: "[ROLE]", os: "[OS]", ip: "[IP]", network: "[NETWORK]", services: [], status: null, x: 52, y: 50, kind: "switch" },
    { id: "host-1", label: "Hôte", hostname: "[HOSTNAME]", role: "[ROLE]", os: "[OS]", ip: "[IP]", network: "[NETWORK]", services: ["[SERVICE]"], status: null, x: 76, y: 22, kind: "host" },
    { id: "host-2", label: "Hôte", hostname: "[HOSTNAME]", role: "[ROLE]", os: "[OS]", ip: "[IP]", network: "[NETWORK]", services: ["[SERVICE]"], status: null, x: 76, y: 78, kind: "host" },
  ] as HomelabNode[],
  links: [
    { from: "wan", to: "gateway" },
    { from: "gateway", to: "lan" },
    { from: "lan", to: "host-1" },
    { from: "lan", to: "host-2" },
  ] as HomelabLink[],
};
