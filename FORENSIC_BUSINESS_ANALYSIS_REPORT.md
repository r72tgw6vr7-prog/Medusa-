# Forensic Business Analysis Report

Date: March 10, 2026
Scope: local repo plus local rendered UI only
Repo: Medusa Tattoo Munchen

## Executive Summary

Current product health is mixed. Core routes render locally, `i18n:validate-all` passes, reduced-motion support is at least partially implemented, and the tested desktop/tablet/mobile routes did not show horizontal overflow. That said, the repo still has real ship blockers in privacy/compliance and client-side form handling, plus unresolved design-system failures and stale documentation that no longer matches runtime behavior.

The two highest-risk findings are:
- Client-side exposure of the live Web3Forms access key in booking and contact submission code.
- Analytics/consent logic drift: analytics mounts unconditionally, consent UI is not rendered, and the GDPR helper is a placeholder. If `VITE_GA4_MEASUREMENT_ID` is configured in production, tracking will initialize before any consent choice. This is an inference from the code path, not from the current local env, because local dev did not have a GA measurement ID set.

## Scorecard

| Area | Status | Notes |
|---|---|---|
| Code Quality | WARN | `lint` red, `hygiene` red, `typecheck` baseline was green but rerun did not finish before audit cutoff |
| Design System | FAIL | 16 enforced spacing/card-layout errors plus 131 hardcoded color/style hits from the repo audit |
| Accessibility | WARN | Home skip link works, reduced motion works for scroll progress, but skip links are inconsistent and the 404 page lacks normal landmarks/meta |
| Runtime UX | WARN | Core routes load, but 404 handling is weak and German-only mode still leaks English strings |
| Safety / Privacy | FAIL | Client-side third-party form key exposure and consent gating gaps |
| Test / Gate Health | WARN | `i18n:validate-all` passes; `find:unused` is noisy/advisory because `knip` is not tuned |
| Docs / Config Drift | FAIL | README and audit docs materially disagree with current code and runtime behavior |

## Findings Register

### P0 - Ship blockers / safety regressions

1. Client-side form secret exposure in booking and contact flows
- Evidence:
  - `src/services/bookingService.ts:83` appends a live `access_key` directly into browser-submitted `FormData`.
  - `src/services/contactService.ts:18` does the same in the contact flow.
  - Both services POST directly to `https://api.web3forms.com/submit` from the client at `src/services/bookingService.ts:139` and `src/services/contactService.ts:38`.
- Impact:
  - The key is recoverable from the client bundle.
  - Abuse/spam protection, rate limiting, request validation, and audit controls remain outside first-party control.
  - Any rotation requires a client redeploy.
- Recommended fix:
  - Move submission behind a server-side endpoint or serverless function and keep third-party secrets off the client.
- Confidence:
  - High. Observed directly in source.

2. Consent gating is not actually wired, while analytics mounts globally
- Evidence:
  - `src/App.tsx:75-87` mounts `AnalyticsProvider` for the entire app with no consent guard.
  - `src/components/AnalyticsProvider.tsx:14-18` always initializes page-view, scroll-depth, and time-on-page hooks.
  - `src/hooks/useAnalytics.ts:17-23`, `src/hooks/useAnalytics.ts:45-99` track automatically on route changes, scroll, and time-on-page.
  - `src/utils/analytics.ts:66-75` and `src/utils/analytics.ts:90-123` initialize GA as soon as `VITE_GA4_MEASUREMENT_ID` exists.
  - Repo search showed `CookieConsentBanner` is defined and exported but not rendered anywhere in the app.
  - `src/components/molecules/GDPRCompliance.tsx:13-18` is placeholder logic and checks the wrong storage shape (`cookieConsent === 'true'`), which does not match the JSON object used by the banner component.
- Impact:
  - If GA is enabled in production, tracking will start before an explicit consent decision.
  - The codebase currently cannot support defensible privacy claims about analytics consent.
- Recommended fix:
  - Make one consent implementation authoritative.
  - Render it at app root.
  - Gate analytics initialization and event tracking behind actual consent state.
  - Remove the placeholder GDPR component once real wiring exists.
- Confidence:
  - High on the wiring gap.
  - High on the analytics-before-consent risk as an inference from code.

### P1 - High-risk quality / UX defects

