# Phase 4: Launch Readiness - Research

**Researched:** 2026-03-13
**Domain:** SEO metadata, structured data, legal compliance, domain/DNS configuration
**Confidence:** HIGH

## Summary

Phase 4 makes the Zero Fluff website discoverable, legally compliant, and live on its production domain. The work spans four distinct areas: (1) SEO metadata -- extending the existing `BaseHead.astro` with OpenGraph tags, canonical URLs, and Twitter card meta; (2) structured data and sitemap -- adding `@astrojs/sitemap` integration and LocalBusiness JSON-LD; (3) legal and content pages -- privacy policy, custom 404, favicon set, robots.txt; and (4) domain and email infrastructure -- GoDaddy DNS pointing to Vercel, Resend domain verification.

The existing codebase already has `site: 'https://zerofluff.co.uk'` configured in `astro.config.mjs`, `BaseHead.astro` accepts `title` and `description` props, and all pages except `/contact` are statically prerendered. This makes adding the sitemap integration and meta tags straightforward -- the foundations are solid.

**Primary recommendation:** Extend `BaseHead.astro` to accept an `image` prop for OG tags, add `@astrojs/sitemap` as an integration, inject LocalBusiness JSON-LD on the homepage, and create `privacy.astro` and `404.astro` pages. Domain/DNS configuration is manual (GoDaddy + Vercel + Resend dashboards) and should be documented as checklist steps rather than code tasks.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- No analytics at launch -- no cookie banner needed (SEO-05 is N/A)
- Single site-wide default OG image for all pages (1200x630px)
- Twitter card type: `summary_large_image`
- Every page gets unique `<title>`, `<meta description>`, and OG tags via BaseHead.astro props
- Canonical URL format: `https://zerofluff.co.uk` (no www)
- Proper favicon set (favicon.ico, apple-touch-icon, webmanifest) from user-provided source image
- On-brand 404 page with straight-talking message, uses BaseLayout
- Privacy policy: plain English, Zero Fluff voice, UK ICO compliant, sole trader, contact form data only
- Privacy policy link in footer only
- Domain at GoDaddy, DNS pointing to Vercel, www redirects to apex
- HTTPS enforced (Vercel automatic)
- Resend domain verification for zerofluff.co.uk
- Contact form from/to: andy@zerofluff.co.uk
- Auto-generated sitemap.xml, robots.txt allowing all crawlers
- LocalBusiness schema on homepage (or site-wide)

### Claude's Discretion
- OG image design (typography on solid background, on-brand)
- 404 page copy/message
- Exact meta description wording per page
- Structured data detail level beyond core LocalBusiness fields
- Whether to add breadcrumb structured data on inner pages

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Every page has unique title, description, and OpenGraph meta tags | Extend BaseHead.astro Props interface with `image` and `canonicalURL`; add og:*, twitter:* meta tags |
| SEO-02 | Structured data (LocalBusiness schema) for search visibility | JSON-LD script tag in BaseHead or homepage; schema.org LocalBusiness with name, address, url, service type |
| SEO-03 | Auto-generated sitemap.xml | @astrojs/sitemap v3.7.x integration; site URL already configured |
| SEO-04 | Privacy policy page compliant with UK ICO requirements | New src/pages/privacy.astro; ICO required sections documented below |
| SEO-05 | Cookie notice if analytics are used | N/A -- no analytics at launch per user decision |
| DEPL-02 | zerofluff.co.uk domain configured and serving the site | GoDaddy A record to Vercel IP + CNAME for www; Vercel project domain settings |
| DEPL-03 | HTTPS enforced on all pages | Automatic with Vercel custom domain -- no code changes needed |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @astrojs/sitemap | ^3.7.1 | Auto-generated sitemap.xml | Official Astro integration; reads `site` config; generates at build time |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| Vercel Dashboard | Domain configuration, HTTPS provisioning | Manual step during domain setup |
| GoDaddy DNS | A record and CNAME configuration | Manual step; point apex to Vercel IP |
| Resend Dashboard | Domain verification, DNS records | Manual step; SPF/DKIM/MX records at GoDaddy |
| opengraph.xyz | OG tag validation/preview | Testing after deployment |
| Google Rich Results Test | Structured data validation | Testing LocalBusiness JSON-LD |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static OG image | Dynamic OG generation (Satori/@vercel/og) | Over-engineering for a consultancy site with ~7 pages; static image is simpler and sufficient |
| Manual sitemap | @astrojs/sitemap | No reason to hand-roll; the integration handles everything |
| Schema.org via plugin | Inline JSON-LD | Direct JSON-LD is simpler for a single LocalBusiness block |

