# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VoxLink is a single-page marketing/landing site for a radio reflector community app. Built with React 19, Vite, Tailwind CSS v4, and Framer Motion (via `motion/react`). Originally scaffolded from Google AI Studio.

## Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Production build to `dist/`
- `npm run lint` — Type-check via `tsc --noEmit` (no ESLint)
- `npm run clean` — Remove `dist/`

## Architecture

This is a simple single-page app. The entire UI lives in `src/App.tsx` as one component — there are no routes, no state management, and no API calls in the frontend.

- `src/main.tsx` — React entry point
- `src/App.tsx` — Full landing page (nav, hero, features, CTA, footer)
- `src/index.css` — Tailwind v4 config using `@theme` directive for custom design tokens
- `vite.config.ts` — Vite config with `@` path alias mapped to project root, injects `GEMINI_API_KEY` env var

## Styling

Uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin (not PostCSS). Custom theme tokens are defined in `src/index.css` via `@theme {}`:

- Fonts: `font-sans` (Inter), `font-headline` (Poppins)
- Key colors: `vibrant-blue` (#38BDF8), `vibrant-orange` (#FB923C), `community-bg` (#020617), `background` (#0F172A)
- Custom utility: `.soft-shadow`

## Dependencies of Note

- `motion/react` — Animation library (Framer Motion). Import as `motion` from `"motion/react"`.
- `lucide-react` — Icon library
- `@google/genai` — Listed but not currently used in frontend code
- `express` — Listed but no server file exists yet

## Environment

Requires `GEMINI_API_KEY` in `.env.local` (used via Vite's `loadEnv`).

## Design Context

### Users
Ham radio hobbyists — experienced amateur radio operators looking for a modern, app-based way to access radio reflectors and connect with the global community. They're familiar with the technical side of radio but want a polished, contemporary experience instead of dated desktop software.

### Brand Personality
Friendly, playful, modern. Think Discord or Zello but for ham radio — a social voice-chat platform with dark UI and strong community focus. The tone is welcoming and fun without being childish.

### Aesthetic Direction
- **Theme**: Dark mode only. Deep slate/navy backgrounds with vibrant accent pops.
- **Colors**: Sky blue (#38BDF8) as primary, orange (#FB923C) as secondary energy color, indigo as tertiary. These map to the app's own UI colors.
- **Typography**: Poppins for bold headlines, Inter for body. Heavy use of uppercase tracking on labels and badges.
- **Shape language**: Very rounded corners (2.5rem–4rem on cards/sections), pill buttons, soft shadows. Approachable and modern, not sharp or corporate.
- **Motion**: Gentle, smooth animations — entrance fades, floating elements, hover lifts. Never jarring.
- **References**: Discord, Zello. Dark social platforms with community warmth.
- **Anti-references**: Corporate SaaS landing pages, overly technical ham radio sites, anything sterile or formal.

### Design Principles
1. **Warmth over precision** — Rounded shapes, soft shadows, and friendly copy. The site should feel like a community hangout, not a product pitch.
2. **Dark and vibrant** — Deep backgrounds make accent colors pop. Use blue and orange intentionally for hierarchy, not decoration.
3. **Accessible by default** — WCAG AA minimum. Ensure sufficient contrast on slate backgrounds, especially for body text and interactive elements.
4. **Motion with purpose** — Animations should guide attention and add personality, never distract or delay interaction.
5. **Show the app** — The real app screenshot is the hero. Let the product speak for itself rather than abstract illustrations.
