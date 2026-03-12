# Pitfalls Research

**Domain:** Consultancy website, typography-led minimal static site
**Researched:** 2026-03-12
**Confidence:** MEDIUM (based on training data patterns; WebSearch unavailable for verification)

## Critical Pitfalls

### Pitfall 1: Typography That Looks Great on Desktop, Breaks on Mobile

**What goes wrong:**
Large, confident typography (60-120px hero headings) that defines the desktop aesthetic overflows, wraps awkwardly, or becomes unreadable on mobile. Fluid type scales get ignored in favour of fixed breakpoint jumps, creating jarring transitions between viewport sizes. Long words in large type (like "Implementation" or "Consultancy") overflow containers on narrow screens.

**Why it happens:**
Designers fall in love with the desktop hero — the big bold statement. Mobile is treated as "just shrink it." But typography-led design IS the design; if the type fails on mobile, the entire concept fails. CSS `clamp()` for fluid typography is straightforward but often skipped in favour of simpler media query approaches.

**How to avoid:**
- Use CSS `clamp()` for all heading sizes: `font-size: clamp(2rem, 5vw + 1rem, 6rem)`
- Test every heading with the longest realistic content at 320px viewport width
- Set `overflow-wrap: break-word` on headings as a safety net
- Design mobile-first: start with the smallest screen and scale up, not the reverse
- Use `vw` units cautiously — they ignore user font-size preferences. `clamp()` with `rem` base is better for accessibility.

**Warning signs:**
- Horizontal scrollbar appearing on mobile devices
- Hero text wrapping to 4+ lines on narrow viewports
- Heading text touching or overlapping container edges
- No `clamp()` or fluid type system in the CSS

**Phase to address:**
Phase 1 (Foundation/Design System) — the type scale must be defined fluid-first before any page templates are built.

---

### Pitfall 2: Minimal Design That Communicates Nothing

**What goes wrong:**
In pursuit of "minimal" and "zero fluff," the site strips away too much — including the trust signals, context, and specifics that a consultancy needs to convert visitors. The result is a beautiful, empty site that says "AI Consultancy. Get in touch." with no reason for anyone to actually do so. Visitors bounce because they cannot tell what makes this consultancy different from the hundred others they could find.

**Why it happens:**
"Minimal" is misinterpreted as "less content." Actual minimal design is about removing unnecessary decoration while keeping essential information. A consultancy site needs: proof of expertise, clear outcomes, specific services, and social proof. Removing these in the name of aesthetics destroys conversion.

**How to avoid:**
- Define "minimal" as a visual constraint (whitespace, no decoration, limited colour), NOT a content constraint
- Write the copy first, then design around it — the brand is "straight-talking," which means saying more clearly, not saying less
- Every page must answer: "Why should I trust this person with my business?"
- Include specific numbers: "30 years experience," real company names, concrete outcomes from case studies
- The hero should make a specific claim, not a generic one. "I help small businesses stop wasting money on AI that doesn't work" beats "AI Consultancy"

**Warning signs:**
- Any page that can be summarised as "[category]. [Contact CTA]." with nothing in between
- Case studies without measurable outcomes
- Services described in abstract terms without concrete deliverables
- No testimonials or named clients visible above the fold on key pages

**Phase to address:**
Phase 2 (Content/Copy) — but must be considered during Phase 1 design system. The design system should be built assuming substantial text content, not placeholder hero text.

---

### Pitfall 3: Substack Integration That Feels Bolted On

**What goes wrong:**
The blog section either (a) uses Substack embeds that look visually alien against the custom typography and design, (b) links out to Substack losing visitors entirely, or (c) attempts to fetch Substack content via RSS/API and ends up with stale, broken, or poorly formatted posts. The blog feels like it belongs to a different website.

**Why it happens:**
Substack embeds have their own styling that cannot be fully overridden. Substack's RSS feed provides limited formatting control. There is no official Substack API for fetching full post content. Developers underestimate how jarring a style mismatch looks on a typography-led site where every detail matters.

