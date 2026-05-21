import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    domains: ['snap-website-api.vercel.app'],
  },
  site: 'https://maxi-garcia-mortigliengo-cv.vercel.app/',
  integrations: [sitemap()],
});
