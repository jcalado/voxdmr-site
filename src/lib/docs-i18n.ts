import { docsConfig, getAdjacentPages } from "./docs-config";
import { t, type Lang } from "@/src/i18n/t";

/** A sidebar group with already-localized labels (resolved by the route). */
export interface SidebarGroup {
  label: string;
  pages: { slug: string; title: string }[];
}

/** A prev/next link with a localized title. */
export interface AdjacentPage {
  slug: string;
  title: string;
}

/** Group label → i18n key (mirrors the original DocsSidebar map). */
const groupLabelKeys: Record<string, string> = {
  "Getting Started": "docs.group.gettingStarted",
  "Using VoxDMR": "docs.group.usingVoxlink",
  Reference: "docs.group.reference",
};

/** Page slug → i18n key (mirrors the original DocsSidebar/DocsContent maps). */
const pageTitleKeys: Record<string, string> = {
  installation: "docs.page.installation",
  "first-connection": "docs.page.firstConnection",
  "ptt-modes": "docs.page.pttModes",
  "audio-settings": "docs.page.audioSettings",
  "server-profiles": "docs.page.serverProfiles",
  "auto-reconnect": "docs.page.autoReconnect",
  talkgroups: "docs.page.talkgroups",
  troubleshooting: "docs.page.troubleshooting",
  changelog: "docs.page.changelog",
};

/** Localized page title for a slug, falling back to the config title. */
export function pageTitle(slug: string, title: string, lang: Lang): string {
  const key = pageTitleKeys[slug];
  return key ? t(key, lang) : title;
}

/** Sidebar groups with localized labels and page titles for the given locale. */
export function localizedSidebarGroups(lang: Lang): SidebarGroup[] {
  return docsConfig.map((group) => ({
    label: groupLabelKeys[group.label] ? t(groupLabelKeys[group.label], lang) : group.label,
    pages: group.pages.map((p) => ({ slug: p.slug, title: pageTitle(p.slug, p.title, lang) })),
  }));
}

/** Prev/next links for a slug, with localized titles. */
export function localizedAdjacent(
  slug: string,
  lang: Lang,
): { prev?: AdjacentPage; next?: AdjacentPage } {
  const { prev, next } = getAdjacentPages(slug);
  return {
    prev: prev ? { slug: prev.slug, title: pageTitle(prev.slug, prev.title, lang) } : undefined,
    next: next ? { slug: next.slug, title: pageTitle(next.slug, next.title, lang) } : undefined,
  };
}
