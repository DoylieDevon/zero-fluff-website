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
      customPages: ['https://zerofluff.co.uk/contact/'],
    }),
  ],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
