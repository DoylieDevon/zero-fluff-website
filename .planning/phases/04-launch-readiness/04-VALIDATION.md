---
phase: 4
slug: launch-readiness
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Build validation (no dedicated test framework for this phase) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npx astro build` |
| **Full suite command** | `npx astro build && npx astro preview` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx astro build`
- **After every plan wave:** Run `npx astro build && npx astro preview`
- **Before `/gsd:verify-work`:** Full suite must be green + manual domain/HTTPS check
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | SEO-01 | smoke | `npx astro build && grep -r 'og:title' dist/` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | SEO-02 | smoke | `npx astro build && grep -r 'application/ld+json' dist/` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | SEO-03 | smoke | `npx astro build && ls dist/sitemap-index.xml` | ❌ W0 | ⬜ pending |
| 04-01-04 | 01 | 1 | SEO-04 | smoke | `npx astro build && ls dist/privacy/index.html` | ❌ W0 | ⬜ pending |
| 04-01-05 | 01 | 1 | SEO-05 | manual-only | N/A — no analytics at launch | N/A | ⬜ pending |
| 04-01-06 | 01 | 1 | DEPL-02 | manual-only | `curl -sI https://zerofluff.co.uk` | N/A | ⬜ pending |
| 04-01-07 | 01 | 1 | DEPL-03 | manual-only | `curl -sI http://zerofluff.co.uk` (check 301 to HTTPS) | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Build-output validation: `npx astro build` confirms all pages compile
- [ ] Post-build grep script for OG tags and JSON-LD in generated HTML

*No dedicated test framework needed — build success + output grep covers all automated requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Cookie notice (if analytics) | SEO-05 | No analytics at launch — N/A | Confirm no analytics scripts present; revisit if analytics added |
| Domain serving site | DEPL-02 | Requires DNS propagation + Vercel dashboard | 1. Add domain in Vercel 2. Configure GoDaddy DNS 3. `curl -sI https://zerofluff.co.uk` |
| HTTPS enforced | DEPL-03 | Requires live domain | `curl -sI http://zerofluff.co.uk` — expect 301 to HTTPS |
| OG tags render on LinkedIn | SEO-01 | Requires sharing on real platform | Share URL on LinkedIn, verify card renders with image/title/description |
| Resend domain verification | N/A | Dashboard DNS setup | Add SPF/DKIM/MX records in GoDaddy, verify in Resend dashboard |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
