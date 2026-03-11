# Agent Operating Contract

Read these files before making any change:

1. `AGENTS.md`
2. `PROJECT_RULES.md`
3. `docs/ops/README.md`
4. The relevant runbook in `docs/ops/`

Instruction priority inside this repository:

1. `AGENTS.md`
2. `PROJECT_RULES.md`
3. `docs/ops/*`
4. Historical docs elsewhere in `docs/` and root

Non-negotiable rules:

- `main` is the only production branch.
- Production deploys come only from a clean `main` worktree.
- Never deploy from a dirty working tree or from a feature branch.
- Keep the primary local worktree aligned with `main`.
- Do new work on short-lived feature branches or temporary worktrees.
- Before editing, inspect `git status`, current branch, and `git worktree list`.
- Before changing deployment, secrets, booking, contact, or infrastructure, read the matching runbook in `docs/ops/`.
- Do not commit generated outputs, reports, screenshots, coverage, build artifacts, or local diagnostics.
- If you change workflow, deployment, environment variables, or branching rules, update the docs in the same change.

Repository intent:

- The website on the public domain should always map to a real commit on `origin/main`.
- Local development may differ temporarily, but the primary local worktree should be easy to realign to production at any time.
- Historical docs are reference material, not operational authority.
