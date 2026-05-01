# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VoxDMR is a landing and documentation site for [VoxDMR](https://github.com/jcalado/dmr-input) — a desktop Rust app that streams audio to BrandMeister DMR talkgroups via the Rewind protocol. Built with React 19, Vite, Tailwind CSS v4, and Framer Motion (via `motion/react`).

## Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Production build to `dist/`
- `npm run lint` — Type-check via `tsc --noEmit` (no ESLint)
- `npm run clean` — Remove `dist/`

## Architecture

Single-page app. The landing page lives in `src/App.tsx` as one component.

- `src/main.tsx` — React entry point; sets up React Router
- `src/App.tsx` — Full landing page (nav, hero, features, CTA, footer)
- `src/PrivacyPage.tsx` — Privacy policy page
- `src/Logo.tsx` — Logo component (renders `/logo.png` with size variants)
- `src/index.css` — Tailwind v4 config using `@theme` directive for custom design tokens
- `src/i18n/` — i18n machinery: `en.json`, `pt.json`, `LanguageContext.tsx`, `LanguageSwitcher.tsx`
- `src/docs/` — Docs section: `DocsLayout.tsx`, `DocsNav.tsx`, `DocsSidebar.tsx`, `DocsContent.tsx`, `config.ts`, `docs.css`
- `docs/` — Markdown doc pages (English at root, Portuguese in `docs/pt/`)
- `vite.config.ts` — Vite config with `@` path alias mapped to project root

## Styling

Uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin (not PostCSS). Custom theme tokens are defined in `src/index.css` via `@theme {}`:

- Fonts: `font-sans` (Inter), `font-headline` (Poppins)
- Key colors: `vibrant-blue` (#38BDF8), `vibrant-orange` (#FB923C), `community-bg` (#020617), `background` (#0F172A)
- Custom utility: `.soft-shadow`

## Dependencies of Note

- `motion/react` — Animation library (Framer Motion). Import as `motion` from `"motion/react"`.
- `lucide-react` — Icon library
- `express` — Listed but not currently used; placeholder for a future server file
- `marked` — Used in `DocsContent.tsx` to render Markdown docs

## Design Context

### Product

VoxDMR is a Rust desktop app (Linux + Windows) that connects to BrandMeister DMR talkgroups via the Rewind protocol. The AMBE+2 vocoder is powered by the MD-380 firmware, downloaded at runtime on first launch (SHA-256 verified). Releases are published as binaries on GitHub.

### Users

Ham radio operators with DMR IDs who want to use BrandMeister from their desktop without buying a DMR radio. Technically literate; familiar with DMR, BrandMeister, and hotspot concepts.

### Brand Personality

Practical and technical, but with a modern polished feel. Not corporate SaaS. Think a well-designed open-source tool — clean, dark, no fluff.

### Aesthetic Direction

- **Theme**: Dark mode only. Deep slate/navy backgrounds with vibrant accent pops.
- **Colors**: Sky blue (#38BDF8) as primary, orange (#FB923C) as secondary energy color, indigo as tertiary.
- **Typography**: Poppins for bold headlines, Inter for body. Heavy use of uppercase tracking on labels and badges.
- **Shape language**: Very rounded corners (2.5rem–4rem on cards/sections), pill buttons, soft shadows.
- **Motion**: Gentle, smooth animations — entrance fades, floating elements, hover lifts. Never jarring.

### Design Principles

1. **Dark and vibrant** — Deep backgrounds make accent colors pop. Use blue and orange intentionally for hierarchy.
2. **Accessible by default** — WCAG AA minimum. Ensure sufficient contrast on slate backgrounds.
3. **Motion with purpose** — Animations guide attention and add personality, never distract.
4. **No screenshots yet** — VoxDMR doesn't have desktop screenshots ready. The hero uses the logo with a glow effect instead.
