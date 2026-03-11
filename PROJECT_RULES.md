# Project Rules

Last updated: March 11, 2026

These rules define how this repository is operated. They are the authoritative project rules for humans and agents.

## 1. Source Of Truth

- `origin/main` is the only production source of truth.
- The public domains must always point to a deployment built from a commit on `origin/main`.
- The primary local worktree should be easy to realign to `main` at any time.

## 2. Branching And Worktrees

- Use short-lived branches: `feature/*`, `fix/*`, `chore/*`, `docs/*`.
- Use temporary worktrees only when they add clear value.
- Remove temporary worktrees after merge or deployment.
- Do not keep ambiguous rescue, backup, or experimental branches alive without a reason.
- Use tags for rollback and safety snapshots instead of long-lived backup branches.

## 3. Deployment Rules

- Production deploys must come from a clean `main` worktree.
- Never deploy from a dirty working tree.
- Never deploy from a non-`main` branch.
- Before a production deploy, run:
  - `pnpm run typecheck`
  - `pnpm run prepare-deploy`
- After deployment, verify:
  - deployment status is `Ready`
  - production aliases point to the new deployment
  - `/`, `/booking`, and `/contact` respond correctly

## 4. Environment And Secrets

- Secrets belong in Vercel or local environment files, not in source code.
- Public client variables still belong in environment configuration.
- If a production form or integration depends on an environment variable, verify that variable before deploying.
- Any environment contract change must update both code and docs.

## 5. Change Discipline

- Inspect the existing code before editing.
- Make the smallest coherent change that solves the actual problem.
- Do not rewrite or replace working systems without a technical reason.
- Do not invent placeholder content when the request implies preserving real content.
- If a workflow or operational assumption changes, update documentation in the same change.

## 6. Repository Hygiene

- Generated artifacts do not belong in git.
- Keep `dist`, `coverage`, Playwright reports, screenshots, QA dumps, and report exports out of version control.
- Keep operational docs small and current.
- Historical docs and audits belong in `docs/archive/` or should be treated as reference only.

## 7. Documentation Rules

- Required current docs live here:
  - `README.md`
  - `AGENTS.md`
  - `PROJECT_RULES.md`
  - `docs/ops/*`
- If these conflict with older docs, these files win.
- Older audits, handoff files, and one-off reports are not operational authority.

## 8. Definition Of Done

A task is not complete until:

- code or docs changes are intentional and minimal
- `git status` contains no accidental artifacts
- required checks have been run or any gap is explicitly stated
- deployment-facing changes have matching documentation updates

## 9. Local Working Model

- Keep one clean local worktree aligned to `main`.
- Do active development in a feature branch or secondary worktree.
- If local work must be preserved before realignment, store it in a named branch, not as mystery uncommitted changes.