3. Booking flow still leaks English strings in the German-only product
- Evidence:
  - `src/services/bookingService.ts:46-49` maps non-piercing service labels to `Tattoo Artistry`.
  - `src/services/bookingService.ts:64-69` still includes `Custom Design`.
  - `src/services/bookingService.ts:166-172` returns English validation errors.
  - Local browser check on `/booking` showed the primary service card rendered as `Tattoo Artistry`.
- Impact:
  - The German-only implementation is not internally consistent.
  - Conversion surfaces look unfinished and inconsistent with the rest of the product.
- Recommended fix:
  - Localize booking service labels, option labels, and validation errors from the same source-of-truth locale bundle used elsewhere.
- Confidence:
  - High. Confirmed in code and rendered UI.

4. 404 handling is incomplete for both UX and SEO
- Evidence:
  - `src/App.tsx:228-229` routes unknown paths to `NotFoundPage`.
  - `src/pages/NotFoundPage.tsx:9-18` uses English copy and CTA text in a German-only app.
  - Local route audit on `/this-route-should-404` rendered a 404 view but kept a generic site title, had no `main` landmark, and returned HTTP `200` in local Vite.
  - `vercel.json:33-37` rewrites all extensionless routes to `/index.html`, so production behavior is likely to remain SPA-200 unless explicit 404 handling is added.
- Impact:
  - Unknown routes are indexable as successful pages unless hosting adds a real 404.
  - Users on broken URLs get inconsistent language and weaker accessibility structure.
- Recommended fix:
  - Add 404-specific metadata, German copy, and normal landmarks.
  - Use platform-level 404 handling or a middleware/edge rule for true 404 responses where possible.
- Confidence:
  - High on the page content issue.
  - Medium-high on production 200 behavior; inferred from current rewrite strategy.

5. Design-system enforcement is still red in user-facing files
- Evidence:
  - `pnpm run hygiene` failed with 16 enforced errors:
    - `src/components/pages/Footer.tsx` at lines 88, 94, 194, 208, 217, 250
    - `src/components/ui/hero-parallax.tsx` at lines 261, 285
    - `src/pages/ContactPage.tsx` at lines 157, 163, 166, 169, 225, 328, 384, 410
  - `pnpm run lint` also failed and surfaced the same design-system errors plus 74 warnings.
- Impact:
  - The repo's stated quality contract is not currently being met.
  - Footer, contact, and hero surfaces remain the main consistency debt.
- Recommended fix:
  - Clear the enforced `medusa/enforce-8px-spacing` and `medusa/enforce-card-layout` failures before treating the design system as stable.
- Confidence:
  - High. Based on current command output.

6. Documentation claims no longer match runtime reality
- Evidence:
  - `README.md:3` and `README.md:215-217` still claim full German/English support.
  - `README.md:60-76` documents server-side SendGrid plus `VITE_GA_MEASUREMENT_ID`, while runtime code uses Web3Forms and `VITE_GA4_MEASUREMENT_ID` at `src/utils/analytics.ts:66-68` and `src/lib/env.ts:23-29`.
  - `docs/ACCESSIBILITY_IMPROVEMENT_PLAN.md:20-30` claims skip links, focus, and touch targets are fixed.
  - `docs/COMPONENT_COLOR_AUDIT.md:4` claims all violations are fixed.
  - `docs/PRE_HANDOFF_EXECUTIVE_SUMMARY.md:12-20` and `docs/PRE_HANDOFF_EXECUTIVE_SUMMARY.md:96-101` claim accessibility and design quality are effectively complete.
- Impact:
  - Handoff docs cannot currently be trusted as operational truth.
  - Reviewers and developers are likely to make wrong assumptions about i18n, accessibility, and integration paths.
- Recommended fix:
  - Reduce docs to what is true today.
  - Mark aspirational docs as archival or rewrite them from current code.
- Confidence:
  - High. Direct file-to-code comparison.

### P2 - Maintainability / consistency debt

7. Hardcoded style debt remains concentrated in a few modules
- Evidence:
  - `pnpm run design-system:audit` reported 131 hits.
  - Highest concentrations from the audit sample:
    - `src/utils/glassmorphism.ts` - 35
    - `src/styles/glassmorphism.ts` - 15
    - `src/components/ui/button.tsx` - 13
    - `src/components/ui/CursorTrail.tsx` - 8
    - `src/services/emailService.ts` - 6
  - `src/components/GoogleMapSection.tsx:5-18` also uses hardcoded inline color/filter styling outside the token system.
