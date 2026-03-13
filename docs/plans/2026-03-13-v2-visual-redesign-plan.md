# Zero Fluff V2 — Visual Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild all 5 pages (homepage, services, about, blog, contact) to match the Pencil "Zero Fluff V2 — Bold Visual" designs — image-heavy, dark overlays, Inter font, red accent (#FF3B30).

**Architecture:** Replace CSS design tokens and rebuild each page component-by-component. The Astro framework, routing, SEO, form logic, and content collections are untouched. Shared components (nav, footer) are built first, then each page.

**Tech Stack:** Astro 6, Inter variable font (already installed via @fontsource-variable/inter), vanilla CSS, Unsplash image URLs for backgrounds.

**Design reference:** `docs/plans/2026-03-13-v2-visual-redesign.md` — full token and section specs.

**Verify after each task:** `npx astro build` — must exit 0 with no errors.

---

## Key Design Tokens (from Pencil)

```css
/* Use these exact values throughout */
--font: 'Inter Variable', system-ui, sans-serif;
--color-accent: #FF3B30;
--color-bg: #FAFAFA;
--color-text: #000000;
--color-text-secondary: #666666;
--color-text-muted: #A1A1AA;
--color-text-on-dark: #CCCCCC;
--color-dark-bg: #0D0D0D;
--color-border: #E4E4E7;
```

---

## Task 1: Update CSS Design Tokens & Font

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/BaseHead.astro`

**What to do:**

In `global.css`, replace the entire `:root` block and base typography with:

```css
:root {
  --font: 'Inter Variable', system-ui, sans-serif;

  /* Colors */
  --color-bg: #FAFAFA;
  --color-text: #000000;
  --color-text-secondary: #666666;
  --color-text-muted: #A1A1AA;
  --color-text-on-dark: #CCCCCC;
  --color-accent: #FF3B30;
  --color-accent-hover: #CC2F25;
  --color-dark-bg: #0D0D0D;
  --color-border: #E4E4E7;

  /* Layout */
  --max-width: 1440px;
  --page-padding: 0 120px;
}

