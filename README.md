# VoxDMR Site

Landing page and documentation site for [VoxDMR](https://voxdmr.jcalado.com) — a desktop app for streaming audio to BrandMeister DMR talkgroups via the Rewind protocol. Runs on Linux and Windows.

The site is published at **[voxdmr.jcalado.com](https://voxdmr.jcalado.com)**.

## Get VoxDMR

- **Download** the latest release: [github.com/jcalado/dmr-input/releases](https://github.com/jcalado/dmr-input/releases) — Linux and Windows binaries.
- **Install guide:** see [voxdmr.jcalado.com/docs/installation](https://voxdmr.jcalado.com/docs/installation).
- **Source for the app:** [jcalado/dmr-input](https://github.com/jcalado/dmr-input). This repo only contains the website.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (`motion/react`)
- React Router

## Development

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Type-check (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` |

## Deployment

Deploy the `dist/` folder. The `public/404.html` handles SPA routing on static hosts.

## License

MIT
