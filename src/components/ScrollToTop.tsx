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
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element instead
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        return;
      }
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });

    // Fallback for older browsers
    if (window.scrollY !== 0) {
      try {
        window.scrollTo(0, 0);
      } catch (error) {
        console.warn('Scroll to top fallback failed:', error);
      }
    }
  }, [pathname, hash, key]); // key ensures it triggers on same-route navigations

  return null; // This component doesn't render anything
};

export default ScrollToTop;