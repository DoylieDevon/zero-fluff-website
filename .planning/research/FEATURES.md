# Feature Landscape

**Domain:** AI Implementation Consultancy Website (Small Business Focused)
**Researched:** 2026-03-12
**Overall Confidence:** MEDIUM (training data only -- no live web search available; consultancy website patterns are well-established and stable)

## Table Stakes

Features visitors expect. Missing any of these and the site feels unfinished or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear value proposition hero | Visitors decide in 3-5 seconds whether to stay. "What do you do, for whom, and why should I care?" must be answered instantly | Low | Typography-led design makes this the centrepiece. One headline, one subline, one CTA |
| Services overview | Visitors need to understand what they are buying. AI is still fuzzy to most SMBs -- make it concrete | Low | Simplify from 4 offerings to 2-3 clearly named packages. Avoid jargon |
| Case studies / proof of work | Consultancies live and die on credibility. Small businesses especially need to see "someone like me got results" | Medium | Individual pages per case study with problem/approach/outcome structure. Even 2-3 strong ones beats a dozen vague ones |
| About / founder story | Solo consultancy = people buy the person. 30+ years experience is a massive trust signal | Low | Photo, career highlights (Filmily, SelectCommerce, Shiift), personality. This is where "zero fluff" tone really shines |
| Contact form | The primary conversion point. Must be dead simple -- name, email, brief message | Low | No Calendly needed for v1. Form submits to email or a simple backend (Formspree, Netlify Forms, or Vercel serverless) |
| Mobile-responsive design | 60%+ of traffic is mobile. Non-negotiable | Low | Mobile-first CSS. Typography-led design actually helps here -- less to break on small screens |
| Basic SEO | Meta titles, descriptions, OpenGraph tags, semantic HTML, structured data (LocalBusiness schema) | Low | Critical for "AI consultancy Devon" / "AI consultant UK" type searches |
| Fast page load | Slow sites kill trust instantly. Target < 1.5s LCP | Low | Static site makes this easy. Optimise images, minimal JS, system/variable fonts |
| Professional domain + SSL | zerofluff.co.uk with HTTPS. Already planned | Low | Vercel handles SSL automatically |
| Testimonials | Social proof from real clients with names and businesses | Low | Even 3-4 short quotes with attribution beats none. Can grow over time |
| Legal basics | Privacy policy, cookie notice (if using analytics). UK GDPR requirement | Low | Template privacy policy. Cookie banner only if using analytics/tracking |

## Differentiators

Features that set Zero Fluff apart from generic consultancy sites. Not expected, but build significant trust and conversion advantage.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| "AI Jargon Translator" / plain-English positioning | Most AI consultancy sites are drowning in buzzwords (LLMs, RAG, agents, etc). Zero Fluff's brand IS the antidote. Every page should demonstrate this by explaining AI in business terms, not tech terms | Low | This is a copy/tone feature, not a technical one. But it is the single biggest differentiator. Weave it into every page |
| Substack blog integration | Demonstrates ongoing thought leadership without maintaining a separate CMS. Shows Andy is active and thinking about this space | Medium | Options: RSS feed pull with static rendering at build time, or simple link-out cards to Substack. Build-time RSS is cleaner |
| Process / "How I Work" section | Small businesses are nervous about consultants. Showing a clear 3-4 step process (Discovery, Pilot, Implement, Support) demystifies the engagement | Low | Visual timeline or numbered steps. Reduces anxiety about "what happens after I click contact" |
| Results with specific metrics | "Saved 12 hours/week on invoice processing" beats "improved efficiency". Quantified outcomes in case studies and on homepage | Low | Copy feature. Requires getting permission from clients to share specifics |
| Tools transparency | Show the actual tools used (N8N, ChatGPT, Gemini, etc). Most consultants are vague about their toolkit. Transparency builds trust, especially with technical decision-makers | Low | Simple logo grid or mention in case studies. Not a full "tech stack" page -- keep it proportionate |
| Focused geographic + niche positioning | "AI implementation for small businesses" is specific enough to rank well and resonate. Most competitors try to be everything to everyone | Low | Copy and SEO feature. Local business schema markup for Totnes/Devon |
| Speed/performance as brand signal | A site that loads instantly reinforces "zero fluff" -- no bloat, no waste, just substance. Lighthouse 95+ score as a quiet proof point | Low | Static site makes this achievable. Worth pursuing as it aligns perfectly with brand |
| Subtle interaction design | Minimal, purposeful animations (fade-in on scroll, smooth transitions) that feel premium without feeling flashy. The Framer reference site does this well | Medium | CSS animations and Intersection Observer. Keep it restrained -- 2-3 effects max across the whole site |

