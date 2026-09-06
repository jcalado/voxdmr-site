/**
 * Accessibility regression check: runs axe-core over the built site in both
 * locales and exits non-zero on any violation.
 *
 *   npm run build && npm run test:a11y
 *
 * Needs a Chromium once: `npx playwright install chromium`, or point
 * CHROME_PATH at an existing one (e.g. CHROME_PATH=/usr/bin/chromium).
 *
 * The site is static, so this serves `dist/` directly rather than booting the
 * dev server — the dev server does not have the Pagefind bundle, and the docs
 * search modal behaves differently without it.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const DIST = new URL("../dist/", import.meta.url).pathname;
const PORT = 4399;

/** Pages worth checking: one of each template, in both locales. */
const PAGES = [
  "/",
  "/radios",
  "/privacy",
  "/brandmeister-password",
  "/docs/installation",
  "/docs/changelog",
  "/pt/",
  "/pt/radios",
  "/pt/privacy",
  "/pt/brandmeister-password",
  "/pt/docs/installation",
];

const TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".wasm": "application/wasm",
  ".pf_meta": "application/octet-stream", ".pf_fragment": "application/octet-stream",
  ".pf_index": "application/octet-stream",
};

/** Minimal static file server. No SPA fallback — a wrong URL must 404, not
    silently serve index.html and make every page look identical. */
function serve() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = decodeURIComponent(req.url.split("?")[0]);
      let path = normalize(join(DIST, url));
      if (!path.startsWith(DIST)) return res.writeHead(403).end();
      if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
      if (!existsSync(path)) {
        if (existsSync(`${path}.html`)) path = `${path}.html`;
        else return res.writeHead(404).end("not found");
      }
      res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
      createReadStream(path).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

const axeSource = await readFile(
  new URL("../node_modules/axe-core/axe.min.js", import.meta.url),
  "utf8",
);

const server = await serve();
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
let total = 0;

for (const path of PAGES) {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    // Settle the entrance animations rather than racing them: axe reads
    // computed colour, and a half-faded element composites to a contrast
    // ratio that has nothing to do with the design.
    reducedMotion: "reduce",
  });
  const res = await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: "networkidle" });
  if (!res || res.status() !== 200) {
    console.error(`✗ ${path} — HTTP ${res?.status()}`);
    total++;
    await page.close();
    continue;
  }

  // Scroll the whole page so every IntersectionObserver-driven reveal fires.
  await page.evaluate(() => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) window.scrollTo(0, y);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);

  await page.addScriptTag({ content: axeSource });
  const { violations } = await page.evaluate(() =>
    window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
    }),
  );

  total += violations.length;
  if (violations.length === 0) {
    console.log(`✓ ${path}`);
  } else {
    console.log(`✗ ${path} — ${violations.length} violation(s)`);
    for (const v of violations) {
      console.log(`    [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
      for (const n of v.nodes.slice(0, 5)) console.log(`        ${n.target.join(" ")}`);
      console.log(`        ${v.helpUrl}`);
    }
  }
  await page.close();
}

await browser.close();
server.close();

console.log(
  total === 0
    ? `\nNo accessibility violations across ${PAGES.length} pages.`
    : `\n${total} violation(s) across ${PAGES.length} pages.`,
);
process.exit(total === 0 ? 0 : 1);
