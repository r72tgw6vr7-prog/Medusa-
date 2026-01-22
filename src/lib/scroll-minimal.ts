/**
 * Minimal smooth scroll system - GSAP removed for performance
 * Uses native CSS scroll-behavior and Intersection Observer
 */

import Lenis from 'lenis';

declare global {
  interface Window {
    __SCROLL_DEBUG?: boolean;
  }
}

// Configuration
interface ScrollConfig {
  smoothScroll: boolean;
  debugMode: boolean;
  mobileDisabled: boolean;
}

const defaultConfig: ScrollConfig = {
  smoothScroll: false, // DISABLED - Using native CSS smooth scroll for better performance
  debugMode: false,
  mobileDisabled: true, // Disable smooth scroll on mobile
};

// Minimal scroll controller without GSAP
class ScrollController {
  private lenis: Lenis | null = null;
  private config: ScrollConfig;
  private isMobile: boolean;
  private prefersReducedMotion: boolean;
  private initialized: boolean = false;
  private rafId: number = 0;

  constructor(config: Partial<ScrollConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;
    this.isMobile = this.checkIsMobile();

    if (typeof window !== 'undefined') {
      window.__SCROLL_DEBUG = this.config.debugMode;
    }
  }

  public init(): void {
    if (this.initialized) return;
    this.initialized = true;

    const enableSmoothScroll = this.shouldEnableSmoothScroll();

    if (enableSmoothScroll) {
      this.initSmoothScroll();
    }

    this.addEventListeners();
  }

  private shouldEnableSmoothScroll(): boolean {
    if (this.prefersReducedMotion) return false;
    if (this.config.mobileDisabled && this.isMobile) return false;
    return this.config.smoothScroll;
  }

  private initSmoothScroll(): void {
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    this.lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.8,
      infinite: false,
      ...(this.isMobile && { duration: 0.6, touchMultiplier: 2.0 }),
    });

    const raf = (time: number) => {
      if (!this.lenis) return;
      this.lenis.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };
    this.rafId = requestAnimationFrame(raf);
  }

  public refreshAnimations(): void {
    // No-op without GSAP
    return;
  }

  private addEventListeners(): void {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('beforeunload', this.destroy);
  }

  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      if (this.lenis) {
        this.lenis.stop();
      }
      cancelAnimationFrame(this.rafId);
    } else {
      if (this.lenis) {
        this.lenis.start();
        const raf = (time: number) => {
          if (!this.lenis) return;
          this.lenis.raf(time);
          this.rafId = requestAnimationFrame(raf);
        };
        cancelAnimationFrame(this.rafId);
        this.rafId = requestAnimationFrame(raf);
      }
    }
  };

  private handleResize = (): void => {
    this.isMobile = this.checkIsMobile();
    const shouldEnable = this.shouldEnableSmoothScroll();

    if (shouldEnable && !this.lenis) {
      this.initSmoothScroll();
    } else if (!shouldEnable && this.lenis) {
      this.destroyLenis();
    }
  };

  private checkIsMobile(): boolean {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) ||
      'ontouchstart' in window
    );
  }

  private destroyLenis(): void {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
    cancelAnimationFrame(this.rafId);
  }

  public destroy = (): void => {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('beforeunload', this.destroy);

    this.destroyLenis();
    this.initialized = false;
  };

  public scrollTo(
    target: string | HTMLElement | number,
    options: Record<string, unknown> = {},
  ): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    } else {
      // Native scroll fallback
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

  public getLenis(): Lenis | null {
    return this.lenis;
  }
}

// Create and export singleton instance
export const scrollController = new ScrollController();

export const initScroll = (): void => {
  scrollController.init();
};

export default scrollController;
