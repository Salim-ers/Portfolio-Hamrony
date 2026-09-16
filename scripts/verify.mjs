import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] || "./.shots";  // npm run build && npm start, puis : node scripts/verify.mjs
fs.mkdirSync(OUT, { recursive: true });
const base = process.env.BASE_URL || "http://localhost:3000";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
];
const pages = [["home", "/"], ["projets", "/projets"], ["centrium", "/projets/centrium"]];

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, locale: "fr-FR" });
  const page = await ctx.newPage();
  const overflow = [];
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    // déclenche tous les reveals
    await page.evaluate(async () => {
      await new Promise((r) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight * 0.8;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) requestAnimationFrame(step);
          else { window.scrollTo(0, 0); setTimeout(r, 600); }
        };
        step();
      });
    });
    await page.waitForTimeout(700);
    const w = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, win: window.innerWidth }));
    if (w.doc > w.win + 1) overflow.push(`${vp.name} ${path}: scrollWidth ${w.doc} > ${w.win}`);
    await page.screenshot({ path: `${OUT}/${vp.name}-${name}.jpg`, fullPage: true, type: "jpeg", quality: 72 });
  }
  console.log(`${vp.name}: ${overflow.length ? overflow.join(" | ") : "pas de débordement horizontal"}`);
  await ctx.close();
}
await browser.close();
