/**
 * Capture en profondeur les sites réellement en ligne.
 *
 *   npx playwright install chromium
 *   npm run captures            # tout
 *   npm run captures -- odyssea # un slug
 *
 * Pour chaque site :
 *   home.jpg        page d'accueil, cadrage navigateur
 *   mobile.jpg      page d'accueil, téléphone
 *   p-<route>.jpg   pages internes découvertes dans la navigation
 *   s2 / s3 / s4    sections de la page d'accueil, pour les sites d'une
 *                   seule page dont tout le travail est dans le défilement
 *
 * Deux garde-fous :
 *   - une page qui redirige ailleurs (vers /login par exemple) n'est pas
 *     capturée : sa légende annoncerait autre chose que son contenu ;
 *   - rien n'est jamais fabriqué. Une capture absente reste absente, et
 *     le portfolio adapte sa mise en page.
 */
import fs from "node:fs";
import path from "node:path";
import { sites } from "./shots.config.mjs";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright requis : npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}

const root = process.cwd();
const only = process.argv.slice(2);
const targets = sites.filter((s) => only.length === 0 || only.includes(s.slug));

/** Pages internes à ne jamais capturer. */
const SKIP =
  /\/(login|connexion|signin|sign-in|register|inscription|signup|admin|dashboard|app|compte|account|panier|cart|checkout|mentions|mentions-legales|legales|cgv|cgu|confidentialite|privacy|legal|cookies|politique)([-/]|$|\?)/i;
const SKIP_EXT = /\.(pdf|zip|jpe?g|png|webp|svg|mp4|xml|json|ico)$/i;

/**
 * Bandeaux cookies.
 *
 * La correspondance se fait sur le texte du bouton normalisé — accents
 * retirés, casse et espaces ignorés. Un « ç » composé de deux caractères
 * Unicode, ou un libellé mis en capitales par CSS, échouerait sinon.
 * On refuse en priorité ; à défaut on accepte. Le but est seulement
 * qu'aucun bandeau ne recouvre le travail capturé.
 */
const REFUSE = ["tout refuser", "refuser", "continuer sans accepter", "sans facon", "non merci", "decliner"];
const ACCEPT = ["tout accepter", "accepter", "j'accepte", "ok", "compris", "autoriser"];

async function dismissBanner(page) {
  return page
    .evaluate(
      ([refuse, accept]) => {
        const norm = (t) =>
          (t || "")
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();

        const clickable = [...document.querySelectorAll('button, a, [role="button"]')].filter(
          (el) => el.getClientRects().length > 0
        );

        for (const labels of [refuse, accept]) {
          const hit = clickable.find((el) => labels.includes(norm(el.textContent)));
          if (hit) {
            hit.click();
            return norm(hit.textContent);
          }
        }
        return null;
      },
      [REFUSE, ACCEPT]
    )
    .then(async (clicked) => {
      if (clicked) await page.waitForTimeout(500);
      return clicked;
    })
    .catch(() => null);
}

const browser = await chromium.launch();
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.4,
  locale: "fr-FR",
  reducedMotion: "reduce",
});
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  locale: "fr-FR",
  reducedMotion: "reduce",
  isMobile: true,
  hasTouch: true,
});

/** Certains sites ne joignent jamais `networkidle` : on retombe sur `load`. */
async function open(page, url) {
  try {
    const res = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    if (!res || res.status() >= 400) throw new Error(`HTTP ${res ? res.status() : "pas de réponse"}`);
    return res;
  } catch (e) {
    if (!/Timeout/i.test(e.message)) throw e;
    const res = await page.goto(url, { waitUntil: "load", timeout: 45000 });
    if (!res || res.status() >= 400) throw new Error(`HTTP ${res ? res.status() : "pas de réponse"}`);
    await page.waitForTimeout(2500);
    return res;
  }
}

async function settle(page) {
  // Le bandeau apparaît parfois après le chargement : on laisse un temps,
  // on tente une première fois, puis à nouveau après le défilement.
  await page.waitForTimeout(900);
  await dismissBanner(page);

  // Déclenche les apparitions au défilement, puis remonte en haut.
  await page
    .evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      await new Promise((r) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight * 0.9;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 80);
          else {
            window.scrollTo(0, 0);
            setTimeout(r, 500);
          }
        };
        step();
      });
    })
    .catch(() => {});
  await dismissBanner(page);
  await page.waitForTimeout(1100);
}

