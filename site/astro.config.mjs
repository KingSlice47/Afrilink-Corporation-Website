import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://afrilinkcorp.co.za',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  compressHTML: true,
});
