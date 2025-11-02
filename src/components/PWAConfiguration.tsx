import { useEffect } from 'react';

/**
 * PWAConfiguration Component
 * Handles Progressive Web App configuration and service worker registration
 */
const PWAConfiguration = () => {
  useEffect(() => {
    // Register service worker if available
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            if (import.meta.env.DEV) {
              console.log('SW registered: ', registration);
            }
          })
          .catch((registrationError) => {
            if (import.meta.env.DEV) {
              console.log('SW registration failed: ', registrationError);
            }
          });
      });
    }

    // Handle PWA install prompt
    let deferredPrompt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // You can show your custom install button here
    });
  }, []);

  return null; // This component doesn't render anything
};

export default PWAConfiguration;
