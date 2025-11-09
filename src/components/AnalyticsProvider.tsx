import React from 'react';
import { useAnalytics, useScrollDepthTracking, useTimeOnPageTracking } from '../hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

/**
 * Analytics Provider Component
 *
 * Wraps the app to provide analytics tracking functionality.
 * Automatically tracks page views, scroll depth, and time on page.
 */
const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  // Initialize analytics hooks
  useAnalytics(); // Page view tracking
  useScrollDepthTracking(); // Scroll depth tracking
  useTimeOnPageTracking(); // Time on page tracking

  return <>{children}</>;
};

export default AnalyticsProvider;
