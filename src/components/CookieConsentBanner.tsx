import React, { useState, useEffect } from 'react';

interface CookieConsentBannerProps {
  onNavigate?: (value: string) => void;
  onAccept?: () => void;
  onDecline?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onNavigate,
  onAccept,
  onDecline,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    onDecline?.();
  };

  const handleNavigate = (path: string) => {
    onNavigate?.(path);
  };

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-brand-background border-t border-brand-gold p-8 z-50'>
      <div className='max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8'>
        <p className='text-brand-white text-sm flex-1'>
          We use cookies to enhance your experience and analyze our website traffic. By continuing,
          you agree to our{' '}
          <button
            onClick={() => handleNavigate('/privacy')}
            className='text-brand-gold underline hover:no-underline transition duration-200 ease-out'
          >
            Privacy Policy
          </button>{' '}
          and{' '}
          <button
            onClick={() => handleNavigate('/cookies')}
            className='text-brand-gold underline hover:no-underline transition duration-200 ease-out'
          >
            Cookie Policy
          </button>
          .
        </p>
        <div className='flex gap-0 shrink-0'>
          <button
            onClick={handleDecline}
            className='px-8 py-0 border border-brand-gold text-brand-gold rounded hover:bg-brand-gold hover:text-brand-background transition-colors transition duration-200 ease-out'
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className='px-8 py-0 bg-brand-gold text-brand-background rounded hover:bg-brand-gold-hover transition-colors transition duration-200 ease-out'
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
