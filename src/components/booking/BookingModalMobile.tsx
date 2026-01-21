import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { submitBooking, validateBookingData } from '../../services/bookingService';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  SERVICE_CONFIG,
  INITIAL_FORM_DATA,
  type BookingStep,
  type BookingFormData,
  type PaymentMethod,
  type BookingResult,
} from './bookingConfig';
import {
  ServiceSelectionStep,
  PersonalInfoStep,
  PaymentStep,
  ConfirmationStep,
  LoadingOverlay,
  ErrorState,
} from './steps';
import './BookingModalMobile.css';

export const BookingModalMobile: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<BookingStep>('details');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [projectDetails, setProjectDetails] = useState('');
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

  const canProceedStep1 = selectedService !== null;
  const canProceedStep2 =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.date.trim() !== '' &&
    formData.gdprConsent;
  const canProceedStep3 = paymentMethod !== null;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedService || !paymentMethod) {
        setSubmissionError(t('booking.error.completeAllSteps'));
        return;
      }

      const bookingData = {
        serviceId: selectedService,
        paymentMethod,
        projectDetails,
        ...formData,
      };

      const validationError = validateBookingData(bookingData);
      if (validationError) {
        setSubmissionError(validationError);
        return;
      }

      try {
        setIsSubmitting(true);
        setSubmissionError(null);

        const serviceConfig = SERVICE_CONFIG.find((s) => s.id === selectedService);
        const response = await submitBooking(bookingData);

        setBookingResult({
          bookingNumber: response.bookingNumber,
          serviceName: serviceConfig ? t(serviceConfig.titleKey) : '',
          date: formData.date,
        });

        setStep('confirmation');
      } catch (error) {
        console.error('Booking failed:', error);
        setSubmissionError(t('booking.toasts.errorBody'));
        setStep('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedService, paymentMethod, projectDetails, formData, t]
  );

  return (
    <div className='booking-modal-mobile'>
      <div className='modal-header'>
        <h2>{t('booking.modal.title') || 'Termin buchen'}</h2>
        {onClose && (
          <button
            className='close-button touch-target-mobile'
            onClick={onClose}
            aria-label={t('booking.modal.close') || 'Close'}
          >
            <X size={24} />
          </button>
        )}
      </div>

      <div className='booking-progress' aria-label='Buchung Fortschritt'>
        <span className={`booking-progress__step ${step === 'details' ? 'is-active' : ''}`}>
          1/3
        </span>
        <span className='booking-progress__divider' aria-hidden='true' />
        <span className={`booking-progress__step ${step === 'personal' ? 'is-active' : ''}`}>
          2/3
        </span>
        <span className='booking-progress__divider' aria-hidden='true' />
        <span className={`booking-progress__step ${step === 'payment' ? 'is-active' : ''}`}>
          3/3
        </span>
      </div>

      <div className='modal-body'>
        {step === 'details' && (
          <ServiceSelectionStep
            t={t}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            canProceed={canProceedStep1}
            onNext={() => setStep('personal')}
          />
        )}

        {step === 'personal' && (
          <PersonalInfoStep
            t={t}
            formData={formData}
            setFormData={setFormData}
            canProceed={canProceedStep2}
            onBack={() => setStep('details')}
            onNext={() => setStep('payment')}
            onSubmit={handleSubmit}
          />
        )}

        {step === 'payment' && (
          <PaymentStep
            t={t}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            submissionError={submissionError}
            canProceed={canProceedStep3}
            onBack={() => setStep('personal')}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {isSubmitting && <LoadingOverlay t={t} />}

      {step === 'error' && submissionError && (
        <ErrorState
          t={t}
          error={submissionError}
          isSubmitting={isSubmitting}
          onRetry={() => setStep('payment')}
        />
      )}

      {step === 'confirmation' && bookingResult && (
        <ConfirmationStep
          t={t}
          language={language}
          bookingResult={bookingResult}
          onClose={onClose}
        />
      )}
    </div>
  );
};
