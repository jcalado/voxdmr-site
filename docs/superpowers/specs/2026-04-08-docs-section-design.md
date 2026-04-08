# VoxLink Documentation Section — Design Spec

## Overview

Add a documentation section to the VoxLink site — a user guide for the Android app with fixed sidebar navigation, markdown-authored content, and the existing dark design system.

## Pages

8 markdown pages in 3 groups:

**Getting Started**
- Installation — download, requirements, sideloading
- First Connection — adding a server, connecting, first transmission

**Using VoxLink**
- PTT Modes — Latch, Hold, VOX configuration, timeout timer
- Audio Settings — Opus codec, gain, output routing, level metering
- Server Profiles — multiple servers, quick switching, JSON import/export
- Talkgroups & Nodes — selecting talkgroups, connected nodes list, active talker display

**Reference**
- Background Operation — foreground service, wake/WiFi locks, battery optimization
- Troubleshooting — common connection issues, audio problems, FAQ

## Architecture

### Routing

Add `react-router-dom` to the project. Routes:

- `/` — existing landing page (App.tsx, unchanged)
- `/docs` — redirects to `/docs/installation`
- `/docs/:slug` — renders a doc page with sidebar layout

### File structure

```
src/
  main.tsx          — add BrowserRouter, route / to App, /docs/* to DocsLayout
  App.tsx           — unchanged (landing page)
  docs/
    DocsLayout.tsx  — sidebar + content shell, reads slug from URL
    DocsSidebar.tsx — fixed sidebar with grouped nav links
    DocsContent.tsx — renders parsed markdown with prose styles
    DocsNav.tsx     — top bar with logo breadcrumb and back link
    docs.css        — prose typography styles for rendered markdown
    config.ts       — sidebar structure, page metadata, slug-to-title map
docs/
  installation.md
  first-connection.md
  ptt-modes.md
  audio-settings.md
  server-profiles.md
  talkgroups-nodes.md
  background-operation.md
  troubleshooting.md
```

### Markdown rendering

- Use `marked` library to parse .md files to HTML
- Import all markdown files eagerly using `import.meta.glob('/docs/*.md', { eager: true, query: '?raw', import: 'default' })` — returns a `Record<string, string>` keyed by file path
- In DocsLayout, derive the slug from the URL param, look up `/docs/${slug}.md` in the glob result, parse with `marked`, and pass HTML to DocsContent
- Render HTML output inside DocsContent with `dangerouslySetInnerHTML`
- Style with a scoped `.prose` CSS class for headings, paragraphs, lists, code blocks, tables, blockquotes
- If slug doesn't match any file, show a simple 404 message with a link back to /docs

### Config structure

```ts
// src/docs/config.ts
interface DocPage {
  slug: string;
  title: string;
}

interface DocGroup {
  label: string;
  pages: DocPage[];
}

const docsConfig: DocGroup[] = [
  {
    label: "Getting Started",
    pages: [
      { slug: "installation", title: "Installation" },
      { slug: "first-connection", title: "First Connection" },
    ],
  },
  {
    label: "Using VoxLink",
    pages: [
      { slug: "ptt-modes", title: "PTT Modes" },
      { slug: "audio-settings", title: "Audio Settings" },
      { slug: "server-profiles", title: "Server Profiles" },
      { slug: "talkgroups-nodes", title: "Talkgroups & Nodes" },
    ],
  },
  {
    label: "Reference",
    pages: [
      { slug: "background-operation", title: "Background Operation" },
      { slug: "troubleshooting", title: "Troubleshooting" },
    ],
  },
];
```

## Visual Design

### Docs top bar (DocsNav)
- Height: 56px
- Background: `surface` (#0F172A)
- Bottom border: `border`
- Left: Logo component (sm size) + "VoxLink" in headline font + "/ Docs" in muted text
- Right: "← Back to site" link in muted text, links to `/`

### Sidebar (DocsSidebar)
- Width: 240px, fixed/sticky on desktop
- Background: `surface` (#0F172A)
- Right border: `border`
- Group labels: uppercase, tracking-widest, `vibrant-orange`, font-bold, text-xs
- Page links: text-sm, `on-surface-muted` default
- Active page: `vibrant-blue` background, `community-bg` text color, rounded-lg padding
- Hover on inactive: `surface-raised/40` background
- Mobile: hidden by default, opened via hamburger button in DocsNav, slides in as overlay/drawer

### Content area (DocsContent)
- Background: `community-bg`
- Padding: 40px 48px desktop, 24px 20px mobile
- Max content width: 680px
- h1: white, Poppins, text-2xl/text-3xl, font-bold
- h2: white, text-lg, font-semibold, margin-top-8
- Body text: `on-surface-muted`, text-sm, leading-relaxed
- Code inline: `vibrant-blue`, Space Mono, bg-surface rounded px-1.5 py-0.5
- Code blocks: bg-surface, border border-border, rounded-xl, padding-4, Space Mono, text-vibrant-blue
- Tip/note callouts: bg-surface-raised, rounded-xl, left border 3px vibrant-orange, orange "TIP" label
- Lists: on-surface-muted, standard disc/number styling
- Links: vibrant-blue, underline on hover

### Prev/Next navigation
- Bottom of content area, separated by top border
- Previous on left (if exists), Next on right
- Small uppercase label ("Previous" / "Next") in muted text
- Page title in vibrant-blue, font-semibold

## Dependencies to add

- `react-router-dom` — client-side routing
- `marked` — markdown to HTML parser

## Landing page changes

- Nav "Docs" link: change `href="/docs"` to use React Router `<Link>` (or keep as `<a>` since it's a full route change)
- Footer "Help Center" link: point to `/docs`

## Out of scope

- Search functionality
- Syntax highlighting beyond basic code block styling
- SSR / static generation
- Table of contents within a page (can add later)
- Versioned docs
