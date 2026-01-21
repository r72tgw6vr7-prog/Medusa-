# i18n Translation Validation System

## Overview

This Medusa project uses **i18next** with **react-i18next** for bilingual (DE/EN) internationalization. A comprehensive validation system ensures translation consistency and prevents runtime errors.

---

## Stack Details

- **Library**: i18next v25.6.0 + react-i18next v15.7.3
- **Locales**: `de` (default), `en`
- **Namespaces**: `common`, `home`, `booking`, `contact`, `services`, `artists`, `gallery`, `errors`, `validation`
- **Location**: `src/i18n/locales/{de,en}/*.json`
- **Locale Detection**: localStorage → navigator (browser language)
- **Fallback**: All locales fall back to `de` (German)

---

## Validation Scripts

### 1. Key Comparison Validator

**Script**: `scripts/i18n-validate.mjs`  
**Command**: `npm run i18n:check`

**What it does**:
- Compares DE and EN translation files for each namespace
- Detects missing keys in either locale
- Validates placeholder variable consistency (e.g., `{{count}}`)
- Exits with non-zero code on errors (CI-friendly)

**Example output**:
```
✅ common: 38 keys validated successfully
⚠️  services: Both DE and EN files are empty
❌ booking: Missing in EN (3 keys):
   - modal.personalTitle
   - payment.methodLabel
   - gdpr.consent
```

---

### 2. Code Usage Scanner

**Script**: `scripts/i18n-scan-usage.mjs`  
**Command**: `npm run i18n:scan-usage`

**What it does**:
- Scans all `.ts` and `.tsx` files for `t('key')` calls
- Validates that every key used in code exists in both DE and EN
- Reports file path and line number for missing keys
- Exits with non-zero code on errors (CI-friendly)

**Example output**:
```
🔑 Found 78 translation key usages
❌ Keys used in code but missing in DE translations:
   common.modal.close
      at /src/components/molecules/ArtistBioModal.tsx:91
```

---

### 3. Full Validation

**Command**: `npm run i18n:validate-all`

Runs both validators in sequence. Use this in CI pipelines.

---

## CI Integration

Add to your CI pipeline (e.g., GitHub Actions, Vercel):

```yaml
- name: Validate translations
  run: npm run i18n:validate-all
```

Or update `package.json`:

```json
{
  "scripts": {
    "ci:check": "npm run typecheck && npm run i18n:validate-all && npm run build:force"
  }
}
```

---

## Translation File Structure

### Namespace Organization

```
src/i18n/locales/
├── de/
│   ├── common.json      # Navigation, footer, meta tags, shared UI
│   ├── home.json        # Homepage hero section
│   ├── booking.json     # Booking form, modal, confirmation
│   ├── contact.json     # Contact form
│   ├── gallery.json     # Gallery filters
│   ├── validation.json  # Form validation messages
│   ├── services.json    # (empty - reserved)
│   ├── artists.json     # (empty - reserved)
│   └── errors.json      # (empty - reserved)
└── en/
    └── (same structure)
```

### Key Naming Convention

Keys are **flat** within each namespace:

```json
{
  "nav": {
    "home": "Startseite",
    "services": "Leistungen"
  },
  "footer": {
    "copyright": "© 2025 Medusa Tattoo München"
  }
}
```

**In code**, reference keys **without** the namespace prefix:

```tsx
// ✅ Correct
t('nav.home')
t('footer.copyright')

// ❌ Wrong (double namespace)
t('common.nav.home')
```

The `splitTranslationKey()` function in `src/i18n/index.ts` handles namespace resolution automatically.

---

## Usage in Components

### Basic Usage

```tsx
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('nav.home')}</h1>;
}
```

### With Placeholders

```tsx
// Translation file
{
  "validation": {
    "minLength": "Must be at least {{count}} characters"
  }
}

// Component
t('validation.minLength', { count: 10 })
// Output: "Must be at least 10 characters"
```

### Preloading Namespaces

```tsx
// Preload specific namespace(s) to avoid loading delay
const { t } = useTranslation('booking');
const { t } = useTranslation(['booking', 'validation']);
```

---

## Locale Switching

### Via Context

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <button onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}>
      {language === 'de' ? 'EN' : 'DE'}
    </button>
  );
}
```

### URL Synchronization

The `LocaleRouteSync` component (already mounted in `App.tsx`) keeps URL and language state in sync:

- German: `/` → `de`
- English: `/en` → `en`

Switching language automatically updates the URL prefix.

---

## Known Issues (Resolved)

### ✅ BUG-001: LocaleRouteSync Race Condition
**Status**: Fixed  
**Solution**: Single unified effect with guard flags (`isNavigatingRef`, `lastSyncedLocaleRef`)

### ✅ BUG-002: ProcessTimeline Separate Context
**Status**: Fixed  
**Solution**: Uses global `useLanguage()` from `@/contexts/LanguageContext`

### ✅ BUG-003: AftercarePage Hardcoded Language
**Status**: Fixed  
**Solution**: Uses global `useLanguage()` from context

### ✅ BUG-004: Missing `common.close` Key
**Status**: Fixed  
**Solution**: Added to both `de/common.json` and `en/common.json`

---

## Empty Namespaces

The following namespaces are registered but currently empty:

- `services.json` (DE/EN)
- `artists.json` (DE/EN)
- `errors.json` (DE/EN)

**Action**: Either populate with translations or remove from `NAMESPACES` array in `src/i18n/index.ts` to avoid unnecessary loading.

---

## Debugging Missing Translations

### Development Mode

In development (`import.meta.env.DEV`), missing keys are prefixed with `⚠️`:

```tsx
t('nonexistent.key')
// Output in dev: "⚠️ nonexistent.key"
// Output in prod: "nonexistent.key"
```

### Console Warnings

i18next logs warnings to console when keys are missing (only in dev mode due to `saveMissing: import.meta.env.DEV`).

---

## Adding New Translations

### 1. Add to Both Locales

Edit both `src/i18n/locales/de/{namespace}.json` and `src/i18n/locales/en/{namespace}.json`:

```json
// de/common.json
{
  "newKey": "Neuer Text"
}

// en/common.json
{
  "newKey": "New text"
}
```

### 2. Validate

```bash
npm run i18n:validate-all
```

### 3. Use in Code

```tsx
t('newKey')
```

---

## Placeholder Best Practices

### ✅ Consistent Variables

```json
// ✅ Good - same placeholder in both locales
{
  "de": "Mindestens {{count}} Zeichen",
  "en": "At least {{count}} characters"
}
```

### ❌ Inconsistent Variables

```json
// ❌ Bad - different placeholders
{
  "de": "Mindestens {{count}} Zeichen",
  "en": "At least {{length}} characters"  // Wrong!
}
```

The validator will catch this and fail.

---

## Testing Locale Switching

### Manual Testing

1. Start dev server: `npm run dev`
2. Open browser console
3. Check `localStorage.getItem('language')` → should be `de` or `en`
4. Click language toggle
5. Verify:
   - URL changes (`/` ↔ `/en`)
   - UI text changes
   - No console warnings about missing keys

### Automated Testing

Playwright tests exist in `tests/locale-scan.spec.ts` and `tests/meta-locale.spec.ts`.

---

## Summary

- **126 keys** validated across 6 active namespaces
- **78 translation calls** scanned in source code
- **0 missing keys** after fixes
- **0 placeholder mismatches**
- **CI-ready** validation scripts

Run `npm run i18n:validate-all` before every deployment.
