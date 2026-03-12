# Phase 3: Content & Blog - Research

**Researched:** 2026-03-12
**Domain:** Astro content collections, RSS feed consumption, case study pages
**Confidence:** HIGH

## Summary

Phase 3 adds case study pages (listing + individual) and a blog listing page that pulls from Andy's Substack RSS feed. The existing Astro 6 project already has all the primitives needed: `.card` styling, `.grid-2`/`.grid-3` layouts, `CTA.astro`, `BaseLayout.astro`, and the `reveal` animation system. The two main technical decisions are (1) using Astro Content Collections with `glob()` loader for case study markdown files, and (2) fetching the Substack RSS feed at build time for the blog page.

The Substack RSS feed at `zerofluff.substack.com/feed` is live and returns structured XML with `title`, `description` (subtitle/excerpt), `link`, `pubDate`, and `content:encoded` (full HTML) per item. The `rss-parser` npm package (v3.13.0) is the standard way to parse this in Node, well-suited for build-time fetching in an Astro page's frontmatter.

**Primary recommendation:** Use Astro Content Collections with `glob()` for case studies (markdown files in `src/content/case-studies/`), and direct `rss-parser` fetch in the blog page frontmatter for Substack posts. No custom loader needed -- the blog page just fetches once at build time.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- Case study listing page: minimal text cards with project name + one-line result, click through to individual pages, reuse existing `.card` pattern
- Case study individual pages: Problem/Approach/Outcome sections, pure typography (no hero images), bold headline with key metric, CTA at bottom reusing `CTA.astro`
- Blog page: posts pulled from Substack RSS at build time (`zerofluff.substack.com/feed`), cards rendered in site's own design system (not iframes), each linking to full post on Substack in a new tab
- At least 2 case studies at launch (CASE-04)

### Claude's Discretion
- Blog card layout (single column vs grid) and information density
- Number of posts to display
- Whether to add Case Studies and/or Blog to header nav
- Whether homepage gets a case studies teaser section
- Cross-linking between case study and blog pages

### Deferred Ideas (OUT OF SCOPE)
None

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CASE-01 | Case study listing page showing all available projects | Astro Content Collections with `glob()` loader; `getCollection()` query; `.grid-2` + `.card` layout |
| CASE-02 | Individual case study pages with problem/approach/outcome structure | Dynamic routes via `getStaticPaths()`; markdown frontmatter for metadata; `render()` for content |
| CASE-03 | Quantified results where possible (hours saved, efficiency gains) | Frontmatter field `result` with key metric string; displayed as bold headline |
| CASE-04 | At least 2 case studies ready at launch | Markdown files using testimonial data from homepage (Apex Logistics, Bright Path Digital) |
| BLOG-01 | Blog listing page pulling posts from Substack RSS at build time | `rss-parser` package; fetch in page frontmatter; `export const prerender = true` |
| BLOG-02 | Blog post cards rendered in site's own design system | Custom card markup using RSS item fields (title, description, pubDate); `.card` + `.grid-2` CSS |
| BLOG-03 | Each card links out to full post on Substack | RSS `link` field; `target="_blank" rel="noopener noreferrer"` on card links |

</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^6.0.4 | Already installed; content collections, static page generation | Project foundation |
| rss-parser | ^3.13.0 | Parse Substack RSS XML into JS objects | Most-used RSS parser for Node (447+ dependents), handles all RSS/Atom variants |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| astro/zod | (bundled) | Schema validation for content collection frontmatter | Defining case study collection schema |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| rss-parser | fast-xml-parser + manual mapping | Smaller (104KB) but requires hand-mapping RSS fields; not worth it for this use case |
| Content Collections for blog | Direct fetch in frontmatter | Content Collections would be overkill for read-only external RSS; direct fetch is simpler |
| Content Collections for case studies | Plain .astro files per case study | Collections give type-safe frontmatter, automatic listing queries, and cleaner content authoring |

