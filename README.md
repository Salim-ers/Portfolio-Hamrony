# Portfolio — Salim El Rhalmani

Deux pratiques, une même signature.
Un portfolio à deux univers autonomes, reliés par une identité typographique commune.

| Univers | URL | Ambiance | Public visé |
| --- | --- | --- | --- |
| Porte d'entrée | `/` | Ivoire, deux panneaux | Tout le monde |
| Web & applications | `/creation` | Ivoire, encre, accent vermillon | Clients, prospects |
| Étude de cas | `/creation/<slug>` | idem | Clients, prospects |
| Systèmes & réseaux | `/systemes` | Graphite, accent bleu électrique | Recruteurs |

La porte d'entrée n'est jamais imposée : les deux univers ont une URL directe,
la navigation persistante permet de basculer à tout moment, et le bouton retour
du navigateur fonctionne normalement.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
**Aucune librairie d'animation** : tout le mouvement est en CSS, piloté par
`IntersectionObserver` et quelques classes utilitaires.

## Démarrer

```bash
npm install
npm run dev
```

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Développement |
| `npm run build` / `npm start` | Production |
| `npm run lint` | Vérification TypeScript |
| `npm run captures` | Recapture les sites en ligne (voir plus bas) |
| `npm run verify` | Contrôle le site construit dans un vrai navigateur |

## Règle de véracité

Le site ne présente que des informations vérifiables.

- **Aucune interface n'est dessinée.** Toutes les captures sont de vraies
  captures des sites en ligne, produites par `npm run captures`. Si un fichier
  n'existe pas, `lib/shots.ts` renvoie `null` et la mise en page bascule sur une
  composition éditoriale — jamais sur une fausse capture.
- **Aucun projet n'est déclaré « client » sans confirmation explicite.** Le champ
  `status` ne décrit que le fait vérifiable (le site répond à une URL publique) ;
  `engagement` distingue une commande client, un projet de démonstration et un
  projet entrepreneurial, et s'affiche sur la vignette comme sur l'étude de cas.
  Un projet de démonstration portant le nom d'une structure réelle précise, en
  clair, qu'il n'a pas été commandé par elle.
- **Aucun résultat chiffré** n'est affiché. `case.results` reste vide tant que
  rien n'est documenté, et la section n'est alors pas rendue.
- **Le schéma du home lab est un schéma de principe**, annoncé comme tel. Aucun
  plan d'adressage, aucun inventaire matériel, aucune mesure de disponibilité.
  Les flux animés illustrent un sens de circulation, pas une supervision.
- **Tout exemple pédagogique est badgé comme tel** sur la page (voir
  `support.example` dans `data/it.ts`).
- **Une valeur entre crochets** est un emplacement vide : le lien correspondant
  n'est pas affiché tant qu'elle n'est pas renseignée (`realValue` dans
  `lib/utils.ts`).
- **La disponibilité** (`positioning.availability`) s'affiche seulement si elle
  est renseignée. La remettre à `null` dès qu'elle n'est plus d'actualité.

## Contenu

| Fichier | Contenu |
| --- | --- |
| `data/works.ts` | Réalisations web, études de cas, date du dernier relevé |
| `data/it.ts` | Positionnement, formation, compétences, home lab, M365, support, parcours |
| `data/profile.ts` | Identité, société, points de contact, SEO |

Le contact est **séparé par univers** : `contact.projectEmail` côté création,
`contact.jobEmail` côté systèmes. Les deux ne sont jamais mélangés dans un texte.

## Captures

```bash
npx playwright install chromium
npm run captures              # tous les sites
npm run captures -- odyssea   # un seul
```

Les cibles sont déclarées dans `scripts/shots.config.mjs`. Le script produit
`/public/shots/<slug>/{home,full,mobile,<route>}.jpg` et **refuse** une capture
dont l'URL finale diffère de l'URL demandée : une page protégée qui redirige
vers `/login` ne peut donc pas être légendée comme une page produit.

Après une nouvelle campagne, mettre à jour `capturedOn` dans `data/works.ts`.

## Vérification

```bash
npm run build && npm start
npm run verify                # dans un autre terminal
```

Contrôle sur desktop / tablette / mobile : débordement horizontal, images sans
`alt` ou sans dimensions, révélations non déclenchées, liens internes cassés,
redirections des anciennes URLs, focus clavier visible, rendu avec
`prefers-reduced-motion`. Les captures de contrôle vont dans `./.verify`.

## Mouvement

Les états « masqués » des animations sont portés par `[data-motion="on"]`,
attribut posé sur `<html>` par un script inline **uniquement** si le JavaScript
s'exécute et que `prefers-reduced-motion` n'est pas activé. Conséquence : sans
JavaScript, ou avec les animations réduites, rien n'est masqué — tout le contenu
s'affiche directement dans son état final.

Quatre familles de révélation se relaient pour ne jamais rejouer le même effet
deux sections de suite : `mask` (captures), `rule` (filets), `slide` (colonnes
éditoriales), `rise` (listes et détails techniques).

## Thème

Les deux ambiances sont pilotées par l'attribut `data-universe` sur un
conteneur. Les composants ne codent jamais une couleur en dur : ils lisent
`--paper`, `--ink`, `--accent`. Chaque bloc d'univers réexpose les alias
Tailwind (`--color-paper`, …) localement — une variable CSS étant résolue là où
elle est déclarée, les déclarer uniquement sur `:root` figerait le thème.

## Anciennes URLs

`/projets`, `/projects` et leurs pages de détail sont redirigées en permanence
vers `/creation` (voir `next.config.ts`). `equaris` redirige vers
`horse-ledger` ; les projets retirés de la sélection renvoient à la galerie.
