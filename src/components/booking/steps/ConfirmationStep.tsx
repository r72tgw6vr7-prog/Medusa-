import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BookingResult } from '@/components/booking/bookingConfig';

interface ConfirmationStepProps {
  t: (key: string) => string;
  language: string;
  bookingResult: BookingResult;
  onClose?: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  t,
  language,
  bookingResult,
  onClose,
}) => {
  return (
    <div className='confirmation-screen'>
      <CheckCircle2 size={64} className='success-icon' />
      <h3>{t('booking.confirmation.title')}</h3>
      <p>{t('booking.confirmation.subtitle')}</p>

      <div className='booking-details'>
        <div className='detail-row'>
          <span className='detail-label'>{t('booking.confirmation.bookingNumber')}</span>
          <span className='detail-value'>{bookingResult.bookingNumber}</span>
        </div>
        <div className='detail-row'>
          <span className='detail-label'>{t('booking.confirmation.service')}</span>
          <span className='detail-value'>{bookingResult.serviceName}</span>
        </div>
        <div className='detail-row'>
          <span className='detail-label'>{t('booking.confirmation.date')}</span>
          <span className='detail-value'>
            {new Date(bookingResult.date).toLocaleDateString(
              language === 'de' ? 'de-DE' : 'en-US',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          </span>
        </div>
      </div>

      <p className='confirmation-note'>{t('booking.confirmation.emailNote')}</p>

      <Button
        variant='chrome'
        onClick={onClose}
        className='w-full'
        aria-label={t('booking.confirmation.closeButton')}
      >
        {t('booking.confirmation.closeButton')}
      </Button>
    </div>
  );
};