**How to avoid:**
- Use Substack's RSS feed to pull titles, excerpts, and dates — display these as native cards in the site's own design system
- Link each card to the full post on Substack (accept that full posts live there)
- Style the blog listing page as a first-class section with the same typography and spacing as the rest of the site
- Do NOT use Substack embed iframes — they are style prisons
- Cache RSS results at build time (or via a simple serverless function) so the page loads fast and does not depend on Substack uptime
- Consider a manual "featured posts" approach for the homepage: curate 2-3 post links rather than auto-pulling everything

**Warning signs:**
- Iframe embeds from Substack in the codebase
- Blog section with different fonts, spacing, or colour from the rest of the site
- RSS fetch happening client-side on page load (slow, fragile)
- No fallback if Substack RSS is temporarily unavailable

**Phase to address:**
Phase 3 (Blog Integration) — but the design system in Phase 1 must include blog card and listing components so the integration has a home to slot into.

---

### Pitfall 4: Contact Form That Leaks Enquiries or Gets Spammed to Death

**What goes wrong:**
A static site has no backend, so the contact form needs a third-party service (Formspree, Netlify Forms, etc.) or a serverless function. Common failures: form submissions silently fail and Andy never receives them, spam floods the inbox within weeks, or the form service's free tier runs out and submissions start dropping.

**Why it happens:**
Contact forms on static sites are deceptively simple to build in HTML but require careful backend consideration. Spam protection is often added as an afterthought. Email delivery from form services can be unreliable (hitting spam folders). There is no server-side validation as a safety net.

**How to avoid:**
- Use a proven form service: Formspree (free tier: 50 submissions/month, sufficient for a consultancy) or Vercel serverless function sending via a transactional email service (Resend, SendGrid)
- Add a honeypot field (hidden field that bots fill, humans do not) — more effective than CAPTCHA for this traffic level
- Set up email forwarding to a monitored inbox and verify delivery works end-to-end before launch
- Add client-side validation AND server-side/service-side validation
- Test the form monthly — form services change, break, or sunset

**Warning signs:**
- No spam protection on the form
- Form submissions going to a generic email that is not regularly checked
- No confirmation message or redirect after submission
- No test submission sent through the production form before launch

**Phase to address:**
Phase 2 or 3 (Interactive Elements) — but test end-to-end in the final deployment phase.

---

### Pitfall 5: Web Fonts That Destroy Performance and Layout Stability

**What goes wrong:**
Custom web fonts (Google Fonts, Adobe Fonts, self-hosted) cause Flash of Unstyled Text (FOUT) or Flash of Invisible Text (FOIT), layout shifts when fonts load (CLS penalty), and slow initial page loads. On a typography-led site, this is catastrophic — the entire design depends on the typeface, so font loading failures are design failures.

**Why it happens:**
Developers add a Google Fonts `<link>` and move on. But font files are render-blocking by default. A typography-led site using 2-3 weights of a premium typeface could be loading 200-400KB of font files before the page is usable. Meanwhile, system fonts render instantly but look generic.

**How to avoid:**
- Self-host fonts (do not rely on Google Fonts CDN — it is slower than self-hosting since the Chrome cache partition change)
- Subset fonts to only the characters needed (Latin subset saves 60-80% file size)
- Use `font-display: swap` to prevent invisible text
- Preload the primary heading font: `<link rel="preload" href="/fonts/heading.woff2" as="font" type="font/woff2" crossorigin>`
- Use WOFF2 format exclusively (best compression, universal browser support)
- Limit to 2 font families maximum and 3-4 weights total
- Set explicit `size-adjust` on the fallback font to minimise layout shift

