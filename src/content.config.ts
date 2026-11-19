import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    subtitle: z.string().optional(),
    result: z.string(),
    /** Display order, lowest first. */
    order: z.number().optional(),
    /** true = arm's-length client work, shown first and on the homepage. false = our own products and experiments. */
    featured: z.boolean().default(false),
    /** When the case study was first published (used for Article JSON-LD). */
    published: z.coerce.date().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    tech: z.array(z.object({ name: z.string(), category: z.string() })).optional(),
    aiUsed: z.array(z.string()).optional(),
    url: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** <meta description> and RSS summary — unique across the site. */
    description: z.string(),
    /** 2–3 sentence answer shown first on the page. */
    quickAnswer: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Drafts are never built, listed, in the sitemap or in the RSS feed. They preview in `npm run dev`. */
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

export const collections = { 'case-studies': caseStudies, blog };
