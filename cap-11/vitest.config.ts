// vitest.config.ts
// Cap-11: configuracao do Vitest para projeto Node.js.
// Nao requer configuracao extra para TypeScript — usa esbuild nativamente.

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
    },
  },
});
