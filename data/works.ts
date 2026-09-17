/**
 * UNIVERS 1 — CRÉATION WEB & APPLICATIONS
 * ==================================================================
 * Règles de véracité appliquées à ce fichier :
 *
 *  1. Aucun projet n'est présenté comme « client », « commercialisé » ou
 *     « terminé » sans preuve. Le champ `status` décrit uniquement ce qui
 *     est vérifiable : le site répond à une URL publique.
 *  2. `role` décrit ce que j'ai fait, pas un titre.
 *  3. `results` reste vide tant qu'aucun résultat n'est documenté. La
 *     section correspondante n'est alors pas rendue.
 *  4. Les contenus décrits proviennent de la version en ligne relevée à la
 *     date `capturedOn` ci-dessous. Les tarifs et modules affichés par un produit
 *     sont son propre discours commercial : ils sont décrits comme
 *     périmètre fonctionnel, jamais comme performance.
 *  5. Les captures sont de vraies captures des sites en ligne
 *     (`npm run captures`). Aucune interface n'est dessinée à la main.
 */

/**
 * Date du dernier relevé des sites en ligne. Affichée telle quelle sous les
 * captures : elle change en même temps que `npm run captures`.
 */
export const capturedOn = "18 septembre 2026";

export type WorkStatus = "En ligne" | "Accès privé";

/**
 * Nature de l'engagement, confirmée par Salim le 18 septembre 2026.
 *   client  — site commandé et livré à un établissement
 *   demo    — projet de démonstration, aucune commande derrière
 *   propre  — produit ou vitrine que je conçois pour mon compte
 * Rien n'est déduit : un site n'est jamais présenté comme une commande
 * client sans confirmation explicite.
 */
export type Engagement = "client" | "demo" | "propre";

export const engagementLabel: Record<Engagement, string> = {
  client: "Réalisation client",
  demo: "Projet de démonstration",
  propre: "Projet entrepreneurial",
};

export type WorkLayout = "opening" | "wide" | "duo" | "column" | "compact";

export type CaseFeature = { label: string; detail: string };

export type Work = {
  slug: string;
  name: string;
  /** Nature réelle de la réalisation */
  kind: string;
  sector: string;
  location: string | null;
  status: WorkStatus;
  engagement: Engagement;
  /** Une phrase, à la première personne ou descriptive, jamais commerciale */
  lead: string;
  url: string | null;
  repo: string | null;
  layout: WorkLayout;
  /**
   * Libellés écrits pour certains écrans capturés, quand le nom déduit de
   * l'URL ne suffit pas. Clé = nom du fichier sans extension.
   */
  screenLabels?: Record<string, string>;
  case: {
    context: string;
    audience: string;
    role: string;
    /** Travail réalisé, en actions concrètes */
    work: string[];
    /** Choix de conception assumés */
    design: { label: string; detail: string }[];
    /** Périmètre fonctionnel relevé sur la version en ligne */
    features: CaseFeature[];
    stack: string[];
    stackNote?: string;
    /** Vide tant que rien n'est mesuré et documenté */
    results: string[];
    /** Précision honnête affichée telle quelle sur la page */
    disclosure?: string;
  };
};

