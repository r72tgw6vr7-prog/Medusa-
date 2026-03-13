import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingOverlayProps {
  t: (key: string) => string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ t }) => {
  return (
    <div className='loading-overlay'>
      <div className='loading-content'>
        <div className='loading-icon-wrapper'>
          <Loader2 size={40} className='loading-icon' />
        </div>
        <p className='loading-text'>{t('booking.loading.submitting')}</p>
      </div>
    </div>
  );
};

interface ErrorStateProps {
  t: (key: string) => string;
  error: string;
  isSubmitting: boolean;
  showRetry: boolean;
  onRetry: () => void;
  phoneHref: string;
  emailHref: string;
  phoneLabel: string;
  emailLabel: string;
  contactHint: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  t,
  error,
  isSubmitting,
  showRetry,
  onRetry,
  phoneHref,
  emailHref,
  phoneLabel,
  emailLabel,
  contactHint,
}) => {
  return (
    <div className='error-state'>
      <AlertCircle size={48} className='error-icon' />
      <h3>{t('booking.error.title')}</h3>
      <p>{error}</p>
      <p className='error-state__hint'>{contactHint}</p>
      <div className='error-state__actions'>
        <a href={phoneHref} className='error-state__link'>
          {phoneLabel}
        </a>
        <a href={emailHref} className='error-state__link error-state__link--secondary'>
          {emailLabel}
        </a>
      </div>
      {showRetry ? (
        <Button
          variant='chrome'
          onClick={onRetry}
          disabled={isSubmitting}
          aria-label={isSubmitting ? t('booking.error.retryLoading') : t('booking.error.retry')}
        >
          {t('booking.error.retry')}
        </Button>
      ) : null}
    </div>
  );
};
