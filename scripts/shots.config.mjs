/**
 * Manifeste des captures.
 *
 * `routes` force des pages précises. Les autres sont découvertes
 * automatiquement dans la navigation de la page d'accueil (`maxRoutes`).
 * Le script refuse toute page qui redirige ailleurs : une capture ne peut
 * pas être légendée comme une page qu'elle ne montre pas.
 */
export const sites = [
  { slug: "centrium", url: "https://www.centrium-platform.com/", routes: ["/tarifs"], maxRoutes: 5 },
  { slug: "horse-ledger", url: "https://www.horse-ledger.com/", maxRoutes: 6 },
  { slug: "aequitas", url: "https://aequitas-hazel.vercel.app/", routes: ["/tarifs"], maxRoutes: 6 },
  { slug: "odyssea", url: "https://odyssea-ten.vercel.app/", maxRoutes: 6 },
  { slug: "quadcore", url: "https://www.quad-core.fr/", maxRoutes: 6 },
  { slug: "royale-auto-ecole", url: "https://royale-one.vercel.app/", maxRoutes: 7 },
  { slug: "noa-cafe", url: "https://noa-cafe-one.vercel.app/", maxRoutes: 6 },
  { slug: "poulet-station", url: "https://ps-nine-theta.vercel.app/", maxRoutes: 6 },
  { slug: "carte-ers", url: "https://carte-ers.vercel.app/", maxRoutes: 0 },
  { slug: "metrika", url: "https://metrika-app-ten.vercel.app/", maxRoutes: 0 },
];
