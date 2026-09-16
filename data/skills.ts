/** Aucun pourcentage, aucune note : uniquement les technologies pratiquées. */
export type SkillGroup = { id: string; name: string; context: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    id: "systems",
    name: "Systems",
    context: "Serveurs, annuaire, postes de travail",
    items: ["Windows Server", "Active Directory", "AD DS", "GPO", "DNS", "DHCP", "Microsoft 365", "Intune", "Autopilot", "Linux", "Debian", "Ubuntu"],
  },
  {
    id: "network",
    name: "Network",
    context: "Commutation, routage, interconnexion",
    items: ["TCP/IP", "VLAN", "VPN", "IPsec", "Firewall", "OSPF", "STP", "LACP", "ACL", "Cisco", "Alcatel", "pfSense", "VoIP / ToIP"],
  },
  {
    id: "automation",
    name: "Admin & automation",
    context: "Inventaire, déploiement, scripts",
    items: ["GLPI", "Ansible", "rsync", "PowerShell", "Bash"],
  },
  {
    id: "security",
    name: "Security",
    context: "Environnements de formation et de laboratoire",
    items: ["Kali Linux", "BloodHound", "Active Directory Security", "Firewall", "Network Security"],
  },
  {
    id: "web",
    name: "Web",
    context: "Interfaces et sites",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vercel"],
  },
  {
    id: "backend",
    name: "Backend",
    context: "Données et services",
    items: ["Supabase", "PostgreSQL", "APIs"],
  },
  {
    id: "cloud",
    name: "Cloud",
    context: "Étude et expérimentations",
    items: ["AWS", "Azure", "Google Cloud Platform"],
  },
  {
    id: "tools",
    name: "Tools",
    context: "Au quotidien",
    items: ["Git", "GitHub", "VS Code"],
  },
];
