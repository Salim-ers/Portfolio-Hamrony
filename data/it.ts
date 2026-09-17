/**
 * UNIVERS 2 — SYSTÈMES, RÉSEAUX & SUPPORT IT
 * ==================================================================
 * Source unique : le CV de Salim El Rhalmani.
 *
 * Règles appliquées ici :
 *  - Expérience professionnelle, projets de formation et laboratoires
 *    personnels sont trois catégories distinctes, jamais mélangées.
 *  - Aucun chiffre de disponibilité, aucun nombre de serveurs, aucun
 *    plan d'adressage : ces éléments ne sont pas documentés, ils ne sont
 *    donc pas affichés.
 *  - Le schéma du home lab est un schéma de principe, annoncé comme tel.
 *  - Tout exemple ajouté à titre pédagogique porte la mention
 *    `pedagogical: true` et est signalé sur la page.
 */

export const positioning = {
  title: "Administrateur systèmes, réseaux et sécurité junior",
  openTo: "Également ouvert aux postes de technicien support N1/N2.",
  lead: "Je conçois, configure et documente des environnements Windows Server, Linux et réseaux. La sécurité est une dimension de mes projets et de ma formation, pas un titre que je revendique.",
  location: "Île-de-France",
  languages: "Français (natif) · Anglais (professionnel)",
  mobility: "Permis B, véhiculé",
  /**
   * Mention de disponibilité : laissée à null volontairement.
   * Le CV portait « disponible immédiatement », information datée et non
   * revérifiée. Renseigner cette valeur l'affiche sur la page ; tant
   * qu'elle est nulle, aucune promesse de délai n'est faite.
   */
  availability: null as string | null,
};

/* ------------------------------------------------------------------
   Formation
------------------------------------------------------------------ */
export const training = {
  school: "OpenClassrooms",
  program: "Administrateur systèmes, réseaux et sécurité",
  credential: "Titre professionnel RNCP de niveau 6",
  start: "Février 2025",
  end: "Février 2026",
  summary:
    "Treize projets professionnalisants, du support utilisateurs à la planification d'une migration cloud. Chaque projet correspond à une mise en situation complète : cadrage, réalisation, documentation.",
};

/** Les treize projets professionnalisants, tels que listés au CV. */
export const trainingProjects: { n: string; label: string; area: string }[] = [
  { n: "01", label: "Support utilisateurs et ITSM", area: "Support" },
  { n: "02", label: "Installation et administration d'un domaine AD DS", area: "Windows Server" },
  { n: "03", label: "Gestion des comptes et GPO", area: "Windows Server" },
  { n: "04", label: "Configuration DNS/DHCP et automatisation avec PowerShell", area: "Windows Server" },
  { n: "05", label: "Conception de réseaux IPv4/IPv6 avec Cisco Packet Tracer", area: "Réseaux" },
  { n: "06", label: "Segmentation VLAN et routage", area: "Réseaux" },
  { n: "07", label: "Déploiement d'une architecture n-tiers Linux, serveurs web et SQL", area: "Linux" },
  { n: "08", label: "Sécurisation des services HTTPS/SFTP et mise en œuvre d'un VPN IPsec", area: "Sécurité" },
  { n: "09", label: "Gestion de parc et automatisation avec Ansible", area: "Automatisation" },
  { n: "10", label: "Sauvegarde et restauration", area: "Exploitation" },
  { n: "11", label: "Audit de domaine Windows et Active Directory", area: "Sécurité" },
  { n: "12", label: "Identification des vulnérabilités et recommandations ANSSI", area: "Sécurité" },
  { n: "13", label: "Planification de migration vers AWS", area: "Cloud" },
];

