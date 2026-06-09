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
      // The homepage and blog are server-rendered (the blog pulls fresh
      // Substack posts on every request), so @astrojs/sitemap can't discover
      // them at build time — list them explicitly so they get indexed.
      // Individual blog posts live on Substack and aren't pages on this site.
      customPages: [
        'https://zerofluff.co.uk/',
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
