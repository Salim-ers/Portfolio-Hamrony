/**
 * Manifeste des captures réelles.
 * Chaque entrée produit /public/shots/<slug>/<name>.jpg
 *   - home   : 1440x900, cadrage navigateur
 *   - full   : page entière (visuel éditorial long)
 *   - mobile : 390x844
 *   - routes : pages internes supplémentaires (ignorées si 404)
 * Aucune capture n'est fabriquée : si le site ne répond pas, le fichier n'existe pas
 * et le portfolio affiche l'absence de visuel au lieu d'inventer une interface.
 */
export const sites = [
  { slug: "centrium", url: "https://www.centrium-platform.com/", routes: ["/tarifs"] /* /fonctionnalites redirige vers /login : non représentatif */ },
  { slug: "horse-ledger", url: "https://www.horse-ledger.com/", routes: ["/#fonctionnalites", "/#tarifs"] },
  { slug: "aequitas", url: "https://aequitas-hazel.vercel.app/", routes: ["/#fonctionnalites", "/tarifs"] },
  { slug: "odyssea", url: "https://odyssea-ten.vercel.app/", routes: ["/explorer", "/composer"] },
  { slug: "quadcore", url: "https://www.quad-core.fr/", routes: ["/#services"] },
  { slug: "royale-auto-ecole", url: "https://royale-one.vercel.app/", routes: ["/formations", "/contact", "/securite-routiere"] },
  { slug: "noa-cafe", url: "https://noa-cafe-one.vercel.app/", routes: ["/carte", "/le-lieu"] },
  { slug: "poulet-station", url: "https://ps-nine-theta.vercel.app/", routes: ["/#carte"] },
  { slug: "essalam", url: "https://accmo-gamma.vercel.app/", routes: ["/#horaires"] },
  { slug: "carte-ers", url: "https://carte-ers.vercel.app/", routes: [] },
  { slug: "metrika", url: "https://metrika-app-ten.vercel.app/", routes: [] },
];