/* ------------------------------------------------------------------
   Compétences — reprises des catégories du CV, sans jauge ni pourcentage
------------------------------------------------------------------ */
export const skillGroups: { id: string; name: string; items: string[] }[] = [
  { id: "systemes", name: "Systèmes", items: ["Windows Server", "Linux", "Debian", "Ubuntu"] },
  { id: "microsoft", name: "Microsoft", items: ["Active Directory", "GPO", "Microsoft 365", "Entra ID", "Intune"] },
  { id: "workplace", name: "Modern Workplace", items: ["Exchange Online", "Teams", "SharePoint Online", "OneDrive"] },
  { id: "reseaux", name: "Réseaux", items: ["Cisco", "Alcatel", "VLAN", "Routage", "DNS", "DHCP", "VPN", "TCP/IP"] },
  { id: "securite", name: "Sécurité", items: ["pfSense", "Microsoft Defender", "Fail2ban", "ACL", "VPN IPsec"] },
  { id: "virtualisation", name: "Virtualisation", items: ["Proxmox", "VMware", "VirtualBox", "Docker"] },
  { id: "supervision", name: "Supervision", items: ["Nagios", "Zabbix", "Grafana", "Syslog"] },
  { id: "itsm", name: "ITSM / Support", items: ["GLPI", "ServiceNow", "Zendesk"] },
  { id: "scripting", name: "Scripting", items: ["PowerShell", "Bash", "Python"] },
  { id: "automatisation", name: "Automatisation", items: ["Ansible"] },
  { id: "bdd", name: "Bases de données", items: ["MySQL", "PostgreSQL", "MariaDB"] },
  { id: "cloud", name: "Cloud", items: ["AWS"] },
  { id: "methodes", name: "Méthodologies", items: ["ITIL", "Diagnostic & troubleshooting", "Root Cause Analysis"] },
];

/* ------------------------------------------------------------------
   Home lab — laboratoire personnel
   Schéma de principe : la topologie exacte n'est pas publiée, aucun
   nombre de machines ni plan d'adressage n'est avancé.
------------------------------------------------------------------ */
export type LabNode = {
  id: string;
  label: string;
  short: string;
  /** Rangée dans le schéma, de l'extérieur vers les services */
  tier: 0 | 1 | 2 | 3 | 4;
  role: string;
  tech: string[];
  /** Ce que j'ai réellement mis en place */
  built: string[];
  /** Ce que j'en ai retenu et documenté */
  learned: string;
};

export const lab = {
  title: "Infrastructure de laboratoire",
  kind: "Projet personnel continu",
  lead: "Un environnement personnel où je monte, je casse et je remonte une infrastructure d'entreprise : virtualisation, annuaire, segmentation réseau, filtrage, supervision et sauvegardes.",
  disclosure:
    "Schéma de principe. Il représente l'organisation des rôles de mon laboratoire, pas sa topologie exacte : je ne publie ni plan d'adressage, ni inventaire matériel, ni mesure de disponibilité.",
  flowNote: "Les flux animés illustrent le sens de circulation entre les rôles. Ils ne reflètent aucune supervision en temps réel.",
};

