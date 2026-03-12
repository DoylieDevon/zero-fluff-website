# Phase 2: Core Pages - Research

**Researched:** 2026-03-12
**Domain:** Astro 6.x page authoring, Resend email integration, contact form handling
**Confidence:** HIGH

## Summary

Phase 2 builds four pages (homepage, services, about, contact) on top of the Phase 1 foundation. The existing codebase already has a working BaseLayout, Header, Footer, design token system with fluid typography and spacing, scroll-reveal animations, and ClientRouter page transitions. The current index.astro and about.astro are design-system test pages that will be replaced with real content.

The only technical complexity in this phase is the contact form with Resend email delivery. This requires adding the `@astrojs/vercel` adapter (v10.0.0) and the `resend` npm package (v6.9.3), then using Astro Actions (the modern pattern replacing raw API endpoints) for server-side form handling. Everything else is straightforward page authoring using existing CSS classes and components.

**Primary recommendation:** Use Astro Actions with `accept: 'form'` and Zod validation for the contact form. Keep all four pages static except the contact page which needs `export const prerender = false`. All page content uses the existing design tokens, `.section`, `.container`, `.narrow`, `.stack`, `.reveal` patterns from Phase 1.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Hero section with bold headline communicating "AI implementation that works" | Existing `.section`, `.container .narrow .stack`, `h1` with `--text-3xl` fluid scale, `.btn` CTA pattern |
| HOME-02 | Pain points section addressing why small businesses struggle with AI | New section using `.section .reveal`, `.container` wide layout for card-style content |
| HOME-03 | Services summary with link to full services page | New section with service cards, links to `/services` |
| HOME-04 | Social proof section (testimonials or case study highlights) | Testimonial component with quotes, attribution; uses existing typography tokens |
| HOME-05 | Clear call-to-action directing visitors to contact page | `.btn` class already exists; CTA section pattern with `h2` + `text-lg` + button |
| HOME-06 | Straight-talking, zero-jargon tone throughout all copy | Copy guidance in research; no technical dependency |
| SERV-01 | Dedicated services page explaining what Zero Fluff offers | New `src/pages/services.astro` using BaseLayout |
| SERV-02 | Simplified service offering focused on AI implementation | Single focused service description, not 4 separate packages |
| SERV-03 | Clear explanation of how the engagement works (process/steps) | "How I Work" section with numbered steps |
| SERV-04 | Call-to-action linking to contact page | Reusable CTA section component or pattern |
| ABOU-01 | Dedicated about page for Andy and Zero Fluff | Replace current test about.astro with real content |
| ABOU-02 | Track record section (30 years, Filmily, SelectCommerce, Shiift) | Career timeline/highlights section |
| ABOU-03 | Testimonials from previous clients displayed prominently | Testimonial component (reused from homepage) |
| CONT-01 | Dedicated contact page with enquiry form | New `src/pages/contact.astro` with `prerender = false` |
| CONT-02 | Form submissions delivered via email (Resend) | Astro Actions + Resend SDK + @astrojs/vercel adapter |
| CONT-03 | Form has client-side validation and clear success/error states | HTML5 validation + Zod server validation + `isInputError()` for field-level errors |
| CONT-04 | Contact details visible (email, location) | Static content alongside the form |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 6.0.4 | Static site generator | Already installed, all Phase 1 patterns working |
| @fontsource-variable/space-grotesk | 5.x | Heading font | Already installed and configured |
| @fontsource-variable/inter | 5.x | Body font | Already installed and configured |

### New for Phase 2
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| resend | 6.9.3 | Email delivery for contact form | Official Astro integration docs recommend it. 100 emails/day free tier. Simple API. |
| @astrojs/vercel | 10.0.0 | Vercel adapter for on-demand rendering | Required for Astro Actions (contact form). Enables serverless functions alongside static pages. |

### Not Needed
| Library | Why Not |
|---------|---------|
| zod (standalone) | Astro ships Zod built-in via `astro/zod` -- no separate install needed |
| formspree / formsubmit | Third-party form services add unnecessary dependency; Resend + Astro Actions is ~40 lines |
| react / any UI framework | All pages are pure Astro components with vanilla JS for the form submission script |

**Installation:**
```bash
npm install resend @astrojs/vercel
```

## Architecture Patterns

