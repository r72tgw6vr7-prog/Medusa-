import React, { useEffect, useState } from 'react';
import { useAnalytics, useScrollDepthTracking, useTimeOnPageTracking } from '@/hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const CONSENT_STORAGE_KEY = 'cookieConsent';

function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!storedConsent) return false;

  try {
    const parsed = JSON.parse(storedConsent) as {
      analytics?: boolean;
      preferences?: { analytics?: boolean };
    };

    if (typeof parsed.analytics === 'boolean') {
      return parsed.analytics;
    }

    return parsed.preferences?.analytics === true;
  } catch {
    return false;
  }
}

/**
 * Analytics Provider Component
 *
 * Wraps the app to provide analytics tracking functionality.
 * Automatically tracks page views, scroll depth, and time on page.
 */
const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(hasAnalyticsConsent);

  useEffect(() => {
    const syncConsent = () => {
      setAnalyticsEnabled(hasAnalyticsConsent());
    };

    syncConsent();
    window.addEventListener('storage', syncConsent);
    window.addEventListener('cookieConsentUpdated', syncConsent as EventListener);
    window.addEventListener('consentUpdated', syncConsent as EventListener);

    return () => {
      window.removeEventListener('storage', syncConsent);
      window.removeEventListener('cookieConsentUpdated', syncConsent as EventListener);
      window.removeEventListener('consentUpdated', syncConsent as EventListener);
    };
  }, []);

  // Initialize analytics hooks
  useAnalytics(analyticsEnabled); // Page view tracking
  useScrollDepthTracking(analyticsEnabled); // Scroll depth tracking
  useTimeOnPageTracking(analyticsEnabled); // Time on page tracking

  return <>{children}</>;
};

export default AnalyticsProvider;
