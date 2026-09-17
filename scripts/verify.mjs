/**
 * Vérification du site construit.
 *
 *   npm run build && npm start        (dans un terminal)
 *   node scripts/verify.mjs           (dans un autre)
 *
 * Contrôle, sur desktop / tablette / mobile :
 *   - débordement horizontal
 *   - images sans alt et images sans dimensions (stabilité de la mise en page)
 *   - liens internes cassés
 *   - présence d'un état de focus visible
 *   - rendu avec prefers-reduced-motion
 * Produit les captures dans ./.verify
 */
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] || "./.verify";
fs.mkdirSync(OUT, { recursive: true });
const base = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const PAGES = [
  ["accueil", "/"],
  ["creation", "/creation"],
  ["systemes", "/systemes"],
  ["cas-centrium", "/creation/centrium"],
  ["cas-royale", "/creation/royale-auto-ecole"],
  ["404", "/page-inexistante"],
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablette", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
];

const problems = [];
const note = (m) => problems.push(m);

async function scrollThrough(page) {
  await page
    .evaluate(async () => {
      // `scroll-behavior: smooth` annule chaque saut par le suivant : le
      // balayage n'avancerait pas et les révélations ne se déclencheraient
      // jamais. On force un défilement instantané le temps du parcours.
      const previous = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      await new Promise((r) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight * 0.85;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 70);
          else {
            window.scrollTo(0, 0);
            setTimeout(r, 500);
          }
        };
        step();
      });
      document.documentElement.style.scrollBehavior = previous;
    })
    .catch(() => {});
  await page.waitForTimeout(900);
}

const browser = await chromium.launch();

/* ---------- 1. Rendu et débordement, par viewport ---------- */
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, locale: "fr-FR" });
  const page = await ctx.newPage();

  for (const [name, path] of PAGES) {
    const res = await page.goto(base + path, { waitUntil: "networkidle" });
    const expected = path === "/page-inexistante" ? 404 : 200;
    if (res.status() !== expected) note(`${vp.name} ${path} : HTTP ${res.status()} (attendu ${expected})`);

    await scrollThrough(page);

    const audit = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflowing = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2);
        })
        .slice(0, 4)
        .map((el) => `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]}`);

      const imgs = [...document.querySelectorAll("img")];
      return {
        scrollWidth: doc.scrollWidth,
        innerWidth: window.innerWidth,
        overflowing,
        imagesWithoutAlt: imgs.filter((i) => !i.getAttribute("alt")).length,
        imagesWithoutSize: imgs.filter((i) => !i.getAttribute("width") || !i.getAttribute("height")).length,
        images: imgs.length,
        h1: document.querySelectorAll("h1").length,
        stillHidden: [...document.querySelectorAll(".rise-in, .slide-in, .mask-in, .rule-in")].filter((el) => {
          const s = getComputedStyle(el);
          return parseFloat(s.opacity) < 0.9 || s.clipPath.includes("100%");
        }).length,
      };
    });

    if (audit.scrollWidth > audit.innerWidth + 1)
      note(`${vp.name} ${path} : débordement horizontal ${audit.scrollWidth} > ${audit.innerWidth} ${audit.overflowing.join(", ")}`);
    if (audit.imagesWithoutAlt) note(`${vp.name} ${path} : ${audit.imagesWithoutAlt} image(s) sans alt`);
    if (audit.imagesWithoutSize) note(`${vp.name} ${path} : ${audit.imagesWithoutSize} image(s) sans dimensions`);
    if (audit.h1 !== 1 && path !== "/page-inexistante") note(`${vp.name} ${path} : ${audit.h1} balise(s) h1`);
    if (audit.stillHidden) note(`${vp.name} ${path} : ${audit.stillHidden} révélation(s) non déclenchée(s) après parcours`);

    await page.screenshot({ path: `${OUT}/${vp.name}-${name}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
  }
  console.log(`${vp.name} : ${PAGES.length} pages parcourues`);
  await ctx.close();
}

/* ---------- 2. Liens internes ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "fr-FR" });
  const page = await ctx.newPage();
  const seen = new Set();
  const queue = ["/", "/creation", "/systemes"];
  const checked = new Set();

  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    await page.goto(base + path, { waitUntil: "domcontentloaded" });
    const links = await page.evaluate(() =>
      [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter(Boolean)
    );
    for (const href of links) {
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (/^https?:\/\//.test(href)) continue; // liens externes : non suivis ici
      const clean = href.split("#")[0] || "/";
      if (checked.has(clean)) continue;
      checked.add(clean);
      const r = await page.request.get(base + clean);
      if (r.status() >= 400) note(`lien interne cassé : ${clean} → HTTP ${r.status()}`);
      if (clean.startsWith("/creation") || clean.startsWith("/systemes")) queue.push(clean);
    }
  }
  console.log(`liens internes : ${checked.size} adresses vérifiées`);

  /* ---------- 3. Redirections des anciennes URLs ---------- */
  for (const [from, to] of [
    ["/projets", "/creation"],
    ["/projets/centrium", "/creation/centrium"],
    ["/projets/equaris", "/creation/horse-ledger"],
    ["/projets/lumely", "/creation"],
    ["/projects", "/creation"],
  ]) {
    const r = await page.request.get(base + from, { maxRedirects: 0 }).catch(() => null);
    const location = r?.headers()?.location;
    if (!r || r.status() < 300 || r.status() >= 400 || location !== to)
      note(`redirection ${from} → attendu ${to}, obtenu ${r ? `${r.status()} ${location ?? ""}` : "aucune réponse"}`);
  }
  console.log("redirections : 5 règles vérifiées");

  /* ---------- 4. Focus clavier ---------- */
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const focus = [];
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    focus.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const s = getComputedStyle(el);
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || "").trim().slice(0, 40),
          outline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0,
        };
      })
    );
  }
  const reachable = focus.filter(Boolean);
  if (!reachable.length) note("aucun élément atteignable au clavier sur la porte d'entrée");
  const noOutline = reachable.filter((f) => !f.outline);
  if (noOutline.length) note(`focus sans contour visible : ${noOutline.map((f) => f.text).join(" | ")}`);
  console.log(`clavier : ${reachable.length} éléments atteints, contour visible sur ${reachable.length - noOutline.length}`);
  await ctx.close();
}

/* ---------- 5. Animations réduites ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", locale: "fr-FR" });
  const page = await ctx.newPage();
  for (const [name, path] of [["accueil", "/"], ["creation", "/creation"], ["systemes", "/systemes"]]) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    // Sans défilement : tout doit déjà être lisible.
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll(".rise-in, .slide-in, .mask-in, .word-mask > span, .lift-in")].filter(
        (el) => parseFloat(getComputedStyle(el).opacity) < 0.9
      ).length
    );
    if (hidden) note(`prefers-reduced-motion ${path} : ${hidden} élément(s) encore masqué(s)`);
    await page.screenshot({ path: `${OUT}/reduced-${name}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
  }
  console.log("prefers-reduced-motion : 3 pages vérifiées");
  await ctx.close();
}

await browser.close();

console.log("\n" + "-".repeat(60));
if (problems.length) {
  console.log(`${problems.length} point(s) à corriger :`);
  for (const p of problems) console.log("  · " + p);
  process.exitCode = 1;
} else {
  console.log("Aucun problème détecté.");
}
console.log(`Captures : ${OUT}`);
