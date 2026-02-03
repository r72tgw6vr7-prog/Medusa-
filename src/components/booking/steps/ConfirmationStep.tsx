import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BookingResult } from '@/components/booking/bookingConfig';

interface ConfirmationStepProps {
  t: (key: string) => string;
  language: string;
  bookingResult: BookingResult;
  messageOverride?: string;
  onClose?: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  t,
  language,
  bookingResult,
  messageOverride,
  onClose,
}) => {
  return (
    <div className='confirmation-screen'>
      <div className='confirmation-card'>
        <div className='confirmation-icon'>
          <CheckCircle2 size={32} className='success-icon' />
        </div>
        <div className='confirmation-copy'>
          <h3 className='confirmation-title'>{t('booking.confirmation.title')}</h3>
          <p className='confirmation-subtitle'>
            {messageOverride ?? t('booking.confirmation.subtitle')}
          </p>
        </div>

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
                },
              )}
            </span>
          </div>
        </div>

        <p className='confirmation-note'>{t('booking.confirmation.emailNote')}</p>

        <Button
          variant='chrome'
          onClick={onClose}
          className='confirmation-action w-full'
          aria-label={t('booking.confirmation.closeButton')}
        >
          {t('booking.confirmation.closeButton')}
        </Button>
      </div>
    </div>
  );
};
