import type { NextConfig } from "next";

/**
 * Conservation des anciennes adresses.
 * Le site passait par /projets et /projects. Ces URLs sont redirigées en
 * permanence vers le nouvel univers /creation, y compris pour les projets
 * qui ne figurent plus dans la sélection : ils renvoient vers la galerie
 * plutôt que vers une page absente.
 */
const REMOVED = ["lumely", "skillora", "studio-one", "tilawa", "lystra", "soonly", "fleura-paris"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Projet renommé : Equaris est devenu Horse Ledger.
      { source: "/projets/equaris", destination: "/creation/horse-ledger", permanent: true },
      { source: "/projects/equaris", destination: "/creation/horse-ledger", permanent: true },

      // Projets retirés de la sélection : retour à la galerie.
      ...REMOVED.flatMap((slug) => [
        { source: `/projets/${slug}`, destination: "/creation", permanent: true },
        { source: `/projects/${slug}`, destination: "/creation", permanent: true },
      ]),

      // Anciennes adresses conservées.
      { source: "/projets", destination: "/creation", permanent: true },
      { source: "/projects", destination: "/creation", permanent: true },
      { source: "/projets/:slug", destination: "/creation/:slug", permanent: true },
      { source: "/projects/:slug", destination: "/creation/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
