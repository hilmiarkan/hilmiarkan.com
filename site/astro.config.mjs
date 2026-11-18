import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://hilmiarkan.com',
  integrations: [react()],
  // Keep the addresses of the old site: /resume and /case-study/paycle, with
  // no trailing slash. "file" writes resume.html instead of resume/index.html,
  // which Cloudflare Pages serves at exactly /resume.
  trailingSlash: 'never',
  build: { format: 'file' },
});
