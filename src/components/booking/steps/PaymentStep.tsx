import React from 'react';
import { Button } from '@/components/ui/button';
import type { PaymentMethod } from '../bookingConfig';

interface PaymentStepProps {
  t: (key: string) => string;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  submissionError: string | null;
  canProceed: boolean;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  t,
  paymentMethod,
  setPaymentMethod,
  submissionError,
  canProceed,
  onBack,
  onSubmit,
}) => {
  return (
    <form className='step-container booking-payment-step' onSubmit={onSubmit}>
      <h3>{t('booking.payment.title')}</h3>

      <div className='form-group'>
        <label>{t('booking.payment.methodLabel')}</label>
        <div className='payment-options'>
          <label
            className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''} touch-target-mobile`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='cash'
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              className='touch-target-mobile'
            />
            {t('booking.payment.cash')}
          </label>
          <label
            className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''} touch-target-mobile`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='card'
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className='touch-target-mobile'
            />
            {t('booking.payment.card')}
          </label>
          <label
            className={`payment-option ${paymentMethod === 'bank_transfer' ? 'selected' : ''} touch-target-mobile`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='bank_transfer'
              checked={paymentMethod === 'bank_transfer'}
              onChange={() => setPaymentMethod('bank_transfer')}
              className='touch-target-mobile'
            />
            {t('booking.payment.bankTransfer')}
          </label>
        </div>
      </div>

      {submissionError && <p className='form-error'>{submissionError}</p>}

      <div className='booking-actions'>
        <Button type='button' variant='outlineChrome' className='w-full' onClick={onBack}>
          {t('booking.modal.back')}
        </Button>
        <Button type='submit' variant='chrome' disabled={!canProceed} className='w-full'>
          {t('booking.payment.submitBooking')}
        </Button>
      </div>
    </form>
  );
};