**Warning signs:**
- More than 4 font files being loaded
- Fonts loaded from an external CDN (fonts.googleapis.com, use.typekit.net)
- No `font-display` property in `@font-face` declarations
- Visible layout shift when the page loads (text reflowing as fonts swap in)
- Core Web Vitals CLS score above 0.1

**Phase to address:**
Phase 1 (Foundation/Design System) — font loading strategy must be part of the initial build, not retrofitted.

---

### Pitfall 6: SEO Disaster from a "Simple" Static Site

**What goes wrong:**
Developers assume a static site is inherently good for SEO because it is fast. But consultancy sites specifically fail at: missing structured data (LocalBusiness, Person, Service schemas), no OpenGraph/Twitter meta tags (links shared on LinkedIn look terrible — and LinkedIn is where consultancy prospects ARE), thin content on service pages, missing heading hierarchy, and no sitemap.

**Why it happens:**
SEO is treated as a checkbox at the end ("add some meta tags") rather than a structural concern. Consultancy sites need local SEO if they serve a geographic area (Totnes/Devon), and they need rich social sharing previews because word-of-mouth on LinkedIn and email is the primary acquisition channel.

**How to avoid:**
- Build meta tag and structured data templates into the HTML structure from the start
- Every page needs: unique `<title>`, `<meta description>`, OpenGraph image/title/description, canonical URL
- Add LocalBusiness and Person structured data (JSON-LD) for the homepage
- Add Service structured data for the services page
- Create a `sitemap.xml` and `robots.txt` at build time
- Test every page with: LinkedIn Post Inspector, Facebook Sharing Debugger, Google Rich Results Test
- Write genuine meta descriptions (do not auto-generate from page content)

**Warning signs:**
- Sharing a page link on LinkedIn shows no image or a broken preview
- No structured data in the page source (`<script type="application/ld+json">`)
- Generic or missing `<title>` tags
- All pages using the same meta description
- No `sitemap.xml` in the deployed site

**Phase to address:**
Phase 1 (Foundation) for the template structure, Phase 4 (Launch Prep) for testing and validation.

---

### Pitfall 7: Whitespace Excess That Kills Scannability

**What goes wrong:**
Generous whitespace is a hallmark of minimal design, but too much vertical spacing forces endless scrolling, pushes CTAs below the fold, and makes the site feel empty rather than considered. Visitors looking for specific information (pricing approach, past work, how to get in touch) give up scrolling and leave.

**Why it happens:**
Whitespace is easy to add and immediately "looks designed." Developers copy the spacing from inspiration sites (like the Framer reference) without considering that those sites have different content structures. Padding values get set once at desktop and are not adjusted for mobile, creating absurdly tall sections on narrow viewports.

**How to avoid:**
- Define a spacing scale (8px base: 8, 16, 24, 32, 48, 64, 96, 128) and use it consistently via CSS custom properties
- Reduce section padding by 30-50% on mobile — what feels airy on a 1440px screen feels wasteful on 375px
- Ensure the CTA ("Get in touch") is visible without scrolling on the homepage at every breakpoint
- Test with real content, not placeholder text — lorem ipsum hides spacing problems
- Every section should earn its vertical space with content that serves the visitor

**Warning signs:**
- Homepage requires more than 3 full scroll-lengths on mobile to reach the contact section
- Sections with more padding than content
- CTA button not visible in the first viewport on any breakpoint
- Spacing values are arbitrary (not from a defined scale)

**Phase to address:**
Phase 1 (Design System) for the spacing scale, Phase 2 (Page Templates) for applying it to real content.

---

### Pitfall 8: Case Studies That Are Just Project Descriptions

**What goes wrong:**
Case studies read as "We did X for Client Y using Technology Z" with no mention of the problem, the outcome, or why the reader should care. They function as a project list, not as trust-building conversion tools. For a solo consultancy, weak case studies are worse than no case studies — they signal lack of impact.

**Why it happens:**
Writing compelling case studies is hard. Developers (especially technical ones) default to describing what was built rather than the business problem solved and the measurable result achieved. Client confidentiality concerns also lead to vague, sanitised descriptions that say nothing.

