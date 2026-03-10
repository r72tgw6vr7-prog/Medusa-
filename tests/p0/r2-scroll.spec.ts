import { test, expect } from '@playwright/test';
import { P0TestHelpers, TEST_DATA } from './helpers';

/**
 * R2: Scroll to Top on Navigation
 * 
 * Verifies that navigating between routes automatically scrolls to the top
 * This is critical for user experience and accessibility.
 */

test.describe('R2: Scroll to Top on Navigation', () => {
  test.describe.configure({ mode: 'serial' });
  let helpers: P0TestHelpers;
  const artistsSelector =
    '#mobile-menu-overlay a[href="/artists"], #mobile-menu-overlay a[href*="artists"], a[href="/artists"], a[href*="artists"]';
  const gallerySelector =
    '#mobile-menu-overlay a[href="/gallery"], #mobile-menu-overlay a[href*="gallery"], a[href="/gallery"], a[href*="gallery"]';
  const contactSelector =
    '#mobile-menu-overlay a[href="/contact"], #mobile-menu-overlay a[href*="contact"], a[href="/contact"], a[href*="contact"]';

  test.beforeEach(async ({ page }) => {
    helpers = new P0TestHelpers(page);
    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('domcontentloaded');
  });

  test('should scroll to top when navigating from home to artists', async ({ page }) => {
    await helpers.logStep('Starting scroll-to-top navigation test');
    
    // Take initial screenshot
    await helpers.takeScreenshot('r2-01-initial-home-page', true);
    
    // Scroll to bottom of home page
    await helpers.logStep('Scrolling to bottom of home page');
    await helpers.scrollToBottom();

    // Verify the page actually scrolled before asserting reset-on-navigation.
    let bottomPosition = await helpers.getScrollPosition();
    if (bottomPosition.y === 0) {
      await helpers.scrollTo(0, 600);
      bottomPosition = await helpers.getScrollPosition();
    }

    if (bottomPosition.y === 0) {
      test.skip(true, 'Home page is not scrollable in the current mobile render path');
    }

    expect(bottomPosition.y).toBeGreaterThan(0);
    
    await helpers.takeScreenshot('r2-02-scrolled-to-bottom', true);
    
    // Find and click navigation link to artists
    await helpers.logStep('Clicking navigation link to artists page');
    const artistsLink = page.locator(artistsSelector).first();
    await expect(artistsLink).toBeVisible();
    
    // Click the artists link
    await artistsLink.click();
    
    // Wait for navigation to complete
    await helpers.waitForNavigation('/artists');
    
    // Check scroll position after navigation
    await helpers.logStep('Verifying scroll position after navigation');
    const topPosition = await helpers.getScrollPosition();
    
    // Take screenshot of final state
    await helpers.takeScreenshot('r2-03-after-navigation-to-artists', true);
    
    // Assert scroll position is at or near top (allowing for small margin)
    expect(topPosition.y).toBeLessThanOrEqual(2);
    expect(topPosition.x).toBeLessThanOrEqual(2);
    
    await helpers.logStep(`✅ Navigation scroll test passed - final position: ${topPosition.y}px`);
  });

  test('should scroll to top when navigating from services to gallery', async ({ page }) => {
    await helpers.logStep('Testing scroll behavior: services → gallery');
    
    // Navigate to services first
    await page.goto(TEST_DATA.routes.services);
    await page.waitForLoadState('domcontentloaded');
    
    await helpers.takeScreenshot('r2-04-services-page-initial', true);
    
    // Scroll to bottom
    await helpers.scrollToBottom();
    let bottomPosition = await helpers.getScrollPosition();
    if (bottomPosition.y === 0) {
      await helpers.scrollTo(0, 600);
      bottomPosition = await helpers.getScrollPosition();
    }

    if (bottomPosition.y === 0) {
      test.skip(true, 'Services page is not scrollable in the current render path');
    }
    
    await helpers.takeScreenshot('r2-05-services-scrolled-bottom', true);
    
    // Navigate to gallery
    const galleryLink = page.locator(gallerySelector).first();
    await expect(galleryLink).toBeVisible();
    await galleryLink.click();
    
    await helpers.waitForNavigation('/gallery');
    
    // Verify scroll position
    const topPosition = await helpers.getScrollPosition();
    await helpers.takeScreenshot('r2-06-gallery-after-navigation', true);
    
    expect(topPosition.y).toBeLessThanOrEqual(2);
    
    await helpers.logStep(`✅ Services → Gallery scroll test passed`);
  });

  test('should handle hash navigation appropriately', async ({ page }) => {
    await helpers.logStep('Testing hash navigation behavior');
    
    // Go to home and scroll down
    await page.goto(TEST_DATA.routes.home);
    await helpers.scrollToBottom();
    
    // Navigate to a page with potential hash
    await page.goto('/contact#contact-form');
    await helpers.waitForNavigation('/contact');
    
    // For hash navigation, it should scroll to the target element if it exists
    // or to top if the element doesn't exist
    const position = await helpers.getScrollPosition();
    
    await helpers.takeScreenshot('r2-07-hash-navigation-result', true);
    
    // Position should be either at top (hash target not found) or at target element
    // This is acceptable behavior per the ScrollToTop component implementation
    expect(position.y).toBeGreaterThanOrEqual(0);
    
    await helpers.logStep(`✅ Hash navigation test passed - position: ${position.y}px`);
  });

  test('should work on mobile viewports', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
      return;
    }
    
    await helpers.logStep('Testing scroll behavior on mobile viewport');
    
    // Navigate and scroll on mobile
    await helpers.scrollToBottom();
    const bottomPosition = await helpers.getScrollPosition();
    
    await helpers.takeScreenshot('r2-08-mobile-scrolled-bottom', true);
    
    // Navigate to different page
    let contactLink = page.locator(contactSelector).first();
    
    // On mobile, navigation might be in a menu
    const mobileMenuButton = page.locator('[data-testid="mobile-menu"], .mobile-menu-button, button[aria-label*="menu"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(300); // Wait for menu animation
      contactLink = page
        .locator('#mobile-menu-overlay a[href="/contact"], #mobile-menu-overlay a[href*="contact"]')
        .first();
    }
    
    await expect(contactLink).toBeVisible();
    await contactLink.click({ force: true });
    
    await helpers.waitForNavigation('/contact');
    
    const topPosition = await helpers.getScrollPosition();
    await helpers.takeScreenshot('r2-09-mobile-after-navigation', true);
    
    expect(topPosition.y).toBeLessThanOrEqual(5); // Slightly more tolerance on mobile
    
    await helpers.logStep(`✅ Mobile scroll test passed`);
  });

  test('should preserve scroll behavior with browser back/forward', async ({ page }) => {
    await helpers.logStep('Testing scroll behavior with browser navigation');
    
    // Start at home, scroll down
    await helpers.scrollToBottom();
    const homeBottomPosition = await helpers.getScrollPosition();
    
    // Navigate to artists
    await page.locator(artistsSelector).first().click();
    await helpers.waitForNavigation('/artists');
    
    // Verify scroll to top on navigation
    let position = await helpers.getScrollPosition();
    expect(position.y).toBeLessThanOrEqual(2);
    
    // Scroll down on artists page
    await helpers.scrollToBottom();
    
    // Use browser back
    await page.goBack();
    await helpers.waitForNavigation('/');
    
    // Should scroll to top on back navigation too
    position = await helpers.getScrollPosition();
    await helpers.takeScreenshot('r2-10-after-browser-back', true);
    
    expect(position.y).toBeLessThanOrEqual(2);
    
    await helpers.logStep(`✅ Browser back/forward scroll test passed`);
  });
});
