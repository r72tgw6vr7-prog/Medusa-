# Repository Hygiene

## Keep in git

- source code
- configuration
- runbooks
- stable reference docs
- example environment files

## Do not keep in git

- build output
- coverage output
- Playwright reports and screenshots
- local QA dumps
- Lighthouse and ESLint report exports
- temporary verification images
- generated gallery derivatives that can be rebuilt

## Documentation layout

- `README.md`: project overview
- `PROJECT_RULES.md`: operating rules
- `docs/ops/*`: active operational runbooks
- `docs/archive/*`: historical material

## Local cleanup standard

- Primary worktree should not contain stale `dist`, `coverage`, `reports`, or temporary screenshots when you are done
- Temporary worktrees should be removed after merge/deploy
- Old branches should be deleted after merge or replaced with tags if kept only for rollback

## Before closing a task

- `git status` should show only intentional source or docs changes
- no generated artifacts should be staged
- docs should reflect any workflow change you introduced
