// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // M-2: canonical <link> tags (and the eventual og:url) need a real
  // absolute origin to resolve against — without `site`, Astro.site is
  // undefined and Astro.url falls back to a placeholder at build time.
  site: 'https://www.morium.one',
  // Sitemap is generated at build time (sitemap-index.xml + sitemap-0.xml)
  // so every new page is listed automatically — no hand-edited XML.
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});