**How to avoid:**
- Use a strict structure for every case study: Problem, Approach, Outcome (with numbers)
- Lead with the business pain, not the technology: "Client was spending 20 hours/week on manual data entry" not "We built an N8N automation workflow"
- Include at least one concrete metric per case study (time saved, cost reduced, revenue increased)
- If clients cannot be named, describe the industry and company size instead — specificity without identification
- Write case studies as stories a prospect would recognise their own situation in

**Warning signs:**
- Case study text that does not mention a measurable outcome
- Technology-first descriptions rather than problem-first
- All case studies reading the same way (no variety in problem or outcome)
- No quotes or testimonials attached to case studies

**Phase to address:**
Phase 2 (Content) — case study content must be written before the case study page templates are finalised, because the content structure drives the design.

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline styles instead of design tokens | Faster initial build | Every change requires hunting through HTML files | Never — set up CSS custom properties from day one |
| Client-side RSS fetch from Substack | No build step needed | Slow page load, CORS issues, no fallback | Only as a prototype; replace with build-time fetch before launch |
| Single CSS file with no structure | Simple, one file to manage | Becomes unmaintainable past 500 lines | Acceptable for MVP if using CSS custom properties and logical sections |
| Hardcoded meta tags per page | Quick to implement | Tedious to update, easy to miss pages | Acceptable for a 5-page static site — but use a template pattern |
| No build step (raw HTML/CSS/JS) | Zero tooling complexity | Cannot optimise images, subset fonts, or generate sitemaps automatically | Acceptable if you add manual optimisation checklist for deployment |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Substack RSS | Fetching RSS client-side causing CORS errors and slow loads | Fetch at build time or via a serverless function; cache the result |
| Vercel deployment | Not setting up redirects for www to non-www (or vice versa) | Configure `vercel.json` redirects and test both domains |
| Contact form service | Not testing email delivery to the actual inbox (spam folder risk) | Send 3+ test submissions and verify they arrive; check spam folder |
| Google Fonts | Using the `<link>` tag which is render-blocking | Self-host WOFF2 files with `font-display: swap` and `preload` |
| Analytics (if added) | Adding Google Analytics which hurts performance and privacy | Use a lightweight alternative (Plausible, Fathom, or Vercel Analytics) |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimised hero/case study images | LCP above 2.5s, slow mobile loads | Use modern formats (WebP/AVIF), responsive `srcset`, lazy-load below-fold images | Immediately on mobile connections |
| Too many font weights loaded | Font files totalling 300KB+, slow first paint | Subset fonts, limit to 2 families and 3-4 weights, preload critical fonts | On any connection slower than 4G |
| No caching headers on static assets | Repeat visitors re-download everything | Set `Cache-Control: public, max-age=31536000, immutable` for hashed assets | From the second visit onward |
| Animated transitions on every scroll | Janky scrolling on mid-range mobile devices | Use `prefers-reduced-motion` media query, limit animations to meaningful interactions | On any device older than 2 years |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Contact form without honeypot or rate limiting | Spam floods inbox, form service quota exhausted | Add honeypot field, consider rate limiting via serverless function |
| Exposing email address in page source | Scraped by spam bots | Use a form service or `mailto:` with basic obfuscation; never put raw email in HTML |
| No Content Security Policy headers | XSS risk if any JS is injected (ads, analytics, embeds) | Add CSP headers via `vercel.json` — even static sites benefit |
| Form service API key in client-side code | Abuse of the form submission endpoint | Use the form service's built-in HTML form endpoint (no API key needed) or a serverless proxy |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No clear CTA above the fold | Visitors do not know the desired next action | "Get in touch" or "See my work" visible in the first viewport on all devices |
| Services described without outcomes | Prospect cannot judge relevance to their problem | Frame every service as "You have X problem, I deliver Y result" |
| Navigation that hides key pages behind hamburger on desktop | Reduces discoverability (a 5-page site does not need hidden nav) | Show all navigation items on desktop; hamburger only below 768px |
| Blog links that leave the site without warning | User loses context, may not return | Open Substack links in new tab, or add "Read on Substack" label so the departure is expected |
| No clear path from case study to contact | Visitor reads case study, is convinced, but has to hunt for contact info | Every case study page ends with a CTA: "Have a similar challenge? Let's talk." |

