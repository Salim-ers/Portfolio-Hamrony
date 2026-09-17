/**
 * Capture les sites réellement en ligne déclarés dans scripts/shots.config.mjs.
 *
 *   npx playwright install chromium
 *   npm run captures            # tout
 *   npm run captures -- odyssea # un slug
 *
 * Sortie : /public/shots/<slug>/{home,full,mobile,<route>}.jpg
 * Une capture manquante n'est jamais remplacée par une image de substitution.
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

const browser = await chromium.launch();
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
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

const DISMISS = ["Tout refuser", "Refuser", "Continuer sans accepter", "Sans façon", "Tout accepter", "Accepter", "J'accepte", "OK"];

/**
 * Certains sites gardent une connexion ouverte (analytics, websocket) et
 * n'atteignent jamais `networkidle`. On retente alors sur `load`.
 */
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
  for (const label of DISMISS) {
    const btn = page.getByRole("button", { name: label, exact: true });
    if (await btn.count().catch(() => 0)) {
      await btn.first().click({ timeout: 1500 }).catch(() => {});
      break;
    }
  }
  // Déclenche les apparitions au défilement puis remonte.
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.9;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 90);
        else { window.scrollTo(0, 0); setTimeout(r, 500); }
      };
      step();
    });
  }).catch(() => {});
  await page.waitForTimeout(1200);
}

function slugOfRoute(route) {
  const clean = route.replace(/^\/#?/, "").replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return clean || "index";
}

let ok = 0, skipped = [];

for (const site of targets) {
  const dir = path.join(root, "public", "shots", site.slug);
  fs.mkdirSync(dir, { recursive: true });

  // --- desktop : viewport + page entière
  const page = await desktop.newPage();
  try {
    await open(page, site.url);
    await settle(page);
    await page.screenshot({ path: path.join(dir, "home.jpg"), type: "jpeg", quality: 80 });
    await page.screenshot({ path: path.join(dir, "full.jpg"), type: "jpeg", quality: 72, fullPage: true });
    console.log(`ok   ${site.slug.padEnd(20)} home + full`);
    ok += 2;

    for (const route of site.routes) {
      const name = slugOfRoute(route);
      try {
        const target = new URL(route, site.url).toString();
        await open(page, target);
        // Une route protégée renvoie vers /login : la capture montrerait
        // alors autre chose que ce que sa légende annonce. On refuse.
        const landed = new URL(page.url()).pathname.replace(/\/$/, "");
        const asked = new URL(target).pathname.replace(/\/$/, "");
        if (landed !== asked) throw new Error(`redirigé vers ${landed}`);
        await settle(page);
        await page.screenshot({ path: path.join(dir, `${name}.jpg`), type: "jpeg", quality: 80 });
        console.log(`ok   ${site.slug.padEnd(20)} ${name}`);
        ok++;
      } catch (e) {
        skipped.push(`${site.slug}${route} — ${e.message.split("\n")[0]}`);
      }
    }
  } catch (e) {
    skipped.push(`${site.slug} — ${e.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }

  // --- mobile
  const mpage = await mobile.newPage();
  try {
    await open(mpage, site.url);
    await settle(mpage);
    await mpage.screenshot({ path: path.join(dir, "mobile.jpg"), type: "jpeg", quality: 80 });
    console.log(`ok   ${site.slug.padEnd(20)} mobile`);
    ok++;
  } catch (e) {
    skipped.push(`${site.slug} mobile — ${e.message.split("\n")[0]}`);
  } finally {
    await mpage.close();
  }
}

await browser.close();
console.log(`\n${ok} captures écrites.`);
if (skipped.length) console.log(`Non capturé :\n  ${skipped.join("\n  ")}`);