export const labNodes: LabNode[] = [
  {
    id: "wan",
    label: "Accès opérateur",
    short: "WAN",
    tier: 0,
    role: "Point d'entrée depuis Internet, en amont de tout filtrage.",
    tech: ["TCP/IP"],
    built: ["Séparation nette entre ce qui vient de l'extérieur et le réseau interne, avant toute autre règle."],
    learned:
      "Tant que la frontière entre l'extérieur et l'interne n'est pas explicite, aucune règle de filtrage écrite ensuite n'est vraiment fiable.",
  },
  {
    id: "pfsense",
    label: "Pare-feu pfSense",
    short: "pfSense",
    tier: 1,
    role: "Routage entre segments, filtrage des flux et terminaison des accès distants.",
    tech: ["pfSense", "ACL", "VPN IPsec", "NAT"],
    built: [
      "Règles de filtrage entre les segments du laboratoire.",
      "Mise en œuvre d'un accès distant par VPN.",
      "Routage inter-VLAN et traduction d'adresses.",
    ],
    learned:
      "Écrire une règle de filtrage oblige à nommer précisément ce qui doit communiquer avec quoi. C'est l'exercice qui m'a le plus appris sur ma propre architecture.",
  },
  {
    id: "switch",
    label: "Commutateur Alcatel",
    short: "Switch",
    tier: 2,
    role: "Commutation et segmentation du réseau local.",
    tech: ["Alcatel", "VLAN", "Console", "PuTTY"],
    built: [
      "Administration du commutateur en ligne de commande, par console série via PuTTY.",
      "Découpage du réseau en VLAN et affectation des ports.",
    ],
    learned:
      "L'administration par console impose de comprendre la configuration avant de l'appliquer : aucune interface ne corrige une commande mal comprise.",
  },
  {
    id: "proxmox",
    label: "Hyperviseur Proxmox",
    short: "Proxmox",
    tier: 3,
    role: "Virtualisation des serveurs du laboratoire.",
    tech: ["Proxmox", "KVM", "Instantanés"],
    built: [
      "Déploiement de machines virtuelles Windows Server et Linux dédiées aux services d'infrastructure.",
      "Utilisation des instantanés pour tester une configuration puis revenir en arrière.",
    ],
    learned:
      "Pouvoir revenir à un état connu change la façon de travailler : on ose modifier une configuration en production de laboratoire, donc on apprend plus vite.",
  },
  {
    id: "windows",
    label: "VM Windows Server",
    short: "Windows",
    tier: 4,
    role: "Annuaire, résolution de noms et distribution d'adresses.",
    tech: ["Windows Server", "Active Directory", "GPO", "DNS", "DHCP", "PowerShell"],
    built: [
      "Domaine Active Directory : unités d'organisation, comptes et groupes.",
      "Stratégies de groupe appliquées aux postes et aux utilisateurs.",
      "Services DNS et DHCP, et automatisation de tâches courantes en PowerShell.",
    ],
    learned:
      "Une GPO mal placée dans l'arborescence produit un effet invisible jusqu'au jour où elle gêne. La structure des unités d'organisation se décide avant, pas après.",
  },
  {
    id: "linux",
    label: "VM Linux",
    short: "Linux",
    tier: 4,
    role: "Services applicatifs et bases de données.",
    tech: ["Debian", "Ubuntu", "Bash", "Fail2ban", "HTTPS", "SFTP"],
    built: [
      "Serveurs web et bases de données dans une architecture séparée par rôle.",
      "Sécurisation des services exposés et durcissement des accès.",
      "Scripts Bash pour les tâches répétitives.",
    ],
    learned:
      "Séparer les rôles sur des machines distinctes coûte un peu de temps au montage et en fait gagner beaucoup au diagnostic.",
  },
  {
    id: "supervision",
    label: "Supervision et journaux",
    short: "Zabbix",
    tier: 4,
    role: "Suivi de la disponibilité et centralisation des journaux.",
    tech: ["Zabbix", "Grafana", "Rsyslog"],
    built: [
      "Supervision des hôtes et des services du laboratoire.",
      "Tableaux de visualisation Grafana.",
      "Centralisation des journaux avec Rsyslog.",
    ],
    learned:
      "Centraliser les journaux avant d'avoir un incident, c'est la seule façon d'avoir quelque chose à lire pendant l'incident.",
  },
  {
    id: "sauvegarde",
    label: "Sauvegarde et documentation",
    short: "Sauvegarde",
    tier: 4,
    role: "Procédures de sauvegarde, de restauration et de durcissement.",
    tech: ["Sauvegarde", "Restauration", "Documentation", "Durcissement"],
    built: [
      "Procédures de sauvegarde et de restauration testées, pas seulement écrites.",
      "Documentation de l'architecture et des configurations.",
      "Application de bonnes pratiques de durcissement.",
    ],
    learned:
      "Une sauvegarde qu'on n'a jamais restaurée n'est pas une sauvegarde. C'est le test de restauration qui a révélé ce qui manquait dans ma procédure.",
  },
];

