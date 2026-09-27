# Zero Fluff website

## Versioning and changelog

Every change that ships to `main` (and so deploys to zerofluff.co.uk) must add a new entry to the **top** of `CHANGELOG` in `src/lib/version.ts`, in the same commit or PR as the change.

- `APP_VERSION` is derived from the newest entry — never set it or the footer version by hand.
- Bump semver: patch for fixes, minor for features, major for breaking changes.
- Each entry needs: `version`, `date` (YYYY-MM-DD), a punchy `title`, a one-paragraph friendly `description` with a touch of humour, and a `changes` bullet list.
- Several small commits going out in one deploy share one entry.
- After deploying, check the live footer shows the new version — it's the quickest proof the deploy landed.