## Anti-Features

Features to explicitly NOT build. These are tempting but wrong for this project.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| AI chatbot on the site | Ironic and counterproductive. Every consultancy site has one and they are universally annoying. "Zero fluff" means no gimmicks | Clear contact form. If Andy wants to demonstrate AI capability, do it through case studies showing real client work |
| Pricing page with fixed rates | Consultancy pricing varies wildly by scope. Publishing prices either scares people off or anchors too low. Small businesses especially will fixate on numbers without understanding value | "Investment starts from" language if anything, or just "let's talk about your needs" on the contact page |
| Client portal / login area | Massive complexity for zero conversion benefit. Out of scope and should stay that way | Email and direct communication. If needed later, use an off-the-shelf tool like Notion or a shared Google Drive |
| Blog CMS / admin panel | Andy writes on Substack. Building a parallel CMS is pure waste | Pull from Substack RSS or link out. Single source of truth for content |
| Complex multi-step contact form | Every extra field kills conversion. Small business owners are time-poor | Name, email, brief message. Three fields maximum. Optional "how did you find me" dropdown at most |
| Parallax scrolling / heavy animations | Conflicts with "zero fluff" brand. Adds weight, breaks on mobile, dates quickly | Subtle fade-ins at most. Let typography and whitespace do the work |
| Newsletter signup (separate from Substack) | Splits the audience. Andy already has Substack for this | Link to Substack subscription if people want updates |
| Dark mode toggle | Adds complexity for a v1 static site. Can revisit later if there is demand | Stick with a single, well-crafted light theme. The Framer reference is light |
| Testimonial carousel / slider | Carousels have terrible UX. Users almost never click through. Information gets hidden | Stack testimonials vertically. Show all of them. Let people scroll -- it is what they do naturally |
| "Our Team" page | Solo consultancy. A team page with one person looks thin. Worse, it sets expectations of a bigger operation | Strong "About Andy" section that owns the solo model. "I work directly with you, not a junior" is a selling point |

## Feature Dependencies

```
Value Proposition Hero --> Services (hero links to services detail)
Services --> Case Studies (services reference real outcomes)
Case Studies --> Testimonials (case study clients provide quotes)
Contact Form --> All Pages (CTA on every page leads to contact)
Substack Integration --> Blog Section (RSS feed populates blog cards)
SEO Fundamentals --> All Content (requires all pages to exist with final copy)
Process Section --> Services (process describes how services are delivered)
```

## MVP Recommendation

**Phase 1 -- Launch-ready site (prioritise these):**

1. Homepage with typography-led hero, value proposition, and primary CTA
2. Services page with simplified, jargon-free offerings
3. About page with Andy's story, experience, and photo
4. Contact page with minimal form (3 fields)
5. At least 2 case studies with problem/approach/outcome structure
6. Testimonials (even 3 is enough to start)
7. Mobile-responsive design
8. SEO fundamentals
9. Legal basics (privacy policy)

**Phase 2 -- Enhancement (after launch):**

1. Substack blog integration via RSS
2. "How I Work" process section
3. Subtle scroll animations
4. Performance optimisation push (Lighthouse 95+)
5. Additional case studies as client work completes

**Defer indefinitely:**

- AI chatbot: Contradicts brand
- Pricing page: Premature and counterproductive
- Dark mode: Complexity without clear value
- Client portal: Wrong tool for the job

## Rationale for Prioritisation

The site exists to do one thing: convert visitors into enquiries. Every Phase 1 feature directly supports that by answering the three questions every consultancy visitor has:

1. **"What do you do?"** -- Hero, Services
2. **"Can you actually do it?"** -- Case Studies, Testimonials, About
3. **"How do I get started?"** -- Contact Form, Process

Blog integration is Phase 2 because it adds credibility but does not directly convert. The Substack already exists as a standalone destination -- linking to it is sufficient for launch.

## Sources

- Training data on consultancy website best practices, conversion optimisation patterns, and UX research (MEDIUM confidence -- patterns are stable but no live verification was possible)
- PROJECT.md context for Zero Fluff-specific constraints and brand positioning
