# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VoxDMR is a landing and documentation site for VoxDMR — a cross-platform app that streams audio to DMR talkgroups (BrandMeister and other DMR networks) via the Rewind protocol. Available as a Rust desktop app for Linux and Windows (GitHub Releases) and as an Android app on Google Play. Built with **Astro** (static output, SSG) using React **islands** for interactivity, Tailwind CSS v4, and Framer Motion (via `motion/react`).

## Commands

- `npm run dev` — Start the Astro dev server on port 3000
- `npm run build` — Static production build to `dist/`
- `npm run preview` — Serve the built `dist/` locally
- `npm run lint` — `astro check` + `tsc --noEmit` (no ESLint)
- `npm run clean` — Remove `dist/`

## Architecture

Static site built with Astro. Content is server-rendered to HTML at build time; only the genuinely interactive pieces hydrate as React islands. Deployed to GitHub Pages at the custom domain (`public/CNAME` → voxdmr.jcalado.com).

**Routing & i18n.** File-based routing under `src/pages/`. i18n is **route-based**: English at the root (`/`, `/radios`, `/docs/<slug>`) and Portuguese under `/pt/…`, configured via Astro's `i18n` in `astro.config.mjs` (`defaultLocale: 'en'`, `prefixDefaultLocale: false`). Each page resolves its `lang` from the route and passes it as a prop; the language switcher is a link to the counterpart-locale URL (no client-side language toggle).

