# Rollback

## Preferred rollback unit

- a tagged, previously verified commit on `main`

## Rollback process

1. Identify the last known good tag or commit on `main`
2. Confirm what failed: code, environment variable, or alias promotion
3. If the code is bad, redeploy the last known good commit
4. If only aliasing is wrong, repoint the production domains to the correct Vercel deployment
5. Re-test `/`, `/booking`, and `/contact`

## Minimum rollback notes

Record:

- failing deployment id
- restored deployment id or commit
- reason for rollback
- follow-up fix required

## Do not do

- emergency deploys from a dirty local directory
- silent secret changes without documentation
- untracked manual production edits
