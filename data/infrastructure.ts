/**
 * ÉTUDES DE CAS INFRASTRUCTURE
 * Les diagrammes sont générés à partir de ces données.
 * Les détails inconnus (plans VLAN, adressage, rôles par site) restent `null`
 * et sont signalés comme "à documenter".
 */

export type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  /** Cadre du projet (formation, laboratoire...). null si non précisé. */
  context: string | null;
  concepts: string[];
  note?: string;
};

export const adMultiSite = {
  id: "active-directory",
  title: "Active Directory multi-site",
  summary:
    "Un domaine unique réparti sur deux sites. Annuaire, résolution de noms, adressage et stratégies de groupe administrés depuis une même forêt.",
  context: null,
  concepts: ["Windows Server", "Active Directory", "AD DS", "Domain Controller", "RODC", "DNS", "DHCP", "GPO", "Users", "Groups", "Security policies"],
  sites: [
    { name: "Paris", roles: null as string[] | null },
    { name: "Nantes", roles: null as string[] | null },
  ],
  domainServices: [
    { name: "AD DS", text: "Annuaire et authentification" },
    { name: "Domain Controller", text: "Contrôleur de domaine" },
    { name: "RODC", text: "Contrôleur en lecture seule" },
    { name: "DNS", text: "Résolution de noms" },
    { name: "DHCP", text: "Adressage des postes" },
    { name: "GPO", text: "Stratégies de groupe" },
  ],
  directory: ["Users", "Groups", "Security policies"],
} satisfies CaseStudy & Record<string, unknown>;

export const ipsecVpn = {
  id: "pfsense-ipsec",
  title: "Interconnexion pfSense / IPsec",
  summary:
    "Deux réseaux distants reliés par un tunnel chiffré. Chaque site est protégé par un pare-feu pfSense qui porte le VPN et le routage entre les LAN.",
  context: null,
  concepts: ["pfSense", "Firewall", "VPN", "IPsec", "Routing"],
  /** Remplacer par les noms réels des sites si besoin */
  sites: ["Site A", "Site B"],
} satisfies CaseStudy & Record<string, unknown>;

export type Building = {
  id: string;
  name: string;
  vlans: string[] | null;
  services: string[] | null;
  links: string | null;
  routing: string | null;
};

export const threeBuildings = {
  id: "three-buildings",
  title: "Réseau sur trois bâtiments",
  summary:
    "Un cœur de réseau et trois bâtiments. Segmentation par VLAN, routage OSPF, filtrage par ACL, agrégation de liens et prévention des boucles.",
  context: null,
  concepts: ["VLAN", "OSPF", "ACL", "STP", "LACP", "Switching", "Routing"],
  layers: [
    { id: "switching", name: "Switching", tech: ["VLAN", "STP"], text: "Segmentation des flux dans chaque bâtiment et prévention des boucles de niveau 2." },
    { id: "links", name: "Links", tech: ["LACP"], text: "Agrégation de liens pour fiabiliser les liaisons et en augmenter la capacité." },
    { id: "routing", name: "Routing", tech: ["OSPF"], text: "Routage dynamique à travers le réseau." },
    { id: "filtering", name: "Filtering", tech: ["ACL"], text: "Contrôle des flux autorisés entre segments." },
  ],
  buildings: [
    { id: "b01", name: "B01", vlans: null, services: null, links: null, routing: null },
    { id: "b02", name: "B02", vlans: null, services: null, links: null, routing: null },
    { id: "b03", name: "B03", vlans: null, services: null, links: null, routing: null },
  ] as Building[],
} satisfies CaseStudy & Record<string, unknown>;

export const ledgerCases: (CaseStudy & { flow: string[] })[] = [
  {
    id: "glpi-ansible",
    title: "GLPI, Ansible et Active Directory",
    summary: "Inventorier le parc, automatiser les déploiements et rattacher les utilisateurs de l'annuaire.",
    context: null,
    concepts: ["GLPI", "Ansible", "Active Directory"],
    flow: ["Inventory", "Automation", "Deployment", "Users", "Administration"],
  },
  {
    id: "linux-backup",
    title: "Serveurs Linux et sauvegarde",
    summary: "Services web sous Debian et Ubuntu, avec une stratégie de sauvegarde par rsync.",
    context: null,
    concepts: ["Debian", "Ubuntu", "Apache", "Nginx", "rsync"],
    flow: ["Debian / Ubuntu", "Apache / Nginx", "rsync", "Backup"],
  },
  {
    id: "cloud",
    title: "Cloud",
    summary: "Étude et expérimentations sur les trois grands fournisseurs. Un niveau de découverte, pas une expertise.",
    context: "Exploration",
    concepts: ["AWS", "Azure", "Google Cloud Platform"],
    flow: ["AWS", "Azure", "Google Cloud"],
  },
  {
    id: "security-lab",
    title: "Security lab",
    summary: "Reconnaissance et analyse d'un domaine Active Directory, exploitation contrôlée.",
    context: "Laboratoire de formation",
    concepts: ["Kali Linux", "BloodHound", "Active Directory", "RDP"],
    flow: ["Reconnaissance", "Analyse", "Exploitation contrôlée"],
    note: "Environnement de laboratoire isolé, dans un cadre pédagogique.",
  },
];