/** Liaisons du schéma de principe. */
export const labLinks: { from: string; to: string }[] = [
  { from: "wan", to: "pfsense" },
  { from: "pfsense", to: "switch" },
  { from: "switch", to: "proxmox" },
  { from: "proxmox", to: "windows" },
  { from: "proxmox", to: "linux" },
  { from: "proxmox", to: "supervision" },
  { from: "proxmox", to: "sauvegarde" },
];

/* ------------------------------------------------------------------
   Laboratoire Microsoft 365 / Modern Workplace
------------------------------------------------------------------ */
export const m365 = {
  title: "Laboratoire Microsoft 365",
  kind: "Laboratoire personnel",
  lead: "Un tenant de laboratoire pour administrer un environnement Modern Workplace de bout en bout : identités, services collaboratifs, postes gérés et diagnostic d'incidents.",
  areas: [
    {
      id: "entra",
      name: "Entra ID",
      role: "Identités et accès",
      items: [
        "Administration des utilisateurs, des groupes et des rôles.",
        "Gestion des accès et mise en place de l'authentification multifacteur.",
        "Analyse des journaux de connexion.",
      ],
    },
    {
      id: "workplace",
      name: "Services collaboratifs",
      role: "Exchange Online, Teams, SharePoint Online, OneDrive",
      items: [
        "Comptes et boîtes aux lettres.",
        "Permissions et partage.",
        "Configuration des services collaboratifs.",
      ],
    },
    {
      id: "intune",
      name: "Intune",
      role: "Gestion des postes Windows",
      items: [
        "Enrôlement des postes.",
        "Stratégies de conformité.",
        "Profils de configuration et déploiement de politiques.",
      ],
    },
    {
      id: "diagnostic",
      name: "Diagnostic",
      role: "Sign-in Logs, Message Trace, Microsoft Defender",
      items: [
        "Analyse d'incidents à partir des journaux de connexion.",
        "Suivi du cheminement d'un message avec Message Trace.",
        "Diagnostic des problèmes d'authentification.",
        "Démarche de recherche de cause racine.",
      ],
    },
  ],
};

/* ------------------------------------------------------------------
   Support N1 / N2
------------------------------------------------------------------ */
export const support = {
  title: "Support utilisateurs N1 / N2",
  lead: "Le support n'est pas une étape avant l'administration : c'est là que se joue la relation entre un système et ceux qui s'en servent. J'y applique une méthode constante.",
  tools: ["GLPI", "ServiceNow", "Zendesk", "ITIL"],
  steps: [
    {
      n: "01",
      label: "Qualifier",
      detail:
        "Distinguer le symptôme décrit du problème réel, déterminer le périmètre touché et le niveau d'urgence avant toute manipulation.",
    },
    {
      n: "02",
      label: "Diagnostiquer",
      detail:
        "Remonter la chaîne poste, réseau, service, identité, en éliminant une hypothèse à la fois plutôt qu'en testant au hasard.",
    },
    {
      n: "03",
      label: "Assister",
      detail:
        "Expliquer ce qui se passe dans les mots de l'utilisateur, pendant l'intervention et pas seulement à la fin.",
    },
    {
      n: "04",
      label: "Comptes et permissions",
      detail:
        "Création, modification et retrait des accès, en appliquant le droit strictement nécessaire.",
    },
    {
      n: "05",
      label: "Documenter",
      detail:
        "Consigner la cause, l'action et la vérification dans l'outil ITSM, pour que le ticket suivant parte d'un acquis.",
    },
    {
      n: "06",
      label: "Résoudre ou escalader",
      detail:
        "Clore après vérification avec l'utilisateur, ou transmettre au niveau supérieur avec un dossier exploitable.",
    },
  ],
  /** Exemple pédagogique, explicitement identifié comme tel sur la page. */
  example: {
    pedagogical: true,
    title: "Exemple de démarche : un utilisateur ne parvient plus à se connecter",
    context:
      "Situation construite à partir de mon laboratoire Microsoft 365, à titre d'illustration de méthode. Ce n'est pas un incident client.",
    steps: [
      { label: "Qualifier", detail: "Un seul utilisateur ou tout un service ? Depuis quel poste, depuis quel réseau, depuis quand ?" },
      { label: "Observer", detail: "Lecture des Sign-in Logs : la tentative arrive-t-elle jusqu'à Entra ID, et avec quel motif d'échec ?" },
      { label: "Isoler", detail: "Distinguer un mot de passe, un blocage de compte, une stratégie d'accès conditionnel ou un échec de second facteur." },
      { label: "Corriger", detail: "Agir sur la cause identifiée, puis faire valider le retour à la normale par l'utilisateur." },
      { label: "Documenter", detail: "Consigner la cause racine, pas seulement le geste qui a débloqué la situation." },
    ],
  },
};

