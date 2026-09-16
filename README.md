# Salim El Rhalmani, portfolio

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Aucune base de données, aucune clé d'API : tout le contenu vit dans `/data`.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # vérification avant mise en ligne
```

## Mettre en ligne sur Vercel

1. Pousser le dossier sur un dépôt GitHub.
2. Sur vercel.com : **Add New > Project**, importer le dépôt. Vercel détecte Next.js, aucun réglage à changer.
3. Variable d'environnement (Settings > Environment Variables) : `NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr`. Elle sert au sitemap, aux balises Open Graph et au JSON-LD.
4. Brancher le domaine dans Settings > Domains.

## Où modifier le contenu

| Fichier | Contenu |
| --- | --- |
| `data/profile.ts` | Identité, titre, présentation, entreprise (SIREN, adresse) |
| `data/socials.ts` | Email, téléphone, LinkedIn, GitHub, CV |
| `data/projects.ts` | Produits : statut, stack, fonctionnalités, URL, captures |
| `data/clientProjects.ts` | Sites réalisés pour des clients |
| `data/infrastructure.ts`, `data/homelab.ts` | Études de cas et Home Lab |
| `data/skills.ts`, `data/experience.ts`, `data/education.ts`, `data/building.ts` | Stack, parcours, formation, projets en cours |

### Règle des placeholders

Toute valeur de la forme `[NOM_EN_MAJUSCULES]` est considérée comme manquante : le lien ou le bloc correspondant est masqué en production. Il suffit de remplacer la valeur pour qu'il apparaisse.

Restent à renseigner : `[LINKEDIN]`, `[GITHUB]`, `[CV]`, `[HARMONY_URL]`, `[AEQUITAS_URL]`, `[LUMELY_URL]`, `[STUDIO_ONE_URL]`, `[TILAWA_URL]`, `[SKILLORA_URL]`, `[EQUARIS_URL]`, `[MERVEILLE_URL]`, `[DUO_URL]`, `[PROFILE_PHOTO]`, `[FEDEX_ROLE]`, ainsi que les valeurs du Home Lab (`documented: false` tant qu'il n'est pas documenté).

Déjà renseignés : Centrium (centrium-platform.com), Odyssea, Noa Café, Poulet Station, Royale Auto-école.

### Statuts

`status` accepte `"Live" | "Demo" | "Prototype" | "In Development" | "Concept"`. Tant qu'il vaut `null`, le site affiche « Statut à préciser ». Chaque fonctionnalité a un état `working`, `in-progress`, `planned` ou `scope` : ne marquer `working` que ce qui fonctionne réellement.

## Captures d'écran

Un site en ligne avec `livePreview: true` s'affiche en aperçu réel (iframe) tant qu'aucune capture n'existe. Dès qu'une image est déposée, elle remplace l'aperçu automatiquement au build suivant, sans toucher au code :

| Emplacement | Utilisation |
| --- | --- |
| `public/projects/<slug>/home.jpg` | Visuel principal d'un produit |
| `public/projects/<slug>/detail-1.jpg`, `detail-2.jpg` | Vues secondaires (affichées seulement si présentes) |
| `public/projects/<slug>/mobile.jpg` | Vue mobile |
| `public/clients/<slug>/home.jpg` | Site client |

Formats acceptés : `.jpg`, `.png`, `.webp`, `.avif`.

### Générer les captures automatiquement

```bash
npm i -D playwright
npx playwright install chromium
npm run captures                  # tous les sites en ligne déclarés dans /data
npm run captures -- centrium      # un seul
```

Recommandé pour les sites qui interdisent l'intégration en iframe (en-tête `X-Frame-Options` ou `frame-ancestors`) : l'aperçu y resterait vide, la capture règle le problème. Pour Centrium, c'est à vérifier en ouvrant le portfolio une fois déployé.

## Raccourcis

- `Ctrl K` / `⌘ K` : palette de commandes
- `~/terminal` en pied de page : terminal (`help`, `whoami`, `projects`, `skills`, `homelab`, `contact`, `clear`)
