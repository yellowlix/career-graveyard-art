# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Career Graveyard (职业墓场) — a static multi-page site built with Vite + vanilla JS/CSS. No backend, no database, no external APIs. All data lives in `src/data.js`.

### Running the dev server

```bash
npm run dev -- --host 127.0.0.1 --port 4173
```

Playwright config (`playwright.config.js`) expects the dev server at `http://127.0.0.1:4173` and can auto-start it via its `webServer` option.

### Testing

- `npm run test:e2e` — runs all 60 Playwright tests across 4 viewports (desktop-1440, desktop-1280, tablet-768, mobile-390).
- Visual regression snapshots are platform-specific. On a fresh Linux environment, run `npm run test:e2e:update` first to generate baseline screenshots before `npm run test:e2e` will pass the snapshot assertions.
- Playwright requires Chromium: `npx playwright install chromium --with-deps`.

### Build

```bash
npm run build
```

Output goes to `dist/`. The build copies `robots.txt`, `sitemap.xml`, and `favicon.svg` to dist via a custom Vite plugin.

### Key gotchas

- The site is bilingual (zh/en); locale is stored in `localStorage`. Tests verify both languages.
- Memorial messages are stored only in `localStorage` — no persistence layer.
- Visual snapshot baselines in `tests/site.spec.js-snapshots/` are OS-dependent (filenames contain `-linux`). Do not commit snapshots generated on a different OS.
