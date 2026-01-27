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
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ t, error, isSubmitting, onRetry }) => {
  return (
    <div className='error-state'>
      <AlertCircle size={48} className='error-icon' />
      <h3>{t('booking.error.title')}</h3>
      <p>{error}</p>
      <Button
        variant='chrome'
        onClick={onRetry}
        disabled={isSubmitting}
        aria-label={isSubmitting ? t('booking.error.retryLoading') : t('booking.error.retry')}
      >
        {t('booking.error.retry')}
      </Button>
    </div>
  );
};
