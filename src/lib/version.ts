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
    version: '1.9.0',
    date: '2026-11-19',
    title: 'We build software. Now the site says so.',
    description:
      'The site used to read like a gentle introduction to "AI for small business", which undersold the fact that we build and support real software. The homepage now leads with custom software and automation, there is a proper page for every way we can help, and the blog finally lives on this domain instead of only on Substack. Several behind-the-scenes switches are in place too, all politely switched off until someone with the facts fills them in.',
    changes: [
      'New homepage hero, problem cards for three kinds of buyer, service cards led by software and automation, and a "How we build" section (tested, documented, handed over, 30 days of support, retainer)',
      'Six service pages: AI & workflow automation, n8n automation, custom AI software development (upgraded), AI agents, fractional CTO and the AI Quick Start, each with a quick answer, steps, case studies, FAQs and structured data',
      '/services is now a hub linking to every service page; footer, Devon and South West pages link to them too',
      'Case studies: client work first, our own products and experiments in their own section, consistent problem / what we built / result / tools layout, Article structured data',
      'Blog on this domain with RSS at /rss.xml and three draft posts (not published); Substack posts now sit under "From the newsletter"',
      'Booking link, price anchors, testimonials, AMGL report count, whether a client can be named and search-engine verification codes can be switched on from src/config/site-inputs.ts; all are off until filled in',
      'Every call to action now says what happens next: 20 minutes, no sales pitch, a reply within one working day',
      'Homepage stats are now written into the page itself, not just counted up by animation, so "11 case studies" no longer reads as "0" to search engines',
      'Old /get-in-touch address now redirects to /contact',
      'llms.txt is generated from the same data as the site; IndexNow support and an automatic duplicate title / description check added',
      'Contact page quote is now attributed to Andy, and stray first-person form copy fixed',
      'Toned down "built in an hour, no dev team" headlines on case studies, the stats banner and the footer badge: outcomes first, speed second',
      'Site-wide structured data now says we serve the whole UK, and mentions custom software',
      'Client screenshots and live links that show a client\'s branding stay hidden until that client can be named',
    ],
  },
  {
    version: '1.8.3',
    date: '2026-09-28',
    title: 'One front door',
    description:
      'The site was answering at both www.zerofluff.co.uk and zerofluff.co.uk, like a shop with two front doors and a slightly confused doorman. The www address now sends everyone to the main one, so search engines stop wondering which is the real us.',
    changes: [
      'www.zerofluff.co.uk now permanently redirects to zerofluff.co.uk, keeping the page path',
    ],
  },
  {
    version: '1.8.2',
    date: '2026-09-27',
    title: 'No terms, no pretending',
    description:
      'The footer had a "Terms of Service" link that quietly took you to the privacy policy, which is a bit like a door marked Kitchen that opens onto the garden. We don\'t have separate terms of service, so the link is gone rather than pretending.',
    changes: [
      'Removed the footer "Terms of Service" link, which pointed at the privacy policy',
    ],
  },
  {
    version: '1.8.1',
    date: '2026-09-27',
    title: 'Writing the rule down',
    description:
      'Nothing on the site looks different. We wrote the changelog rule into the project notes our AI assistants read first, so future updates arrive with a changelog entry instead of sneaking out unannounced.',
    changes: [
      'Added AGENTS.md with the versioning and changelog rules, read by Codex',
      'Added CLAUDE.md, which points Claude Code at the same rules',
    ],
  },
  {
    version: '1.8.0',
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
    version: '1.7.0',
    date: '2026-09-27',
    title: 'Now with twice the directors',
    description:
      'Zero Fluff was never a one-person show, and the site finally admits it. Philippa Doyle joins Andy on the About page as an equal director, the "I" became "we" across the site, and the small print now correctly says we are a limited company rather than a sole trader. Search engines and AI assistants also got a much clearer picture of who we are.',
    changes: [
      'About page rewritten for two directors, Andy and Philippa Doyle',
      'First-person copy switched from "I" to "we" across the site',
      'Footer and privacy policy show the legal entity: The Digital Partnership Ltd, company number 09850681',
      'Phone number added to the footer, contact page and structured data',
      'Structured data now includes opening hours, company details, both directors and LinkedIn pages',
      'New llms.txt so AI assistants can describe the business accurately',
      'Case studies page gets a proper heading; meta descriptions trimmed to fit search results',
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
      'Footer shows a build timestamp (since retired — see 1.8.0)',
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
