---
phase: 2
slug: core-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro build + manual verification |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview` + manual browser testing
- **Before `/gsd:verify-work`:** Full suite must be green + contact form end-to-end test
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 1 | HOME-01 | manual | `npm run build` | N/A | ⬜ pending |
| 2-01-02 | 01 | 1 | HOME-02 | manual | `npm run build` | N/A | ⬜ pending |
| 2-01-03 | 01 | 1 | HOME-03 | manual | `npm run build` | N/A | ⬜ pending |
| 2-01-04 | 01 | 1 | HOME-04 | manual | `npm run build` | N/A | ⬜ pending |
| 2-01-05 | 01 | 1 | HOME-05 | manual | `npm run build` | N/A | ⬜ pending |
| 2-01-06 | 01 | 1 | HOME-06 | manual-only | copy review | N/A | ⬜ pending |
| 2-02-01 | 02 | 2 | SERV-01-04 | manual | `npm run build` | N/A | ⬜ pending |
| 2-02-02 | 02 | 2 | ABOU-01-03 | manual | `npm run build` | N/A | ⬜ pending |
| 2-02-03 | 02 | 2 | CONT-01-04 | integration | Manual form submit | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.env.example` — document required env vars (RESEND_API_KEY)
- [ ] Resend API key — must be created in Resend dashboard before contact form testing
- [ ] Vercel env vars — must be set in Vercel dashboard for production

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero with bold headline | HOME-01 | Visual rendering | Load homepage; bold headline about AI implementation visible above fold |
| Pain points section | HOME-02 | Content check | Scroll down; pain points addressing AI confusion for small businesses |
| Services summary | HOME-03 | Navigation check | Services summary links to /services page |
| Social proof | HOME-04 | Content check | Testimonials or case study highlights visible |
| CTA to contact | HOME-05 | Navigation check | CTA button links to /contact |
| Zero-jargon tone | HOME-06 | Subjective copy review | Read all copy; no corporate jargon, sounds human |
| Simplified service | SERV-02 | Content check | Single focused AI implementation offering, not 4 packages |
| Process explanation | SERV-03 | Content check | Clear steps/process for how engagement works |
| Track record | ABOU-02 | Content check | 30+ years, Filmily, SelectCommerce, Shiift mentioned |
| Testimonials | ABOU-03 | Content check | Client testimonials displayed |
| Contact form sends email | CONT-02 | Integration test | Submit form; verify email arrives via Resend |
| Form validation | CONT-03 | Interaction test | Submit empty form; inline errors appear |
| Contact details | CONT-04 | Content check | Email and location visible on contact page |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
