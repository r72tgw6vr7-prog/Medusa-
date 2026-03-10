import React from 'react';
import { Button } from '@/components/ui/button';
import { MedusaInput } from '@/components/ui/input';
import type { BookingFormData } from '@/components/booking/bookingConfig';

interface PersonalInfoStepProps {
  t: (key: string) => string;
  formData: BookingFormData;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  t,
  formData,
  setFormData,
  canProceed,
  onBack,
  onNext,
  onSubmit,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form className='step-container booking-contact-step' onSubmit={onSubmit}>
      <h3>{t('booking.modal.personalTitle') || 'Deine Daten'}</h3>

      <MedusaInput
        id='name'
        label={t('booking.labels.name') + (t('booking.labels.name') ? '*' : '')}
        type='text'
        placeholder={t('booking.placeholders.name')}
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        required
        fullWidth
      />

      <MedusaInput
        id='email'
        label={t('booking.labels.email') + (t('booking.labels.email') ? '*' : '')}
        type='email'
        placeholder={t('booking.placeholders.email')}
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        required
        fullWidth
      />

      <MedusaInput
        id='phone'
        label={t('booking.labels.phone')}
        type='tel'
        placeholder={t('booking.placeholders.phone')}
        value={formData.phone}
        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        fullWidth
      />

      <MedusaInput
        id='date'
        label={t('booking.labels.date') + (t('booking.labels.date') ? '*' : '')}
        type='date'
        placeholder={t('booking.placeholders.time')}
        value={formData.date}
        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
        required
        fullWidth
      />

      <MedusaInput
        id='message'
        label={t('booking.labels.specialRequests')}
        type='text'
        placeholder={t('booking.placeholders.specialRequests')}
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        fullWidth
      />

      <div className='form-group checkbox-group'>
        <input
          type='checkbox'
          id='gdpr-consent'
          name='gdprConsent'
          checked={formData.gdprConsent}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='gdpr-consent' className='touch-target-mobile touch-target-mobile-inline'>
          {t('booking.gdpr.consent')}
        </label>
      </div>

      <div className='booking-actions'>
        <Button type='button' variant='outlineChrome' className='w-full' onClick={onBack}>
          {t('booking.modal.back') || 'Zurück'}
        </Button>
        <Button
          type='button'
          variant='chrome'
          className='w-full'
          disabled={!canProceed}
          onClick={onNext}
        >
          {t('booking.modal.next') || 'Weiter'}
        </Button>
      </div>
    </form>
  );
};
