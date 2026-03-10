import React from 'react';
import { Button } from '@/components/ui/button';
import type { PaymentMethod } from '@/components/booking/bookingConfig';

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
          <label className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}>
            <input
              type='radio'
              name='paymentMethod'
              value='cash'
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            <span>{t('booking.payment.cash')}</span>
          </label>
          <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
            <input
              type='radio'
              name='paymentMethod'
              value='card'
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <span>{t('booking.payment.card')}</span>
          </label>
          <label className={`payment-option ${paymentMethod === 'bank_transfer' ? 'selected' : ''}`}>
            <input
              type='radio'
              name='paymentMethod'
              value='bank_transfer'
              checked={paymentMethod === 'bank_transfer'}
              onChange={() => setPaymentMethod('bank_transfer')}
            />
            <span>{t('booking.payment.bankTransfer')}</span>
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
