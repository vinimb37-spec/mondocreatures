// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // IMPORTANTE: o `site` é usado pelo sitemap, canonical e OG.
  // Mantenha apex (sem www) — vamos forçar o redirect 301 de www -> apex no Cloudflare.
  site: 'https://mondocreatures.com',

  integrations: [
    sitemap({
      // Gera /sitemap-index.xml e /sitemap-0.xml automaticamente.
      // Quando você adicionar /pt/ ou /es/, configure i18n aqui.
    }),
  ],

  build: {
    // 'auto' inlinea CSS pequeno e externaliza o resto — bom pro Core Web Vitals.
    inlineStylesheets: 'always',
  },

  // Comprime o HTML final removendo whitespace desnecessário.
  compressHTML: true,
});
