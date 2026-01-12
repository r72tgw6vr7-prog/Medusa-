/**
 * Smooth scroll and scroll-driven animations system
 * Using GSAP ScrollTrigger and Lenis for smooth scrolling
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

declare global {
  interface Window {
    __SCROLL_DEBUG?: boolean;
  }
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configuration
interface ScrollConfig {
  smoothScroll: boolean;
  debugMode: boolean;
  mobileDisabled: boolean;
  parallaxEnabled: boolean;
  sectionElevationEnabled: boolean;
  revealOnScrollEnabled: boolean;
}

const defaultConfig: ScrollConfig = {
  smoothScroll: true,
  debugMode: false, // Toggle with window.__SCROLL_DEBUG
  mobileDisabled: true, // Disable smooth scroll on mobile
  parallaxEnabled: true,
  sectionElevationEnabled: true,
  revealOnScrollEnabled: true,
};

// Main scroll controller
class ScrollController {
  private lenis: Lenis | null = null;
  private config: ScrollConfig;
  private isMobile: boolean;
  private prefersReducedMotion: boolean;
  private initialized: boolean = false;
  private rafId: number = 0;
  private gsapTickerCallback: ((time: number) => void) | null = null;
  private scrollTweens: gsap.core.Tween[] = [];
  private scrollTriggers: ScrollTrigger[] = [];

  constructor(config: Partial<ScrollConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;
    this.isMobile = this.checkIsMobile();

    // Make debug mode accessible globally
    if (typeof window !== 'undefined') {
      window.__SCROLL_DEBUG = this.config.debugMode;
    }
  }

  /**
   * Initialize the scroll system
   */
  public init(): void {
    if (this.initialized) return;
    this.initialized = true;

    // Check if smooth scrolling should be enabled
    const enableSmoothScroll = this.shouldEnableSmoothScroll();

    if (enableSmoothScroll) {
      this.initSmoothScroll();
    }

    // Set up debug tools if enabled
    this.setupDebugMode();

    // Initialize scroll-driven animations regardless of smooth scroll setting
    this.initScrollAnimations();

    // Add event listeners for resize and visibility changes
    this.addEventListeners();
  }

  /**
   * Determines if smooth scrolling should be enabled
   */
  private shouldEnableSmoothScroll(): boolean {
    // Respect user preferences and config
    if (this.prefersReducedMotion) return false;
    if (this.config.mobileDisabled && this.isMobile) return false;
    return this.config.smoothScroll;
  }

  /**
   * Initialize Lenis smooth scrolling
   */
  private initSmoothScroll(): void {
    // Add Lenis classes to document
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Initialize Lenis
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved exponential easing
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // Lower smoothing on mobile if not disabled entirely
      ...(this.isMobile && { duration: 0.8, touchMultiplier: 1.5 }),
    });

    // Keep ScrollTrigger in sync with Lenis
    this.lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP ticker (single frame loop)
    gsap.ticker.lagSmoothing(0);
    this.gsapTickerCallback = (time) => {
      if (!this.lenis) return;
      this.lenis.raf(time * 1000); // Convert GSAP time to milliseconds
    };
    gsap.ticker.add(this.gsapTickerCallback);
  }

  /**
   * Initialize all scroll-driven animations using GSAP ScrollTrigger
   */
  private initScrollAnimations(): void {
    // Apply effects only if motion is not reduced
    if (this.prefersReducedMotion) return;

    // Initialize different animation types based on config
    if (this.config.parallaxEnabled) {
      this.initParallaxEffects();
    }

    if (this.config.sectionElevationEnabled) {
      this.initSectionElevation();
    }

    if (this.config.revealOnScrollEnabled) {
      this.initRevealOnScroll();
    }

    // Set up pinned hero/sections
    this.initPinnedSections();

    // Set up ScrollTrigger refresh on page content changes
    ScrollTrigger.refresh();
  }

  /**
   * Set up parallax effects for elements with parallax attributes
   */
  private initParallaxEffects(): void {
    // Get all elements with parallax classes
    const parallaxLayers = document.querySelectorAll('.parallax-layer, [data-parallax]');

    parallaxLayers.forEach((layer) => {
      // Determine speed factor based on class or data attribute
      let speedFactor = 0.5; // Default

      if (layer.classList.contains('parallax-layer-background')) {
        speedFactor = 0.18;
      } else if (layer.classList.contains('parallax-layer-mid')) {
        speedFactor = 0.45;
      } else if (layer.classList.contains('parallax-layer-foreground')) {
        speedFactor = 0.85;
      }

      // Allow custom speed via data attribute
      if (layer instanceof HTMLElement && layer.dataset.parallaxSpeed) {
        speedFactor = parseFloat(layer.dataset.parallaxSpeed);
      }

      // Create parallax effect
      const tween = gsap.to(layer, {
        y: () => {
          const scrollDistance = window.scrollY;
          return scrollDistance * speedFactor;
        },
        ease: 'none',
        scrollTrigger: {
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      this.scrollTweens.push(tween);
      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    });
  }

  /**
   * Initialize section elevation effect
   */
  private initSectionElevation(): void {
    // Find sections to apply the elevation effect to
    const sections = document.querySelectorAll('.section-elevation, [data-elevation]');

    sections.forEach((section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 60%', // When the top of the section reaches 60% from the top of viewport
        end: 'bottom 40%', // When the bottom of the section reaches 40% from the top of viewport
        toggleClass: 'is-active',
        once: false, // Animation triggers every time element enters viewport
      });

      this.scrollTriggers.push(trigger);
    });
  }

  /**
   * Initialize reveal on scroll for card tiles / gallery
   */
  private initRevealOnScroll(): void {
    // Find elements to reveal
    const revealElements = document.querySelectorAll('.reveal-element, [data-reveal]');

    revealElements.forEach((element, index) => {
      // Add staggered delay for sequential reveal
      const delay = index * 0.05; // 50ms stagger between items

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 85%', // When the top of element reaches 85% from the top of viewport
        onEnter: () => {
          gsap.to(element, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          element.classList.add('is-visible');
        },
        once: true, // Only trigger once
      });

      this.scrollTriggers.push(trigger);
    });
  }

  /**
   * Initialize pinned sections with ScrollTrigger
   */
  private initPinnedSections(): void {
    // Find hero section to pin
    const heroSection = document.querySelector('.hero-section, [data-pin="hero"]');
    if (heroSection) {
      const trigger = ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: '+=120%', // Pin for 120% of viewport height
        pin: true,
        pinSpacing: true,
        scrub: 0.6, // Smooth scrubbing effect
      });

      this.scrollTriggers.push(trigger);
    }

    // Also handle any custom pinned sections
    const pinnedSections = document.querySelectorAll('[data-pin]:not([data-pin="hero"])');
    pinnedSections.forEach((section) => {
      if (section instanceof HTMLElement) {
        const pinDuration = section.dataset.pinDuration || '100%';
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${pinDuration}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
        });

        this.scrollTriggers.push(trigger);
      }
    });
  }

  /**
   * Refresh scroll-driven animations on SPA route changes.
   * This prevents stale ScrollTriggers/tweens from accumulating when DOM is replaced.
   */
  public refreshAnimations(): void {
    if (!this.initialized) return;

    // If motion is reduced, we keep everything disabled.
    if (this.prefersReducedMotion) return;

    // Kill only triggers/tweens created by this controller.
    this.scrollTriggers.forEach((trigger) => trigger.kill());
    this.scrollTriggers = [];

    this.scrollTweens.forEach((tween) => tween.kill());
    this.scrollTweens = [];

    this.initScrollAnimations();
  }

  /**
   * Set up debug visualization if enabled
   */
  private setupDebugMode(): void {
    const debugMode = window.__SCROLL_DEBUG;

    if (debugMode) {
      document.body.classList.add('scroll-debug-active');

      // Create debug overlay with ruler lines
      const overlay = document.createElement('div');
      overlay.className = 'scroll-debug-overlay';

      // Add ruler lines
      const rulerPositions = ['top-25', 'center', 'bottom-25', 'focal-top', 'focal-bottom'];
      rulerPositions.forEach((pos) => {
        const ruler = document.createElement('div');
        ruler.className = `scroll-debug-ruler ${pos}`;
        overlay.appendChild(ruler);
      });

      document.body.appendChild(overlay);

      // Enable ScrollTrigger markers
      ScrollTrigger.defaults({ markers: true });
    }
  }

  /**
   * Add event listeners for resize and visibility
   */
  private addEventListeners(): void {
    // Pause/resume on visibility change
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Handle window resize
    window.addEventListener('resize', this.handleResize);

    // Clean up on page unload
    window.addEventListener('beforeunload', this.destroy);
  }

  /**
   * Handle visibility change events to pause animations when page is hidden
   */
  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      // Pause animations when tab is hidden
      if (this.lenis) {
        this.lenis.stop();
      }
      cancelAnimationFrame(this.rafId);
    } else {
      // Resume animations when tab is visible again
      if (this.lenis) {
        this.lenis.start();
      }
    }
  };

  /**
   * Handle window resize events
   */
  private handleResize = (): void => {
    // Update mobile status
    this.isMobile = this.checkIsMobile();

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    // Re-check if smooth scrolling should be enabled/disabled
    const shouldEnable = this.shouldEnableSmoothScroll();

    if (shouldEnable && !this.lenis) {
      this.initSmoothScroll();
    } else if (!shouldEnable && this.lenis) {
      this.destroyLenis();
    }
  };

  /**
   * Detect if device is mobile or touch
   */
  private checkIsMobile(): boolean {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) ||
      'ontouchstart' in window
    );
  }

  /**
   * Clean up Lenis instance
   */
  private destroyLenis(): void {
    if (this.gsapTickerCallback) {
      gsap.ticker.remove(this.gsapTickerCallback);
      this.gsapTickerCallback = null;
    }
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
    cancelAnimationFrame(this.rafId);
  }

  /**
   * Destroy the scroll controller and clean up
   */
  public destroy = (): void => {
    // Remove event listeners
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('beforeunload', this.destroy);

    // Destroy Lenis
    this.destroyLenis();

    // Kill controller-owned triggers/tweens
    this.scrollTriggers.forEach((trigger) => trigger.kill());
    this.scrollTriggers = [];

    this.scrollTweens.forEach((tween) => tween.kill());
    this.scrollTweens = [];

    // Kill all ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.refresh();

    // Remove debug overlay
    const overlay = document.querySelector('.scroll-debug-overlay');
    if (overlay) {
      overlay.remove();
    }

    document.body.classList.remove('scroll-debug-active');
    this.initialized = false;
  };

  /**
   * Toggle debug mode
   */
  public toggleDebug(): void {
    if (typeof window !== 'undefined') {
      window.__SCROLL_DEBUG = !window.__SCROLL_DEBUG;
      this.config.debugMode = !!window.__SCROLL_DEBUG;

      // Re-init with new debug setting
      this.destroy();
      this.init();
    }
  }

  /**
   * Scroll to a specific element or position
   */
  public scrollTo(
    target: string | HTMLElement | number,
    options: Record<string, unknown> = {},
  ): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    } else {
      // Fall back to native scroll if Lenis is not available
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', ...options });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', ...options });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth', ...options });
      }
    }
  }
}

// Create and export singleton instance
export const scrollController = new ScrollController();

// Export initialization function for easy import and use
export const initScroll = (): void => {
  scrollController.init();
};

// Export for direct access if needed
export default scrollController;
