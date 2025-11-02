# P0 Runtime Testing Documentation

This document explains how to run the Playwright tests that verify P0 critical behaviors at runtime.

## Overview

The P0 test suite validates four critical requirements:

- **R2**: Scroll to top on navigation
- **C6**: Google Maps integration with env var + fallback
- **T4**: Computed font weights compliance
- **SEO5**: GA4 analytics event tracking

## Prerequisites

1. **Node.js 20+** and **npm** installed
2. **Playwright browsers** installed
3. **Development server** running

## Setup

### 1. Install Playwright Browsers (one-time setup)

```bash
npx playwright install
```

### 2. Environment Variables

Create `.env.local` with required variables:

```bash
# Google Maps API key (for C6 testing)
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here

# GA4 Measurement ID (for SEO5 testing)  
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Running Tests

### Quick Start

```bash
# Run all P0 tests
npm run test:p0

# Run with visual browser (headed mode)
npm run test:p0:headed

# Run and open HTML report
npm run test:p0:report
```

### Advanced Usage

```bash
# Run specific test file
npx playwright test tests/p0/r2-scroll.spec.ts

# Run specific test by name
npx playwright test -g "scroll to top"

# Run only on Chromium
npx playwright test tests/p0 --project=chromium

# Run with debug mode
npx playwright test tests/p0 --debug

# Run and keep browser open
npx playwright test tests/p0 --headed --slowMo=1000
```

## Test Structure

```
tests/p0/
├── artifacts/          # Screenshots and videos
├── report/            # HTML test reports
├── helpers.ts         # Shared utilities
├── r2-scroll.spec.ts  # Scroll to top tests
├── c6-maps.spec.ts    # Google Maps tests
├── t4-fonts.spec.ts   # Font weight tests
└── seo5-analytics.spec.ts # Analytics tests
```

## Test Details

### R2: Scroll to Top Navigation

**File**: `tests/p0/r2-scroll.spec.ts`

Tests that navigation between pages automatically scrolls to the top:

- ✅ Home → Artists navigation
- ✅ Services → Gallery navigation  
- ✅ Hash navigation handling
- ✅ Mobile viewport behavior
- ✅ Browser back/forward buttons

**Key Assertions**:
```typescript
// Verify scroll position is at top (≤ 2px tolerance)
expect(scrollPosition.y).toBeLessThanOrEqual(2);
```

### C6: Google Maps Integration

**File**: `tests/p0/c6-maps.spec.ts`

Tests Google Maps component behavior with/without API key:

- ✅ Map embed with valid API key
- ✅ Fallback UI when key missing
- ✅ External Google Maps links
- ✅ Environment variable handling
- ✅ Responsive behavior

**Key Assertions**:
```typescript
// Map iframe should be visible with API key
await expect(mapIframe).toBeVisible();

// Fallback links should have correct attributes
expect(linkTarget).toBe('_blank');
expect(linkRel).toContain('noopener');
```

### T4: Font Weight Compliance

**File**: `tests/p0/t4-fonts.spec.ts`

Tests computed font weights match design tokens:

- ✅ Heading font weights (700-900)
- ✅ Body text font weights (400-500) 
- ✅ Button typography
- ✅ Navigation typography
- ✅ CSS custom properties

**Key Assertions**:
```typescript
// Headings should use bold weights
expect(['600', '700', '800']).toContain(h1FontWeight);

// Body text should use normal/medium weights  
expect(['400', '500']).toContain(bodyFontWeight);
```

### SEO5: GA4 Analytics

**File**: `tests/p0/seo5-analytics.spec.ts`

Tests Google Analytics 4 event tracking:

- ✅ GA4 initialization with env var
- ✅ Booking event tracking
- ✅ Gallery interaction events
- ✅ Form submission events
- ✅ Page view tracking
- ✅ Graceful degradation

**Key Assertions**:
```typescript
// Analytics events should be captured
expect(bookingEvents.length).toBeGreaterThan(0);

// Event payload should have correct structure
expect(typeof eventName).toBe('string');
```

## Test Configuration

**File**: `playwright.config.ts`

Key settings:
- **Base URL**: `http://localhost:5173`
- **Browsers**: Chrome, Firefox, Safari (desktop + mobile)
- **Artifacts**: Screenshots, videos, traces on failure
- **Reports**: HTML report in `tests/p0/report/`
- **Timeout**: 30s per test

## Troubleshooting

### Common Issues

**1. Dev server not running**
```bash
# Start dev server in separate terminal
npm run dev

# Or run tests with server auto-start
npx playwright test tests/p0
```

**2. Browser installation missing**
```bash
npx playwright install
```

**3. Tests timing out**
```bash
# Increase timeout in playwright.config.ts
timeout: 60 * 1000  // 60 seconds
```

**4. Environment variables not loaded**
```bash
# Check .env.local exists and has correct format
cat .env.local

# Verify variables in tests
console.log(process.env.VITE_GOOGLE_MAPS_API_KEY);
```

### Debug Mode

Run tests in debug mode for step-by-step execution:

```bash
npx playwright test tests/p0/r2-scroll.spec.ts --debug
```

This will:
- Open browser with DevTools
- Pause at each test step
- Allow inspection of page state
- Show detailed console logs

### Screenshots & Videos

Test artifacts are automatically saved to `tests/p0/artifacts/`:

- **Screenshots**: Before/after states for each test
- **Videos**: Full test execution recordings  
- **Traces**: Detailed execution traces (on failure)

View artifacts:
```bash
# Open artifacts directory
open tests/p0/artifacts/

# View HTML report with embedded artifacts
npx playwright show-report tests/p0/report/
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: P0 Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run P0 tests
        run: npm run test:p0
        env:
          VITE_GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_KEY }}
          VITE_GA4_MEASUREMENT_ID: ${{ secrets.GA4_MEASUREMENT_ID }}
      
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: tests/p0/report/
```

## Performance Considerations

- Tests run in **parallel** by default (faster execution)
- Use `--workers=1` for sequential execution if needed
- **Mobile tests** may be slower due to device emulation
- **Video recording** increases test time (~20%)

## Integration with CI/CD

The P0 tests are designed to:

1. **Block deployments** if critical behaviors fail
2. **Generate reports** for QA review
3. **Provide screenshots** for debugging
4. **Track regression** over time

Exit codes:
- `0`: All tests pass
- `1`: One or more tests failed

## Best Practices

1. **Run tests locally** before pushing
2. **Check artifacts** when tests fail
3. **Update selectors** when UI changes
4. **Mock external services** to avoid flaky tests
5. **Keep tests focused** on P0 behaviors only

## Support

For issues with P0 tests:

1. Check the **HTML report** for detailed error info
2. Review **screenshots/videos** in artifacts
3. Run in **debug mode** for step-by-step execution
4. Verify **environment variables** are set correctly

The test framework is designed to provide clear feedback on P0 requirement compliance and help maintain critical user experience quality.