/* ------------------------------------------------------------------
   Parcours — dates du CV, catégories distinctes
------------------------------------------------------------------ */
export type CareerEntry = {
  id: string;
  organisation: string;
  role: string;
  start: string;
  end: string;
  location: string | null;
  kind: "Formation" | "Expérience professionnelle" | "Diplôme";
  summary: string;
  points: string[];
  /** Précision affichée pour éviter toute lecture abusive */
  note?: string;
};

export const career: CareerEntry[] = [
  {
    id: "openclassrooms",
    organisation: "OpenClassrooms",
    role: "Administrateur systèmes, réseaux et sécurité",
    start: "Février 2025",
    end: "Février 2026",
    location: null,
    kind: "Formation",
    summary:
      "Treize projets professionnalisants : support IT, Windows Server, Active Directory, Linux, réseaux Cisco, cybersécurité, supervision, sauvegarde et cloud.",
    points: [
      "Domaine AD DS, comptes, GPO, DNS et DHCP.",
      "Réseaux IPv4/IPv6, segmentation VLAN et routage.",
      "Architecture n-tiers Linux, HTTPS, SFTP et VPN IPsec.",
      "Gestion de parc et automatisation Ansible, sauvegarde et restauration.",
      "Audit de domaine, recommandations ANSSI, planification de migration AWS.",
    ],
  },
  {
    id: "fedex",
    organisation: "Federal Express (FedEx)",
    role: "Ramp Agent Specialist / Superviseur opérations",
    start: "Août 2020",
    end: "Février 2025",
    location: "Aéroport Paris-CDG, Roissy-en-France",
    kind: "Expérience professionnelle",
    summary:
      "Coordination des opérations au sol pour les aéronefs, dans le respect strict des procédures de sécurité et des contraintes de délais.",
    points: [
      "Coordination des opérations au sol.",
      "Encadrement d'équipe et organisation du traitement des flux de marchandises.",
      "Gestion d'incidents en temps réel et assistance opérationnelle aux équipages.",
      "Diagnostic rapide et application de procédures critiques.",
      "Réalisation des études Weight & Balance pour la sécurité du vol.",
    ],
    note:
      "Poste opérationnel, pas un poste d'administration informatique. Ce que j'en retiens pour l'IT : la gestion d'incident sous contrainte de temps et le respect de procédures qui ne se négocient pas.",
  },
  {
    id: "psa",
    organisation: "PSA Stellantis",
    role: "Roboticien",
    start: "Janvier 2020",
    end: "Août 2020",
    location: "Vélizy-Villacoublay",
    kind: "Expérience professionnelle",
    summary: "Intégration de robots collaboratifs en environnement industriel.",
    points: [
      "Intégration de robots collaboratifs.",
      "Rédaction de documentation technique.",
      "Sécurisation des systèmes et analyse de risques.",
      "Travaux d'automatisation et de programmation.",
    ],
  },
  {
    id: "licence",
    organisation: "UFR Sciences, Amiens",
    role: "Licence Génie robotique et vision industrielle",
    start: "",
    end: "2020",
    location: "Amiens",
    kind: "Diplôme",
    summary: "Formation initiale en robotique et vision industrielle.",
    points: [],
  },
];