body {
  font-family: var(--font);
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

/* Remove all h1-h4 font-family overrides referencing Space Grotesk / --font-heading */
```

In `BaseHead.astro`:
- Remove the `@fontsource-variable/space-grotesk` import and its preload link
- Keep only the Inter import and preload
- Update the preload href to reference Inter's woff2 file

```astro
---
import '@fontsource-variable/inter';
import '../styles/global.css';
import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
---
<link rel="preload" href={interWoff2} as="font" type="font/woff2" crossorigin />
```

**Verify:**
```bash
npx astro build
```
Expected: exit 0, no font-related errors.

**Commit:**
```bash
git add src/styles/global.css src/components/BaseHead.astro
git commit -m "feat(v2): update design tokens — Inter font, red accent, new color palette"
```

---

## Task 2: Rebuild Header

**Files:**
- Modify: `src/components/Header.astro`

**Design spec (from Pencil):**
- White background (#FFFFFF), 1px bottom border #E4E4E7
- Logo: "Zero Fluff", Inter 24px 700, black
- Nav links: Inter 14px 500, active=#000000, inactive=#71717A, gap 32px
- CTA button: "Book a Free Chat", white text, black (#000000) background, padding 12px 24px, no border-radius
- Full width, padding 20px 48px

**Replace the entire Header.astro with:**

```astro
---
const currentPath = Astro.url.pathname;
---

<header class="site-header">
  <a href="/" class="logo">Zero Fluff</a>
  <nav class="nav-links">
    <a href="/" class:list={['nav-link', { active: currentPath === '/' }]}>Home</a>
    <a href="/services" class:list={['nav-link', { active: currentPath.startsWith('/services') }]}>Services</a>
    <a href="/about" class:list={['nav-link', { active: currentPath.startsWith('/about') }]}>About</a>
    <a href="/blog" class:list={['nav-link', { active: currentPath.startsWith('/blog') }]}>Blog</a>
    <a href="/contact" class:list={['nav-link', { active: currentPath.startsWith('/contact') }]}>Contact</a>
  </nav>
  <a href="/contact" class="nav-cta">Book a Free Chat</a>
</header>

<style>
  .site-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    background: #fff;
    border-bottom: 1px solid #E4E4E7;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .logo {
    font-size: 24px;
    font-weight: 700;
    color: #000;
    text-decoration: none;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .nav-link {
    font-size: 14px;
    font-weight: 500;
    color: #71717A;
    text-decoration: none;
    transition: color 0.15s;
  }
  .nav-link:hover, .nav-link.active {
    color: #000;
  }
  .nav-cta {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background: #000;
    padding: 12px 24px;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .nav-cta:hover { opacity: 0.8; }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .site-header { padding: 16px 24px; }
  }
</style>
```

**Verify:** `npx astro build`

**Commit:**
```bash
git add src/components/Header.astro
git commit -m "feat(v2): rebuild header — Inter, black CTA, sticky nav"
```

---

## Task 3: Rebuild Footer

**Files:**
- Modify: `src/components/Footer.astro`

**Design spec:** Dark background #0D0D0D, 4-column layout, padding 64px 120px 40px 120px.

Columns:
1. **Brand** — "Zero Fluff" (white 28px 800), tagline (grey 14px, 340px wide), location (red pin icon + "Totnes, Devon TQ9, UK")
2. **Company** — red "COMPANY" header (11px 700 uppercase letter-spacing:3), links: Home, About, Blog, Contact
3. **Services** — red "SERVICES" header, links: AI Quick Start, Automation Setup, Ongoing Support, Bigger Projects
4. **Connect** — red "CONNECT" header, email (andy@zerofluff.co.uk), hours (Mon–Fri 09:00–17:00)

Bottom bar: copyright left, Privacy Policy + Terms of Service right.

```astro
---
---
<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-brand">
      <span class="footer-logo">Zero Fluff</span>
      <p class="footer-tagline">Get AI working in your business — without the jargon. Hands-on AI and automation consultancy based in Totnes, Devon.</p>
      <div class="footer-location">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>Totnes, Devon TQ9, UK</span>
      </div>
    </div>
    <div class="footer-links">
      <div class="footer-col">
        <span class="col-heading">COMPANY</span>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="footer-col">
        <span class="col-heading">SERVICES</span>
        <a href="/services">AI Quick Start</a>
        <a href="/services">Automation Setup</a>
        <a href="/services">Ongoing Support</a>
        <a href="/services">Bigger Projects</a>
      </div>
      <div class="footer-col">
        <span class="col-heading">CONNECT</span>
        <a href="mailto:andy@zerofluff.co.uk">andy@zerofluff.co.uk</a>
        <span class="footer-detail">Mon–Fri 09:00–17:00</span>
      </div>
    </div>
  </div>
  <div class="footer-divider"></div>
  <div class="footer-bottom">
    <span>&copy; 2026 Zero Fluff. All rights reserved.</span>
    <div class="footer-legal">
      <a href="/privacy">Privacy Policy</a>
      <a href="/privacy">Terms of Service</a>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background: #0D0D0D;
    padding: 64px 120px 40px;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
  .footer-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 360px;
  }
  .footer-logo {
    font-size: 28px;
    font-weight: 800;
    color: #fff;
  }
  .footer-tagline {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    width: 340px;
  }
  .footer-location {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    color: #666;
  }
  .footer-links {
    display: flex;
    gap: 80px;
  }
  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .col-heading {
    font-size: 11px;
    font-weight: 700;
    color: #FF3B30;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .footer-col a, .footer-detail {
    font-size: 14px;
    color: #666;
    text-decoration: none;
    transition: color 0.15s;
  }
  .footer-col a:hover { color: #fff; }
  .footer-divider {
    width: 100%;
    height: 1px;
    background: #1A1A1A;
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #666;
  }
  .footer-legal {
    display: flex;
    gap: 24px;
  }
  .footer-legal a {
    color: #666;
    text-decoration: none;
  }
  .footer-legal a:hover { color: #fff; }

  @media (max-width: 768px) {
    .site-footer { padding: 48px 24px 32px; }
    .footer-top { flex-direction: column; gap: 40px; }
    .footer-links { flex-wrap: wrap; gap: 40px; }
    .footer-brand { width: 100%; }
    .footer-tagline { width: 100%; }
  }
</style>
```

**Verify:** `npx astro build`

**Commit:**
```bash
git add src/components/Footer.astro
git commit -m "feat(v2): rebuild footer — dark bg, 4-column layout"
```

---

## Task 4: Rebuild Homepage — Hero + Pain Points

**Files:**
- Modify: `src/pages/index.astro`

**Note on images:** The Pencil design uses Unsplash images. Use these exact URLs as `background-image` values in CSS. They work without any API key.

**Step 1: Replace the entire homepage with the hero + pain points sections.**

Hero image URL: `https://images.unsplash.com/photo-1760278041809-b157c39c30d3?w=1920&q=80`
Pain point card images:
- Card 1: `https://images.unsplash.com/photo-1708519428320-2966405aa6d3?w=800&q=80`
- Card 2: `https://images.unsplash.com/photo-1713880304260-c6e13a9a8a05?w=800&q=80`
- Card 3: `https://images.unsplash.com/photo-1621558272312-0877bf5241d7?w=800&q=80`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Zero Fluff — AI Implementation That Works"
  description="Straight-talking AI consultancy for small businesses. No jargon, no fluff, just results."
>
  <!-- HERO -->
  <section class="hero">
    <div class="hero-content">
      <h1>Get AI working in your business — without the jargon</h1>
      <p class="hero-sub">We help small businesses save time and money with AI and automation. No tech overwhelm. No fluff. Just results.</p>
      <div class="hero-ctas">
        <a href="/contact" class="btn-primary">Book a free AI chat →</a>
        <a href="/services" class="btn-outline">See our services</a>
      </div>
      <p class="trust-text">30+ years experience  •  Based in Totnes, Devon</p>
    </div>
  </section>

  <!-- PAIN POINTS -->
  <section class="pain-points">
    <div class="section-inner">
      <p class="section-label">01 — THE PROBLEM</p>
      <h2>Sound familiar?</h2>
      <div class="cards-row">
        <div class="pain-card" style="background-image: url('https://images.unsplash.com/photo-1708519428320-2966405aa6d3?w=800&q=80')">
          <div class="card-overlay">
            <h3>Drowning in admin?</h3>
            <p>Repetitive tasks eating your day? Emails, invoices, scheduling — it never ends.</p>
          </div>
        </div>
        <div class="pain-card" style="background-image: url('https://images.unsplash.com/photo-1713880304260-c6e13a9a8a05?w=800&q=80')">
          <div class="card-overlay">
            <h3>No time to figure it out?</h3>
            <p>You know AI could help, but who has time to learn another tool?</p>
          </div>
        </div>
        <div class="pain-card" style="background-image: url('https://images.unsplash.com/photo-1621558272312-0877bf5241d7?w=800&q=80')">
          <div class="card-overlay">
            <h3>Confused by AI hype?</h3>
            <p>Every day there is a new AI tool. Hard to know what actually works for YOUR business.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
```

**Step 2: Add the styles for hero + pain points:**

```css
<style>
  /* HERO */
  .hero {
    min-height: 700px;
    background-image: url('https://images.unsplash.com/photo-1760278041809-b157c39c30d3?w=1920&q=80');
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.6);
  }
  .hero-content {
    position: relative;
    z-index: 1;
    padding: 0 80px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 900px;
  }
  .hero-content h1 {
    font-size: 72px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -2px;
    line-height: 1.05;
    max-width: 800px;
  }
  .hero-sub {
    font-size: 20px;
    color: #ccc;
    line-height: 1.5;
    max-width: 680px;
  }
  .hero-ctas {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .trust-text {
    font-size: 13px;
    font-weight: 500;
    color: #A1A1AA;
  }

  /* SHARED BUTTON STYLES */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #FF3B30;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    padding: 16px 32px;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .btn-primary:hover { opacity: 0.85; color: #fff; }
  .btn-outline {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    padding: 16px 32px;
    text-decoration: none;
    border: 2px solid #fff;
    transition: opacity 0.15s;
  }
  .btn-outline:hover { opacity: 0.8; color: #fff; }

  /* PAIN POINTS */
  .pain-points { background: #fff; padding: 80px 60px; }
  .section-inner { display: flex; flex-direction: column; gap: 48px; }
  .section-label {
    font-size: 12px;
    font-weight: 700;
    color: #FF3B30;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .pain-points h2 {
    font-size: 48px;
    font-weight: 800;
    color: #000;
    letter-spacing: -1px;
    line-height: 1.05;
  }
  .cards-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .pain-card {
    height: 500px;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
  }
  .card-overlay {
    padding: 24px 28px;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .card-overlay h3 {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
  }
  .card-overlay p {
    font-size: 16px;
    color: #ccc;
    line-height: 1.4;
  }
</style>
```

**Verify:** `npx astro build`

**Commit:**
```bash
git add src/pages/index.astro
git commit -m "feat(v2): homepage hero + pain points sections"
```

---

## Task 5: Homepage — Services Grid + About Split

**Files:**
- Modify: `src/pages/index.astro`

Service card images:
- AI Quick Start: `https://images.unsplash.com/photo-1717307908098-cec3253b45a6?w=800&q=80`
- Automation Setup: `https://images.unsplash.com/photo-1703835916583-4be209949d72?w=800&q=80`
- Ongoing Support: `https://images.unsplash.com/photo-1632923945657-ccd98efe59e3?w=800&q=80`
- Bigger Projects: `https://images.unsplash.com/photo-1729551610680-c6ea05b08937?w=800&q=80`

About section image: `https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80` (professional man with coffee — closest match to the design's generated image)

**Step 1: Add services + about sections after pain points:**

```astro
  <!-- SERVICES -->
  <section class="services-section">
    <div class="section-inner">
      <p class="section-label">02 — WHAT WE DO</p>
      <h2>Practical AI solutions, not buzzwords</h2>
      <div class="services-grid">
        <div class="service-card" style="background-image: url('https://images.unsplash.com/photo-1717307908098-cec3253b45a6?w=800&q=80')">
          <div class="service-overlay">
            <span class="service-tag">2 HOURS</span>
            <h3>AI Quick Start</h3>
            <p>We review your business, identify where AI saves time, and give you a clear action plan.</p>
            <a href="/services" class="service-link">Learn more →</a>
          </div>
        </div>
        <div class="service-card" style="background-image: url('https://images.unsplash.com/photo-1703835916583-4be209949d72?w=800&q=80')">
          <div class="service-overlay">
            <span class="service-tag">HANDS-ON</span>
            <h3>Automation Setup</h3>
            <p>We build automated workflows using N8N, ChatGPT, Gemini and more to handle your repetitive tasks.</p>
            <a href="/services" class="service-link">Learn more →</a>
          </div>
        </div>
        <div class="service-card" style="background-image: url('https://images.unsplash.com/photo-1632923945657-ccd98efe59e3?w=800&q=80')">
          <div class="service-overlay">
            <span class="service-tag">MONTHLY</span>
            <h3>Ongoing AI Support</h3>
            <p>Monthly support for businesses who want help staying on top of AI developments.</p>
            <a href="/services" class="service-link">Learn more →</a>
          </div>
        </div>
        <div class="service-card" style="background-image: url('https://images.unsplash.com/photo-1729551610680-c6ea05b08937?w=800&q=80')">
          <div class="service-overlay">
            <span class="service-tag">STRATEGIC</span>
            <h3>Bigger Projects</h3>
            <p>Building a product or need strategic tech leadership? We do that too.</p>
            <a href="/services" class="service-link">Learn more →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT SPLIT -->
  <section class="about-section">
    <div class="section-inner">
      <p class="section-label">03 — WHY ZERO FLUFF</p>
      <h2>30 years of building<br>digital products</h2>
      <div class="about-split">
        <div class="about-left" style="background-image: url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80')">
          <div class="about-img-overlay"></div>
          <div class="stats-wrap">
            <div class="stat"><span class="stat-num">30+</span><span class="stat-label">YEARS EXPERIENCE</span></div>
            <div class="stat"><span class="stat-num">5-15</span><span class="stat-label">HOURS SAVED WEEKLY</span></div>
            <div class="stat"><span class="stat-num">1-2</span><span class="stat-label">WEEKS TO RESULTS</span></div>
          </div>
        </div>
        <div class="about-right">
          <p class="about-desc">Zero Fluff is a hands-on AI and automation consultancy for small businesses. Over 30 years of digital product experience. We deliver practical solutions without buzzwords.</p>
          <div class="about-tools">
            <span class="tools-label">TOOLS WE USE</span>
            <div class="tools-row">
              <span class="tool-pill">N8N</span>
              <span class="tool-pill">Zapier</span>
              <span class="tool-pill">Claude</span>
              <span class="tool-pill">ChatGPT</span>
              <span class="tool-pill">Perplexity</span>
            </div>
          </div>
          <div class="about-prev">
            <span class="tools-label">PREVIOUS WORK</span>
            <div class="clients-list">
              <span>Filmily</span>
              <span>SelectCommerce</span>
              <span>Shiift</span>
              <span>NiceGroup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

**Step 2: Add services + about styles:**

```css
  /* SERVICES */
  .services-section { background: #fff; padding: 80px 40px; }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .service-card {
    height: 340px;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
  }
  .service-overlay {
    padding: 0 28px 28px;
    background: linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.8) 45%, transparent 100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 12px;
  }
  .service-tag {
    display: inline-block;
    background: #FF3B30;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 6px 12px;
    align-self: flex-start;
  }
  .service-overlay h3 {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
  }
  .service-overlay p {
    font-size: 16px;
    color: #ccc;
    line-height: 1.4;
  }
  .service-link {
    font-size: 14px;
    font-weight: 600;
    color: #FF3B30;
    text-decoration: none;
  }

  /* ABOUT */
  .about-section { background: #fff; padding: 80px 120px; }
  .about-section h2 {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.05;
  }
  .about-split {
    display: flex;
    gap: 40px;
    width: 100%;
  }
  .about-left {
    flex: 1;
    min-height: 580px;
    background-size: cover;
    background-position: center;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }
  .about-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8));
  }
  .stats-wrap {
    position: relative;
    z-index: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .stat { display: flex; flex-direction: column; }
  .stat-num {
    font-size: 80px;
    font-weight: 900;
    color: #fff;
    letter-spacing: -3px;
    line-height: 0.9;
  }
  .stat-label {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.8);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .about-right {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 16px 0;
  }
  .about-desc {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
  }
  .tools-label {
    font-size: 12px;
    font-weight: 700;
    color: #FF3B30;
    letter-spacing: 3px;
    text-transform: uppercase;
    display: block;
    margin-bottom: 14px;
  }
  .tools-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .tool-pill {
    font-size: 13px;
    font-weight: 600;
    color: #000;
    padding: 8px 16px;
    border: 2px solid #000;
    border-radius: 20px;
  }
  .clients-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .clients-list span {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }
```

**Verify:** `npx astro build`

**Commit:**
```bash
git add src/pages/index.astro
git commit -m "feat(v2): homepage services grid + about split sections"
```

---

## Task 6: Homepage — FAQ + Final CTA

**Files:**
- Modify: `src/pages/index.astro`

FAQ image: `https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80`
CTA background: `https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&q=80`

**Step 1: Add FAQ + CTA sections:**

```astro
  <!-- FAQ -->
  <section class="faq-section">
    <div class="faq-inner">
      <div class="faq-left">
        <p class="section-label">04 — COMMON QUESTIONS</p>
        <h2>Got questions?<br>We have answers.</h2>
        <div class="faq-img" style="background-image: url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80')"></div>
      </div>
      <div class="faq-right">
        <div class="faq-divider"></div>
        <details class="faq-item faq-open">
          <summary>How much time can AI really save me?</summary>
          <p>Most of our clients save 5-15 hours per week once their automations are running.</p>
        </details>
        <div class="faq-divider"></div>
        <details class="faq-item">
          <summary>How quickly will I see results?</summary>
          <p>Most clients see meaningful results within 1-2 weeks of their first automation going live.</p>
        </details>
        <div class="faq-divider"></div>
        <details class="faq-item">
          <summary>Do I need technical experience?</summary>
          <p>None. We handle all the technical setup. You just tell us what takes up your time.</p>
        </details>
        <div class="faq-divider"></div>
        <details class="faq-item">
          <summary>What types of businesses do you work with?</summary>
          <p>Small businesses across all sectors — from solo consultants to teams of 20. If you have repetitive tasks, we can help.</p>
        </details>
        <div class="faq-divider"></div>
        <details class="faq-item">
          <summary>What tools do you use?</summary>
          <p>N8N, Zapier, Claude, ChatGPT, Perplexity — whatever fits your workflow best.</p>
        </details>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="final-cta">
    <div class="cta-content">
      <p class="section-label" style="color: #FF3B30;">05 — READY?</p>
      <h2>Ready to get AI working<br>for your business?</h2>
      <p class="cta-sub">Book a free 20-minute AI chat. No sales pitch.<br>No jargon. Just an honest conversation about how AI can help.</p>
      <div class="cta-buttons">
        <a href="/contact" class="btn-primary" style="font-size: 18px; padding: 20px 48px;">Book a free AI chat →</a>
        <a href="mailto:andy@zerofluff.co.uk" class="btn-outline" style="font-size: 18px; padding: 20px 48px;">andy@zerofluff.co.uk</a>
      </div>
      <p class="trust-text">Free · No obligation · 20 minutes · Plain English</p>
    </div>
  </section>
</BaseLayout>
```

**Step 2: Add FAQ + CTA styles:**

```css
  /* FAQ */
  .faq-section { padding: 80px 72px; background: #fff; }
  .faq-inner {
    display: flex;
    gap: 48px;
    align-items: flex-start;
  }
  .faq-left {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .faq-left h2 {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.05;
  }
  .faq-img {
    height: 300px;
    width: 100%;
    background-size: cover;
    background-position: center;
  }
  .faq-right {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .faq-divider {
    height: 1px;
    background: #E5E5E5;
    width: 100%;
  }
  .faq-item {
    padding: 20px 0 20px 16px;
    border-left: 2px solid transparent;
  }
  .faq-item.faq-open { border-left-color: #000; }
  .faq-item summary {
    font-size: 18px;
    font-weight: 600;
    color: #000;
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .faq-item summary::after { content: '+'; font-size: 22px; font-weight: 300; color: #A1A1AA; }
  .faq-item[open] summary::after { content: '−'; color: #000; }
  .faq-item p {
    font-size: 16px;
    color: #666;
    line-height: 1.5;
    margin-top: 12px;
  }

  /* FINAL CTA */
  .final-cta {
    min-height: 600px;
    background-image: url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&q=80');
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .final-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.8);
  }
  .cta-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    text-align: center;
    padding: 0 120px;
  }
  .cta-content h2 {
    font-size: 64px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -1px;
    line-height: 1.05;
    max-width: 800px;
  }
  .cta-sub {
    font-size: 20px;
    color: #ccc;
    line-height: 1.6;
    max-width: 640px;
  }
  .cta-buttons {
    display: flex;
    gap: 16px;
    align-items: center;
  }
```

**Verify:** `npx astro build` then `git push origin main` to trigger Vercel preview.

**Commit:**
```bash
git add src/pages/index.astro
git commit -m "feat(v2): homepage FAQ + final CTA — complete homepage rebuild"
```

---

## Task 7: Services Page

**Files:**
- Modify: `src/pages/services.astro`

Hero image: `https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80`

**Rebuild services.astro to match the Pencil design:** alternating image/text layout for each service.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
export const prerender = true;
---

<BaseLayout title="Services — Zero Fluff" description="Practical AI implementation services for small businesses. No jargon, no fluff.">
  <!-- HERO -->
  <section class="page-hero" style="background-image: url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80')">
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>Practical AI solutions,<br>not buzzwords</h1>
      <p>Real implementations that save you time and money, not slide decks about the future of AI.</p>
    </div>
  </section>

  <!-- SERVICES DETAIL -->
  <section class="services-detail">
    <article class="service-row">
      <div class="service-img" style="background-image: url('https://images.unsplash.com/photo-1717307908098-cec3253b45a6?w=800&q=80')"></div>
      <div class="service-text">
        <span class="service-tag-dark">2 HOURS</span>
        <h2>AI Quick Start</h2>
        <p>Not sure where AI can help your business? Start here. We spend 2 hours reviewing your operations, identifying the highest-value automation opportunities, and giving you a clear, prioritised action plan.</p>
        <ul>
          <li>Full business operations review</li>
          <li>3-5 specific automation recommendations</li>
          <li>Prioritised action plan with time estimates</li>
          <li>No obligation to continue</li>
        </ul>
        <a href="/contact" class="btn-red">Book a Quick Start →</a>
      </div>
    </article>

    <article class="service-row service-row-reverse">
      <div class="service-img" style="background-image: url('https://images.unsplash.com/photo-1703835916583-4be209949d72?w=800&q=80')"></div>
      <div class="service-text">
        <span class="service-tag-dark">HANDS-ON</span>
        <h2>Automation Setup</h2>
        <p>We build the automations for you using N8N, Zapier, ChatGPT, Claude and more. You describe the problem, we build the solution. Most automations are live within a week.</p>
        <ul>
          <li>Custom workflow design and build</li>
          <li>Integration with your existing tools</li>
          <li>Testing and handover documentation</li>
          <li>30-day support included</li>
        </ul>
        <a href="/contact" class="btn-red">Get a Quote →</a>
      </div>
    </article>

    <article class="service-row">
      <div class="service-img" style="background-image: url('https://images.unsplash.com/photo-1632923945657-ccd98efe59e3?w=800&q=80')"></div>
      <div class="service-text">
        <span class="service-tag-dark">MONTHLY</span>
        <h2>Ongoing AI Support</h2>
        <p>AI is moving fast. This monthly retainer keeps you ahead — fixing what breaks, adding new automations as opportunities arise, and advising on what's worth trying.</p>
        <ul>
          <li>Monthly strategy call</li>
          <li>Unlimited small automation fixes</li>
          <li>New tool evaluations and recommendations</li>
          <li>Priority response to issues</li>
        </ul>
        <a href="/contact" class="btn-red">Learn More →</a>
      </div>
    </article>

    <article class="service-row service-row-reverse">
      <div class="service-img" style="background-image: url('https://images.unsplash.com/photo-1729551610680-c6ea05b08937?w=800&q=80')"></div>
      <div class="service-text">
        <span class="service-tag-dark">STRATEGIC</span>
        <h2>Bigger Projects</h2>
        <p>Building an AI-powered product, or need a fractional CTO to guide your technical strategy? 30 years of building digital products, from startup to scale.</p>
        <ul>
          <li>Product strategy and technical architecture</li>
          <li>AI/ML integration into existing products</li>
          <li>Team guidance and hiring support</li>
          <li>Flexible engagement terms</li>
        </ul>
        <a href="/contact" class="btn-red">Let's Talk →</a>
      </div>
    </article>
  </section>

  <!-- CTA -->
  <section class="final-cta" style="min-height: 400px;">
    <div class="cta-content" style="padding: 0 80px;">
      <h2 style="font-size: 48px;">Ready to get started?</h2>
      <p class="cta-sub" style="font-size: 18px;">Book a free 20-minute AI chat. No sales pitch.</p>
      <a href="/contact" class="btn-primary" style="font-size: 18px; padding: 20px 48px;">Book a free AI chat →</a>
    </div>
  </section>
</BaseLayout>

<style>
  .page-hero {
    min-height: 500px;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding-bottom: 80px;
  }
  .page-hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.65);
  }
  .page-hero-content {
    position: relative;
    z-index: 1;
    padding: 0 80px;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .page-hero-content h1 {
    font-size: 56px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -1.5px;
    line-height: 1.05;
  }
  .page-hero-content p {
    font-size: 20px;
    color: #ccc;
    line-height: 1.5;
  }

  .services-detail {
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .service-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border-bottom: 1px solid #E4E4E7;
    padding: 60px 0;
  }
  .service-row:first-child { padding-top: 0; }
  .service-row-reverse .service-img { order: 2; }
  .service-row-reverse .service-text { order: 1; }
  .service-img {
    height: 400px;
    background-size: cover;
    background-position: center;
  }
  .service-text {
    padding: 0 60px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
  }
  .service-tag-dark {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #FF3B30;
    text-transform: uppercase;
  }
  .service-text h2 {
    font-size: 36px;
    font-weight: 800;
    color: #000;
    letter-spacing: -0.5px;
  }
  .service-text p {
    font-size: 18px;
    color: #444;
    line-height: 1.6;
  }
  .service-text ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .service-text li {
    font-size: 16px;
    color: #444;
    padding-left: 20px;
    position: relative;
  }
  .service-text li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #FF3B30;
    font-weight: 600;
  }
  .btn-red {
    display: inline-block;
    background: #FF3B30;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    padding: 16px 32px;
    text-decoration: none;
    align-self: flex-start;
    transition: opacity 0.15s;
  }
  .btn-red:hover { opacity: 0.85; color: #fff; }

  /* Reuse from global — needs .final-cta and .btn-primary styles from index.astro
     Move shared styles to global.css in Task 9 */
  .final-cta {
    min-height: 400px;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cta-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
  }
  .cta-content h2 { color: #fff; }
  .cta-sub { color: #ccc; line-height: 1.5; }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #FF3B30;
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .btn-primary:hover { opacity: 0.85; color: #fff; }

  @media (max-width: 768px) {
    .service-row { grid-template-columns: 1fr; }
    .service-row-reverse .service-img { order: 0; }
    .service-row-reverse .service-text { order: 0; }
    .service-text { padding: 32px 0 0; }
  }
</style>
```

**Verify:** `npx astro build`

**Commit:**
```bash
git add src/pages/services.astro
git commit -m "feat(v2): rebuild services page — alternating image/text layout"
```

---

## Task 8: About Page

**Files:**
- Modify: `src/pages/about.astro`

Hero image: `https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1920&q=80`
Portrait image: `https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80`
Photo strip images (3):
- `https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80`
- `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80`
- `https://images.unsplash.com/photo-1553484771-047a44eee27b?w=600&q=80`

**Rebuild about.astro to match Pencil design:**
- Dark hero: "The person behind Zero Fluff"
- Split story section: text left, portrait right
- 3-image photo strip with dark overlay cards
- Stats bar (dark background strip)
- Tools + previous work
- CTA + footer

See design screenshot at node `dLuML` — key structure:
1. Nav + Hero (dark, half-height)
2. Split: story text + portrait image
3. Photo strip: 3 image cards (No Fluff / Precision / Results)
4. Stats bar: 30+ / 100+ / 5-15 / 1-2 on dark bg
5. Tools pills + previous work list
6. CTA + Footer

Full implementation — use the same patterns as the homepage (page-hero, section-label, tool-pills, btn-red, final-cta).

**Verify:** `npx astro build`

**Commit:**
```bash
git add src/pages/about.astro
git commit -m "feat(v2): rebuild about page — story, stats, photo strip"
```

---

## Task 9: Blog Page

**Files:**
- Modify: `src/pages/blog.astro`

Hero image: `https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80`

**Key changes from current design:**
- Dark hero: "AI insights for small businesses"
- Featured post: large image card (first RSS item), red "FEATURED" tag
- Post grid: 3-column cards from Substack RSS (keep existing RSS fetch logic)
- Newsletter: dark section "Stay in the loop" with email input
- Footer

The existing `blog.astro` already fetches from Substack RSS — keep that fetch logic, only rebuild the visual presentation. Check existing blog.astro for the fetch pattern before rebuilding.

**Verify:** `npx astro build`

**Commit:**
```bash
git add src/pages/blog.astro src/components/BlogCard.astro
git commit -m "feat(v2): rebuild blog page — featured post, grid, newsletter section"
```

---

## Task 10: Contact Page

**Files:**
- Modify: `src/pages/contact.astro`

Hero image: `https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1920&q=80` (coffee shop)

**Design from Pencil:**
- Dark hero: "Let's have a conversation", sub: "No sales pitch. No jargon. Just an honest chat about how AI can help your business save time and money."
- Split form section:
  - Left: "DROP US A LINE" section label, form fields (First Name + Last Name in a row, Email, Business Name, Message), red "Send Message →" button
  - Right: dark (#000) card "Book a free 20-min AI chat", contact details (email, location, hours)

The existing Astro Actions form logic (in `src/actions/index.ts`) must be preserved. Keep `ContactForm.astro` component logic but restyle it, or rebuild the contact page with the form inline.

**Verify:** `npx astro build`

**Commit:**
```bash
git add src/pages/contact.astro src/components/ContactForm.astro
git commit -m "feat(v2): rebuild contact page — hero, split form + details layout"
```

---

## Task 11: Extract Shared Styles to global.css + Polish

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/pages/privacy.astro`
- Modify: `src/pages/404.astro`

**Step 1: Move repeated styles (btn-primary, btn-outline, page-hero, section-label, final-cta) from page `<style>` blocks into `global.css`.**

**Step 2: Update privacy.astro:**
- Use the new header/footer automatically (they're in BaseLayout)
- Add simple page hero (dark, "Privacy Policy" heading)
- Content section: white bg, narrow readable column, keep all existing legal content

**Step 3: Update 404.astro:**
- Dark hero style
- Large "404" number in red
- "This page doesn't exist." heading
- "Back to homepage →" red button

**Verify:** `npx astro build`

**Step 4: Push to Vercel for visual review:**
```bash
git push origin main
```

Check `https://zero-fluff-website.vercel.app` — all 5 pages should match the Pencil designs.

**Commit:**
```bash
git add src/styles/global.css src/pages/privacy.astro src/pages/404.astro
git commit -m "feat(v2): extract shared styles, polish privacy + 404 pages"
```

---

## Notes

**Images:** All Unsplash URLs are used directly (free, no API key needed, CDN-served). For production, download key images to `public/images/` if Unsplash availability is a concern.

**Mobile:** Each task includes basic mobile breakpoints. A final mobile polish pass may be needed before go-live.

**Case studies pages** (`/case-studies` and `/case-studies/[id]`) are not redesigned in this plan — they inherit the new header/footer automatically. A separate design would be needed to fully restyle them.

**Font:** Inter is already installed via `@fontsource-variable/inter`. Task 1 just needs to remove the Space Grotesk import/preload.
