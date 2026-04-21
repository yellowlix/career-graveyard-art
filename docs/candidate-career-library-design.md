# Candidate Career Library Design

## 1. Context

Issue [#41](https://github.com/yellowlix/career-graveyard-art/issues/41) proposes a real job-title screening dataset for future Career Graveyard entries.

The proposal is useful, but it should not be merged directly into `src/data.js`. The current site is a static exhibition: production content is manually curated in `src/data.js`, while the project has no backend, no admin review flow, and no runtime database.

This design introduces a repository-level candidate library first. The library can receive imported rows later, but it remains outside the live site until maintainers explicitly promote selected candidates into production content.

## 2. Goals

- Preserve the issue #41 screening method in a reviewable design document.
- Create a stable data file for future imports.
- Keep candidate rows separate from public career entries.
- Let maintainers evaluate title reality, site fit, evidence quality, and naming decisions before promotion.
- Avoid changing routes, UI, SEO, sitemap, or production content in this PR.

## 3. Non-Goals

- Do not add new public career pages.
- Do not import candidate rows into `src/data.js`.
- Do not build a backend database, CMS, admin UI, or online review workflow.
- Do not treat unverified sources as production evidence.
- Do not make the candidate file a runtime dependency.

## 4. Approaches Considered

### Recommended: Static Candidate Library

Add a JSON file under `data/` with schema metadata, enums, status mapping, and empty arrays for future data.

Pros:

- Minimal change with low deployment risk.
- Easy for maintainers to review in PRs.
- Works with the current static-site architecture.
- Keeps imported research separate from production content.

Cons:

- No interactive review UI.
- Validation is limited to repository checks until import scripts are added.

### Alternative: Append Candidates To `src/data.js`

Add the screened entries directly to the live career data.

Pros:

- Fastest path to public pages.

Cons:

- Mixes draft research with published editorial content.
- Triggers route, sitemap, SEO, and visual changes before maintainers finish review.
- Makes issue #41 too large for a design-first PR.

### Alternative: Full Database Or CMS

Create tables, migrations, and a review workflow.

Pros:

- Best long-term model if the project becomes a community submission platform.

Cons:

- Conflicts with the current V1 boundary.
- Adds backend, auth, deployment, and migration complexity before the team needs it.

## 5. Proposed Artifact

Create:

- `data/candidate-career-library.json`

The file is a curation database in repository form, not a runtime database. It contains:

- `meta`: version, issue link, import status, and scope notes
- `statusMapping`: mapping from issue #41 screening statuses to current site statuses
- `enums`: controlled values for title reality, site fit, source type, and action
- `schemas`: field-level contracts for candidate rows and evidence sources
- `sourceCatalog`: source records, initially empty
- `candidates`: include-now candidates, initially empty
- `renameSuggestions`: rename/split/drop decisions, initially empty
- `holdouts`: real titles that should stay outside the main archive for now, initially empty

## 6. Data Flow

1. Raw research is prepared outside the production site.
2. Maintainers import rows into `data/candidate-career-library.json`.
3. Review focuses on four gates:
   - Does the title exist in real recruitment or official sources?
   - Is the canonical title the most common market wording?
   - Is the source evidence reproducible enough?
   - Does the role fit the Career Graveyard editorial boundary?
4. Approved rows can later be hand-converted into `src/data.js` career entries.
5. Production pages continue to read only from `src/data.js`.

## 7. Candidate Row Contract

Each future candidate should include:

- `id`: stable lower-kebab-case identifier
- `slug`: proposed public slug if promoted
- `title`: canonical Chinese job title
- `aliases`: alternate recruitment titles
- `industry`: one of the project industry labels
- `proposedStatus`: issue-side status such as `commoditized` or `declining`
- `siteStatus`: current site status such as `unworthy` or `decaying`
- `titleReality`: whether the title is official, stable in recruiting, a preferred variant, or a weak task label
- `siteFit`: `high`, `medium`, or `low`
- `recommendedAction`: `include`, `rename`, `split_and_rename`, `rename_or_drop`, `rename_or_hold`, or `hold_outside_main_archive`
- `rationale`: short editorial reason
- `evidenceIds`: references into `sourceCatalog`
- `reviewStatus`: `needs_import`, `needs_sources`, `ready_for_review`, `approved`, or `rejected`

## 8. Evidence Contract

Each future source should include:

- `id`: stable source id, for example `S01`
- `title`: source title or search label
- `type`: `official`, `job_board`, `report`, `article`, or `other`
- `url`: optional until sources are backfilled
- `accessedAt`: optional until sources are backfilled
- `searchKeywords`: optional query terms
- `note`: why this source supports the candidate
- `reviewStatus`: `needs_url`, `needs_access_date`, `reviewable`, or `accepted`

## 9. Promotion Rules

A candidate should not be promoted into `src/data.js` until:

- Its source records are reproducible enough for maintainers.
- The title is a real job title, not just a task description.
- The selected site status maps cleanly to `statusMeta`.
- The role fits the Career Graveyard editorial framing.
- The row has enough writing material for summary, timeline, decline factors, and memorial voices.

Promotion remains a manual editorial step. This avoids turning the candidate library into an automatic publishing queue.

## 10. Validation

This PR should verify:

- `data/candidate-career-library.json` parses as valid JSON.
- Formatting and lint checks still pass.
- The Next build still reads only current runtime data.

Future PRs that import real rows should add a schema validation script before the dataset grows.

## 11. Follow-Up Work

- Import the issue #41 data once source URLs, access dates, and search keywords are ready.
- Add a small validation script if the candidate file becomes large.
- Promote selected candidates to `src/data.js` in separate content PRs.
- Keep high-risk or growing roles in `holdouts` instead of publishing them as graveyard entries too early.
