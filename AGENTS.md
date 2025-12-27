# Repository Guidelines

This guide sets expectations for contributors building the **Next.js 16 + TypeScript App Router** project documented in `/docs`. Keep changes small, reproducible, and aligned with the existing issue breakdown (`docs/13_issue_breakdown.md`).

## Project Structure & Module Organization
- `docs/` — product, UX, scoring, backlog, prompts, onboarding; read `docs/README.md` for the index.
- Planned source (per `docs/16_dev_onboarding.md`): `app/` (routes), `components/ui` (shadcn wraps), `components/three` (R3F), `lib/` (scoring/storage/analytics), `data/questions.ts` (48 questions).
- Keep 3D in Client Components with reduced-motion/WebGL fallbacks; avoid `dangerouslySetInnerHTML`.

## Build, Test, and Development Commands
- `pnpm install` — install deps (Node 20+, pnpm 9+).
- `pnpm dev` — run the Next.js dev server.
- `pnpm lint` — lint/format per ESLint + Prettier.
- `pnpm test` — unit tests (scoring core).
- `pnpm test:e2e` — Playwright flow: start→answer→result→share.

## Coding Style & Naming Conventions
- TypeScript, Next.js App Router; prefer Server Components except where client/3D/UI state is required.
- Use functional, pure utilities under `lib/`; avoid side effects.
- Naming: `I-XXX` tags for branches/PRs; files kebab-case in `app/`, PascalCase for React components, camelCase for vars/functions.
- Keep deps minimal; justify additions in `package.json` comments.

## Testing Guidelines
- Cover scoring math: reverse-scoring, averaging, 0–100 conversion, attachment quadrants, SDT derived values.
- UI E2E: ensure navigation blocks on unanswered questions, preserves answers on back, saves/restores drafts, and renders results safely when analytics/3D are off.
- Prefer deterministic tests; mock storage/web APIs as needed.

## Commit & Pull Request Guidelines
- 1 feature = 1 PR/commit; keep diff small and scoped to one I-issue.
- Messages: concise imperative summary (e.g., `Add scoring reversals`), referencing `I-XXX` when applicable.
- PRs: include what/why, test evidence (`pnpm test`, `pnpm test:e2e`), and screenshots/gifs for UI changes. Note reduced-motion/WebGL fallback behavior when relevant.

## Security & Configuration Tips
- Treat analytics as opt-in; never send PII or raw answers.
- Guard against SSR/CSR mismatches; gate any `window` usage.
- Prefer feature flags/env vars for experimental analytics or 3D intensity tweaks.
