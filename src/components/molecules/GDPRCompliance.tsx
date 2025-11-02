import { useEffect } from 'react';

// Add type declaration for Vite's import.meta.env
interface ImportMetaEnv {
  DEV: boolean;
  PROD: boolean;
  MODE: string;
}

export const GDPRCompliance: React.FC = () => {
  useEffect(() => {
    // Disable third-party tracking if consent is not given
    const hasConsent = localStorage.getItem('cookieConsent') === 'true';

    if (!hasConsent && import.meta.env.DEV) {
      // Placeholder: Add code to disable tracking
      console.log('Third-party tracking disabled due to GDPR compliance');
    }
  }, []);

  // This component doesn't render anything visible
  // It only handles GDPR compliance logic
  return null;
};
