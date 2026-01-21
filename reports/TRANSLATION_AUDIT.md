# Translation & Localization Audit — Medusa Tattoo München

**Date:** 2026-01-14

## Summary (high level) ✅
- Languages detected: **German (de)** and **English (en)** (via `src/locales/de.json` and `src/locales/en.json`).
- Tools run: locale key comparison, sitemap-driven bilingual DOM scan, form validation checks.
- Major findings:
  - Several page titles and H1s remain identical between German and English views (potentially untranslated) — **High priority**.
  - The Contact form (placeholders, submit text, validation messages) remains in German even when site language is set to English — **Critical**.
  - A locale key is missing in `en.json`: `gallery.noResults` (shows empty string) — **High**.
  - The Booking form contains static English labels and placeholders (not localized) — **High**.

---

## How I tested 🔧
1. Read `public/sitemap.xml` to enumerate pages.
2. Ran a locale key audit between `src/locales/de.json` and `src/locales/en.json` (script: `scripts/locale-audit.mjs`).
3. For each sitemap URL, used Playwright to set `localStorage.language = 'de'` and `'en'`, then captured:
   - Page title
   - Meta description
   - First H1
   - Nav text snapshot
   - Full-page screenshots for both languages
   (script/test: `tests/locale-scan.spec.ts`)
4. Tested interactive elements:
   - Contact form: submitted empty form in both languages to collect placeholders and validation messages (script: `tests/form-locale.spec.ts`).
   - Booking form inspected source and run a light scan (script: `tests/booking-form-locale.spec.ts`).
5. Aggregated issues to `reports/translation-issues.csv` using `scripts/compile-translation-issues.mjs`.

---

## Key Findings (prioritized) 🎯

### Critical (must-fix now) ⚠️
1. Contact form untranslated in English (page: `https://www.muenchen-tattoo-studio.de/contact`)
   - Element: placeholders, submit button text, validation error messages
   - Current state: German strings remain when language is set to English
   - Why critical: Forms are primary conversion paths; untranslated validation prevents non-German users from completing the form correctly.
   - Evidence: `reports/locale-scan/contact-form-locale.json` and screenshots: `reports/locale-scan/contact_de.png`, `reports/locale-scan/contact_en.png`
   - Recommendation: Replace static German strings with translation keys (use `t('xyz')`) and ensure validation messages are localized (e.g., pull messages from `src/locales/*.json`), then re-test.

### High (fix soon) 🔥
1. Page titles and H1s identical across languages (multiple pages)
   - Affected pages (examples): `/`, `/artists`, `/services`, `/gallery`, `/contact`, `/booking`, `/faq`, `/impressum`, `/datenschutz`, `/agb`
   - Element: `title` and `h1`
   - Current state: `identical_title` / `identical_h1` in the CSV
   - Evidence: `reports/locale-scan/locale-scan.csv` and `reports/translation-issues.csv` (severity `High`)
   - Recommendation: Ensure dynamic page content uses translation keys or server-rendered localized content. Update page headers and titles to use `t('page.title')` and `t('page.h1')` and populate `en.json` equivalents.

2. Missing English translation key: `gallery.noResults`
   - Current state: Missing empty value in `src/locales/en.json`
   - Evidence: `reports/locale-audit.csv` and `reports/translation-issues.csv`
   - Recommendation: Add `