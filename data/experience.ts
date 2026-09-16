export type Experience = {
  company: string;
  start: string;
  end: string;
  /** Intitulé du poste : affiché uniquement s'il est renseigné */
  role: string | null;
  summary: string;
  transferable: { label: string; text: string }[];
};

export const experience: Experience[] = [
  {
    company: "FedEx",
    start: "2020",
    end: "2026",
    role: null,
    summary:
      "Un cadre opérationnel où les délais, les procédures et la fiabilité ne se négocient pas. C'est la discipline que j'applique aujourd'hui à l'infrastructure.",
    transferable: [
      { label: "Rigueur", text: "Appliquer une méthode, même sous pression." },
      { label: "Responsabilité", text: "Assumer la bonne fin d'une tâche." },
      { label: "Procédures", text: "Suivre, respecter et documenter un process." },
      { label: "Travail en équipe", text: "Coordonner avec d'autres postes et d'autres rythmes." },
      { label: "Environnement opérationnel", text: "Travailler là où chaque étape conditionne la suivante." },
    ],
  },
];

/** Progression du parcours, de l'opérationnel vers le produit. */
export const progression = ["Systèmes", "Réseaux", "Sécurité", "Cloud", "Web", "Produit"] as const;
