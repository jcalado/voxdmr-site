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
      let url;
      try {
        url = decodeURIComponent(req.url.split("?")[0]);
      } catch {
        // Malformed percent-encoding would otherwise throw out of the request
        // handler and take the whole process down mid-run.
        return res.writeHead(400).end("bad request");
      }
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

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

/** Desktop and a small phone — the narrow pass is what catches reflow. */
const VIEWPORTS = [
  { name: "1280", width: 1280, height: 900 },
  { name: "390", width: 390, height: 800 },
];

/**
 * Entrance animations start elements at opacity 0. axe does not evaluate
 * invisible text *at all* — it neither passes nor flags it — so anything still
 * faded out when axe runs is silently exempt from the whole audit. Scroll the
 * page in steps, yielding to the event loop between them so the
 * IntersectionObserver actually fires (a synchronous loop only ever reports the
 * final position), then let the transitions finish.
 */
async function settleReveals(page) {
  await page.evaluate(async () => {
    const wait = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await wait();
    }
    window.scrollTo(0, 0);
    await wait();
  });
  await page.waitForTimeout(800);
}

/**
 * Guards the above: reports any element that still carries text nobody can see.
 * Deliberately-hidden things (display:none, visibility:hidden, hover tooltips)
 * are excluded; so are descendants of an already-reported element.
 */
async function invisibleText(page) {
  return page.evaluate(() => {
    const faded = (el) => {
      const s = getComputedStyle(el);
      return (
        parseFloat(s.opacity) <= 0.01 &&
        s.visibility !== "hidden" &&
        s.display !== "none" &&
        !el.closest('[role="tooltip"]')
      );
    };
    return Array.from(document.querySelectorAll("body *"))
      .filter((el) => (el.textContent || "").trim() && faded(el))
      // Only the outermost offender — a faded container fades its whole subtree.
      .filter((el) => !(el.parentElement && faded(el.parentElement)))
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).trim().slice(0, 48)}`);
  });
}

async function runAxe(page, options = {}) {
  await page.addScriptTag({ content: axeSource });
  const { violations } = await page.evaluate(
    ([tags, disabled]) =>
      window.axe.run(document, {
        runOnly: { type: "tag", values: tags },
        rules: Object.fromEntries(disabled.map((id) => [id, { enabled: false }])),
      }),
    [TAGS, options.disableRules ?? []],
  );
  return violations;
}

function report(label, violations) {
  if (violations.length === 0) {
    console.log(`✓ ${label}`);
    return 0;
  }
  console.log(`✗ ${label} — ${violations.length} violation(s)`);
  for (const v of violations) {
    console.log(`    [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
    for (const n of v.nodes.slice(0, 5)) console.log(`        ${n.target.join(" ")}`);
    console.log(`        ${v.helpUrl}`);
  }
  return violations.length;
}

/**
 * Opened menus, dialogs and drawers — the states the static pass never sees,
 * and where most of the keyboard and focus behaviour actually lives.
 */
const STATES = [
  {
    label: "docs search dialog (open, with results)",
    path: "/docs/installation",
    async setup(page) {
      await page.click("[data-search-open]");
      await page.fill("[data-search-input]", "install");
      await page.waitForFunction(() => document.querySelectorAll(".docs-search-hit").length > 0);
    },
  },
  {
    label: "download menu (open)",
    path: "/",
    async setup(page) {
      await page.click('nav button[aria-haspopup="menu"]');
      await page.waitForSelector('[role="menu"]');
    },
    // The menu is portalled to <body> so no `backdrop-filter` ancestor clips
    // it, which necessarily puts it outside every landmark. `region` is a
    // best-practice rule, not a WCAG one, and the alternative (a landmark
    // wrapping a transient dropdown) is worse for the reader.
    disableRules: ["region"],
  },
  {
    label: "docs image lightbox (open)",
    path: "/docs/installation",
    async setup(page) {
      // `:visible` matters: the first content image may sit inside a
      // :::mobile block, which the desktop platform filter hides.
      await page.locator(".doc-zoom-btn:visible").first().click();
      await page.waitForFunction(() => document.querySelector("[data-doc-lightbox]")?.open);
    },
  },
  {
    label: "mobile nav menu (open)",
    path: "/",
    viewport: { width: 390, height: 800 },
    async setup(page) {
      await page.click("[data-nav-toggle]");
      await page.waitForTimeout(400);
    },
  },
  {
    label: "docs sidebar drawer (open)",
    path: "/docs/installation",
    viewport: { width: 390, height: 800 },
    async setup(page) {
      await page.click("[data-sidebar-toggle]");
      await page.waitForTimeout(400);
    },
  },
];

const server = await serve();
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
let total = 0;
let checks = 0;

async function open(viewport, path) {
  const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
  const res = await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: "networkidle" });
  if (!res || res.status() !== 200) {
    await page.close();
    return { page: null, status: res?.status() };
  }
  return { page, status: 200 };
}

for (const viewport of VIEWPORTS) {
  for (const path of PAGES) {
    const label = `${path} @${viewport.name}`;
    checks++;
    const { page, status } = await open(viewport, path);
    if (!page) {
      console.log(`✗ ${label} — HTTP ${status}`);
      total++;
      continue;
    }

    await settleReveals(page);
    const hidden = await invisibleText(page);
    if (hidden.length) {
      // Not a violation in itself — it means axe was about to skip this
      // content, so a clean result here would be meaningless.
      console.log(`✗ ${label} — ${hidden.length} element(s) still invisible; axe would skip them`);
      for (const h of hidden.slice(0, 5)) console.log(`        ${h}`);
      total++;
      await page.close();
      continue;
    }

    total += report(label, await runAxe(page));
    await page.close();
  }
}

for (const state of STATES) {
  const viewport = state.viewport ?? VIEWPORTS[0];
  const label = `${state.path} — ${state.label}`;
  checks++;
  const { page, status } = await open(viewport, state.path);
  if (!page) {
    console.log(`✗ ${label} — HTTP ${status}`);
    total++;
    continue;
  }
  await settleReveals(page);
  try {
    await state.setup(page);
  } catch (err) {
    // A state that can no longer be reached is itself the finding — report it
    // rather than letting the timeout take the whole run down.
    console.log(`✗ ${label} — could not reach this state: ${err.message.split("\n")[0]}`);
    total++;
    await page.close();
    continue;
  }
  total += report(label, await runAxe(page, { disableRules: state.disableRules }));
  await page.close();
}

await browser.close();
server.close();

console.log(
  total === 0
    ? `\nNo accessibility violations across ${checks} checks.`
    : `\n${total} violation(s) across ${checks} checks.`,
);
process.exit(total === 0 ? 0 : 1);
