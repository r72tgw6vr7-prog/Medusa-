# Operations Manual

This directory is the source of truth for how this repository is operated.

Read order:

1. `README.md`
2. `BRANCHING_AND_RELEASES.md`
3. `ENVIRONMENT_AND_SECRETS.md`
4. `REPOSITORY_HYGIENE.md`
5. `ROLLBACK.md`

Core policy:

- `main` is the single production branch.
- The public domain must always point to a commit on `origin/main`.
- Official production domains are:
  - `https://www.muenchen-tattoo-studio.de`
  - `https://muenchen-tattoo-studio.de`
- Local primary worktree should stay on `main` and stay clean.
- Feature work belongs on short-lived branches or temporary worktrees.
- Generated reports and verification artifacts are local-only and must not be committed.

Anything outside `docs/ops/` should be treated as one of these:

- historical reference
- design/archive material
- one-off audit output

If there is a conflict, `docs/ops/` wins.
