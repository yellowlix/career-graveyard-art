# Pages

## Home
- Entry file: `index.html`
- Runtime file: `src/app.js`
- Function: `renderHome`
- Depends on:
  - `renderShell`
  - `renderNavigation`
  - `renderFooter`
  - `renderMonolith`
  - `src/data.js`
  - `src/styles.css`

## Archive
- Entry file: `archive.html`
- Runtime file: `src/app.js`
- Function: `renderArchive`
- Depends on:
  - `renderShell`
  - `renderMonolith`
  - filter/sort handlers
  - `src/data.js`
  - `src/styles.css`

## Detail
- Entry file: `career.html`
- Runtime file: `src/app.js`
- Function: `renderDetail`
- Depends on:
  - query string slug parsing
  - `renderShell`
  - related careers selection
  - `src/data.js`
  - `src/styles.css`

## Memorial
- Entry file: `memorial.html`
- Runtime file: `src/app.js`
- Function: `renderMemorial`
- Depends on:
  - `renderShell`
  - localStorage helpers
  - `src/data.js`
  - `src/styles.css`

## About
- Entry file: `about.html`
- Runtime file: `src/app.js`
- Function: `renderAbout`
- Depends on:
  - `renderShell`
  - `src/data.js`
  - `src/styles.css`
