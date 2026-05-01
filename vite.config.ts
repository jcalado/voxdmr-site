import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// Copies index.html into SPA route directories so GitHub Pages serves 200 instead of 404
function spaFallbackPages(routes: string[]): Plugin {
  return {
    name: 'spa-fallback-pages',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const index = path.join(dist, 'index.html');
      for (const route of routes) {
        const dir = path.join(dist, route);
        fs.mkdirSync(dir, {recursive: true});
        fs.copyFileSync(index, path.join(dir, 'index.html'));
      }
    },
  };
}

export default defineConfig(({mode}) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      spaFallbackPages([
        'privacy',
        'docs',
        'docs/installation',
        'docs/first-connection',
        'docs/ptt-modes',
        'docs/audio-settings',
        'docs/server-profiles',
        'docs/talkgroups-nodes',
        'docs/recording',
        'docs/background-operation',
        'docs/troubleshooting',
      ]),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