**Installation:**
```bash
npm install rss-parser
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  content/
    case-studies/
      apex-logistics.md          # Case study content (markdown body)
      bright-path-digital.md     # Case study content (markdown body)
    content.config.ts            # Collection definition with schema
  pages/
    case-studies/
      index.astro                # Listing page
      [id].astro                 # Dynamic individual pages
    blog.astro                   # Blog listing (RSS fetch)
  components/
    CaseStudyCard.astro          # Card for listing page
    BlogCard.astro               # Card for blog listing
```

### Pattern 1: Content Collection for Case Studies
**What:** Define a `case-studies` collection with typed frontmatter schema, store case study content as markdown files, query with `getCollection()`.
**When to use:** Any structured content that needs listing + detail pages.
**Example:**

```typescript
// src/content/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    result: z.string(),           // e.g. "8 hours/week saved"
    order: z.number().optional(),  // for manual sort order
  }),
});

export const collections = { 'case-studies': caseStudies };
```

```typescript
// src/pages/case-studies/[id].astro
export const prerender = true;

import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import CTA from '../../components/CTA.astro';

export async function getStaticPaths() {
  const studies = await getCollection('case-studies');
  return studies.map((study) => ({
    params: { id: study.id },
    props: { study },
  }));
}

const { study } = Astro.props;
const { Content } = await render(study);
```

### Pattern 2: Build-Time RSS Fetch for Blog
**What:** Fetch and parse Substack RSS in page frontmatter; the page prerenders at build time.
**When to use:** Consuming external RSS/Atom feeds where you only need a listing page (no detail pages on your site).
**Example:**

```typescript
// src/pages/blog.astro
export const prerender = true;

import Parser from 'rss-parser';
import BaseLayout from '../layouts/BaseLayout.astro';

const parser = new Parser();
const feed = await parser.parseURL('https://zerofluff.substack.com/feed');
const posts = feed.items.slice(0, 12);  // Cap at 12 posts
```

RSS item fields available from Substack:
- `item.title` -- post title
- `item.contentSnippet` -- plain text excerpt (auto-generated by rss-parser from content:encoded)
- `item.link` -- full URL to post on Substack
- `item.pubDate` -- RFC 822 date string (parse with `new Date()`)
- `item.content` -- full HTML (content:encoded) -- NOT needed for cards
- `item.enclosure?.url` -- cover image URL (if present)

### Pattern 3: Case Study Markdown Structure
**What:** Each case study markdown file uses frontmatter for metadata and three `## ` sections for Problem/Approach/Outcome.
**Example:**

```markdown
---
title: "Automated Weekly Reporting"
client: "Apex Logistics"
result: "8 hours/week saved"
order: 1
---

## The Problem

Apex Logistics' operations team spent 8+ hours every week manually compiling data...

## The Approach

We identified the three most time-consuming reports and built automated pipelines...

## The Outcome

**8 hours per week freed up** for the operations team. Reports now generate automatically...
```

### Anti-Patterns to Avoid
- **Don't use iframes for Substack embeds:** Violates BLOG-02, looks inconsistent, poor performance
- **Don't hardcode case study HTML in .astro files:** Defeats the purpose of structured content; use markdown + collection for maintainability
- **Don't fetch RSS at request time:** The blog page should prerender; fetching at runtime adds latency and Substack rate-limit risk
- **Don't render full blog post content on-site:** Posts link out to Substack; only show title + excerpt + date on cards

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| RSS XML parsing | Custom XML parser | `rss-parser` | RSS has many variants (RSS 2.0, Atom, namespaced elements); rss-parser handles them all |
| Content collection querying | Manual file-system reading + frontmatter parsing | `getCollection()` / `getEntry()` | Astro handles schema validation, caching, type safety |
| Date formatting | Manual string manipulation | `Date.toLocaleDateString('en-GB', options)` | Locale-aware, handles RSS date format |
| Dynamic route generation | Manual page files per case study | `getStaticPaths()` | Scales automatically as case studies are added |

## Common Pitfalls

### Pitfall 1: RSS Feed Fetch Failing Silently at Build Time
**What goes wrong:** If Substack is down or rate-limits during build, the blog page builds with zero posts or the build fails entirely.
**Why it happens:** Network requests during static builds are fragile.
**How to avoid:** Wrap the fetch in try/catch, log a warning, and render a "Posts coming soon" fallback if the fetch fails. Never let a blog RSS failure break the entire build.
**Warning signs:** Empty blog page after deploy.

