import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(root, 'src'),
    },
  },
  define: {
    'import.meta.env.SITE': JSON.stringify('https://maxi-garcia-mortigliengo-cv.vercel.app'),
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