**Installation:**
```bash
npx astro add sitemap
```

## Architecture Patterns

### New/Modified Files
```
src/
  components/
    BaseHead.astro        # MODIFY: add OG/Twitter meta, canonical, JSON-LD
    Footer.astro          # MODIFY: add privacy policy link
  pages/
    privacy.astro         # NEW: privacy policy page
    404.astro             # NEW: custom 404 page
public/
  robots.txt              # NEW: allow all crawlers
  og-image.png            # NEW: 1200x630 default OG image
  favicon.ico             # NEW: traditional favicon
  apple-touch-icon.png    # NEW: iOS home screen icon
  site.webmanifest        # NEW: PWA manifest for favicon
astro.config.mjs          # MODIFY: add sitemap integration
```

### Pattern 1: OpenGraph Meta Tags in BaseHead.astro
**What:** Extend the existing BaseHead component to emit OG and Twitter meta tags
**When to use:** Every page automatically gets these via BaseLayout > BaseHead
**Example:**
```astro
---
interface Props {
  title?: string;
  description?: string;
  image?: string;
  canonicalURL?: URL | string;
}

const {
  title = 'Zero Fluff - AI Implementation That Works',
  description = 'Straight-talking AI consultancy for small businesses. No jargon, no fluff, just results.',
  image = '/og-image.png',
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const imageURL = new URL(image, Astro.site);
---

<!-- Existing tags -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content={description} />
<title>{title}</title>
<link rel="canonical" href={canonicalURL} />

<!-- OpenGraph -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageURL} />
<meta property="og:site_name" content="Zero Fluff" />
<meta property="og:locale" content="en_GB" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={imageURL} />
```

### Pattern 2: LocalBusiness JSON-LD
**What:** Structured data for search engines, injected as a script tag
**When to use:** Homepage (at minimum), optionally site-wide
**Example:**
```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Zero Fluff",
  "description": "Straight-talking AI consultancy for small businesses",
  "url": "https://zerofluff.co.uk",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Totnes",
    "addressRegion": "Devon",
    "addressCountry": "GB"
  },
  "founder": {
    "@type": "Person",
    "name": "Andy Doyle"
  },
  "areaServed": "GB",
  "serviceType": ["AI Implementation", "AI Consultancy", "Business Automation"]
})} />
```

### Pattern 3: Astro 404 Page
**What:** Custom 404 page at `src/pages/404.astro`
**When to use:** Astro automatically serves this for unmatched routes
**Note:** Must use `export const prerender = true` (Astro requires 404 pages to be prerendered)

### Pattern 4: Sitemap Integration with Filter
**What:** Auto-generate sitemap excluding specific pages
**Example:**
```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zerofluff.co.uk',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://zerofluff.co.uk/404/',
    }),
  ],
});
```

### Anti-Patterns to Avoid
- **Hardcoding absolute URLs in meta tags:** Use `Astro.site` and `Astro.url` to construct canonical and OG URLs dynamically
- **Putting JSON-LD in the body:** Must be in `<head>` or `<script>` for proper parsing
- **Using `set:html` without `JSON.stringify`:** Astro's `set:html` on script tags is the correct way to inject JSON-LD; using template literals risks XSS
- **Forgetting `prerender = true` on 404.astro:** Astro requires 404 pages to be static

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML builder | @astrojs/sitemap | Handles pagination, sitemap index, integrates with Astro's route system |
| Favicon generation | Manual resizing | realfavicongenerator.net or similar | Generates all sizes, formats, and the webmanifest in one go |
| OG image creation | Complex design tool | Simple Figma/Canva export at 1200x630 | One static image is all that's needed for this site |
| HTTPS certificates | Manual cert management | Vercel automatic SSL | Vercel provisions and renews Let's Encrypt certs automatically |

## Common Pitfalls

