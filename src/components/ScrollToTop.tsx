import { useEffect } from 'react';
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

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element instead
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;

    // Default: keep route transitions cheap and deterministic
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    // Dev-only: if ScrollTrigger is active during debugging, clean up stale triggers and refresh.
    if (import.meta.env.DEV) {
      void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => {
          const triggerElement = trigger.trigger;
          if (triggerElement && triggerElement instanceof Element) {
            if (!document.documentElement.contains(triggerElement)) {
              trigger.kill();
            }
            return;
          }

          const varsTrigger = (trigger as unknown as { vars?: { trigger?: unknown } }).vars?.trigger;
          if (typeof varsTrigger === 'string') {
            const el = document.querySelector(varsTrigger);
            if (!el) {
              trigger.kill();
            }
          }
        });

        window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });
    }
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