### Pitfall 2: Content Collection Not Detected
**What goes wrong:** `getCollection('case-studies')` returns empty or throws.
**Why it happens:** `content.config.ts` must be at `src/content/content.config.ts` (not `src/content.config.ts`). The glob base path must match actual file locations.
**How to avoid:** Place config at exactly `src/content/content.config.ts`. Use `base: './src/content/case-studies'` relative to project root.
**Warning signs:** TypeScript errors about collection not existing; empty arrays from getCollection.

### Pitfall 3: RSS Date Parsing Inconsistency
**What goes wrong:** Dates display as "Invalid Date" or in wrong format.
**Why it happens:** RSS pubDate is RFC 822 format (e.g. "Thu, 12 Mar 2026 21:51:47 GMT"); `new Date()` handles it but locale formatting varies.
**How to avoid:** Always use `new Date(item.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })` for consistent UK-friendly format.

### Pitfall 4: Missing `prerender = true` on New Pages
**What goes wrong:** Case study and blog pages are server-rendered instead of static, adding unnecessary latency.
**Why it happens:** Project uses `output: 'server'` (hybrid mode) so pages default to SSR unless explicitly opted into prerendering.
**How to avoid:** Add `export const prerender = true;` to every new page file. All Phase 3 pages are static content.
**Warning signs:** Pages work in dev but are slow in production; Vercel serverless function invocations spike.

### Pitfall 5: Header Nav Getting Crowded
**What goes wrong:** Adding both "Case Studies" and "Blog" to the nav creates 6 items, looking cramped on mobile.
**Why it happens:** Current nav has 4 items (Home, Services, About, Contact) with no hamburger menu.
**How to avoid:** Add "Work" (linking to case studies) as a single nav item. Blog can be a secondary link in footer or discovered from the homepage. Alternatively, consider "Work" and "Blog" but test on 320px viewport.

## Code Examples

### Case Study Card Component
```astro
---
// src/components/CaseStudyCard.astro
interface Props {
  id: string;
  title: string;
  client: string;
  result: string;
}
const { id, title, client, result } = Astro.props;
---

<a href={`/case-studies/${id}`} class="card case-study-card stack">
  <h3>{client}</h3>
  <p class="text-muted">{title}</p>
  <p class="case-study-result"><strong>{result}</strong></p>
</a>

<style>
  .case-study-card {
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }
  .case-study-card:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }
  .case-study-result {
    color: var(--color-accent);
    font-size: var(--text-lg);
  }
</style>
```

### Blog Card Component
```astro
---
// src/components/BlogCard.astro
interface Props {
  title: string;
  excerpt: string;
  date: string;
  url: string;
}
const { title, excerpt, date, url } = Astro.props;
const formattedDate = new Date(date).toLocaleDateString('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric'
});
---

<a href={url} target="_blank" rel="noopener noreferrer" class="card blog-card stack">
  <time class="text-sm text-muted" datetime={new Date(date).toISOString()}>{formattedDate}</time>
  <h3>{title}</h3>
  <p class="text-muted">{excerpt}</p>
</a>

<style>
  .blog-card {
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }
  .blog-card:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }
</style>
```

