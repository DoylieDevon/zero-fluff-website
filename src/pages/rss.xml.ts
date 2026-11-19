// RSS feed of the on-site blog (drafts excluded).
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: 'Zero Fluff',
    description: 'Practical AI, automation and software for small businesses. No hype, no jargon.',
    site: context.site ?? 'https://zerofluff.co.uk',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
}
