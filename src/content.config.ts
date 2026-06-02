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
    order: z.number().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    tech: z.array(z.object({ name: z.string(), category: z.string() })).optional(),
    aiUsed: z.array(z.string()).optional(),
    url: z.string().optional(),
  }),
});

export const collections = { 'case-studies': caseStudies };