/** Pages internes listées dans la navigation de la page d'accueil. */
async function discover(page, origin, max) {
  const hrefs = await page
    .evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.href))
    .catch(() => []);
  const seen = new Set(["/"]);
  const out = [];
  for (const href of hrefs) {
    let u;
    try {
      u = new URL(href);
    } catch {
      continue;
    }
    if (u.origin !== origin) continue;
    const p = u.pathname.replace(/\/$/, "") || "/";
    if (p === "/" || seen.has(p)) continue;
    if (SKIP.test(p) || SKIP_EXT.test(p)) continue;
    seen.add(p);
    out.push(p);
    if (out.length >= max) break;
  }
  return out;
}

function nameOfRoute(route) {
  const clean = route
    .replace(/^\//, "")
    .replace(/[^a-z0-9-]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `p-${clean || "index"}`;
}

/** Sections successives d'une page longue : le travail n'est pas que dans le pli. */
async function captureSections(page, dir, count = 3) {
  const height = await page.evaluate(() => document.body.scrollHeight).catch(() => 0);
  const view = 900;
  if (height < view * 2.2) return 0;

  let written = 0;
  for (let i = 1; i <= count; i++) {
    const y = Math.min(Math.round((height - view) * (i / (count + 0.6))), height - view);
    if (y <= view * 0.4) continue;
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(dir, `s${i + 1}.jpg`), type: "jpeg", quality: 78 });
    written++;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return written;
}

let ok = 0;
const skipped = [];

for (const site of targets) {
  const dir = path.join(root, "public", "shots", site.slug);
  fs.mkdirSync(dir, { recursive: true });
  const origin = new URL(site.url).origin;

  const page = await desktop.newPage();
  try {
    await open(page, site.url);
    await settle(page);

    await page.screenshot({ path: path.join(dir, "home.jpg"), type: "jpeg", quality: 80 });
    ok++;
    console.log(`ok   ${site.slug.padEnd(20)} home`);

    const n = await captureSections(page, dir);
    if (n) {
      ok += n;
      console.log(`ok   ${site.slug.padEnd(20)} ${n} section(s) de la page d'accueil`);
    }

    const routes = [...new Set([...(site.routes ?? []), ...(await discover(page, origin, site.maxRoutes ?? 6))])];
    for (const route of routes) {
      const name = nameOfRoute(route);
      try {
        const target = new URL(route, site.url).toString();
        await open(page, target);
        // Une page protégée renvoie ailleurs : la capture ne montrerait pas
        // ce que sa légende annonce. On refuse.
        const landed = new URL(page.url()).pathname.replace(/\/$/, "");
        const asked = new URL(target).pathname.replace(/\/$/, "");
        if (landed !== asked) throw new Error(`redirigé vers ${landed || "/"}`);
        await settle(page);
        await page.screenshot({ path: path.join(dir, `${name}.jpg`), type: "jpeg", quality: 78 });
        ok++;
        console.log(`ok   ${site.slug.padEnd(20)} ${name}`);
      } catch (e) {
        skipped.push(`${site.slug} ${route} — ${e.message.split("\n")[0]}`);
      }
    }
  } catch (e) {
    skipped.push(`${site.slug} — ${e.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }

  const mpage = await mobile.newPage();
  try {
    await open(mpage, site.url);
    await settle(mpage);
    await mpage.screenshot({ path: path.join(dir, "mobile.jpg"), type: "jpeg", quality: 80 });
    ok++;
    console.log(`ok   ${site.slug.padEnd(20)} mobile`);
  } catch (e) {
    skipped.push(`${site.slug} mobile — ${e.message.split("\n")[0]}`);
  } finally {
    await mpage.close();
  }
}

await browser.close();
console.log(`\n${ok} captures écrites.`);
if (skipped.length) console.log(`Non capturé :\n  ${skipped.join("\n  ")}`);