## "Looks Done But Isn't" Checklist

- [ ] **OpenGraph images:** Often missing or using a generic fallback — test by sharing each page URL on LinkedIn
- [ ] **Favicon and touch icons:** Often forgotten — check `favicon.ico`, `apple-touch-icon.png`, and `site.webmanifest`
- [ ] **404 page:** Static sites often show a blank or default Vercel 404 — create a custom one that matches the design
- [ ] **Form error states:** The contact form looks done but has no validation feedback — test with empty fields, invalid email
- [ ] **Print stylesheet:** Prospects may print or PDF the services page — test `@media print` rendering
- [ ] **Accessible contrast:** White-on-light-grey text common in minimal designs fails WCAG AA — test all text with a contrast checker
- [ ] **Heading hierarchy:** Skipping from h1 to h3 for visual sizing — use proper hierarchy and size with CSS
- [ ] **Alt text on images:** Decorative images need `alt=""`, meaningful images need descriptive alt text
- [ ] **Footer links:** Privacy policy, cookie notice if using analytics — legal requirements for UK businesses
- [ ] **Mobile tap targets:** Links and buttons must be at least 44x44px — minimal designs often make these too small

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Typography breaks on mobile | LOW | Add `clamp()` type scale and test at 320px — CSS-only fix |
| Minimal design with no content | MEDIUM | Requires copywriting, not code — block time for writing, not just building |
| Substack integration looks broken | LOW | Replace iframes with RSS card layout — half-day refactor |
| Contact form not receiving emails | LOW | Switch form service or add serverless function — 1-2 hour fix |
| Poor font loading performance | LOW | Self-host, subset, preload — 2-3 hour refactor |
| Missing SEO fundamentals | MEDIUM | Retrofit structured data and meta tags across all pages — tedious but straightforward |
| Whitespace killing scannability | LOW | Adjust CSS custom property spacing scale — quick iteration |
| Weak case studies | HIGH | Requires rewriting content with client input — cannot be rushed |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Typography breaks on mobile | Phase 1: Design System | Test all headings at 320px, 375px, 768px, 1440px viewports |
| Minimal = no content | Phase 1-2: Design + Content | Every page has specific claims, numbers, or outcomes |
| Substack integration mismatch | Phase 3: Blog Integration | Blog cards visually match the rest of the site |
| Contact form failures | Phase 2-3: Interactive Elements | Send 3 test submissions, verify inbox delivery |
| Font loading performance | Phase 1: Foundation | Lighthouse performance score 95+, no layout shift on font load |
| SEO gaps | Phase 1 (templates) + Phase 4 (validation) | LinkedIn preview looks correct, structured data validates |
| Whitespace excess | Phase 2: Page Templates | CTA visible without scrolling at every breakpoint |
| Weak case studies | Phase 2: Content | Every case study has a measurable outcome |

## Sources

- Training data patterns from consultancy/portfolio website development (MEDIUM confidence)
- Web font loading best practices from Google's web.dev documentation (HIGH confidence — well-established patterns)
- Core Web Vitals metrics and thresholds from Google documentation (HIGH confidence)
- Substack RSS/embed integration patterns from developer community discussions (MEDIUM confidence)
- UK business website legal requirements (MEDIUM confidence — verify current ICO guidance)

---
*Pitfalls research for: Zero Fluff consultancy website*
*Researched: 2026-03-12*
