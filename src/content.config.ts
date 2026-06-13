import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Docs collection. Entries live at `src/content/docs/{en,pt}/<slug>.md` so the
 * entry id is `en/installation`, `pt/talkgroups`, etc. Bodies render through
 * Astro's native markdown pipeline; the remark/rehype plugins in
 * `astro.config.mjs` (remark-directive + `remark-platform`, rehype-slug +
 * autolink-headings) handle the `:::desktop` / `:::mobile` platform directives,
 * the `::platforms[…]` changelog badges, and heading anchors.
 *
 * Titles are intentionally optional: the sidebar/page titles come from the
 * localized i18n keys via `docsConfig`, so they don't need to be duplicated
 * (and re-localized) in frontmatter.
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { docs };