export const works: Work[] = [
  {
    slug: "centrium",
    screenLabels: {
      "p-plateforme": "présentation de la plateforme",
      "p-engagements": "page engagements",
      "p-essai": "parcours d'essai",
    },
    name: "Centrium",
    kind: "Plateforme SaaS",
    sector: "Sociétés de conseil et ESN",
    location: null,
    status: "En ligne",
    engagement: "propre",
    lead: "Piloter une ESN depuis un seul endroit : consultants, missions, comptes rendus d'activité et facturation dans un même flux.",
    url: "https://www.centrium-platform.com/",
    repo: null,
    layout: "opening",
    case: {
      context:
        "Dans une ESN, la même information circule dans cinq outils : le CV du consultant dans un dossier partagé, la mission dans un tableur, le compte rendu d'activité dans un mail, la facture dans un logiciel comptable. Chaque transfert est une occasion de perdre une donnée. Centrium rassemble cette chaîne dans un seul produit.",
      audience:
        "Sociétés de conseil et ESN qui gèrent un vivier de consultants et répondent régulièrement à des appels d'offres.",
      role: "Conception du produit, direction artistique, développement et mise en ligne. Projet entrepreneurial, mené de bout en bout.",
      work: [
        "Découpage du métier en modules autonomes : bibliothèque de consultants, missions, CRA, facturation, CRM commercial.",
        "Conception du CV Optimizer : reprise d'un CV brut et restitution dans un format normalisé aux couleurs de la société.",
        "Écriture du parcours de démonstration public et des pages produit.",
        "Mise en production et hébergement sur une infrastructure européenne.",
      ],
      design: [
        {
          label: "Un flux, pas un menu",
          detail:
            "L'interface suit l'ordre réel du métier — consultant, mission, CRA, facture — plutôt qu'une liste de modules sans lien entre eux.",
        },
        {
          label: "L'IA propose, l'humain valide",
          detail:
            "Le matching et l'optimisation de CV produisent une proposition. La décision reste à l'utilisateur, jamais automatique.",
        },
        {
          label: "Hébergement européen assumé",
          detail:
            "Le sujet est mis en avant dès la page d'accueil, parce que les données manipulées sont des CV et des contrats.",
        },
      ],
      features: [
        { label: "Bibliothèque de consultants", detail: "Profils, compétences et disponibilités centralisés." },
        { label: "CV Optimizer", detail: "Mise en forme assistée d'un CV brut dans un gabarit maison." },
        { label: "Matching et appels d'offres", detail: "Rapprochement entre un besoin client et les profils disponibles." },
        { label: "Missions", detail: "Suivi des missions en cours et des échéances." },
        { label: "CRA", detail: "Comptes rendus d'activité saisis puis repris en facturation." },
        { label: "Facturation", detail: "Génération des factures à partir des CRA validés." },
        { label: "CRM commercial", detail: "Suivi des comptes clients et des opportunités." },
      ],
      stack: ["Next.js", "TypeScript", "Vercel", "Hébergement européen"],
      results: [],
      disclosure:
        "Le site présente le produit et sa démonstration. Je ne publie aucun chiffre d'usage ou de performance : je n'en ai pas de mesure documentée.",
    },
  },

  {
    slug: "horse-ledger",
    screenLabels: {
      "p-demande-demo": "formulaire de demande de démonstration",
      "p-ecurie": "offre Écurie",
      "p-haras": "offre Haras",
      "p-a-propos": "page à propos",
    },
    name: "Horse Ledger",
    kind: "Plateforme SaaS verticale",
    sector: "Filière équine",
    location: null,
    status: "En ligne",
    engagement: "propre",
    lead: "La gestion quotidienne d'une écurie ou d'un haras : chevaux, soins, planning, documents et facturation au même endroit.",
    url: "https://www.horse-ledger.com/",
    repo: null,
    layout: "wide",
    case: {
      context:
        "Une structure équine professionnelle suit des dizaines de chevaux : soins, vaccinations, interventions du vétérinaire et du maréchal, pension, propriétaires, stocks. L'information vit sur des carnets papier et des tableurs. Horse Ledger la met dans un produit unique, pensé pour le vocabulaire du métier.",
      audience:
        "Haras, écuries de pension et structures de course, de la vingtaine à la centaine de chevaux.",
      role: "Conception du produit, direction artistique, développement et mise en ligne.",
      work: [
        "Modélisation du domaine métier autour du cheval : fiche, soins, documents, propriétaire.",
        "Découpage en sept modules et conception des écrans correspondants.",
        "Direction artistique orientée métier : photographie, typographie sobre, vocabulaire équestre.",
        "Mise en production et rédaction des pages produit.",
      ],
      design: [
        {
          label: "Le cheval comme unité centrale",
          detail: "Tout se rattache à une fiche cheval : soins, documents, facturation, historique. Le reste n'est qu'une vue sur cette fiche.",
        },
        {
          label: "Un palier de taille, pas de fonctionnalité",
          detail: "Les offres se distinguent par le nombre de chevaux gérés, pas en retirant des fonctions utiles au quotidien.",
        },
        {
          label: "Sérieux visuel",
          detail: "La filière est un milieu professionnel exigeant : pas d'illustration décorative, des photos réelles et une mise en page calme.",
        },
      ],
      features: [
        { label: "Suivi des chevaux", detail: "Fiche complète et historique par cheval." },
        { label: "Planning et soins", detail: "Organisation des interventions et des rappels." },
        { label: "Documents", detail: "Papiers, certificats et pièces rattachés à chaque cheval." },
        { label: "Facturation", detail: "Pension et prestations facturées aux propriétaires." },
        { label: "Stocks", detail: "Suivi des consommables et des aliments." },
        { label: "Équipe", detail: "Répartition des tâches entre les intervenants." },
        { label: "Analyses", detail: "Vues de synthèse sur l'activité de la structure." },
      ],
      stack: ["Next.js", "TypeScript", "Vercel"],
      results: [],
      disclosure:
        "Les témoignages et les grilles tarifaires visibles sur le site sont le discours du produit. Je ne les présente pas ici comme des résultats mesurés.",
    },
  },

  {
    slug: "aequitas",
    screenLabels: {
      "p-demarche-pa": "page démarche produit",
      "p-developers": "espace développeurs",
      "p-facturation-electronique": "page facturation électronique",
    },
    name: "Aequitas",
    kind: "Plateforme SaaS",
    sector: "Facturation électronique française",
    location: null,
    status: "En ligne",
    engagement: "propre",
    lead: "Absorber la réforme française de la facturation électronique sans changer les habitudes de facturation d'une entreprise.",
    url: "https://aequitas-hazel.vercel.app/",
    repo: "https://github.com/Salim-ers/Aequitas",
    layout: "duo",
    case: {
      context:
        "La facturation électronique devient obligatoire en France par paliers. Pour une TPE ou un cabinet, la difficulté n'est pas d'émettre une facture : c'est de respecter des règles précises — numérotation continue, mentions obligatoires, piste d'audit — sans devenir expert du sujet. Aequitas prend cette contrainte à sa charge.",
      audience:
        "Indépendants, TPE, PME et cabinets comptables établis en France et assujettis à la TVA.",
      role: "Conception du produit, direction artistique, développement et mise en ligne.",
      work: [
        "Traduction des règles de la réforme en contrôles applicatifs concrets.",
        "Conception du parcours de facturation : création, contrôle, envoi, suivi du paiement.",
        "Rédaction de l'ensemble des messages d'erreur en langage clair plutôt qu'en référence réglementaire.",
        "Construction de la page produit et du parcours d'essai.",
      ],
      design: [
        {
          label: "La conformité est un contrôle, pas un cours",
          detail:
            "Les vérifications s'exécutent avant l'envoi et s'expriment en français simple. L'utilisateur n'a pas à connaître le texte de loi pour le respecter.",
        },
        {
          label: "Ne pas déplacer l'habitude",
          detail: "Le parcours reprend l'ordre d'une facturation classique. La réforme est absorbée derrière, pas imposée devant.",
        },
        {
          label: "Traçabilité par défaut",
          detail: "Journal d'audit et rôles font partie du socle, pas d'une option payante.",
        },
      ],
      features: [
        { label: "Création de factures", detail: "Saisie assistée avec calcul de TVA en temps réel." },
        { label: "Numérotation continue", detail: "Séquence sans rupture, telle que l'exige la réglementation française." },
        { label: "Contrôles avant envoi", detail: "Vérifications exprimées en langage clair." },
        { label: "Suivi de trésorerie", detail: "Encaissé, dû et en retard, distingués." },
        { label: "Journal d'audit", detail: "Historique des opérations et permissions par rôle." },
      ],
      stack: ["Next.js", "TypeScript", "Vercel"],
      results: [],
    },
  },

  {
    slug: "odyssea",
    name: "Odyssea",
    kind: "Application web",
    sector: "Voyage",
    location: null,
    status: "En ligne",
    engagement: "propre",
    lead: "Indiquer où, quand et avec qui — et obtenir un voyage composé heure par heure, escales comprises.",
    url: "https://odyssea-ten.vercel.app/",
    repo: "https://github.com/Salim-ers/Odyssea",
    layout: "column",
    case: {
      context:
        "Préparer un voyage multi-escales demande des semaines : comparer des vols, répartir les nuits entre les villes, remplir les journées. Odyssea part des seules informations que le voyageur connaît vraiment — sa ville de départ, sa destination, ses dates, ses compagnons — et compose le reste.",
      audience: "Voyageurs qui veulent un itinéraire détaillé sans passer par une agence ni par des semaines de recherche.",
      role: "Conception du produit, direction artistique, développement et mise en ligne.",
      work: [
        "Conception du formulaire de composition : quatre entrées seulement avant le premier résultat.",
        "Traitement du cas multi-escales, avec répartition des nuits entre les villes.",
        "Conception de l'itinéraire heure par heure : vols, hébergement, activités, restauration sur une même ligne de temps.",
        "Construction de l'espace « Mes voyages » et de la galerie de destinations.",
      ],
      design: [
        {
          label: "Quatre questions, puis un résultat",
          detail: "Le formulaire ne demande rien que le voyageur devrait chercher. Tout le reste est déduit ou proposé ensuite.",
        },
        {
          label: "L'itinéraire est le produit",
          detail:
            "L'exemple mis en avant est un voyage complet de douze jours détaillé étape par étape : montrer le résultat réel vaut mieux que le décrire.",
        },
        {
          label: "Une ligne de temps plutôt qu'une liste",
          detail: "Chaque journée se lit à l'heure, ce qui rend immédiatement visible un trajet trop serré ou une journée vide.",
        },
      ],
      features: [
        { label: "Composition du voyage", detail: "Départ, destination, dates et voyageurs." },
        { label: "Multi-escales", detail: "Plusieurs villes, avec répartition des nuits." },
        { label: "Vols et hébergement", detail: "Proposés dans le même itinéraire." },
        { label: "Programme heure par heure", detail: "Chaque journée détaillée sur une ligne de temps." },
        { label: "Mes voyages", detail: "Espace de reprise des itinéraires composés." },
      ],
      stack: ["JavaScript", "Next.js", "Vercel"],
      results: [],
    },
  },

  {
    slug: "quadcore",
    name: "QuadCore",
    kind: "Site vitrine de services",
    sector: "Services informatiques",
    location: null,
    status: "En ligne",
    engagement: "propre",
    lead: "La vitrine de services IT : support, administration systèmes et réseaux, infrastructure, cloud et qualité logicielle.",
    url: "https://www.quad-core.fr/",
    repo: null,
    layout: "wide",
    case: {
      context:
        "Un site de services informatiques se juge en quelques secondes : le visiteur cherche ce que vous faites, comment vous travaillez et comment vous joindre. QuadCore présente une offre de services IT et sert également de vitrine à Centrium.",
      audience: "Entreprises cherchant un renfort sur le support, l'administration systèmes et réseaux ou l'infrastructure.",
      role: "Conception, direction artistique, développement, rédaction et mise en ligne.",
      work: [
        "Structuration de l'offre en six services lisibles plutôt qu'en catalogue.",
        "Écriture d'une méthode en cinq étapes, pour rendre la façon de travailler concrète.",
        "Mise en avant de Centrium comme produit maison depuis le site de services.",
        "Mise en place de la prise de rendez-vous et des points de contact.",
      ],
      design: [
        {
          label: "Dire ce qui est fait, pas ce qui est promis",
          detail: "Chaque service est décrit par son contenu opérationnel — support N1/N2, gestion d'incidents — plutôt que par un adjectif.",
        },
        {
          label: "Une méthode visible",
          detail: "Les cinq étapes de travail sont affichées : c'est ce qu'un prospect veut savoir avant de prendre rendez-vous.",
        },
      ],
      features: [
        { label: "Support IT", detail: "Assistance N1/N2 et gestion d'incidents." },
        { label: "Systèmes et réseaux", detail: "Administration et exploitation." },
        { label: "Infrastructure et cloud", detail: "Environnements Azure, AWS et hybrides." },
        { label: "QA et tests", detail: "Automatisation et non-régression." },
        { label: "Gestion de projet IT", detail: "Cadrage et suivi." },
        { label: "Prise de rendez-vous", detail: "Créneau réservable directement depuis le site." },
      ],
      stack: ["Next.js", "TypeScript", "Vercel"],
      results: [],
    },
  },

  {
    slug: "royale-auto-ecole",
    screenLabels: {
      "p-qui-sommes-nous": "page qui sommes-nous",
      "p-reglementation": "page réglementation et documents",
    },
    name: "Royale Auto-école",
    kind: "Site vitrine multi-pages",
    sector: "Auto-école",
    location: "Breuil-le-Vert (60)",
    status: "En ligne",
    engagement: "client",
    lead: "Sept pages pour répondre aux vraies questions d'un futur élève : quelle formation, quels documents, quel budget, comment s'inscrire.",
    url: "https://royale-one.vercel.app/",
    repo: "https://github.com/Salim-ers/Royale-Auto-cole",
    layout: "duo",
    case: {
      context:
        "Une auto-école reçoit toujours les mêmes questions au téléphone : à partir de quel âge, quels papiers fournir, quelle différence entre conduite accompagnée et conduite supervisée. Le site répond à ces questions avant l'appel, et sert de support d'inscription.",
      audience: "Futurs élèves et leurs parents, dans le secteur de Breuil-le-Vert et du Clermontois.",
      role: "Conception, direction artistique, intégration des contenus et mise en ligne.",
      work: [
        "Architecture en sept pages : accueil, présentation, formations, réglementation et documents, sécurité routière, conseils, contact.",
        "Mise en forme des neuf formations proposées, boîte manuelle et automatique.",
        "Intégration d'un quiz de sécurité routière, pour rendre la page utile et pas seulement informative.",
        "Présentation des locaux et du parcours d'inscription.",
      ],
      design: [
        {
          label: "Répondre avant d'être appelé",
          detail: "Chaque page correspond à une question réellement posée à l'accueil, formulée dans les mots des élèves.",
        },
        {
          label: "Les formations d'abord",
          detail: "La distinction AAC, conduite supervisée et permis classique est traitée en page dédiée, parce que c'est le point de décision.",
        },
        {
          label: "Un lieu, pas une marque",
          detail: "Les photos des locaux servent d'argument : on vient s'asseoir dans cette salle plusieurs mois durant.",
        },
      ],
      features: [
        { label: "Neuf formations", detail: "Détail, prérequis et déroulé pour chacune." },
        { label: "Réglementation et documents", detail: "Pièces à fournir et démarches." },
        { label: "Sécurité routière", detail: "Page pédagogique avec quiz." },
        { label: "Contact et inscription", detail: "Coordonnées, horaires et prise de contact." },
      ],
      stack: ["JavaScript", "Next.js", "Vercel"],
      results: [],
    },
  },

  {
    slug: "noa-cafe",
    screenLabels: {
      "p-lieu": "page le lieu",
      "p-histoire": "page notre histoire",
      "p-venir": "page venir",
    },
    name: "Noa Café",
    kind: "Site vitrine",
    sector: "Café de spécialité",
    location: "Paris 19e",
    status: "En ligne",
    engagement: "client",
    lead: "Un site court pour un lieu petit : la carte, l'adresse, les horaires, et l'envie d'y aller.",
    url: "https://noa-cafe-one.vercel.app/",
    repo: "https://github.com/Salim-ers/noa-caf-",
    layout: "column",
    case: {
      context:
        "Pour un café de quartier, un site n'a que trois missions : donner envie, dire où c'est et quand c'est ouvert. Tout le reste éloigne du seul geste utile, venir sur place.",
      audience: "Habitants et visiteurs du 19e arrondissement, à quelques minutes des stations Jourdain et Pyrénées.",
      role: "Conception, direction artistique, mise en forme des contenus et mise en ligne.",
      work: [
        "Réduction volontaire à quatre entrées : la carte, le lieu, l'histoire, venir.",
        "Mise en page de la carte comme un objet éditorial et non comme un tableau de prix.",
        "Traitement photographique du lieu, matcha, cookies, brunch.",
        "Intégration des horaires et de l'itinéraire depuis le métro.",
      ],
      design: [
        {
          label: "Petit, et c'est voulu",
          detail: "Le site reprend la position du lieu : peu de pages, peu de bruit, une ligne éditoriale assumée.",
        },
        {
          label: "La carte comme pièce maîtresse",
          detail: "Elle occupe une page entière et se lit comme un menu imprimé, pas comme une liste déroulante.",
        },
        {
          label: "Venir est l'action principale",
          detail: "Adresse, métro et horaires restent accessibles depuis n'importe quelle page.",
        },
      ],
      features: [
        { label: "Carte", detail: "Boissons, pâtisseries et brunch." },
        { label: "Le lieu", detail: "Présentation de la salle et de l'ambiance." },
        { label: "Notre histoire", detail: "Le récit du café." },
        { label: "Venir", detail: "Adresse, accès métro et horaires." },
      ],
      stack: ["JavaScript", "Next.js", "Vercel"],
      results: [],
    },
  },

  {
    slug: "poulet-station",
    name: "Poulet Station",
    kind: "Site vitrine",
    sector: "Restauration rapide",
    location: "Creil (60)",
    status: "En ligne",
    engagement: "client",
    lead: "Une vitrine courte pour une enseigne de restauration rapide : l'offre, l'adresse, le positionnement 100 % halal.",
    url: "https://ps-nine-theta.vercel.app/",
    repo: "https://github.com/Salim-ers/ps",
    layout: "compact",
    case: {
      context:
        "En restauration rapide, le site sert avant la visite : savoir ce qu'on y mange, où c'est, et si ça correspond à ce qu'on cherche. Le positionnement halal est affiché dès l'en-tête parce que c'est le critère de choix.",
      audience: "Clientèle de proximité à Creil et dans l'agglomération.",
      role: "Conception, direction artistique et mise en ligne.",
      work: [
        "Mise en avant du positionnement et de la ville dès l'en-tête.",
        "Présentation de l'offre et des produits.",
        "Format court, pensé d'abord pour une consultation sur téléphone.",
      ],
      design: [
        {
          label: "Le critère de choix en premier",
          detail: "« Creil · 100 % Halal » figure dans l'en-tête : c'est l'information qui décide de la visite.",
        },
        {
          label: "Court par construction",
          detail: "Une page suffit. Ajouter des rubriques n'aurait rien apporté à une décision prise en dix secondes.",
        },
      ],
      features: [
        { label: "Offre", detail: "Présentation des produits." },
        { label: "Localisation", detail: "Enseigne et ville affichées en permanence." },
      ],
      stack: ["JavaScript", "Next.js", "Vercel"],
      results: [],
    },
  },
];

/** Réalisations en ligne sans étude de cas dédiée. */
export type SideWork = { name: string; description: string; url: string; note?: string };

export const sideWorks: SideWork[] = [
  {
    name: "Metrika",
    description: "Environnement de métrage BTP : analyse, CCTP, DPGF et étude de prix au même endroit.",
    url: "https://metrika-app-ten.vercel.app/",
    note: "Accès privé — pas d'inscription publique.",
  },
  {
    name: "Carte QuadCore",
    description: "Carte de visite numérique : identité, contact et liens sur une seule page.",
    url: "https://carte-ers.vercel.app/",
  },
];

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}
