import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zerofluff.co.uk',
  output: 'server',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://zerofluff.co.uk/404/',
      // The blog index and contact page are rendered on request (the blog pulls
      // fresh Substack posts), so @astrojs/sitemap can't discover them at build
      // time — list them explicitly so they get indexed. Everything else,
      // including the homepage and on-site blog posts, is prerendered and found
      // automatically.
      customPages: [
        'https://zerofluff.co.uk/blog/',
        'https://zerofluff.co.uk/contact/',
      ],
    }),
  ],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
