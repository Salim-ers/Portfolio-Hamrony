# Portfolio — Salim El Rhalmani

Portfolio personnel. Il présente d'abord **Salim** : son parcours, sa
reconversion vers l'IT, son laboratoire, et les produits qu'il construit.
Harmony Solutions y figure comme sa dimension entrepreneuriale — le discours
commercial appartiendra à un futur site Harmony séparé.

| Page | URL | Rôle |
| --- | --- | --- |
| Accueil | `/` | La narration complète, en dix sections |
| Réalisations | `/creation` | Galerie des projets, sans discours commercial |
| Étude de cas | `/creation/<slug>` | Contexte, rôle, choix de conception, écrans |
| Parcours IT | `/systemes` | Compétences, projets phares, laboratoires, parcours |
| Formation | `/formation` | Les treize projets professionnalisants |

La page d'accueil est une synthèse : un titre, deux ou trois phrases et un
visuel par section. Le détail vit dans les pages internes.

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

Les cibles sont déclarées dans `scripts/shots.config.mjs`. Pour chaque site,
le script capture la page d'accueil (`home`, `mobile`), **découvre les pages
internes** dans la navigation (`p-<route>`, plafonné par `maxRoutes`) et prend
trois vues réparties dans le défilement (`s2`, `s3`, `s4`) — c'est ce qui permet
de montrer le travail sur tout le site et pas seulement sur le pli supérieur.

Trois garde-fous :

- une page dont l'URL finale diffère de l'URL demandée n'est pas capturée : une
  page protégée qui redirige vers `/login` ne peut pas être légendée comme une
  page produit ;
- les pages légales, comptes et tunnels d'achat sont exclus (`SKIP`) ;
- les bandeaux cookies sont refusés — à défaut acceptés — avant et après le
  défilement, pour qu'aucun bandeau ne recouvre le travail.

Le portfolio lit ensuite ces fichiers via `projectScreens()` : **ajouter une
capture suffit à l'afficher**, il n'y a aucune liste à tenir à jour. Les libellés
sont déduits du nom de fichier, et `screenLabels` dans `data/works.ts` permet
d'en écrire un à la main quand le nom de l'URL ne suffit pas.

Après une nouvelle campagne, mettre à jour `capturedOn` dans `data/works.ts`.

## Vérification

```bash
npm run build && npm start
npm run verify                # dans un autre terminal
```

Contrôle sur desktop / tablette / mobile : débordement horizontal, images sans
`alt` ou sans dimensions, révélations non déclenchées, liens internes cassés,
redirections des anciennes URLs, focus clavier visible, rendu avec
`prefers-reduced-motion`, et — sur cinq formats d'écran — le fait que les deux
appels à l'action de la porte d'entrée tiennent dans le premier écran. Les
captures de contrôle vont dans `./.verify`.

## Identité graphique

Toute la palette est échantillonnée sur le logo Harmony Solutions réel
(`public/brand/harmony-logo-source.png`) :

| | |
| --- | --- |
| Marine | `#172a4a` — fond du logo, sections techniques |
| Laiton | `#c6a570` — monogramme, filets, accents |
| Ivoire | `#f7f4ed` — surfaces claires |

Le monogramme est construit en **traits parallèles**. Cette construction
devient la grammaire du site : filets doubles (`.rule-double`), équerres en
puce (`.bracket`), colonnes appariées en fond (`.ruled-bg`), et le monogramme
lui-même en filigrane dans le hero et le contact. Au premier chargement de la
session, ses traits se dessinent brièvement (`components/brand/Intro.tsx`) —
jamais un écran de chargement : la page est déjà rendue dessous.

Rythme : environ 70 % de surfaces claires, 30 % de marine. Les sections marine
marquent les moments techniques — ingénierie IT et laboratoire.

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
