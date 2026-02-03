import { useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { submitBooking, validateBookingData } from '@/services/bookingService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/core/state/AppContext';
import { Meteors } from '@/components/ui/meteors';
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
  const { state, closeBooking } = useApp();
  const [step, setStep] = useState<BookingStep>('details');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [specificService, setSpecificService] = useState<string | null>(null); // The specific service (e.g., "ohr", "ohrlochzauberer")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [projectDetails, setProjectDetails] = useState('');
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Map service IDs to booking system service types
  const mapServiceToBookingType = useCallback((serviceId: string): string => {
    // Specific piercing services map to 'piercing'
    const piercingServices = ['ohr', 'mund', 'gesicht', 'koerper', 'intim', 'ohrlochzauberer'];
    if (piercingServices.includes(serviceId)) {
      return 'piercing';
    }

    // Tattoo services (any ID containing 'tattoo') map to 'tattoo'
    if (serviceId.includes('tattoo')) {
      return 'tattoo';
    }

    // Piercing services (any ID containing 'piercing') map to 'piercing'
    if (serviceId.includes('piercing')) {
      return 'piercing';
    }

    // Services pages use generic service IDs that should map to 'tattoo' or 'piercing' based on context
    // For now, default to 'tattoo' for unknown services
    return 'tattoo';
  }, []);

  // Initialize state based on preselected service - keep first step but pre-select service
  useEffect(() => {
    if (state.preselectedService) {
      const bookingServiceType = mapServiceToBookingType(state.preselectedService);
      setSelectedService(bookingServiceType);
      // Store the specific service (e.g., "ohr", "ohrlochzauberer") for the email
      setSpecificService(state.preselectedService);
      // Stay on first step ('details') so user can see their selection and modify if needed
    }
  }, [state.preselectedService, mapServiceToBookingType]);

  const canProceedStep1 = selectedService !== null;
  const canProceedStep2 =
    formData.name.trim() !== '' && formData.email.trim() !== '' && formData.date.trim() !== '';
  const canProceedStep3 = paymentMethod !== null;

  const resetForm = useCallback(() => {
    setStep('details');
    setSelectedService(null);
    setSpecificService(null);
    setPaymentMethod(null);
    setProjectDetails('');
    setFormData(INITIAL_FORM_DATA);
    setSubmissionError(null);
    setBookingResult(null);
    setSuccessMessage(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedService || !paymentMethod) {
        setSubmissionError(t('booking.error.completeAllSteps'));
        return;
      }

      const bookingData = {
        serviceId: selectedService,
        specificService: specificService || undefined, // Include in email
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
        setSuccessMessage(null);

        const serviceConfig = SERVICE_CONFIG.find((s) => s.id === selectedService);
        const response = await submitBooking(bookingData);

        setBookingResult({
          bookingNumber: response.bookingNumber,
          serviceName: serviceConfig ? t(serviceConfig.titleKey) : '',
          date: formData.date,
        });

        setSuccessMessage(t('booking.confirmation.subtitle'));

        setStep('confirmation');

        // Reset state for the next booking request (while keeping confirmation visible)
        setSelectedService(null);
        setSpecificService(null);
        setPaymentMethod(null);
        setProjectDetails('');
        setFormData(INITIAL_FORM_DATA);
      } catch (error) {
        console.error('Booking failed:', error);
        setSubmissionError(t('booking.error.submitFailed'));
        setStep('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedService, specificService, paymentMethod, projectDetails, formData, t],
  );

  const handleClose = useCallback(() => {
    resetForm();
    closeBooking();
    onClose?.();
  }, [onClose, resetForm, closeBooking]);

  return (
    <div className='booking-modal-mobile'>
      <div
        aria-hidden='true'
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: 0.18,
          zIndex: 0,
        }}
      >
        <Meteors number={12} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className='modal-header'>
          <h2>{t('booking.modal.title') || 'Termin buchen'}</h2>
          {onClose && (
            <button
              className='close-button touch-target-mobile'
              onClick={handleClose}
              aria-label={t('booking.modal.close') || 'Close'}
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className='booking-progress' aria-label='Buchung Fortschritt'>
          {/* Always show 3-step progress */}
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
              specificService={specificService}
              setSpecificService={setSpecificService}
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
            messageOverride={successMessage ?? undefined}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};
