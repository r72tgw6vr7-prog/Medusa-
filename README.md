# Medusa Tattoo München

Production website for Medusa Tattoo München, built with React, TypeScript, Vite, and Vercel.

## Operating model

- `main` is the only production branch
- the public domain must always reflect a commit on `origin/main`
- the primary local worktree should stay aligned with `main`
- feature work belongs on short-lived branches or temporary worktrees

## Core commands

```bash
pnpm install
pnpm run dev
pnpm run typecheck
pnpm run prepare-deploy
pnpm run deploy:production
```

## Production-critical environment variables

- `VITE_WEB3FORMS_KEY`
- `VITE_GOOGLE_MAPS_API_KEY` when embedded maps are enabled
- `VITE_GA_MEASUREMENT_ID` when analytics is enabled

Use `.env.example` for local examples. Production and preview values live in Vercel.

## Source-of-truth docs

- [AGENTS.md](./AGENTS.md)
- [PROJECT_RULES.md](./PROJECT_RULES.md)
- [Operations Manual](./docs/ops/README.md)

## Repository layout

- `src/`: application source
- `public/`: static assets
- `docs/ops/`: active runbooks
- `docs/archive/`: historical reference

Everything outside those operational docs should be treated as implementation detail or historical material unless explicitly referenced by the active runbooks.
