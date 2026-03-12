---
phase: 1
slug: foundation-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser testing + Astro build checks |
| **Config file** | none — Wave 0 not needed |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview` + manual browser testing
- **Before `/gsd:verify-work`:** Full suite must be green + manual viewport checks
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUN-01 | manual | Resize browser 320px-1600px; verify no breaks | N/A | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUN-02 | manual | DevTools Network: verify same-origin WOFF2 fonts | N/A | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUN-03 | manual | DevTools Elements: verify `var()` usage | N/A | ⬜ pending |
| 1-02-01 | 02 | 1 | FOUN-04 | manual | DevTools responsive mode at 375px, 768px, 1440px | N/A | ⬜ pending |
| 1-02-02 | 02 | 1 | FOUN-05 | manual | Visual inspection at multiple viewports | N/A | ⬜ pending |
| 1-02-03 | 02 | 1 | ANIM-01 | manual | Click between pages; verify fade transition | N/A | ⬜ pending |
| 1-02-04 | 02 | 1 | ANIM-02 | manual | Scroll test page; sections fade/slide in | N/A | ⬜ pending |
| 1-02-05 | 02 | 1 | ANIM-03 | manual | Hover and tab to interactive elements | N/A | ⬜ pending |
| 1-02-06 | 02 | 1 | ANIM-04 | manual | Enable reduced motion in OS; verify no animations | N/A | ⬜ pending |
| 1-02-07 | 02 | 1 | DEPL-01 | smoke | Push to GitHub; verify Vercel preview URL loads | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.* This phase uses manual browser testing. No test framework infrastructure needed. `npm run build` serves as the automated gate (catches broken imports, invalid Astro syntax, TypeScript errors).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Fluid typography scaling | FOUN-01 | Visual rendering varies by browser | Resize browser from 320px to 1600px; headings should scale smoothly |
| Self-hosted font loading | FOUN-02 | Network behavior check | DevTools Network tab: fonts are same-origin WOFF2, preload in `<head>` |
| Design token usage | FOUN-03 | CSS architecture inspection | DevTools Elements: all colors/spacing/type use `var()` custom properties |
| Responsive layout | FOUN-04 | Visual at multiple viewports | DevTools responsive: 375px, 768px, 1024px, 1440px all render correctly |
| Whitespace aesthetic | FOUN-05 | Subjective design judgment | Visual inspection — generous spacing, no cramped sections |
| Page transitions | ANIM-01 | Browser animation rendering | Navigate between pages; smooth fade transitions visible |
| Scroll reveals | ANIM-02 | Scroll interaction testing | Scroll down test page; content sections animate in |
| Hover/focus states | ANIM-03 | Interactive state testing | Hover buttons/links; tab through focusable elements |
| Reduced motion | ANIM-04 | OS accessibility setting | Enable prefers-reduced-motion; all animations disabled |
| Vercel deploy | DEPL-01 | CI/CD pipeline check | Push commit; Vercel preview URL loads styled page |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