- Impact:
  - Token compliance is improving, but the style system is still bypassed in important implementation areas.
- Recommended fix:
  - Start with glassmorphism helpers and shared primitives, then remove inline style exceptions from map and utility components.
- Confidence:
  - High.

8. Accessibility behavior is inconsistent by route
- Evidence:
  - Route sweep found a skip link on `/`, `/artists`, and `/gallery`, but not on `/services/tattoos`, `/services/piercings`, `/booking`, `/contact`, `/faq`, or `/legal`.
  - Keyboard spot-check on home confirmed the skip link is focusable and receives focus on first `Tab`.
  - Reduced-motion spot-check confirmed the scroll-progress UI is disabled when `prefers-reduced-motion: reduce` is emulated.
- Impact:
  - Accessibility quality is uneven across templates rather than systemic.
- Recommended fix:
  - Move skip-link rendering to a shared shell so all routes inherit it.
  - Add route-level accessibility smoke tests for landmarks and keyboard entry points.
- Confidence:
  - High.

9. Dead-code reporting is currently advisory, not a reliable gate
- Evidence:
  - `pnpm run find:unused` reported many unused files and also emitted `Configuration hints (2)`, including a missing `knip.json` and a missing package entry hint for `src/index.tsx`.
- Impact:
  - The output is directionally useful but too noisy to treat as blocker truth.
- Recommended fix:
  - Configure `knip` properly before using it as a quality gate.
- Confidence:
  - High.

10. The worktree is too dirty to treat local state as a clean release candidate
- Evidence:
  - `git status --short` shows a large number of unrelated modified and deleted tracked files, including many historical Playwright artifact deletions and active source edits outside the audited scope.
- Impact:
  - Audit results must be interpreted against a moving local baseline.
  - Release confidence is weaker until the worktree is partitioned into intentional changes.
- Recommended fix:
  - Split current work into smaller branches or clean commits before final acceptance testing.
- Confidence:
  - High.

## Quality Gates

| Check | Result | Notes |
|---|---|---|
| `pnpm run lint` | FAIL | 16 errors, 74 warnings |
| `pnpm run hygiene` | FAIL | 16 enforced design-system errors; circular dependency check passed; public markdown check passed |
| `pnpm run i18n:validate-all` | PASS | 1489 DE keys, 1489 EN keys, 504 usages, missing 0/0 |
| `pnpm run find:unused` | WARN | Noisy advisory output; `knip` configuration incomplete |
| `pnpm run design-system:audit` | WARN | 131 hardcoded color/style hits |
| `pnpm run typecheck` | INCONCLUSIVE | Previous baseline was green; current rerun did not finish before audit cutoff |

## Local UI Audit

Routes checked locally:
- `/`
- `/services/tattoos`
- `/services/piercings`
- `/artists`
- `/gallery`
- `/booking`
- `/contact`
- `/faq`
- `/legal`
- `/this-route-should-404`

What passed:
- All audited routes rendered in the local app.
- No raw translation keys were visible on the audited routes.
- No horizontal overflow was detected on `/`, `/booking`, `/contact`, or `/gallery` at 390px, 768px, and 1440px widths.
- Reduced-motion emulation removed the scroll-progress UI as expected.

What failed or drifted:
- `/booking` still surfaced English product text (`Tattoo Artistry`).
- `/this-route-should-404` rendered English copy and kept non-404 page metadata.
- Skip-link availability was inconsistent across routes.
- Console noise repeated on navigation from analytics initialization warnings and unused-preload warnings.

## Remediation Sequence

### Quick wins
- Remove the Web3Forms key from the client and proxy both forms through first-party endpoints.
- Gate analytics behind actual stored consent and mount a real consent UI at app root.
- Localize the remaining booking and 404 strings.
- Clear the 16 hygiene blockers in footer, contact, and hero components.

### Medium fixes
- Add real 404 metadata and platform-aware 404 handling.
- Normalize skip-link and landmark behavior across all routes.
- Rewrite README and audit docs to match the German-only app, current analytics variable names, and actual form architecture.

### Structural follow-up
- Reduce hardcoded style usage in glassmorphism utilities and shared UI primitives.
- Configure `knip` so dead-code reporting becomes trustworthy.
- Clean the worktree and rerun the full gate stack on a stable branch.

## Notes

- This report intentionally separates code/repo health from the large unrelated dirty worktree.
- No repo-tracked source files were modified for this audit besides this report file.
