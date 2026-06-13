import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { VFile } from "vfile";

/** Localized labels for the changelog platform badges. */
const BADGE_LABELS: Record<"en" | "pt", Record<"desktop" | "mobile", string>> = {
  en: { desktop: "Desktop", mobile: "Mobile" },
  pt: { desktop: "Desktop", mobile: "Telemóvel" },
};

function langFromPath(path: string | undefined): "en" | "pt" {
  return path && /(^|\/)pt\//.test(path) ? "pt" : "en";
}

/**
 * Idiomatic replacement for the old marked + node-html-parser platform pipeline.
 * Runs inside Astro's native markdown pipeline (with remark-directive) and handles:
 *
 *   :::desktop / :::mobile / :::android   container directives
 *     → <div data-platform="desktop|mobile"> … </div>
 *       (android is an alias for mobile). The docs platform toggle hides the
 *       non-active platform via the data-platform-filter CSS rule in docs.css.
 *
 *   ::platforms[desktop mobile]           leaf directive (changelog release badges)
 *     → <p class="ver-badges"><span class="ver-badge ver-badge--desktop">…</span> …</p>
 *       Labels are localized from the file's locale (en/pt).
 *
 * Replaces the brittle "name a heading exactly Desktop/Android" convention with
 * explicit, authored directives, and keeps everything in Astro's renderer.
 */
export function remarkPlatform() {
  return (tree: Root, file: VFile) => {
    const lang = langFromPath(file.path);

    visit(tree, (node: any) => {
      if (node.type === "containerDirective") {
        const name = node.name as string;
        if (name === "desktop" || name === "mobile" || name === "android") {
          const platform = name === "android" ? "mobile" : name;
          node.data = node.data || {};
          node.data.hName = "div";
          node.data.hProperties = { "data-platform": platform };
        }
        return;
      }

      if (node.type === "leafDirective" && node.name === "platforms") {
        const label: string = (node.children ?? [])
          .map((c: any) => c.value ?? "")
          .join("")
          .trim();
        const names = label.split(/\s+/).filter((n): n is "desktop" | "mobile" =>
          n === "desktop" || n === "mobile",
        );
        const spans = names
          .map(
            (n) =>
              `<span class="ver-badge ver-badge--${n}">${BADGE_LABELS[lang][n]}</span>`,
          )
          .join("");
        // Replace the directive with a raw HTML paragraph (Astro markdown allows
        // raw HTML), matching the old badge markup the docs.css styles target.
        node.type = "html";
        node.value = spans ? `<p class="ver-badges">${spans}</p>` : "";
        delete node.children;
        delete node.name;
        delete node.attributes;
        delete node.data;
      }
    });
  };
}

export default remarkPlatform;