- `astro.config.mjs` — Astro config: static output, i18n, the markdown pipeline (remark/rehype plugins), `@astrojs/react` + `@astrojs/sitemap`, Tailwind via `@tailwindcss/vite`, and the `@` → project-root alias.
- `src/layouts/Layout.astro` — shared `<html>`/`<head>` (meta, OG, favicon), imports global `src/index.css`.
- `src/pages/` — one `.astro` per route, with a `pt/` mirror per locale. `index` (landing), `privacy`, `radios`, `docs/[...slug]` (+ `docs/index` redirect to installation).
- `src/components/` — static `.astro` building blocks (zero JS): `SiteNav.astro`, `CtaBar.astro`, `Footer.astro`, `Logo.astro`, `LanguageSwitcher.astro`, `ScrollReveal.astro`, inline-SVG `icons/`, the landing sections (`landing/HeroSection|Features|UseCases|CtaSection.astro`, `LandingBody.astro`), and the radios banners (`radios/`). `components/docs/` holds the docs React pieces (`DocsShell`, `DocsContent`, `PlatformSwitcher`, `PlatformContext`). Note `Logo`/`LanguageSwitcher` exist as both `.astro` (used by `.astro` pages) and `.tsx` (imported by the docs React island tree).
- `src/islands/` — the only hydrated React: `RadiosGrid` (filter/sort), `ScreenshotGallery` (+ lightbox), `FaqAccordion`, `HeroShot`, and `platformStore.ts` (module-level store syncing the landing's platform toggle across its two islands).
- `src/i18n/` — `en.json`, `pt.json` (flat key→string), `t.ts` (`t(key, lang)` / `getT(lang)`, usable in `.astro` and islands), `routing.ts` (`localeFromUrl`, `altLocalePath`, `localizePath`).
- `src/content/docs/` + `src/content.config.ts` — docs content collection; Markdown at `src/content/docs/{en,pt}/<slug>.md`, rendered via Astro's native pipeline (`render(entry)` → `<Content />`).
- `src/lib/` — `remark-platform.ts` (platform directives, below), `platform.ts` (client platform detect/store), `docs-config.ts` + `docs-i18n.ts` (sidebar/nav + localized titles), `scroll-reveal.ts`.
- `src/docs/docs.css` — docs styles, incl. the `data-platform-filter` show/hide rule and changelog badge styles.
- `src/index.css` — Tailwind v4 `@theme` design tokens + custom utilities (`.soft-shadow`, `.btn-press`, reduced-motion rules).

## Docs authoring: platform-specific content

Platform-specific docs content is marked with **explicit container directives**, rendered through Astro's native markdown pipeline. `astro.config.mjs` wires up `remark-directive` followed by `remarkPlatform` (`src/lib/remark-platform.ts`); the plugin turns the directives into HTML at build time. The docs root carries `data-platform-filter="<active>"` (set on `DocsShell`), and a single CSS rule in `src/docs/docs.css` hides the non-matching elements:

```css
[data-platform-filter="desktop"] [data-platform="mobile"],
[data-platform-filter="mobile"] [data-platform="desktop"] { display: none; }
```

The toggle (`PlatformSwitcher`) persists the user's choice to `localStorage`; the default on first visit comes from UA sniffing (mobile UA → mobile, else desktop).

Markdown doc pages live in `src/content/docs/` (English in `en/`, Portuguese in `pt/`). The conventions are:

1. **Container directives** — wrap platform-only content in a `:::desktop` or `:::mobile` block. `remarkPlatform` renders each as `<div data-platform="desktop|mobile">`, which the CSS rule above shows/hides.

   ```markdown
   :::desktop

   …desktop-only content…

   :::

   :::mobile

   …mobile/android-only content…

   :::
   ```

   - `:::android` is accepted as an alias for `:::mobile` (both map to `data-platform="mobile"`), but prefer `:::mobile` in new content.
   - Put the opening `:::name` on its own line with a blank line after it, and the closing `:::` on its own line with a blank line before it.
   - Directives can wrap any content — paragraphs, headings, lists, code fences, tables. Nesting an outer always-visible `## …` heading over per-platform `:::desktop` / `:::mobile` blocks is fine; the heading stays shared.

2. **Default = always visible** — anything not inside a directive shows in both modes. Use this for intro paragraphs, "Next steps" / "Próximos passos" sections, protocol-agnostic content, etc.

3. **Changelog release badges** — use the `::platforms[…]` leaf directive to render the per-release availability badges, e.g. `::platforms[desktop mobile]` or `::platforms[desktop]`. `remarkPlatform` expands it to `<p class="ver-badges">…</p>` with localized labels (Desktop / Mobile in `en`, Desktop / Telemóvel in `pt`), styled by `docs.css`.

When editing existing docs, keep the `en` and `pt` files in structural parity (same directive placement).

### Removed / unsupported

The old mechanism is gone — do not reintroduce it:
- **Heading-name magic** — naming a heading exactly `Desktop` / `Android` / `Mobile`, or suffixing one with `(desktop)` / `(android)` / `(mobile)`, no longer scopes anything. Such headings now render as plain, always-visible headings. Use container directives instead.
- **Per-image alt-text override** — alt text ending in `(desktop)` / `(mobile)` / `(android)` is **no longer supported**. To show different screenshots per platform, place each `![…](…)` inside its own `:::desktop` / `:::mobile` block.
- **Removed files** — `src/lib/markdown.ts` (the old `marked` pipeline) and `src/lib/platform-tagger.ts` (the `node-html-parser` `tagPlatformSections`) have been deleted. Platform tagging now happens entirely in `src/lib/remark-platform.ts`. (`src/lib/platform.ts` is the surviving client-only platform detect/store helper.)

## Styling

Uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin (not PostCSS). Custom theme tokens are defined in `src/index.css` via `@theme {}`:

- Fonts: `font-sans` (Inter), `font-headline` (Poppins)
- Key colors: `vibrant-red` (#EF4444, primary accent), `vibrant-orange` (#FB923C, secondary), `vibrant-blue` (#38BDF8, tertiary), `community-bg` (#020617), `background` (#0F172A), `surface-raised` (#1E293B)
- Custom utility: `.soft-shadow`

## Dependencies of Note

- `astro` — Framework. `@astrojs/react` enables React islands; `@astrojs/sitemap` emits `sitemap-index.xml`.
- `motion/react` — Animation library (Framer Motion). Import as `motion` from `"motion/react"`. Used inside islands.
- `lucide-react` — Icon library (islands). Static `.astro` components use inline SVG in `src/components/icons/` instead.
- `remark-directive` — Adds container (`:::name`) and leaf (`::name[…]`) directive syntax to Astro's markdown pipeline; consumed by `src/lib/remark-platform.ts`. Paired with `rehype-slug` + `rehype-autolink-headings` for heading anchors.
- `marked` — vestigial: still in `package.json` but no longer imported (the old client-side markdown pipeline was removed). Safe to drop.

## Design Context

### Product

VoxDMR connects to DMR talkgroups (BrandMeister and other DMR networks) via the Rewind protocol. The AMBE+2 vocoder is powered by the MD-380 firmware, downloaded at runtime on first launch (SHA-256 verified). Available on:

- **Desktop** — Rust app for Linux and Windows. Published as binaries on GitHub Releases.
- **Android** — Native app on Google Play (`com.jcalado.voxdmr`).

### Users

Ham radio operators with DMR IDs who want to get on BrandMeister or other DMR networks from their phone or computer without buying a DMR radio. Technically literate; familiar with DMR, BrandMeister, and hotspot concepts.

### Brand Personality

Practical and technical, but with a modern polished feel. Not corporate SaaS. Think a well-designed open-source tool — clean, dark, no fluff.

### Aesthetic Direction

- **Theme**: Dark mode only. Deep slate/navy backgrounds with vibrant accent pops.
- **Colors**: Red (#EF4444) as the primary accent, orange (#FB923C) as the secondary energy color, sky blue (#38BDF8) as a tertiary accent.
- **Typography**: Poppins for bold headlines, Inter for body. Heavy use of uppercase tracking on labels and badges.
- **Shape language**: Very rounded corners (2.5rem–4rem on cards/sections), pill buttons, soft shadows.
- **Motion**: Gentle, smooth animations — entrance fades, floating elements, hover lifts. Never jarring.

### Design Principles

1. **Dark and vibrant** — Deep backgrounds make accent colors pop. Use red and orange intentionally for hierarchy.
2. **Accessible by default** — WCAG AA minimum. Ensure sufficient contrast on slate backgrounds.
3. **Motion with purpose** — Animations guide attention and add personality, never distract.
4. **Screenshots** — desktop and Android screenshots live in `public/screenshots/` (`.webp` + `.png`). The hero shows a platform-appropriate app screenshot, and `/` + `/radios` have a screenshot gallery with a lightbox.
