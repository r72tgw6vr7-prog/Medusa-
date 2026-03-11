# Branching And Releases

## Branch model

- `main`: the only production branch
- `feature/*`: new features
- `fix/*`: bug fixes
- `chore/*`: maintenance
- `docs/*`: documentation-only work

## Worktree model

- Primary local worktree: clean `main`
- Optional secondary worktree: temporary feature or release work only
- Remove temporary worktrees after merge or deploy

## Release policy

1. Work is developed on a short-lived branch.
2. It is merged into `main`.
3. `main` is verified from a clean worktree.
4. Production deploy is triggered from that clean `main` worktree.
5. Vercel aliases are verified after deployment.

## Official production domains

- `https://www.muenchen-tattoo-studio.de`
- `https://muenchen-tattoo-studio.de`

## Required release checks

- `pnpm run typecheck`
- `pnpm run prepare-deploy`
- Smoke check the critical routes
- Smoke check booking and contact if their code or env changed
- Verify production aliases point to the latest deployment:
  - `vercel inspect <deployment-url>`
- Verify live routes on the official domain: `/`, `/booking`, `/contact`

## Naming conventions

- Branches: `feature/...`, `fix/...`, `chore/...`, `docs/...`
- Release tags: `release-YYYYMMDD-HHMM`
- Hotfix tags: `hotfix-YYYYMMDD-HHMM`
- Safety snapshots: use tags, not long-lived `backup` branches

## What is not allowed

- Deploying from a dirty worktree
- Deploying from non-`main`
- Keeping ambiguous long-lived rescue branches
- Treating a preview branch as production
