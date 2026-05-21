export type Platform = "desktop" | "mobile";

function classifyHeading(text: string): Platform | null {
  const t = text.trim().toLowerCase();
  if (t === "desktop") return "desktop";
  if (t === "android" || t === "mobile") return "mobile";
  if (/\(desktop\)$/i.test(t)) return "desktop";
  if (/\((android|mobile)\)$/i.test(t)) return "mobile";
  return null;
}

/**
 * Walks the marked HTML and tags each element with `data-platform` based on
 * the closest enclosing platform-specific heading. Used together with the CSS
 * rule `[data-platform-filter="X"] [data-platform]:not([data-platform="X"]) { display: none }`
 * to hide non-matching sections.
 */
export function tagPlatformSections(html: string): string {
  if (typeof window === "undefined" || !html) return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const children = Array.from(doc.body.children);

  const stack: { level: number; platform: Platform }[] = [];

  for (const node of children) {
    const match = /^H([1-6])$/.exec(node.tagName);
    if (match) {
      const level = parseInt(match[1], 10);
      const platform = classifyHeading(node.textContent ?? "");
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }
      if (platform) {
        stack.push({ level, platform });
      }
    }
    const current = stack.length > 0 ? stack[stack.length - 1].platform : null;
    if (current) {
      node.setAttribute("data-platform", current);
    }

    // Per-image override: `![alt (desktop)](...)` or `![alt (mobile)](...)`
    // tags the containing element with that platform, overriding any
    // heading-based inheritance. Lets a page show different screenshots
    // per platform without splitting into separate sections.
    const img = node.tagName === "IMG"
      ? (node as HTMLImageElement)
      : node.querySelector?.("img");
    if (img) {
      const fromAlt = classifyHeading(img.getAttribute("alt") ?? "");
      if (fromAlt) {
        node.setAttribute("data-platform", fromAlt);
      }
    }
  }

  return doc.body.innerHTML;
}

const STORAGE_KEY = "voxdmr-docs-platform";

export function detectDefaultPlatform(): Platform {
  if (typeof window === "undefined") return "desktop";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "desktop" || stored === "mobile") return stored;
  const ua = window.navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? "mobile" : "desktop";
}

export function storePlatform(platform: Platform) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, platform);
}
