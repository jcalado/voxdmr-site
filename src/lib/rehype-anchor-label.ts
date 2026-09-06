import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import type { VFile } from "vfile";

/** Same convention as remark-platform: the locale comes from the file path. */
function langFromPath(path: string | undefined): "en" | "pt" {
  return path && /(^|\/)pt\//.test(path) ? "pt" : "en";
}

const LABELS = {
  en: "Permalink to this section",
  pt: "Ligação permanente para esta secção",
} as const;

/**
 * Localizes the heading permalink label that rehype-autolink-headings attaches.
 * Its `properties` are static config, so the English string was being announced
 * on the Portuguese docs too. Runs after the autolink plugin and rewrites the
 * label per the file's locale.
 */
export function rehypeAnchorLabel() {
  return (tree: Root, file: VFile) => {
    const label = LABELS[langFromPath(file.path)];
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "a" &&
        Array.isArray(node.properties?.className) &&
        node.properties.className.includes("heading-anchor")
      ) {
        node.properties["aria-label"] = label;
      }
    });
  };
}
