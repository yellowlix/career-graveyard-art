# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Career Graveyard (职业墓场) — a static multi-page site built with Next.js App Router + React. No backend, no database, no external APIs. All data lives in `src/data.js`. Static export to `out/`.

### Running the dev server

```bash
npm run dev -- -H 127.0.0.1 -p 4173
```

Playwright config (`playwright.config.js`) expects the dev server at `http://127.0.0.1:4173` and can auto-start it via its `webServer` option.

### Testing

- `npm run test:e2e` — runs Playwright tests across 4 viewports (desktop-1440, desktop-1280, tablet-768, mobile-390).
- Visual regression snapshots are platform-specific. Linux baselines are already committed in the repo, so `npm run test:e2e` should directly pass. Only when UI changes cause snapshot mismatches, run `npm run test:e2e:update` to regenerate baselines.
- Playwright requires Chromium: `npx playwright install chromium --with-deps`.

### Build

```bash
npm run build
```

Output goes to `out/`. Sitemap is auto-generated via `scripts/generate-sitemap.js` as a post-build step.

### Key gotchas

- The site is bilingual (zh/en); locale is stored in `localStorage`. Tests verify both languages.
- Memorial messages are submitted via mailto — no persistence layer.
- Visual snapshot baselines in `tests/site.spec.js-snapshots/` are OS-dependent (filenames contain `-linux`). Do not commit snapshots generated on a different OS.
- Routes: `/`, `/archive`, `/career/[slug]`, `/memorial`, `/about`.
