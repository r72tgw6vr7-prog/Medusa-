/**
 * Scroll Enhancement System - Easy import module
 * Import this file to initialize the scroll enhancement system
 */

import { initScroll, scrollController } from './scroll';
import '../styles/scroll-enhance.css';

// Initialize on import
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initScroll();
  });
} else {
  initScroll();
}

// Export the controller for direct access if needed
export default scrollController;

// Export individual methods for convenience
export const scrollTo = (target: string | HTMLElement | number, options: any = {}): void => {
  scrollController.scrollTo(target, options);
};

export const toggleScrollDebug = (): void => {
  scrollController.toggleDebug();
};

// Optional: Add to window for easy console debugging
if (typeof window !== 'undefined') {
  (window as any).scrollController = scrollController;
  (window as any).toggleScrollDebug = toggleScrollDebug;
}
