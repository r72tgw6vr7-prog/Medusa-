# Production Smoke Check - P0 Requirements Validation

> **Manual QA checklist for validating P0 requirements against deployed Medusa website**

## Overview
This document provides step-by-step validation procedures for all P0 requirements against the live production deployment. Each test includes specific steps, expected outcomes, and PASS/FAIL checkboxes.

## Prerequisites
- [ ] Deployment URL available
- [ ] DevTools access in browser
- [ ] Google Analytics DebugView access (optional)
- [ ] Screenshots directory: `docs/verification/artifacts/screenshots/`

---

## 🗺️ **C6: Google Maps Integration with Fallback**

### Test Steps:
1. Navigate to `/contact` page
2. Locate the maps section
3. Observe map loading behavior
4. Test fallback functionality if maps are blocked

### Validation Checklist:
- [ ] **PASS** - Map embed loads successfully with interactive controls
- [ ] **PASS** - If map fails/blocked, fallback message is displayed clearly
- [ ] **PASS** - Fallback includes working Google Maps link that opens in new tab
- [ ] **PASS** - Map section maintains proper layout in both states
- [ ] **PASS** - Mobile viewport shows responsive map behavior

### Evidence Required:
- [ ] Screenshot: `contact-page-map-loaded.png`
- [ ] Screenshot: `contact-page-map-fallback.png` (if applicable)
- [ ] Console log showing no map-related errors

### Expected Behavior:
```
✅ Map loads with studio location marker
✅ Interactive zoom/pan controls work
✅ Or: "Unable to load map" message with "View on Google Maps" link
```

---

## 📜 **R2: Scroll-to-Top on Navigation**

### Test Steps:
1. Navigate to any page with significant content (e.g., `/artists`, `/services`)
2. Scroll to bottom of page
3. Navigate to different page using main navigation
4. Observe scroll position on new page arrival

### Validation Checklist:
- [ ] **PASS** - Navigation from scrolled position resets to top of new page
- [ ] **PASS** - Behavior works consistently across all route changes
- [ ] **PASS** - Back button navigation also scrolls to top
- [ ] **PASS** - Mobile navigation behaves identically
- [ ] **PASS** - Smooth scroll behavior (if implemented)

### Evidence Required:
- [ ] Video/GIF: `scroll-behavior-demo.gif`
- [ ] Screenshot: `page-bottom-before-nav.png`
- [ ] Screenshot: `page-top-after-nav.png`

### Test Sequence:
```
1. /artists → scroll to bottom → navigate to /services → verify top
2. /services → scroll to bottom → navigate to /contact → verify top  
3. /contact → scroll to bottom → navigate to /home → verify top
```

---

## 🔤 **T4: Font Weight Token Compliance**

### Test Steps:
1. Open DevTools → Elements/Inspector
2. Navigate to pages with varied typography
3. Inspect H1, H2, body text, and button elements
4. Record computed font-weight values
5. Cross-reference with design tokens

### Validation Checklist:
- [ ] **PASS** - H1 elements use token-based font weights (not raw numbers)
- [ ] **PASS** - H2 elements use token-based font weights
- [ ] **PASS** - Body text uses token-based font weights
- [ ] **PASS** - Button text uses token-based font weights
- [ ] **PASS** - No raw numeric font-weight values in computed styles

### Evidence Required:
- [ ] JSON file: `computed_styles.json` with all font-weight values
- [ ] Screenshots: DevTools showing computed styles for key elements
- [ ] Mapping table: Token names → Computed values

### DevTools Inspection:
```javascript
// Console command to extract font weights:
Array.from(document.querySelectorAll('h1, h2, h3, button, p')).map(el => ({
  tag: el.tagName,
  computed: getComputedStyle(el).fontWeight,
  classes: el.className
}))
```

---

## 📊 **SEO5: GA4 Analytics Implementation**

### Test Steps:
1. Open DevTools → Network tab
2. Filter for 'collect', 'gtm.js', or 'googletagmanager'
3. Navigate through site triggering events
4. Monitor network requests and event payloads

### Validation Checklist:
- [ ] **PASS** - GA4 bootstrap request fires on page load
- [ ] **PASS** - Measurement ID loaded from environment variable
- [ ] **PASS** - Page view events tracked correctly
- [ ] **PASS** - Booking-related events captured
- [ ] **PASS** - Gallery interaction events captured
- [ ] **PASS** - Form submission events captured

### Evidence Required:
- [ ] Screenshot: Network tab showing GA4 requests
- [ ] JSON file: `events.json` with captured event payloads
- [ ] Log file: `network_notes.md` with request details

### Event Testing Sequence:
```
1. Page Load → Check for 'page_view' event
2. Booking interaction → Check for custom events
3. Gallery navigation → Check for 'gallery_view' events
4. Contact form → Check for 'form_submit' events
```

### GA4 DebugView (Optional):
- [ ] **PASS** - Events visible in GA4 DebugView in real-time
- [ ] **PASS** - Event parameters match expected schema
- [ ] **PASS** - No tracking errors in DebugView

---

## 🚀 **Automated Capture Results**

> **Run:** `export BASE_URL="https://your-deployment.com" && node tools/prod_capture.mjs`

### Generated Artifacts:
- [ ] Screenshots captured: `docs/verification/artifacts/screenshots/`
- [ ] Events logged: `docs/verification/artifacts/events.json`
- [ ] Styles captured: `docs/verification/artifacts/computed_styles.json`
- [ ] Network logs: `docs/verification/artifacts/network_notes.md`

### Automated Test Results:
```
┌─────────────────┬──────────┬─────────────────────┐
│ Requirement     │ Status   │ Evidence            │
├─────────────────┼──────────┼─────────────────────┤
│ C6 - Maps       │ [ ]      │ contact-map.png     │
│ R2 - Scroll     │ [ ]      │ scroll-demo.gif     │
│ T4 - Fonts      │ [ ]      │ computed_styles.json│
│ SEO5 - Analytics│ [ ]      │ events.json         │
└─────────────────┴──────────┴─────────────────────┘
```

---

## 📋 **Final Validation Summary**

### Overall P0 Status:
- [ ] **C6 Maps**: ✅ PASS / ❌ FAIL - _Notes:_
- [ ] **R2 Scroll**: ✅ PASS / ❌ FAIL - _Notes:_
- [ ] **T4 Fonts**: ✅ PASS / ❌ FAIL - _Notes:_
- [ ] **SEO5 Analytics**: ✅ PASS / ❌ FAIL - _Notes:_

### Deployment Ready:
- [ ] All P0 requirements validated
- [ ] Evidence artifacts collected
- [ ] No critical issues identified
- [ ] Production deployment approved

---

## 🔧 **Commands Reference**

```bash
# Capture production evidence
export BASE_URL="https://your-deployment.com"
node tools/prod_capture.mjs

# View captured artifacts
open docs/verification/artifacts/screenshots/
cat docs/verification/artifacts/events.json
cat docs/verification/artifacts/computed_styles.json

# Generate summary report
npm run qa:production:report
```

---

**Tester:** ________________  
**Date:** ________________  
**Deployment URL:** ________________  
**Approval:** [ ] Approved [ ] Needs Review  