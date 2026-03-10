import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type AnalyticsModule = typeof import('../utils/analytics');
type AnalyticsInstance = AnalyticsModule['default'];

let analyticsPromise: Promise<AnalyticsInstance> | null = null;

const loadAnalytics = (): Promise<AnalyticsInstance> => {
  if (!analyticsPromise) {
    analyticsPromise = import('../utils/analytics').then((module) => module.default);
  }

  return analyticsPromise;
};

const withAnalytics = (enabled: boolean, callback: (analytics: AnalyticsInstance) => void) => {
  if (!enabled) return;

  void loadAnalytics().then((analytics) => {
    callback(analytics);
  });
};

/**
 * Custom hook for Google Analytics integration
 *
 * Features:
 * - Automatic page view tracking on route changes
 * - Easy access to analytics functions
 * - TypeScript support
 */
export const useAnalytics = (enabled: boolean = true) => {
  const location = useLocation();

  // Track page views automatically on route changes
  useEffect(() => {
    if (!enabled) return;

    // Get page title from document or route
    const pageTitle = document.title;

    // Track the page view
    withAnalytics(enabled, (analytics) => {
      analytics.pageView(location.pathname + location.search, pageTitle);
    });
  }, [enabled, location]);

  // Return analytics methods for manual tracking
  return {
    // Page tracking
    pageView: (path: string, title?: string) => {
      withAnalytics(enabled, (analytics) => {
        analytics.pageView(path, title);
      });
    },
    event: (eventName: string, parameters?: Record<string, unknown>) => {
      withAnalytics(enabled, (analytics) => {
        analytics.event(eventName, parameters);
      });
    },

    // Specific tracking methods
    trackBooking: {
      started: (service?: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackBooking.started(service);
        });
      },
      completed: (service: string, artist: string, value?: number) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackBooking.completed(service, artist, value);
        });
      },
      abandoned: (step: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackBooking.abandoned(step);
        });
      },
      serviceSelected: (service: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackBooking.serviceSelected(service);
        });
      },
      artistSelected: (artist: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackBooking.artistSelected(artist);
        });
      },
    },
    trackGallery: {
      view: (filterType?: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackGallery.view(filterType);
        });
      },
      imageClicked: (imageId: string, artist: string, style: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackGallery.imageClicked(imageId, artist, style);
        });
      },
      filterApplied: (filterType: string, filterValue: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackGallery.filterApplied(filterType, filterValue);
        });
      },
      lightboxOpened: (imageId: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackGallery.lightboxOpened(imageId);
        });
      },
    },
    trackForm: {
      submitted: (formType: string, success: boolean = true) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackForm.submitted(formType, success);
        });
      },
      newsletter: (email: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackForm.newsletter(email);
        });
      },
      error: (formType: string, errorMessage: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackForm.error(formType, errorMessage);
        });
      },
    },
    trackEngagement: {
      scrollDepth: (percentage: number) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackEngagement.scrollDepth(percentage);
        });
      },
      externalLink: (url: string, linkText?: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackEngagement.externalLink(url, linkText);
        });
      },
      phone: () => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackEngagement.phone();
        });
      },
      email: () => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackEngagement.email();
        });
      },
      social: (platform: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackEngagement.social(platform);
        });
      },
      cta: (ctaText: string, location: string) => {
        withAnalytics(enabled, (analytics) => {
          analytics.trackEngagement.cta(ctaText, location);
        });
      },
    },

    // Debug info
    getDebugInfo: () => ({ enabled }),
  };
};

/**
 * Hook for tracking scroll depth
 */
export const useScrollDepthTracking = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    let maxScrollPercentage = 0;

    let rafId = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercentage > maxScrollPercentage) {
        maxScrollPercentage = scrollPercentage;
        withAnalytics(enabled, (analytics) => {
          analytics.trackEngagement.scrollDepth(scrollPercentage);
        });
      }
    };

    // Throttle scroll events using RAF to avoid setTimeout churn on fast scroll
    const throttledHandleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        handleScroll();
      });
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled]);
};

/**
 * Hook for tracking time on page
 */
export const useTimeOnPageTracking = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const startTime = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime;
      // Track if user spent more than 30 seconds on page
      if (timeSpent > 30000) {
        withAnalytics(enabled, (analytics) => {
          analytics.event('time_on_page', {
            content_group1: 'engagement',
            time_spent_seconds: Math.round(timeSpent / 1000),
            page_path: window.location.pathname,
          });
        });
      }
    };
  }, [enabled]);
};
