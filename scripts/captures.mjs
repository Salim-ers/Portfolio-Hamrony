/**
 * Génère de vraies captures des sites en ligne déclarés dans /data.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   npm run captures
 *
 * Produit /public/projects/<slug>/home.jpg et /public/clients/<slug>/home.jpg.
 * Le portfolio les utilise automatiquement au build suivant, à la place de l'aperçu live.
 * Option : `npm run captures -- noa-cafe odyssea` pour ne capturer que certains slugs.
 */
import fs from "node:fs";
import path from "node:path";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright est requis : npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}

const root = process.cwd();

/** Lit les entrées { slug, url } de /data sans exécuter le TypeScript. */
function entries(file, folder) {
  const src = fs.readFileSync(path.join(root, "data", file), "utf8");
  const out = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?url:\s*"(https?:\/\/[^"]+)"/g;
  for (const block of src.split(/\n  \{\n/)) {
    re.lastIndex = 0;
    const m = re.exec(block);
    if (m) out.push({ slug: m[1], url: m[2], folder });
  }
  return out;
}

const only = process.argv.slice(2);
const targets = [...entries("projects.ts", "projects"), ...entries("clientProjects.ts", "clients")].filter(
  (t) => only.length === 0 || only.includes(t.slug)
);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, locale: "fr-FR", reducedMotion: "reduce" });

for (const t of targets) {
  const page = await context.newPage();
  const dir = path.join(root, "public", t.folder, t.slug);
  fs.mkdirSync(dir, { recursive: true });
  try {
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 45000 });
    // Bandeaux cookies : refuser si possible, pour une capture propre.
    for (const label of ["Refuser", "Tout refuser", "Continuer sans accepter", "Accepter", "Tout accepter"]) {
      const btn = page.getByRole("button", { name: label, exact: true });
      if (await btn.count()) {
        await btn.first().click({ timeout: 2000 }).catch(() => {});
        break;
      }
    }
    await page.waitForTimeout(3500);
    const file = path.join(dir, "home.jpg");
    await page.screenshot({ path: file, type: "jpeg", quality: 82 });
    console.log(`ok   ${t.slug.padEnd(28)} ${path.relative(root, file)}`);
  } catch (e) {
    console.warn(`skip ${t.slug.padEnd(28)} ${e.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
