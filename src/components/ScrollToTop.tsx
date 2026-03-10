import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 *
 * Automatically scrolls to the top of the page when the route changes.
 * This component should be placed inside the Router but outside of Routes.
 *
 * Features:
 * - Smooth scroll animation
 * - Preserves hash-based navigation (e.g., #section-id)
 * - Respects user's motion preferences
 * - Cross-browser compatible
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  // Ensure the browser doesn't try to restore scroll on POP while we manage it
  useEffect(() => {
    const prev = history.scrollRestoration;
    try {
      history.scrollRestoration = 'manual';
    } catch {}
    return () => {
      try {
        history.scrollRestoration = prev || 'auto';
      } catch {}
    };
  }, []);

  useLayoutEffect(() => {
    const isAutomation = navigator.webdriver === true;

    // If there's a hash in the URL, scroll to that element instead
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: isAutomation ? 'auto' : 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;

    const isMobileViewport =
      typeof window !== 'undefined'
        ? window.matchMedia?.('(max-width: 1023px)')?.matches || false
        : false;

    const behavior = prefersReducedMotion || isAutomation || isMobileViewport ? 'auto' : 'smooth';

    const scrollToTopNow = () => {
      const shouldForceInstant = isAutomation || isMobileViewport;
      const prevHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
      const prevBodyScrollBehavior = document.body.style.scrollBehavior;
      const scrollRoot = document.querySelector('[data-scroll-root]') as HTMLElement | null;
      if (shouldForceInstant) {
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.scrollBehavior = 'auto';
        if (scrollRoot) {
          scrollRoot.style.scrollBehavior = 'auto';
        }
      }
      try {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (scrollRoot) {
          scrollRoot.scrollTop = 0;
        }
      } catch {}
      window.scrollTo({
        top: 0,
        left: 0,
        behavior,
      });

      if (shouldForceInstant) {
        // Restore after the scroll has been applied.
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = prevHtmlScrollBehavior;
          document.body.style.scrollBehavior = prevBodyScrollBehavior;
          if (scrollRoot) {
            scrollRoot.style.scrollBehavior = '';
          }
        });
      }
    };

    // Default: keep route transitions cheap and deterministic
    scrollToTopNow();

    // Some browsers can restore/shift scroll after navigation/layout.
    // On mobile + in automation we prefer determinism over smoothness.
    if (isAutomation || isMobileViewport) {
      requestAnimationFrame(() => {
        scrollToTopNow();
      });
      setTimeout(() => {
        scrollToTopNow();
      }, 50);
      setTimeout(() => {
        scrollToTopNow();
      }, 150);
      setTimeout(() => {
        scrollToTopNow();
      }, 350);
      setTimeout(() => {
        scrollToTopNow();
      }, 600);
    }

    // GSAP removed - no cleanup needed
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
