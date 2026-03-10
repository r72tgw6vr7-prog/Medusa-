/**
 * Scroll Enhancement System - Easy import module
 * Import this file to initialize the scroll enhancement system
 */

import { initScroll, scrollController } from './scroll';
import '../styles/scroll-enhance.css';

const init = () => {
  initScroll();
};

// Initialize on import
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const teardown = () => {
  try {
    scrollController.destroy();
  } catch {
    // no-op
  }
};

// Ensure we clean up on dev HMR and on backgrounding/unload.
// This avoids accumulating event listeners/RAF loops across hot reloads.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    document.removeEventListener('DOMContentLoaded', init);
    if (typeof window !== 'undefined') {
      window.removeEventListener('pagehide', teardown);
    }
    teardown();
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', teardown);
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
