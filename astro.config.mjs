import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import { generateCvIntegration } from './integrations/generate-cv';
import { generateProjectPreviewsIntegration } from './integrations/generate-project-previews';

export default defineConfig({
  output: 'server',

  env: {
    schema: {
      GROQ_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      OPEN_ROUTER_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      SESSION_SECRET: envField.string({
        context: 'server',
        access: 'secret',
      }),
      VERCEL_URL: envField.string({
        context: 'server',
        access: 'public',
      }),
      SITE: envField.string({
        context: 'server',
        access: 'public',
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  site: 'https://maxi-garcia-mortigliengo-cv.vercel.app',
  integrations: [
    sitemap(),
    react(),
    generateProjectPreviewsIntegration(),
    generateCvIntegration(),
  ],

  adapter: vercel(),
});
