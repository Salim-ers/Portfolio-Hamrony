export type Experience = {
  company: string;
  start: string;
  end: string;
  /** Intitulé du poste : à renseigner */
  role: string;
  summary: string;
  transferable: { label: string; text: string }[];
};

export const experience: Experience[] = [
  {
    company: "FedEx",
    start: "2020",
    end: "2026",
    role: "[FEDEX_ROLE]",
    summary:
      "Mon précédent environnement professionnel : un cadre opérationnel où les délais, les procédures et la fiabilité ne se négocient pas.",
    transferable: [
      { label: "Rigueur", text: "Appliquer une méthode, même sous pression." },
      { label: "Procédures", text: "Suivre, respecter et documenter un process." },
      { label: "Responsabilité", text: "Assumer la bonne fin d'une tâche." },
      { label: "Travail en équipe", text: "Coordonner avec d'autres postes et d'autres rythmes." },
      { label: "Priorités", text: "Trier l'urgent de l'important." },
      { label: "Environnement opérationnel", text: "Travailler là où chaque étape conditionne la suivante." },
    ],
  },
];

/** Là où ces acquis sont réinvestis aujourd'hui. */
export const transition = ["IT", "Infrastructure", "Systems", "Networks", "Products"] as const;
