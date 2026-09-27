// Single source of truth for the site version. Add a new entry to the TOP of
// CHANGELOG on every deploy (patch = fixes, minor = features, major = breaking)
// and APP_VERSION follows automatically — the footer and /changelog can't drift.

export interface ChangelogEntry {
  version: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  changes: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.7.0',
    date: '2026-09-27',
    title: 'The site finally knows how old it is',
    description:
      'The footer used to show a timestamp that changed every time a server woke up, which is a lovely way to tell nobody anything. It now shows a proper version number, and clicking it brings you here — a changelog, lovingly reconstructed from six months of commit messages.',
    changes: [
      'Footer shows a semantic version instead of a build timestamp',
      'Version number links to this changelog',
      'New /changelog page, seeded from the full git history',
    ],
  },
  {
    version: '1.6.0',
    date: '2026-09-27',
    title: 'Two more for the pile',
    description:
      'The case study pile got taller. One is a band, one is an operating system for founders, and both are real work rather than lorem ipsum with a nice screenshot.',
    changes: [
      'Added the Susannah and the Noise case study',
      'Added the Founder OS case study and screenshot',
    ],
  },
  {
    version: '1.5.0',
    date: '2026-07-30',
    title: 'Counting visitors, politely',
    description:
      'We wanted to know whether anyone was actually reading this. Plausible went in first because it respects your privacy, then Google Analytics joined because some questions only Google can answer. Also, a photography gallery case study, because pictures.',
    changes: [
      'Added the Photography Gallery case study',
      'Added Plausible privacy-friendly analytics',
      'Added the Google Analytics tag',
    ],
  },
  {
    version: '1.4.0',
    date: '2026-06-09',
    title: 'Hello, search engines',
    description:
      'A week spent making the site easier for Google to understand and harder for new blog posts to go missing. The blog now fetches fresh from Substack on every visit, and Devon and the South West got pages of their own.',
    changes: [
      'Blog switched to server rendering so new Substack posts appear immediately',
      'Added the AMGL case study with portal screenshot',
      'Updated the favicon to the official Zero Fluff brand mark',
      'SEO overhaul: structured data, geo tags and local keywords',
      'New AI Automation in Devon and AI Consultancy South West pages',
      'Linked to Andy’s portfolio from the About page',
    ],
  },
  {
    version: '1.3.0',
    date: '2026-06-02',
    title: 'Show, don’t tell',
    description:
      'The day the case studies arrived — about forty commits of them. They started as a Netflix-style grid, became a chaotic editorial grid, and ended up as a scattered pile of paper, which is honestly how most client work looks from the inside. The starfield also briefly died several times and was revived by a watchdog.',
    changes: [
      'New cinematic case study pages and a Work page',
      'Case studies for this site, Edge Studio, House Builder Report Generation, Artlume, FANDEMiQ (twice) and Andy’s portfolio',
      'Scattered paper pile layout with GSAP hover and landing animations',
      'Services auto-carousel with a peek at the next panel',
      'Live case study count and a random featured case study on the homepage',
      'Starfield fixes: GPU caching, full-page coverage and a loop that refuses to stay dead',
      'Replaced Zapier with Manus across the site',
      'README added',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-03-31',
    title: 'Lights off, stars on',
    description:
      'A full dark-theme rebuild with GSAP doing the heavy lifting. There’s a starfield, scrambling text, buttons that lean towards your cursor, and a couple of easter eggs we won’t spoil here. A custom cursor came and went on the same day.',
    changes: [
      'Dark theme with animated ambient gradient and film grain',
      'Frosted glass header with animated mobile menu',
      'Cosmic starfield with twinkling and shooting stars',
      'Text scramble, magnetic buttons and floating shapes',
      'Konami code confetti and logo matrix rain easter eggs',
      'AI-generated service and About page photography',
      'New SVG logo and brand favicon',
      'Fixed OG images and descriptions so LinkedIn previews look right',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-03-13',
    title: 'Same day, new face',
    description:
      'The site launched and, a few hours later, got a complete visual redesign. Inter font, red accent, a four-column dark footer, and a blog that finally shows pictures from Substack posts. Some people wait a year before redesigning; we waited an afternoon.',
    changes: [
      'V2 redesign: new design tokens, Inter font and red accent',
      'Rebuilt header, footer, homepage, Services, About, Blog and Contact pages',
      'Blog pulls images from Substack posts, including video thumbnails',
      'Footer shows a build timestamp (since retired — see 1.7.0)',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-03-13',
    title: 'Live on zerofluff.co.uk',
    description:
      'Two days from empty folder to a real website on a real domain. Case studies, a blog fed from Substack, a privacy policy written in actual English, and enough SEO metadata to keep search engines happy.',
    changes: [
      'Case study pages built from Markdown content',
      'Blog listing fed by the Substack RSS feed',
      'UK ICO-compliant privacy policy',
      'SEO metadata, structured data and a custom 404 page',
      'Production domain configured and contact emails sent from it',
    ],
  },
  {
    version: '0.1.0',
    date: '2026-03-12',
    title: 'It begins',
    description:
      'Day one. An Astro project, a design token system and the core pages: homepage, Services, About and a contact form that actually sends email. Nothing fancy yet, just the foundations.',
    changes: [
      'Astro project scaffolded with fonts and design tokens',
      'Layout system with animations and page transitions',
      'Homepage, Services and About pages',
      'Contact form via Astro Actions and Resend',
      'Deployed to Vercel',
    ],
  },
];

export const APP_VERSION = CHANGELOG[0].version;
