/**
 * Splits the rendered changelog HTML into per-release chunks so the changelog
 * page can present them as a version rail plus collapsible cards rather than
 * one long scroll.
 *
 * The parse happens at build time (plain string work, no DOM) so every release
 * body still ships in the static HTML — the island only takes over the folding.
 * The document shape it relies on is the one the page is authored in: an `h1`
 * and a lead paragraph, then one `h2` per release, each optionally opening with
 * the `::platforms[…]` badges that `remarkPlatform` turns into `p.ver-badges`.
 */

export interface ChangelogRelease {
  /** Version heading text, e.g. `v0.15.0`. */
  version: string;
  /** `id` the rehype-slug plugin put on the heading, for deep links. */
  id: string;
  /** The `p.ver-badges` markup, lifted out of the body into the card header. */
  badgesHtml: string;
  /** Everything else under the heading. */
  bodyHtml: string;
  /** Bullet count — the "12 changes" hint on a collapsed card. */
  entryCount: number;
}

export interface ParsedChangelog {
  /** Page heading and lead paragraph, kept above the rail. */
  introHtml: string;
  releases: ChangelogRelease[];
}

const H2 = /<h2\b([^>]*)>([\s\S]*?)<\/h2>/g;
const BADGES = /<p class="ver-badges">[\s\S]*?<\/p>/;

function attr(attrs: string, name: string): string {
  return new RegExp(`${name}="([^"]*)"`).exec(attrs)?.[1] ?? "";
}

/** Heading text with the autolink anchor and any other markup stripped. */
function headingText(inner: string): string {
  return inner
    .replace(/<a class="heading-anchor"[\s\S]*?<\/a>/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function parseChangelog(html: string): ParsedChangelog {
  const heads = [...html.matchAll(H2)];
  if (heads.length === 0) return { introHtml: html, releases: [] };

  const introHtml = html.slice(0, heads[0].index);
  const releases = heads.map((head, i) => {
    const from = head.index! + head[0].length;
    const to = i + 1 < heads.length ? heads[i + 1].index! : html.length;
    const section = html.slice(from, to);
    const badgesHtml = BADGES.exec(section)?.[0] ?? "";
    const bodyHtml = badgesHtml ? section.replace(badgesHtml, "") : section;
    const version = headingText(head[2]);
    return {
      version,
      id: attr(head[1], "id") || `release-${version.replace(/[^\w.]+/g, "-")}`,
      badgesHtml,
      bodyHtml,
      entryCount: (bodyHtml.match(/<li>/g) ?? []).length,
    };
  });

  return { introHtml, releases };
}
