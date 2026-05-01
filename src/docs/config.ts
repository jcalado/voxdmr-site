export interface DocPage {
  slug: string;
  title: string;
}

export interface DocGroup {
  label: string;
  pages: DocPage[];
}

export const docsConfig: DocGroup[] = [
  {
    label: "Getting Started",
    pages: [
      { slug: "installation", title: "Installation" },
      { slug: "first-connection", title: "First Connection" },
    ],
  },
  {
    label: "Using VoxDMR",
    pages: [
      { slug: "ptt-modes", title: "PTT Modes" },
      { slug: "audio-settings", title: "Audio Settings" },
      { slug: "talkgroups-nodes", title: "Talkgroups & Nodes" },
    ],
  },
  {
    label: "Reference",
    pages: [
      { slug: "troubleshooting", title: "Troubleshooting" },
      { slug: "changelog", title: "Changelog" },
    ],
  },
];

const allPages = docsConfig.flatMap((g) => g.pages);

export function getPageBySlug(slug: string): DocPage | undefined {
  return allPages.find((p) => p.slug === slug);
}

export function getAdjacentPages(slug: string): { prev?: DocPage; next?: DocPage } {
  const idx = allPages.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? allPages[idx - 1] : undefined,
    next: idx < allPages.length - 1 ? allPages[idx + 1] : undefined,
  };
}
