/** Aucun pourcentage, aucun compteur : uniquement les technologies pratiquées. */
export type SkillGroup = { id: string; name: string; context: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    id: "systemes",
    name: "Systèmes",
    context: "Serveurs, annuaire, postes de travail",
    items: ["Windows Server", "Active Directory", "AD DS", "GPO", "DNS", "DHCP", "Linux", "Debian", "Ubuntu", "Microsoft 365", "Intune", "Autopilot"],
  },
  {
    id: "reseaux",
    name: "Réseaux",
    context: "Commutation, routage, interconnexion",
    items: ["TCP/IP", "VLAN", "OSPF", "STP", "LACP", "ACL", "VPN", "IPsec", "Cisco", "Alcatel", "pfSense", "VoIP / ToIP"],
  },
  {
    id: "cloud-securite",
    name: "Cloud & sécurité",
    context: "Pare-feu, durcissement, environnements cloud",
    items: ["Firewall", "Network Security", "Active Directory Security", "Kali Linux", "BloodHound", "AWS", "Azure", "Google Cloud"],
  },
  {
    id: "developpement",
    name: "Développement",
    context: "Interfaces, données et services",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Supabase", "PostgreSQL", "APIs", "Vercel"],
  },
  {
    id: "outils",
    name: "Outils",
    context: "Exploitation et automatisation au quotidien",
    items: ["GLPI", "Ansible", "PowerShell", "Bash", "rsync", "Git", "GitHub", "VS Code"],
  },
];
