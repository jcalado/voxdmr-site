import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkDirective from 'remark-directive';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkPlatform } from './src/lib/remark-platform.ts';

// lucide `link` icon as hast, prepended to h2+ as a hover-revealed permalink
// (styled by `.heading-anchor` in docs.css).
const anchorIcon = {
  type: 'element',
  tagName: 'svg',
  properties: {
    viewBox: '0 0 24 24', width: '1em', height: '1em', fill: 'none',
    stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round',
    strokeLinejoin: 'round', 'aria-hidden': 'true',
  },
  children: [
    { type: 'element', tagName: 'path', properties: { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }, children: [] },
    { type: 'element', tagName: 'path', properties: { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' }, children: [] },
  ],
};

export default defineConfig({
  output: 'static',
  site: 'https://voxdmr.jcalado.com',
  base: '/',
  image: { service: passthroughImageService() },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkPlatform],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          // h2..h6 only; the page title (h1) stays clean.
          test: ['h2', 'h3', 'h4', 'h5', 'h6'],
          properties: {
            className: ['heading-anchor'],
            'aria-label': 'Permalink to this section',
            tabindex: -1,
          },
          content: anchorIcon,
        },
      ],
    ],
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': new URL('./', import.meta.url).pathname },
    },
  },
});
