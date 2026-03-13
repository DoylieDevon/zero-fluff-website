# Phase 4: Launch Readiness - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

The site becomes discoverable by search engines, legally compliant under UK ICO requirements, and live on zerofluff.co.uk with HTTPS. This includes SEO metadata, structured data, sitemap, privacy policy, custom 404, favicon set, domain configuration, and Resend domain verification. No analytics at launch.

</domain>

<decisions>
## Implementation Decisions

### Analytics & Cookies
- No analytics at launch — can be added later (v2)
- No cookie banner needed (SEO-05 requirement is N/A)
- If analytics are added later, Plausible or similar privacy-first tool preferred

### Social Sharing / OpenGraph
- Single site-wide default OG image for all pages
- Twitter card type: `summary_large_image`
- Every page gets unique `<title>`, `<meta description>`, and OG tags via BaseHead.astro props
- Canonical URL format: `https://zerofluff.co.uk` (no www)

### Favicon
- Proper favicon set (favicon.ico, apple-touch-icon, webmanifest) generated from user-provided source image
- User will supply the source image — implementation should support easy swap

### Custom 404 Page
- On-brand 404 page with straight-talking message and link back to homepage
- Uses BaseLayout, consistent with site design

### Privacy Policy
- Plain English tone matching the Zero Fluff voice — no legalese
- Scope: contact form data only (name, email, message sent via Resend)
- Entity: Zero Fluff, Totnes, Devon (sole trader, no company registration)
- UK ICO compliant — lawful basis, data retention, rights, contact details
- Link placement: footer only

### Domain & Email
- Domain registered at GoDaddy — DNS needs pointing to Vercel
- Redirect www.zerofluff.co.uk → zerofluff.co.uk (apex preferred)
- HTTPS enforced on all pages (Vercel handles this automatically)
- Resend domain verification for zerofluff.co.uk
- Contact form "from" address: andy@zerofluff.co.uk
- Contact form delivery: andy@zerofluff.co.uk
- No redirects from old site URLs needed

### Sitemap & Robots
- Auto-generated sitemap.xml at root
- robots.txt allowing all crawlers

### Structured Data
- LocalBusiness schema on homepage (or site-wide)
- Covers: business name, location (Totnes, Devon), service type, URL

### Claude's Discretion
- OG image design (likely typography on solid background, on-brand)
- 404 page copy/message
- Exact meta description wording per page
- Structured data detail level beyond core LocalBusiness fields
- Whether to add breadcrumb structured data on inner pages

</decisions>

<specifics>
## Specific Ideas

- Privacy policy should feel like a real person wrote it — "Here's what we collect and why" not "The Data Controller hereby..."
- 404 page is an opportunity for brand personality — keep it brief and helpful
- OG image should look good on LinkedIn specifically (Andy's primary sharing platform for consultancy)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BaseHead.astro`: Already has `title` and `description` props — extend with OG tags, structured data
- `BaseLayout.astro`: Wraps all pages — 404 and privacy policy will use this
- `Footer.astro`: Privacy policy link goes here
- `CTA.astro`: Could be reused on 404 page for "back to homepage" action

### Established Patterns
- Astro 6 with `export const prerender = true` for static pages
- CSS custom properties for all design tokens
- `.container .narrow .stack` layout composition
- Vercel adapter with hybrid output mode (static pages prerendered, contact server-rendered)

### Integration Points
- `src/components/BaseHead.astro` — add OG meta tags, structured data JSON-LD
- `src/pages/` — new pages: privacy.astro, 404.astro
- `src/components/Footer.astro` — add privacy policy link
- `astro.config.mjs` — add @astrojs/sitemap integration
- `public/` — favicon files, robots.txt, OG image
- Vercel project settings — domain configuration
- Resend dashboard — domain verification DNS records
- GoDaddy DNS — Vercel and Resend DNS records

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-launch-readiness*
*Context gathered: 2026-03-13*