### Pitfall 1: Missing `site` in Astro Config for Sitemap
**What goes wrong:** Sitemap generates with localhost URLs or fails entirely
**Why it happens:** `@astrojs/sitemap` requires the `site` property in `astro.config.mjs`
**How to avoid:** Already handled -- `site: 'https://zerofluff.co.uk'` is present in the config
**Warning signs:** Build warnings about missing site configuration

### Pitfall 2: OG Image Path Not Absolute
**What goes wrong:** Social platforms show broken image or no preview
**Why it happens:** og:image must be a fully qualified URL (https://...), not a relative path
**How to avoid:** Construct image URL with `new URL(image, Astro.site)` to get absolute URL
**Warning signs:** Test at opengraph.xyz before launch

### Pitfall 3: DNS Propagation Delays
**What goes wrong:** Domain shows "not found" or SSL cert errors after setup
**Why it happens:** DNS changes take 1-48 hours to propagate globally
**How to avoid:** Set up DNS records early; don't panic if it takes time. Vercel auto-provisions SSL once DNS resolves
**Warning signs:** Vercel dashboard shows "Invalid Configuration" until DNS propagates

### Pitfall 4: Resend Domain Verification Timeout
**What goes wrong:** Domain stays "pending" and emails fail
**Why it happens:** DNS records not added correctly, or propagation incomplete. Resend times out after 72 hours
**How to avoid:** Add all required records (SPF TXT, DKIM TXT, MX) at GoDaddy immediately; use Resend's "Check DNS" button to verify
**Warning signs:** Status remains "pending" after 24 hours

### Pitfall 5: SSR Routes Missing from Sitemap
**What goes wrong:** Server-rendered pages (like /contact) don't appear in sitemap
**Why it happens:** `@astrojs/sitemap` cannot generate entries for SSR dynamic routes
**How to avoid:** The contact page uses `prerender = false` but has a fixed URL. Add it manually via the `customPages` option if needed
**Warning signs:** Check generated sitemap-0.xml to verify all pages are listed

### Pitfall 6: Privacy Policy Missing Required ICO Sections
**What goes wrong:** Non-compliance with UK GDPR
**Why it happens:** Missing required sections like lawful basis, retention periods, or complaint rights
**How to avoid:** Follow the ICO checklist (documented below in Code Examples)
**Warning signs:** Review against the ICO's privacy notice generator output

## Code Examples

### robots.txt (static file in public/)
```txt
User-agent: *
Allow: /

Sitemap: https://zerofluff.co.uk/sitemap-index.xml
```

### site.webmanifest
```json
{
  "name": "Zero Fluff",
  "short_name": "Zero Fluff",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

### Favicon Links in BaseHead.astro
```html
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

### UK ICO Privacy Policy Required Sections
The privacy policy page must include these sections:
1. **Who we are** -- Business name (Zero Fluff), sole trader, location (Totnes, Devon), contact email
2. **What data we collect** -- Name, email address, message content (from contact form only)
3. **How we collect it** -- Directly from you via the contact form
4. **Why we use it (purpose)** -- To respond to your enquiry
5. **Lawful basis** -- Legitimate interests (responding to a business enquiry you initiated)
6. **Who we share it with** -- Resend (email delivery service); no other third parties
7. **How long we keep it** -- State retention period (e.g., "12 months after last communication, then deleted")
8. **Your rights** -- Right to access, rectify, erase, restrict processing, object, data portability
9. **How to complain** -- Contact Zero Fluff first; then ICO (ico.org.uk, 0303 123 1113)
10. **Updates** -- "Last updated: [date]"

### DNS Records Checklist (Manual Steps)

**GoDaddy DNS for Vercel (apex domain):**
| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 (Vercel IP -- confirm in Vercel dashboard) |
| CNAME | www | cname.vercel-dns.com. |

**GoDaddy DNS for Resend (email):**
| Type | Name | Value |
|------|------|-------|
| TXT | (from Resend dashboard) | SPF record value |
| TXT | (from Resend dashboard) | DKIM record value |
| MX | (from Resend dashboard) | MX record value |

Note: Exact Resend DNS values are generated when you add zerofluff.co.uk in the Resend dashboard. They cannot be determined in advance.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Multiple sitemap plugins | @astrojs/sitemap official | Astro 2.0+ (2023) | Single official integration, auto-configured |
| Microdata/RDFa for structured data | JSON-LD | Google recommendation since 2017 | JSON-LD is Google's preferred format |
| Complex cookie consent frameworks | No banner if no tracking cookies | UK ICO guidance | No analytics = no cookie banner needed |
| Manual HTTPS with Let's Encrypt | Vercel automatic SSL | Vercel has always done this | Zero configuration needed |

## Open Questions

1. **Vercel A Record IP**
   - What we know: Vercel typically uses 76.76.21.21 but this should be confirmed
   - What's unclear: Vercel may assign a project-specific IP
   - Recommendation: Check Vercel dashboard when adding domain; it shows the exact IP to use

2. **OG Image Asset**
   - What we know: Needs to be 1200x630px PNG, on-brand
   - What's unclear: Whether to create a simple text-on-background image or something more designed
   - Recommendation: Create a simple typography-based image (site name + tagline on brand background colour) -- matches the whitespace-heavy design ethos

3. **Favicon Source Image**
   - What we know: User will supply source image
   - What's unclear: Whether it exists yet
   - Recommendation: Use favicon.svg as the source for now; generate full favicon set via realfavicongenerator.net when source image is available

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed |
| Config file | None |
| Quick run command | `npx astro build` (build validates pages compile) |
| Full suite command | `npx astro build && npx astro preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | Every page has unique title, description, OG tags | smoke | `npx astro build` + manual check of built HTML | No dedicated test |
| SEO-02 | LocalBusiness JSON-LD present in page source | smoke | `npx astro build` + grep for `application/ld+json` in dist | No dedicated test |
| SEO-03 | sitemap.xml generated at root | smoke | `npx astro build && ls dist/sitemap-index.xml` | No dedicated test |
| SEO-04 | Privacy policy page exists with required sections | smoke | `npx astro build && ls dist/privacy/index.html` | No dedicated test |
| SEO-05 | Cookie notice if analytics used | manual-only | N/A -- no analytics at launch | N/A |
| DEPL-02 | Domain configured and serving site | manual-only | `curl -sI https://zerofluff.co.uk` (after DNS setup) | N/A |
| DEPL-03 | HTTPS enforced | manual-only | `curl -sI http://zerofluff.co.uk` (check redirect to HTTPS) | N/A |

### Sampling Rate
- **Per task commit:** `npx astro build` (validates all pages compile and sitemap generates)
- **Per wave merge:** `npx astro build && npx astro preview` (full build + local preview)
- **Phase gate:** Full build green + manual domain/HTTPS verification

### Wave 0 Gaps
- [ ] No test framework installed -- build success is the primary validation for this phase
- [ ] Manual verification checklist needed for DNS/domain/HTTPS (not automatable pre-deploy)
- [ ] Consider adding a simple build-output validation script that checks for OG tags and JSON-LD in generated HTML

## Sources

### Primary (HIGH confidence)
- [Astro Sitemap Integration Docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Installation, configuration, SSR limitations
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness) - Required/recommended properties
- [Google LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Google's implementation guidance
- [ICO Privacy Notice Guidance](https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/how-to-write-a-privacy-notice-and-what-goes-in-it/) - Required privacy notice sections

### Secondary (MEDIUM confidence)
- [Vercel Custom Domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain) - DNS setup process
- [Resend Domain Verification](https://resend.com/docs/dashboard/domains/introduction) - SPF/DKIM/MX records
- [OG Image Size Guide](https://myogimage.com/blog/og-image-size-meta-tags-complete-guide) - 1200x630 universal standard
- [LinkedIn OG Requirements](https://www.linkedin.com/help/linkedin/answer/a521928) - 1.91:1 aspect ratio

### Tertiary (LOW confidence)
- Vercel A record IP (76.76.21.21) -- commonly cited but should be confirmed in dashboard

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - @astrojs/sitemap is the official, documented integration; JSON-LD is Google's preferred format
- Architecture: HIGH - Extending existing BaseHead.astro is the established Astro pattern; codebase already structured for this
- Pitfalls: HIGH - Well-documented gotchas from official docs and community experience
- DNS/Domain: MEDIUM - Process is standard but exact values must be confirmed in dashboards at setup time

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (stable domain -- Astro sitemap, schema.org, ICO requirements change slowly)
