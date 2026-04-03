# Layouts

## `renderNavigation(active, showBack, backHref)`
- File: `src/app.js`
- Shared on all pages
- Includes:
  - optional back link
  - logo
  - archive / memorial / info links

## `renderFooter()`
- File: `src/app.js`
- Shared on all pages
- Includes:
  - copyright
  - legal / policy / connect links

## `renderShell(content, options)`
- File: `src/app.js`
- Global page wrapper that injects:
  - grain overlay
  - nav
  - page content
  - footer

## Global page width
- File: `src/styles.css`
- Token: `--content-width`
- Used by nav, main content, footer
