import { test as _test, expect as _expect, Page } from '@playwright/test';
import { promises as _fs } from 'fs';
import path from 'path';

/**
 * P0 Test Helpers
 * 
 * Shared utilities for critical behavior testing
 */

export class P0TestHelpers {
  constructor(private page: Page) {}

  /**
   * Emit a readable step marker in the test output.
   */
  async logStep(message: string) {
    console.log(`[P0] ${message}`);
  }

  /**
   * Wait for route navigation to complete
   */
  async waitForNavigation(expectedPath: string, timeout = 5000) {
    const target = expectedPath.endsWith('/') && expectedPath.length > 1
      ? expectedPath.slice(0, -1)
      : expectedPath;
    await this.page.waitForURL(`**${target}*`, { timeout });
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(200);
  }

  /**
   * Get current scroll position
   */
  async getScrollPosition(): Promise<{ x: number; y: number }> {
    return await this.page.evaluate(() => ({
      x: window.scrollX,
      y: Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
        (document.querySelector('[data-scroll-root]') as HTMLElement | null)?.scrollTop || 0,
      ),
    }));
  }

  /**
   * Scroll to position with animation wait
   */
  async scrollTo(x: number, y: number) {
    await this.page.evaluate(({ x, y }) => {
      const scrollRoot = document.querySelector('[data-scroll-root]') as HTMLElement | null;
      if (scrollRoot) {
        scrollRoot.scrollTo(x, y);
      }
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
      window.scrollTo(x, y);
    }, { x, y });
    await this.page.waitForTimeout(100); // Allow scroll to settle
  }

  /**
   * Scroll to bottom of page
   */
  async scrollToBottom() {
    await this.page.evaluate(() => {
      const scrollRoot = document.querySelector('[data-scroll-root]') as HTMLElement | null;
      const maxScroll = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        scrollRoot?.scrollHeight || 0,
      );

      if (scrollRoot) {
        scrollRoot.scrollTop = maxScroll;
      }
      document.documentElement.scrollTop = maxScroll;
      document.body.scrollTop = maxScroll;
      window.scrollTo(0, maxScroll);
    });
    await this.page.waitForTimeout(100);
  }

  /**
   * Take screenshot with custom name and save to artifacts
   */
  async takeScreenshot(name: string, fullPage = false) {
    const artifactsDir = path.join(process.cwd(), 'tests/p0/artifacts');
    const screenshotPath = path.join(artifactsDir, `${name}.png`);
    
    await this.page.screenshot({ 
      path: screenshotPath, 
      fullPage,
      type: 'png'
    });
    
    return screenshotPath;
  }

  /**
   * Wait for element to be visible and stable
   */
  async waitForElement(selector: string, timeout = 10000) {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    await element.waitFor({ state: 'attached', timeout });
    return element;
  }

  /**
   * Mock environment variables by intercepting requests
   */
  async mockEnvironment(envVars: Record<string, string>) {
    await this.page.addInitScript((vars: Record<string, string>) => {
      Object.assign(window, { __MOCKED_ENV__: vars });
    }, envVars);
  }

  /**
   * Setup analytics tracking mock
   */
  async setupAnalyticsMock() {
    await this.page.addInitScript(() => {
      const analyticsWindow = window as Window & {
        __ANALYTICS_CALLS__?: unknown[][];
        __JS_ERRORS__?: string[];
      };

      analyticsWindow.dataLayer = [];
      analyticsWindow.__ANALYTICS_CALLS__ = [];
      analyticsWindow.__JS_ERRORS__ = [];

      window.addEventListener('error', (event) => {
        analyticsWindow.__JS_ERRORS__?.push(String(event.message || 'Unknown JS error'));
      });

      analyticsWindow.gtag = (...args: unknown[]) => {
        analyticsWindow.dataLayer?.push(args);
        analyticsWindow.__ANALYTICS_CALLS__?.push(args);
      };
    });
  }

  /**
   * Get captured analytics calls
   */
  async getAnalyticsCalls(): Promise<unknown[][]> {
    return await this.page.evaluate(() => {
      return (window as Window & { __ANALYTICS_CALLS__?: unknown[][] }).__ANALYTICS_CALLS__ || [];
    });
  }

  /**
   * Wait for analytics event with specific parameters
   */
  async waitForAnalyticsEvent(eventName: string, timeout = 5000): Promise<unknown[]> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const calls = await this.getAnalyticsCalls();
      const event = calls.find(
        (call) => Array.isArray(call) && call[0] === 'event' && call[1] === eventName,
      );
      
      if (event) {
        return event;
      }
      
      await this.page.waitForTimeout(100);
    }
    
    throw new Error(`Analytics event '${eventName}' not found within ${timeout}ms`);
  }

  /**
   * Get computed style for element
   */
  async getComputedStyle(selector: string, property: string): Promise<string> {
    return await this.page.evaluate(
      ({ selector, property }) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Element not found: ${selector}`);
        return window.getComputedStyle(element).getPropertyValue(property);
      },
      { selector, property }
    );
  }

  /**
   * Check if element is in viewport
   */
  async isInViewport(selector: string): Promise<boolean> {
    return await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    }, selector);
  }
}

/**
 * Font weight mappings for token validation
 */
export const EXPECTED_FONT_WEIGHTS = {
  light: '300',
  normal: '400', 
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900'
} as const;

/**
 * Common test data
 */
export const TEST_DATA = {
  routes: {
    home: '/',
    artists: '/artists',
    services: '/services', 
    gallery: '/gallery',
    contact: '/contact',
    booking: '/booking'
  },
  
  selectors: {
    // Navigation
    nav: 'nav',
    navLinks: 'nav a',
    
    // Content
    mainHeading: 'h1',
    subHeading: 'h2',
    bodyText: 'p',
    
    // Maps
    mapEmbed: '[data-testid="map-embed"]',
    mapFallback: '[data-testid="map-fallback"]',
    mapFallbackLink: '[data-testid="map-fallback-link"]',
    
    // CTAs and interactions
    bookingCTA: '[data-testid="booking-cta"], .booking-button, [href*="booking"]',
    galleryItem: '[data-testid="gallery-item"], .gallery-item',
    contactForm: '[data-testid="contact-form"], .contact-form',
    contactSubmit: '[data-testid="contact-submit"], [type="submit"]'
  }
} as const;

declare global {
  interface Window {
    __MOCKED_ENV__?: Record<string, string>;
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
    __ANALYTICS_CALLS__?: unknown[][];
    __JS_ERRORS__?: string[];
  }
}
