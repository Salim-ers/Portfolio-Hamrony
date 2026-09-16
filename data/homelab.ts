/**
 * HOME LAB
 * Seules les informations réellement connues sont affichées.
 * Les inventaires restent vides tant qu'ils ne sont pas renseignés :
 * les blocs correspondants ne sont alors pas rendus (jamais de « à renseigner » public).
 */
export type Tier = { id: string; label: string; detail: string };

export const homelab = {
  intro:
    "Un environnement personnel pour monter, casser et remonter des infrastructures : annuaire, segmentation réseau, services et sauvegardes.",
  tiers: [
    { id: "internet", label: "Internet", detail: "Accès opérateur" },
    { id: "gateway", label: "Passerelle", detail: "Pare-feu, routage, VPN" },
    { id: "network", label: "Réseau local", detail: "Commutation et segmentation" },
    { id: "hosts", label: "Hôtes & VM", detail: "Serveurs Windows et Linux" },
    { id: "services", label: "Services", detail: "Annuaire, fichiers, sauvegardes" },
  ] as Tier[],

  /** Inventaire matériel : renseigner pour afficher le bloc. */
  machines: [] as { name: string; specs: string }[],
  /** Plan d'adressage : renseigner pour afficher le bloc. */
  networks: [] as { name: string; cidr: string; vlan?: string }[],
};
