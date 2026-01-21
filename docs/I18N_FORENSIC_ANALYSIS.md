# 🔍 Forensic i18n System Analysis Report
## Medusa Tattoo Munich - Bilingual System Audit

**Date:** January 19, 2026  
**Analyst:** Development Team  
**Status:** ⚠️ **MULTIPLE CRITICAL ISSUES FOUND**

---

## Executive Summary

The bilingual (DE/EN) internationalization system has **4 critical bugs**, **8 high-priority warnings**, and multiple hardcoded strings requiring translation. These issues cause visible glitches including language flicker, missing translations, and components that ignore the global language setting.

---

## 🔴 CRITICAL BUGS (Must Fix Immediately)

### BUG-001: Race Condition in LocaleRouteSync
**File:** [src/i18n/LocaleRouteSync.tsx](src/i18n/LocaleRouteSync.tsx#L22-L37)  
**Severity:** 🔴 Critical  
**Symptom:** Language flicker, potential infinite loop

**Problem:** Two competing `useEffect` hooks cause a ping-pong effect:

```tsx
// Effect 1: URL → language (lines 22-26)
useEffect(() => {
  const fromUrl = langFromPath(location.pathname);
  if (fromUrl !== language) {
    setLanguage(fromUrl);  // Sets language state
  }
}, [location.pathname, language, setLanguage]);

// Effect 2: language → URL (lines 29-37)
useEffect(() => {
  const fromUrl = langFromPath(location.pathname);
  if (fromUrl === language) return;
  // navigate() changes URL, which triggers Effect 1 again!
  navigate(next, { replace: true });
}, [language, location.pathname, navigate]);
```

**Root Cause:** When language changes:
1. Effect 2 triggers navigation
2. Navigation changes URL
3. Effect 1 detects URL change and updates language
4. Effect 2 sees language change and tries to navigate again

**Fix Required:** Use a ref flag or combine into single effect with proper guards.

---

### BUG-002: ProcessTimeline Creates Its Own LanguageContext
**File:** [src/sections/ProcessTimeline/ProcessTimeline.tsx](src/sections/ProcessTimeline/ProcessTimeline.tsx#L9-L13)  
**Severity:** 🔴 Critical  
**Symptom:** ProcessTimeline NEVER responds to language changes

**Problem:**
```tsx
// LINE 9-13: Creates SEPARATE context that ALWAYS defaults to 'DE'
const LanguageContext = createContext<'DE' | 'EN'>('DE');
export const useLanguage = () => {
  const language = useContext(LanguageContext);
  return { language };
};
```

This component creates its **own** `LanguageContext` instead of importing from `@/contexts/LanguageContext`. It will ALWAYS show German content regardless of the app-wide language setting.

**Fix Required:** Remove local context and import from `@/contexts/LanguageContext`.

---

### BUG-003: AftercarePage Hardcodes Language to German
**File:** [src/pages/AftercarePage.tsx](src/pages/AftercarePage.tsx#L30)  
**Severity:** 🔴 Critical  
**Symptom:** AftercarePage always displays German content

**Problem:**
```tsx
// LINE 30: Language is HARDCODED to 'de' and never syncs
const [language] = useState<'de' | 'en'>('de');
```

The page maintains its own local state instead of using the global context.

**Fix Required:** Replace with `const { language } = useLanguage()` from context.

---

### BUG-004: Async Namespace Loading Without Re-render
**File:** [src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx#L63-L72)  
**Severity:** 🔴 Critical  
**Symptom:** Translation keys show raw key strings briefly on first load

**Problem:**
```tsx
const t = useMemo(() => {
  return (fullKey: string): string => {
    if (!i18n.hasResourceBundle(i18n.language, namespace)) {
      void i18n.loadNamespaces([namespace]); // FIRE AND FORGET!
    }
    return i18n.t(key, { ns: namespace }); // Returns key if not loaded yet
  };
}, [i18n]);
```

The namespace loads **asynchronously** but translation returns **synchronously**. No re-render is triggered when namespace finishes loading.

**Fix Required:** Add state tracking for namespace loading status or use proper Suspense boundaries.

---

## 🟠 HIGH-PRIORITY WARNINGS

### WARN-001: Empty Translation Namespaces
**Files:** 
- [src/i18n/locales/de/services.json](src/i18n/locales/de/services.json) - `{}`
- [src/i18n/locales/en/services.json](src/i18n/locales/en/services.json) - `{}`
- [src/i18n/locales/de/artists.json](src/i18n/locales/de/artists.json) - `{}`
- [src/i18n/locales/en/artists.json](src/i18n/locales/en/artists.json) - `{}`
- [src/i18n/locales/de/errors.json](src/i18n/locales/de/errors.json) - `{}`
- [src/i18n/locales/en/errors.json](src/i18n/locales/en/errors.json) - `{}`

These files are registered in `NAMESPACES` but contain no translations. Wastes loading resources.

**Action:** Either populate or remove from `NAMESPACES` array in [src/i18n/index.ts](src/i18n/index.ts#L12-L21).

---

### WARN-002: Missing TypeScript Import Error
**File:** [src/components/motion/motion-system.tsx](src/components/motion/motion-system.tsx#L11)  
**Severity:** 🟠 High  
**Symptom:** TypeScript compile error

**Problem:**
```tsx
import { useReducedMotion as usePrefersReducedMotion } from '@/hooks/useReducedMotion';
```

The hook exists at `src/hooks/useReducedMotion.ts` but TypeScript can't resolve it. May be path alias issue.

---

### WARN-003: Missing aria-label Translation Key
**Impact:** Accessibility labels show raw key  
**Missing Key:** `common.modal.close`

Used in modal close buttons but key doesn't exist in [common.json](src/i18n/locales/de/common.json).

---

### WARN-004: Missing English Routes for Legal Pages
**File:** [src/App.tsx](src/App.tsx)

English routes exist for main pages but NOT for:
- `/impressum` → No `/en/impressum`
- `/datenschutz` → No `/en/privacy`
- `/agb` → No `/en/terms`
- `/faq` → No `/en/faq`
- `/aftercare` → No `/en/aftercare`

Users switching to English can't access translated legal pages.

---

### WARN-005: tsconfig.json Has Invalid Option
**File:** [tsconfig.json](tsconfig.json#L9)  
**Symptom:** TypeScript compilation warning

```json
"ignoreDeprecations": "6.0"  // Invalid value
```

---

## 📝 Hardcoded Strings Requiring Translation

### German Strings (Must Add to Translation Files)

| Component | String | Suggested Key |
|-----------|--------|---------------|
| ContactPage | "So finden Sie uns" | `contact.map.heading` |
| ContactPage | "Kontaktformular" | `contact.form.heading` |
| ContactPage | "Adresse" | `contact.address.label` |
| ContactPage | "Telefon" | `contact.phone.label` |
| ContactPage | "Öffnungszeiten" | `contact.hours.label` |
| ContactPage | "Unser Studio" | `contact.studio.heading` |
| AftercarePage | "Heilungsphasen" | `aftercare.phases.heading` |
| AftercarePage | "Details anzeigen" | `aftercare.showDetails` |
| AftercarePage | "Weniger anzeigen" | `aftercare.hideDetails` |
| BladeAccordion | "Tippen zum Erweitern" | `artists.tapToExpand` |
| BladeAccordion | "Hover zum Erweitern" | `artists.hoverToExpand` |
| FAQPageNew | All FAQ content | `faq.*` namespace |
| Footer | "Premium tattoo artistry in München" | `footer.tagline` |

### English Strings (Hardcoded in German-First Components)

| Component | String | Issue |
|-----------|--------|-------|
| MainNavigation | "Main Menu" (sr-only) | Should be translated |
| Footer | "Quick Links", "Services" | Should use t() |
| BookingModalMobile | aria-labels | Should use t() |

---

## 🔧 Translation File Structure Issues

### Key Structure Inconsistencies

**In translation files:** Keys are flat: `nav.home`, `footer.copyright`

**In code:** Sometimes prefixed with namespace, sometimes not:
```tsx
// Some components
t('common.nav.home')     // ❌ Wrong - double namespace
t('nav.home')            // ✅ Correct

// The splitTranslationKey function handles this but it's confusing
```

---

## 📊 Translation Coverage Matrix

| Namespace | DE Keys | EN Keys | Used In Code | Status |
|-----------|---------|---------|--------------|--------|
| common | 24 | 24 | ✅ Yes | ✅ OK |
| home | 3 | 3 | ✅ Yes | ✅ OK |
| booking | 50+ | 50+ | ✅ Yes | ✅ OK |
| contact | 12 | 12 | ✅ Yes | ✅ OK |
| gallery | 9 | 9 | ✅ Yes | ✅ OK |
| validation | 4 | 4 | ✅ Yes | ✅ OK |
| services | 0 | 0 | ❌ No | ⚠️ EMPTY |
| artists | 0 | 0 | ❌ No | ⚠️ EMPTY |
| errors | 0 | 0 | ❌ No | ⚠️ EMPTY |

---

## 🎯 Recommended Fix Priority

### Priority 1 - Fix Today (Blocking Glitches)
1. ✅ Fix LocaleRouteSync race condition
2. ✅ Connect ProcessTimeline to global LanguageContext
3. ✅ Connect AftercarePage to global LanguageContext
4. ✅ Fix motion-system.tsx import error

### Priority 2 - Fix This Week (User-Facing)
1. Add missing English routes for legal pages
2. Add `common.modal.close` translation key
3. Translate hardcoded strings in ContactPage
4. Translate hardcoded strings in AftercarePage

### Priority 3 - Fix This Sprint (Cleanup)
1. Remove or populate empty namespace files
2. Add proper namespace loading states
3. Translate remaining hardcoded strings
4. Fix tsconfig.json invalid option

---

## Files Requiring Changes

| File | Priority | Changes Needed |
|------|----------|----------------|
| src/i18n/LocaleRouteSync.tsx | P1 | Fix race condition |
| src/sections/ProcessTimeline/ProcessTimeline.tsx | P1 | Use global LanguageContext |
| src/pages/AftercarePage.tsx | P1 | Use global LanguageContext |
| src/components/motion/motion-system.tsx | P1 | Fix import path |
| src/App.tsx | P2 | Add English legal routes |
| src/i18n/locales/de/common.json | P2 | Add modal.close |
| src/i18n/locales/en/common.json | P2 | Add modal.close |
| src/pages/ContactPage.tsx | P2 | Use t() for strings |
| src/pages/FAQPageNew.tsx | P2 | Add FAQ translations |
| tsconfig.json | P3 | Fix ignoreDeprecations |

---

*Report generated as part of forensic i18n system analysis*