### RSS Fetch with Error Handling
```typescript
// In blog.astro frontmatter
import Parser from 'rss-parser';

let posts: { title: string; contentSnippet: string; link: string; pubDate: string }[] = [];

try {
  const parser = new Parser();
  const feed = await parser.parseURL('https://zerofluff.substack.com/feed');
  posts = feed.items.slice(0, 12).map(item => ({
    title: item.title ?? 'Untitled',
    contentSnippet: (item.contentSnippet ?? '').slice(0, 160) + '...',
    link: item.link ?? '#',
    pubDate: item.pubDate ?? '',
  }));
} catch (e) {
  console.warn('Failed to fetch Substack RSS feed:', e);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Legacy content collections (`src/content/config.ts`) | New Content Layer API (`src/content/content.config.ts`) | Astro 5.0 (2025) | 5x faster builds, new file path, loader-based API |
| `Astro.glob()` for local files | `getCollection()` with loaders | Astro 5.0 | Type-safe, schema-validated, cacheable |
| iframe Substack embeds | Build-time RSS fetch | N/A | Full design control, better performance |

**Deprecated/outdated:**
- `src/content/config.ts` (legacy path) -- use `src/content/content.config.ts` instead
- `Astro.glob()` for content -- use Content Collections API
- `defineCollection({ type: 'content' })` without loader -- use `glob()` loader

## Open Questions

1. **Case study content**
   - What we know: Andy has placeholder testimonials from Apex Logistics and Bright Path Digital on the homepage
   - What's unclear: Whether these are real clients with real metrics, or entirely placeholder
   - Recommendation: Write case studies using these names and the metrics from the testimonials (8 hours/week saved for Apex; AI implementation for Bright Path). Mark with HTML comments for easy replacement with real content.

2. **Header nav balance**
   - What we know: Current nav has 4 items; adding 2 more risks crowding on mobile
   - What's unclear: Whether a hamburger menu is acceptable or if the clean nav is preferred
   - Recommendation: Add "Work" to nav (case studies). Add "Blog" to footer. If Andy wants both in nav, a hamburger menu for mobile would be needed (Phase 3 scope creep -- avoid).

3. **Homepage case studies teaser**
   - What we know: Context says this is Claude's discretion
   - Recommendation: Add a small teaser section (2 cards) between testimonials and CTA. This supports conversion flow -- visitors see social proof then concrete results.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no automated test framework installed) |
| Config file | None |
| Quick run command | `npm run build && npm run preview` |
| Full suite command | `npm run build` (build success = static pages generated) |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CASE-01 | Case study listing page renders cards | smoke | `npm run build` (confirms page generates) | N/A - Wave 0 |
| CASE-02 | Individual case study pages with 3 sections | smoke | `npm run build` (confirms dynamic routes generate) | N/A - Wave 0 |
| CASE-03 | Quantified results displayed | manual-only | Visual check for metric display | N/A |
| CASE-04 | At least 2 case studies exist | smoke | `ls src/content/case-studies/*.md \| wc -l` | N/A - Wave 0 |
| BLOG-01 | Blog page pulls from Substack RSS | smoke | `npm run build` (confirms RSS fetch + page generation) | N/A - Wave 0 |
| BLOG-02 | Cards use site's design system | manual-only | Visual check against design tokens | N/A |
| BLOG-03 | Cards link to Substack with target=_blank | manual-only | Check rendered HTML for correct attributes | N/A |

### Sampling Rate
- **Per task commit:** `npm run build && npm run preview` -- verify pages generate and render
- **Per wave merge:** `npm run build` -- full static build succeeds
- **Phase gate:** Full build green + manual visual check of all new pages

### Wave 0 Gaps
- [ ] `src/content/content.config.ts` -- content collection schema definition
- [ ] `src/content/case-studies/` directory -- case study markdown files
- [ ] `rss-parser` package -- `npm install rss-parser`

## Sources

### Primary (HIGH confidence)
- [Astro Content Collections Docs](https://docs.astro.build/en/guides/content-collections/) -- collection definition, glob loader, querying
- [Astro Content Loader Reference](https://docs.astro.build/en/reference/content-loader-reference/) -- custom loader API, context object
- Substack RSS feed (live fetch of `zerofluff.substack.com/feed`) -- confirmed feed structure, available fields

### Secondary (MEDIUM confidence)
- [Raymond Camden: Building an RSS Aggregator with Astro](https://www.raymondcamden.com/2026/02/02/building-an-rss-aggregator-with-astro) -- rss-parser usage pattern in Astro
- [rss-parser npm](https://www.npmjs.com/package/rss-parser) -- v3.13.0, API surface, field mapping

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- Astro content collections are documented official API; rss-parser is mature and widely used
- Architecture: HIGH -- patterns follow Astro documentation exactly; verified against existing project structure
- Pitfalls: HIGH -- based on known Astro 5/6 migration issues (config file path) and standard RSS reliability concerns

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (stable technologies, no fast-moving changes expected)
