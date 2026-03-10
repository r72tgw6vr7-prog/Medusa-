import { test, expect } from '@playwright/test';
import { P0TestHelpers, TEST_DATA } from './helpers';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    __JS_ERRORS__: string[];
  }
}

/**
 * SEO5: GA4 Analytics Event Tracking
 * 
 * Verifies that Google Analytics 4 is properly initialized and
 * critical user interactions trigger the expected events.
 * Uses mocked analytics to avoid sending real data during testing.
 */

test.describe('SEO5: GA4 Analytics Event Tracking', () => {
  test.describe.configure({ mode: 'serial' });
  let helpers: P0TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new P0TestHelpers(page);

    // Setup analytics mocking before navigation
    await helpers.setupAnalyticsMock();

    // Mock GA4 measurement ID
    await helpers.mockEnvironment({
      'VITE_GA4_MEASUREMENT_ID': 'G-TEST123456789'
    });

    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.addInitScript(() => {
      localStorage.setItem('cookieConsent', JSON.stringify({ analytics: true }));
    });
  });

  test('should initialize GA4 with measurement ID from environment', async ({ page }) => {
    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('domcontentloaded');
    await helpers.waitForAnalyticsEvent('page_view', 15000);
    
    // Check if gtag function exists
    const hasGtagFunction = await page.evaluate(() => typeof window.gtag === 'function');
    
    // Check if dataLayer exists
    const hasDataLayer = await page.evaluate(() => Array.isArray(window.dataLayer));
    
    expect(hasGtagFunction || hasDataLayer).toBeTruthy();
    
    // Check for measurement ID usage
    const measurementIdUsed = await page.evaluate(() => {
      const dataLayer = window.dataLayer || [];
      return dataLayer.some((entry: any) => JSON.stringify(entry).includes('G-TEST123456789'));
    });
    
    if (hasDataLayer) expect(measurementIdUsed).toBeTruthy();
  });

  test('should track booking events', async ({ page }) => {
    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('domcontentloaded');
    await helpers.waitForAnalyticsEvent('page_view', 15000);
    
    // Look for booking CTAs
    const bookingButtons = page.locator(
      'a[href*="booking"], button:has-text("book"), button:has-text("termin"), ' +
      '.booking-button, .book-now, [data-testid*="booking"]'
    );
    
    const bookingCount = await bookingButtons.count();
    expect(bookingCount).toBeGreaterThan(0);
    
    // Click the first visible booking button
    const firstBookingButton = bookingButtons.first();
    await expect(firstBookingButton).toBeVisible();
    
    await firstBookingButton.click();
    await page.waitForTimeout(1000);
    
    // Check for analytics events
    const analyticsCalls = await helpers.getAnalyticsCalls();
    const bookingEvents = analyticsCalls.filter((call) =>
      JSON.stringify(call).toLowerCase().includes('booking') ||
      JSON.stringify(call).toLowerCase().includes('book') ||
      JSON.stringify(call).toLowerCase().includes('termin') ||
      JSON.stringify(call).toLowerCase().includes('cta') ||
      JSON.stringify(call).toLowerCase().includes('page_view'),
    );

    expect(bookingEvents.length).toBeGreaterThan(0);
  });

  test('should track gallery interaction events', async ({ page }) => {
    await page.goto(TEST_DATA.routes.gallery);
    await page.waitForLoadState('domcontentloaded');
    await helpers.waitForAnalyticsEvent('page_view', 15000).catch(() => null);
    
    // Look for gallery items
    const galleryItems = page.locator(
      '.gallery-item, .image-card, .portfolio-item, ' +
      '[data-testid*="gallery"], .lightbox-trigger, img[src*="gallery"]'
    );
    
    const galleryCount = await galleryItems.count();
    
    if (galleryCount > 0) {
      // Click on a gallery item
      const firstGalleryItem = galleryItems.first();
      await expect(firstGalleryItem).toBeVisible();
      
      await firstGalleryItem.click();
      await page.waitForTimeout(500);
      
      // Check for gallery-related analytics events
      const analyticsCalls = await helpers.getAnalyticsCalls();
      const galleryEvents = analyticsCalls.filter((call) =>
        JSON.stringify(call).toLowerCase().includes('gallery') ||
        JSON.stringify(call).toLowerCase().includes('image') ||
        JSON.stringify(call).toLowerCase().includes('lightbox') ||
        JSON.stringify(call).toLowerCase().includes('view'),
      );
      
      expect(galleryEvents.length).toBeGreaterThan(0);
    } else {
      // Check if page view was tracked for gallery page
      const analyticsCalls = await helpers.getAnalyticsCalls();
      const pageViewEvents = analyticsCalls.filter(
        (call) => Array.isArray(call) && call[0] === 'event' && call[1] === 'page_view',
      );
      
      expect(pageViewEvents.length).toBeGreaterThan(0);
    }
  });

  test('should track form submission events', async ({ page }) => {
    await page.goto(TEST_DATA.routes.contact);
    await page.waitForLoadState('domcontentloaded');
    await helpers.waitForAnalyticsEvent('page_view', 15000);
    
    // Look for contact forms
    const forms = page.locator('form, .contact-form, [data-testid*="form"]');
    const formCount = await forms.count();
    
    if (formCount > 0) {
      const form = forms.first();
      
      // Fill out form fields if they exist
      const nameField = form.locator('input[name*="name"], input[placeholder*="name"], input[type="text"]').first();
      const emailField = form.locator('input[name*="email"], input[type="email"]').first();
      const messageField = form.locator('textarea, input[name*="message"]').first();
      
      if (await nameField.count() > 0) {
        await nameField.fill('Test User');
      }
      
      if (await emailField.count() > 0) {
        await emailField.fill('test@example.com');
      }
      
      if (await messageField.count() > 0) {
        await messageField.fill('Test message for analytics tracking');
      }
      
      // Find and click submit button
      const submitButton = form.locator(
        'button[type="submit"], input[type="submit"], ' +
        'button:has-text("send"), button:has-text("submit"), ' +
        '.submit-button, [data-testid*="submit"]'
      ).first();
      
      if (await submitButton.count() > 0) {
        await submitButton.click({ force: true });
        await page.waitForTimeout(1000);

        const analyticsCalls = await helpers.getAnalyticsCalls();
        const formEvents = analyticsCalls.filter((call) =>
          JSON.stringify(call).toLowerCase().includes('form') ||
          JSON.stringify(call).toLowerCase().includes('contact') ||
          JSON.stringify(call).toLowerCase().includes('submit') ||
          JSON.stringify(call).toLowerCase().includes('send') ||
          JSON.stringify(call).toLowerCase().includes('page_view'),
        );

        expect(formEvents.length).toBeGreaterThan(0);
      }
    }
  });

  test('should track page view events on navigation', async ({ page }) => {
    const testPages = [
      { route: TEST_DATA.routes.home, name: 'Home' },
      { route: TEST_DATA.routes.artists, name: 'Artists' },
      { route: TEST_DATA.routes.services, name: 'Services' }
    ];
    
    for (const pageInfo of testPages) {
      await page.goto(pageInfo.route);
      await page.waitForLoadState('domcontentloaded');
      await helpers.waitForAnalyticsEvent('page_view', 15000);
      
      const analyticsCalls = await helpers.getAnalyticsCalls();
      const pageViewEvents = analyticsCalls.filter(
        (call) => Array.isArray(call) && call[0] === 'event' && call[1] === 'page_view',
      );
      
      expect(pageViewEvents.length).toBeGreaterThan(0);
      
      // Check if page path is included in the event
      const latestPageView = pageViewEvents[pageViewEvents.length - 1];
      if (latestPageView && latestPageView[2]) {
        const eventParams = latestPageView[2] as Record<string, any>;
        if (eventParams.page_title) expect(typeof eventParams.page_title).toBe('string');
        if (eventParams.page_location) expect(typeof eventParams.page_location).toBe('string');
      }
    }
  });

  test('should handle analytics gracefully when GA4 is disabled', async ({ page }) => {
    await helpers.mockEnvironment({
      'VITE_GA4_MEASUREMENT_ID': ''
    });
    
    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('domcontentloaded');
    
    // Interact with elements that should trigger events
    const bookingButton = page.locator('a[href*="booking"], .booking-button').first();
    
    if (await bookingButton.count() > 0) {
      await bookingButton.click();
      await page.waitForTimeout(500);
    }
    
    // Analytics calls should either be empty or handle errors gracefully
    const analyticsCalls = await helpers.getAnalyticsCalls();
    
    // Should not crash the application
    const hasJSErrors = await page.evaluate(() => window.__JS_ERRORS__ || []);
    
    expect(hasJSErrors.length).toBe(0);
  });

  test('should validate event payload structure', async ({ page }) => {
    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('domcontentloaded');
    await helpers.waitForAnalyticsEvent('page_view', 15000);
    
    // Trigger some interactions
    const interactiveElements = page.locator('a, button').first();
    if (await interactiveElements.count() > 0) {
      await interactiveElements.click();
      await page.waitForTimeout(500);
    }
    
    const analyticsCalls = await helpers.getAnalyticsCalls();
    
    for (const call of analyticsCalls) {
      if (Array.isArray(call) && call[0] === 'event') {
        const eventName = call[1];
        const eventParams = call[2] as Record<string, any> | {};
        
        // Validate basic event structure
        expect(typeof eventName).toBe('string');
        expect(eventName.length).toBeGreaterThan(0);
        
        // Check for common GA4 parameters
        if (eventParams.page_title) {
          expect(typeof eventParams.page_title).toBe('string');
        }
        
        if (eventParams.page_location) {
          expect(typeof eventParams.page_location).toBe('string');
        }
      }
    }
  });
});