### Project Structure (Phase 2 additions)
```
src/
  actions/
    index.ts           # Astro Actions: contact form handler
  components/
    BaseHead.astro     # (exists) -- update with per-page OG support
    Header.astro       # (exists) -- add Services, Contact nav links
    Footer.astro       # (exists) -- add contact email, location
    ContactForm.astro  # NEW: form component with client-side JS
    Testimonial.astro  # NEW: reusable testimonial quote block
    CTA.astro          # NEW: reusable call-to-action section
  layouts/
    BaseLayout.astro   # (exists) -- no changes needed
  pages/
    index.astro        # REPLACE: real homepage content
    about.astro        # REPLACE: real about page content
    services.astro     # NEW: services page
    contact.astro      # NEW: contact page (prerender = false)
  styles/
    global.css         # (exists) -- extend with form styles, grid utilities
```

### Pattern 1: Astro Actions for Contact Form
**What:** Server-side form processing using Astro's built-in Actions system
**When to use:** Any form that needs server-side processing (email sending, database writes)
**Example:**
```typescript
// src/actions/index.ts
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Please enter a valid email'),
      message: z.string().min(10, 'Message must be at least 10 characters'),
      // Honeypot field -- bots fill this, humans don't see it
      website: z.string().max(0, 'Bot detected').optional().default(''),
    }),
    handler: async (input) => {
      // Honeypot check
      if (input.website && input.website.length > 0) {
        // Silently succeed to not tip off bots
        return { success: true };
      }

      const { error } = await resend.emails.send({
        from: 'Zero Fluff <hello@zerofluff.co.uk>',
        to: ['andy@zerofluff.co.uk'],
        replyTo: input.email,
        subject: `New enquiry from ${input.name}`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <h3>Message:</h3>
          <p>${input.message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send email. Please try again.',
        });
      }

      return { success: true };
    },
  }),
};
```
Source: [Resend + Astro official docs](https://resend.com/docs/send-with-astro), [Astro Actions docs](https://docs.astro.build/en/guides/actions/)

### Pattern 2: Client-Side Form Submission with Actions
**What:** Call Astro Actions from a client-side script for progressive form handling
**When to use:** When you want to show inline validation errors and success states without full page reload
**Example:**
```html
<script>
  import { actions, isInputError } from 'astro:actions';

  const form = document.getElementById('contact-form') as HTMLFormElement;
  const status = document.getElementById('form-status');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const { data, error } = await actions.contact(formData);

    if (error) {
      if (isInputError(error)) {
        // Show field-level validation errors
        Object.entries(error.fields).forEach(([field, messages]) => {
          const errorEl = document.getElementById(`${field}-error`);
          if (errorEl && messages) errorEl.textContent = messages.join(', ');
        });
      } else {
        status.textContent = 'Something went wrong. Please try again.';
      }
      return;
    }

    form.reset();
    status.textContent = 'Thanks! Your message has been sent.';
  });
</script>
```
Source: [Astro Actions docs](https://docs.astro.build/en/guides/actions/)

### Pattern 3: Reusable Section Components
**What:** Extract repeated page patterns (CTA, testimonials) into components
**When to use:** Any content block used on multiple pages
**Example:**
```astro
---
// src/components/CTA.astro
interface Props {
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
}
const {
  heading = "Ready to cut the fluff?",
  text = "Get in touch for a straight conversation about what AI can do for your business.",
  buttonText = "Get in Touch",
  buttonHref = "/contact",
} = Astro.props;
---
<section class="section reveal">
  <div class="container narrow stack">
    <h2>{heading}</h2>
    <p class="text-lg">{text}</p>
    <div>
      <a href={buttonHref} class="btn">{buttonText}</a>
    </div>
  </div>
</section>
```

### Pattern 4: Astro Config for Hybrid Rendering
**What:** Keep site static by default, enable server rendering only for contact form
**Example:**
```typescript
// astro.config.mjs
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://zerofluff.co.uk',
  adapter: vercel(),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
```

Then in `contact.astro`:
```astro
---
export const prerender = false;
import BaseLayout from '../layouts/BaseLayout.astro';
---
```

All other pages remain static (prerendered) by default. Only the contact page runs server-side.

Source: [Astro on-demand rendering docs](https://docs.astro.build/en/guides/on-demand-rendering/), [@astrojs/vercel docs](https://docs.astro.build/en/guides/integrations-guide/vercel/)

### Anti-Patterns to Avoid
- **Raw API endpoint instead of Actions:** `src/pages/api/contact.ts` is the old pattern. Astro Actions provide built-in Zod validation, type safety, and better error handling. Use Actions.
- **Client-side email sending:** Never expose the Resend API key in client-side code. Actions run server-side.
- **`output: 'server'` for the whole site:** Unnecessary. Keep default static output and opt individual pages into server rendering with `export const prerender = false`.
- **Separate Zod install:** Astro bundles Zod. Import from `astro/zod`, not `zod`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom regex validators | Zod schemas via `astro/zod` in Action `input` | Field-level error messages, type coercion, composable schemas for free |
| Email delivery | Raw SMTP / `nodemailer` | Resend SDK | Deliverability, spam scoring, templates, monitoring -- all handled |
| Server endpoints | Manual `src/pages/api/*.ts` routes | Astro Actions (`src/actions/index.ts`) | Type-safe, built-in validation, proper error handling |
| Spam protection | reCAPTCHA / hCaptcha | Honeypot field (hidden input) | Zero friction for users, effective for low-traffic sites, no third-party JS |
| Page transitions | Custom JS router | Astro ClientRouter (already configured) | Already working from Phase 1 |

## Common Pitfalls

### Pitfall 1: Resend Domain Not Verified
**What goes wrong:** Resend requires a verified sending domain. Without it, you can only send to the email address associated with your Resend account. In production, emails from an unverified domain bounce or land in spam.
**Why it happens:** Developers test with `onboarding@resend.dev` (Resend's test address) and forget to set up DNS records for the real domain.
**How to avoid:** Before deploying the contact form:
1. Add `zerofluff.co.uk` as a domain in Resend dashboard
2. Add the required DNS records (SPF, DKIM, DMARC)
3. Wait for verification (usually minutes)
4. Set the "from" address to use the verified domain: `hello@zerofluff.co.uk`
**Warning signs:** Emails work in dev but not in production; emails land in spam folder.

### Pitfall 2: Contact Page Prerender Not Disabled
**What goes wrong:** Astro Actions require server-side execution. If the contact page is prerendered (static), the form submission will fail at runtime with a cryptic error.
**Why it happens:** Forgetting `export const prerender = false` in the contact page frontmatter.
**How to avoid:** Always add `export const prerender = false` at the top of any page using Astro Actions. The build will warn if this is missing.
**Warning signs:** Form submission returns a 404 or unexpected error in production.

### Pitfall 3: Missing Adapter for Astro Actions
**What goes wrong:** Astro Actions require an SSR adapter. Without `@astrojs/vercel` installed and configured, the build fails or Actions are silently ignored.
**Why it happens:** The base Astro config from Phase 1 has no adapter (static-only).
**How to avoid:** Install `@astrojs/vercel` and add `adapter: vercel()` to `astro.config.mjs` before implementing any Actions.

### Pitfall 4: Env Variables Not Available on Vercel
**What goes wrong:** `RESEND_API_KEY` works locally via `.env` but is undefined in production.
**Why it happens:** Environment variables must be configured in Vercel's dashboard (Settings > Environment Variables), not just in the local `.env` file.
**How to avoid:** After deploying, add `RESEND_API_KEY` in Vercel project settings. Use Astro's `envField` schema for type-safe access.
**Warning signs:** Form works locally, fails silently in production.

### Pitfall 5: Honeypot Field Visible to Users
**What goes wrong:** The spam-protection honeypot field is visible in the form, confusing real users.
**Why it happens:** The hidden field is not properly hidden with CSS, or screen readers announce it.
**How to avoid:** Use `position: absolute; left: -9999px; opacity: 0; pointer-events: none;` and `tabindex="-1"` and `aria-hidden="true"` on the honeypot wrapper. Label it as "Do not fill this in" for any edge case.

### Pitfall 6: Navigation Not Updated
**What goes wrong:** Header still only shows Home and About links from Phase 1. New pages (Services, Contact) are unreachable via navigation.
**Why it happens:** Header.astro is an existing component from Phase 1 that needs updating.
**How to avoid:** Update Header.astro nav links early in the phase, before building individual pages.

## Code Examples

### Contact Form Component
```astro
---
// src/components/ContactForm.astro
---
<form id="contact-form" class="contact-form stack" novalidate>
  <div class="form-group">
    <label for="name">Your name</label>
    <input type="text" id="name" name="name" required autocomplete="name" />
    <span class="field-error" id="name-error" aria-live="polite"></span>
  </div>

  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" id="email" name="email" required autocomplete="email" />
    <span class="field-error" id="email-error" aria-live="polite"></span>
  </div>

  <div class="form-group">
    <label for="message">How can I help?</label>
    <textarea id="message" name="message" rows="5" required></textarea>
    <span class="field-error" id="message-error" aria-live="polite"></span>
  </div>

  <!-- Honeypot: hidden from users, bots fill it -->
  <div class="visually-hidden" aria-hidden="true">
    <label for="website">Leave this empty</label>
    <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
  </div>

  <button type="submit" class="btn">Send Message</button>
  <div id="form-status" class="form-status" aria-live="polite"></div>
</form>

<style>
  .contact-form {
    max-width: var(--content-width);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  label {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: var(--text-base);
  }

  input, textarea {
    padding: var(--space-sm);
    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
    font-size: var(--text-base);
    background: white;
    transition: border-color 0.2s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .field-error {
    color: #DC2626;
    font-size: var(--text-sm);
    min-height: 1.2em;
  }

  .form-status {
    font-size: var(--text-base);
    font-weight: 600;
  }

  .form-status.success {
    color: #16A34A;
  }

  .form-status.error {
    color: #DC2626;
  }

  .visually-hidden {
    position: absolute;
    left: -9999px;
    opacity: 0;
    pointer-events: none;
    height: 0;
    overflow: hidden;
  }
</style>

<script>
  import { actions, isInputError } from 'astro:actions';

  function initContactForm() {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const status = document.getElementById('form-status') as HTMLElement;
    if (!form || !status) return;

    // Clear field errors
    function clearErrors() {
      form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
      status.textContent = '';
      status.className = 'form-status';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const formData = new FormData(form);
      const { data, error } = await actions.contact(formData);

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';

      if (error) {
        if (isInputError(error)) {
          Object.entries(error.fields).forEach(([field, messages]) => {
            const errorEl = document.getElementById(`${field}-error`);
            if (errorEl && messages) errorEl.textContent = messages.join(', ');
          });
        } else {
          status.textContent = 'Something went wrong. Please try again or email directly.';
          status.className = 'form-status error';
        }
        return;
      }

      form.reset();
      status.textContent = 'Thanks! Your message has been sent. I will be in touch soon.';
      status.className = 'form-status success';
    });
  }

  document.addEventListener('astro:page-load', initContactForm);
  initContactForm();
</script>
```

### Testimonial Component
```astro
---
// src/components/Testimonial.astro
interface Props {
  quote: string;
  name: string;
  role?: string;
  company?: string;
}
const { quote, name, role, company } = Astro.props;
---
<blockquote class="testimonial">
  <p class="testimonial-quote">{quote}</p>
  <footer class="testimonial-attribution">
    <strong>{name}</strong>
    {(role || company) && (
      <span class="text-muted">
        {role}{role && company ? ', ' : ''}{company}
      </span>
    )}
  </footer>
</blockquote>

<style>
  .testimonial {
    border-left: 3px solid var(--color-accent);
    padding-left: var(--space-md);
  }

  .testimonial-quote {
    font-size: var(--text-lg);
    font-style: italic;
    line-height: 1.5;
    margin-block-end: var(--space-sm);
  }

  .testimonial-attribution {
    font-size: var(--text-sm);
  }
</style>
```

### Homepage Section Pattern
```astro
<!-- Pain Points Section Example -->
<section class="section reveal">
  <div class="container stack-lg">
    <div class="narrow stack">
      <h2>Sound familiar?</h2>
      <p class="text-muted">Most small businesses hit the same walls with AI.</p>
    </div>
    <div class="pain-points-grid">
      <!-- Use CSS Grid for cards at wider container width -->
    </div>
  </div>
</section>
```

### CSS Grid Addition for Cards
```css
/* Add to global.css for Phase 2 */
.grid-2 {
  display: grid;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.grid-3 {
  display: grid;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `src/pages/api/contact.ts` raw endpoint | Astro Actions (`src/actions/index.ts`) | Astro 4.15+ (2024) | Built-in Zod validation, type safety, better error handling |
| `output: 'hybrid'` in config | Default static + `export const prerender = false` per page | Astro 5.0+ (late 2024) | No need to set output mode; just add adapter and opt pages in |
| Separate `zod` install | `astro/zod` built-in | Astro 4.x+ | One fewer dependency |
| `import.meta.env.VARIABLE` raw | `envField` schema in config | Astro 5.0+ | Type-safe, validated env vars with clear server/client/secret distinctions |

## Open Questions

1. **Resend domain verification timing**
   - What we know: Resend requires DNS records for the sending domain
   - What's unclear: Whether zerofluff.co.uk domain DNS is accessible yet (domain config is Phase 4)
   - Recommendation: Use `onboarding@resend.dev` for development/testing. Switch to `hello@zerofluff.co.uk` in Phase 4 when domain is configured. The Resend API key can be set up now.

2. **Testimonial content availability**
   - What we know: Requirements call for client testimonials (ABOU-03, HOME-04)
   - What's unclear: Whether Andy has real testimonial quotes ready
   - Recommendation: Write placeholder testimonials in the "Zero Fluff" voice with realistic structure (name, role, company, quote). Replace with real ones when available. Do not block on this.

3. **Contact email address**
   - What we know: Form needs to send to Andy's email
   - What's unclear: Which email address to use as the recipient
   - Recommendation: Use `RESEND_API_KEY` env var for the API key and hardcode `andy@zerofluff.co.uk` as the recipient (or make it an env var too). For now, any email works for testing.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Astro build + manual verification (no unit test framework configured) |
| Config file | None -- Phase 1 did not set up testing |
| Quick run command | `npm run build` (catches type errors, broken imports, missing env) |
| Full suite command | `npm run build && npm run preview` (build + serve for manual check) |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HOME-01 | Hero section with bold headline | manual | `npm run build` (page compiles) | n/a |
| HOME-02 | Pain points section | manual | `npm run build` | n/a |
| HOME-03 | Services summary links to /services | manual | `npm run build` | n/a |
| HOME-04 | Social proof / testimonials | manual | `npm run build` | n/a |
| HOME-05 | CTA links to /contact | manual | `npm run build` | n/a |
| HOME-06 | Zero-jargon tone | manual-only | n/a -- copy review | n/a |
| SERV-01 | Services page exists | smoke | `npm run build` (page compiles) | n/a |
| SERV-02 | Single focused AI service | manual-only | n/a -- content review | n/a |
| SERV-03 | Process/steps explanation | manual | `npm run build` | n/a |
| SERV-04 | CTA links to /contact | manual | `npm run build` | n/a |
| ABOU-01 | About page exists | smoke | `npm run build` | n/a |
| ABOU-02 | Track record section | manual | `npm run build` | n/a |
| ABOU-03 | Testimonials displayed | manual | `npm run build` | n/a |
| CONT-01 | Contact page with form | smoke | `npm run build` | n/a |
| CONT-02 | Form sends email via Resend | integration | Manual: submit form on preview, check email | n/a |
| CONT-03 | Client-side + server validation | integration | Manual: submit empty form, check error states | n/a |
| CONT-04 | Contact details visible | manual | `npm run build` | n/a |

### Sampling Rate
- **Per task commit:** `npm run build` (ensures no compilation errors)
- **Per wave merge:** `npm run build && npm run preview` + manual viewport check at 375px, 768px, 1440px
- **Phase gate:** Full build + contact form end-to-end test (submit real form, verify email arrives)

### Wave 0 Gaps
- [ ] `.env.example` -- document required env vars (RESEND_API_KEY)
- [ ] Resend API key -- must be created in Resend dashboard before contact form testing
- [ ] Vercel env vars -- must be set in Vercel dashboard for production

## Sources

### Primary (HIGH confidence)
- [Resend + Astro official docs](https://resend.com/docs/send-with-astro) -- Actions pattern, SDK usage
- [Astro Actions docs](https://docs.astro.build/en/guides/actions/) -- defineAction, form handling, Zod validation, error handling
- [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/) -- prerender = false, adapter requirement
- [@astrojs/vercel docs](https://docs.astro.build/en/guides/integrations-guide/vercel/) -- adapter config, v10.0.0
- npm registry -- resend 6.9.3, @astrojs/vercel 10.0.0 (verified via `npm view`)

### Secondary (MEDIUM confidence)
- [Contact form with Astro Actions and Resend tutorial](https://contentisland.net/en/blog/astro-contact-form-server-actions-resend/) -- full working example with env schema
- [Astro 6 Beta announcement](https://astro.build/blog/astro-6-beta/) -- confirmed Actions support in v6

### Tertiary (LOW confidence)
- Honeypot spam protection pattern -- well-established technique but no official Astro recommendation; effective for low-traffic sites

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- versions verified via npm, official docs consulted
- Architecture (pages): HIGH -- straightforward Astro page authoring with existing design system
- Architecture (contact form): HIGH -- official Resend + Astro docs provide exact pattern
- Pitfalls: MEDIUM -- based on established patterns and official docs, but Resend domain setup timing is project-specific

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (stable domain, 30 days)
