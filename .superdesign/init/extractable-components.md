# Extractable Components

## Recommended layout components

### `NavigationBar`
- Source: `src/app.js`
- Exported as function: `renderNavigation(active, showBack, backHref)`
- Why extract:
  - Appears on every page
  - Controls current-page state
  - Stable visual system anchor

### `PageFooter`
- Source: `src/app.js`
- Exported as function: `renderFooter()`
- Why extract:
  - Shared on every page
  - Stable low-variance component

## Not worth extracting
- Monolith card variants
- Factor cards
- Timeline items

Reason: these are simple enough to remain inline in SuperDesign draft context.
