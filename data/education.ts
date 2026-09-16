export type Education = {
  school: string;
  program: string;
  level: string;
  /** "En cours" | "Obtenue" | null : affiché uniquement si renseigné */
  status: string | null;
  start: string | null;
  end: string | null;
};

export const education: Education[] = [
  {
    school: "OpenClassrooms",
    program: "Administrateur systèmes, réseaux et sécurité",
    level: "Certification professionnelle de niveau 6 (Bac+3/4)",
    status: null,
    start: null,
    end: null,
  },
];
