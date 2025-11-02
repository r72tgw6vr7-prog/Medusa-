import React, { useState } from 'react';
import type { Service, Artist, BookingFormData, ValidationErrors } from '../../types/booking';
import { ArtistCard } from '../molecules/ArtistCard';
import Button from '../Button';
import FormInput from '../FormInput';
import './BookingForm.css';

interface BookingFormProps {
  services: Service[];
  artists: Artist[];
  onSubmit: (data: BookingFormData) => Promise<void>;
  className?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  services,
  artists,
  onSubmit,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const labelClass = 'block text-sm font-medium text-white mb-2';
  const fieldContainerClass = 'space-y-2';
  const inputClass =
    'w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/70 focus:border-brand-gold/70 transition-colors';
  const selectClass = `${inputClass} appearance-none`;
  const textareaClass = `${inputClass} resize-none`;

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!formData.service) {
          newErrors.service = 'Bitte wählen Sie einen Service aus';
        }
        break;
      case 2:
        if (!formData.artist) {
          newErrors.artist = 'Bitte wählen Sie einen Künstler aus';
        }
        if (!formData.date) {
          newErrors.date = 'Bitte wählen Sie ein Datum aus';
        }
        if (!formData.time) {
          newErrors.time = 'Bitte wählen Sie eine Uhrzeit aus';
        }
        break;
      case 3:
        if (!formData.personalInfo?.firstName) {
          newErrors['personalInfo.firstName'] = 'Bitte geben Sie Ihren Vornamen ein';
        }
        if (!formData.personalInfo?.lastName) {
          newErrors['personalInfo.lastName'] = 'Bitte geben Sie Ihren Nachnamen ein';
        }
        if (!formData.personalInfo?.email) {
          newErrors['personalInfo.email'] = 'Bitte geben Sie Ihre E-Mail-Adresse ein';
        } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
          newErrors['personalInfo.email'] = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
        }
        if (!formData.personalInfo?.phone) {
          newErrors['personalInfo.phone'] = 'Bitte geben Sie Ihre Telefonnummer ein';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setErrors({});
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        // Success handling could be added here
      } catch {
        setErrors({
          submit: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStepIndicator = () => (
    <div className='flex items-center justify-center gap-8 mb-16'>
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              step === currentStep
                ? 'border-brand-gold bg-brand-gold text-black shadow-gold-glow'
                : step < currentStep
                  ? 'border-brand-gold/60 bg-brand-gold/10 text-brand-gold'
                  : 'border-white/10 bg-white/5 text-white/60'
            }`}
          >
            {step < currentStep ? '✓' : step}
          </div>
          {step < 3 && (
            <div
              className={`h-0.5 w-16 rounded-full transition-colors ${
                step < currentStep ? 'bg-brand-gold' : 'bg-white/10'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderServiceSelection = () => (
    <div className='space-y-8'>
      <div className='text-center md:text-left'>
        <p className='text-brand-gold/90 text-sm tracking-[0.2em] uppercase mb-8'>Schritt 1</p>
        <h3 className='text-3xl font-headline text-white mb-16'>Wählen Sie einen Service</h3>
        <p className='text-sm text-white/70 max-w-2xl mx-auto md:mx-0'>
          Geben Sie uns einen Hinweis darauf, welches Projekt Sie planen. Die Auswahl hilft uns bei
          der optimalen Vorbereitung.
        </p>
      </div>
      <select
        className={selectClass}
        value={formData.service?.id || ''}
        onChange={(e) => {
          const service = services.find((s) => s.id === e.target.value);
          setFormData((prev) => ({ ...prev, service }));
        }}
        aria-label='Service auswählen'
      >
        <option value=''>Bitte wählen Sie einen Service</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name} - {service.duration}min - €{service.price}
          </option>
        ))}
      </select>
      {errors.service && <p className='text-red-500 text-sm'>{errors.service}</p>}
    </div>
  );

  const renderArtistAndTimeSelection = () => (
    <div className='space-y-16'>
      <div className='text-center md:text-left'>
        <p className='text-brand-gold/90 text-sm tracking-[0.2em] uppercase mb-8'>Schritt 2</p>
        <h3 className='text-3xl font-headline text-white mb-16'>Künstler & Termin wählen</h3>
        <p className='text-sm text-white/70 max-w-2xl mx-auto md:mx-0'>
          Sichern Sie sich Ihren Wunschkünstler und Zeitfenster. Wir bestätigen Ihren Termin zeitnah
          per E-Mail.
        </p>
      </div>

      <div>
        <h4 className='text-lg font-semibold text-white mb-16'>Künstler auswählen</h4>
        <div className='booking-artist-grid grid grid-cols-1 gap-16 md:grid-cols-2 xl:grid-cols-3'>
          {artists.map((artist) => (
            <div
              key={artist.id}
              className='booking-artist-card group transition-transform duration-300 cursor-pointer'
            >
              <ArtistCard
                name={artist.name}
                imageUrl={artist.imageUrl}
                specialties={artist.specialties}
                role={{ name: 'Artist', icon: '/assets/artist-icon.png' }}
                experience='5+ Jahre'
                instagramHandle={`@${artist.name.toLowerCase().replace(/\s+/g, '')}`}
                onClick={() => setFormData((prev) => ({ ...prev, artist }))}
                isSelected={formData.artist?.id === artist.id}
                className='w-full transition-all duration-300'
              />
            </div>
          ))}
        </div>
        {errors.artist && <p className='text-red-500 text-sm mt-16'>{errors.artist}</p>}
      </div>

      <div className='grid grid-cols-1 gap-16 md:grid-cols-2'>
        <FormInput
          id="date"
          label="Datum"
          type="date"
          value={formData.date || ''}
          onChange={(value) => setFormData((prev) => ({ ...prev, date: value }))}
          error={errors.date}
          fieldContainerClass={fieldContainerClass}
          labelClass={labelClass}
          inputClass={inputClass}
          scheme="dark"
          min={new Date().toISOString().split('T')[0]}
        />

        <FormInput
          id="time"
          label="Uhrzeit"
          type="time"
          value={formData.time || ''}
          onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
          error={errors.time}
          fieldContainerClass={fieldContainerClass}
          labelClass={labelClass}
          inputClass={inputClass}
          scheme="dark"
          step="1800"
        />
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className='space-y-16'>
      <div className='text-center md:text-left'>
        <p className='text-brand-gold/90 text-sm tracking-[0.2em] uppercase mb-8'>Schritt 3</p>
        <h3 className='text-3xl font-headline text-white mb-16'>Persönliche Informationen</h3>
        <p className='text-sm text-white/70 max-w-2xl mx-auto md:mx-0'>
          Teilen Sie uns mit, wie wir Sie erreichen können. Wir nutzen diese Daten ausschließlich
          für Ihre Buchung.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-16 md:grid-cols-2'>
        <FormInput
          id="firstName"
          label="Vorname"
          type="text"
          value={formData.personalInfo?.firstName || ''}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                firstName: value,
              },
            }))
          }
          error={errors['personalInfo.firstName']}
          fieldContainerClass={fieldContainerClass}
          labelClass={labelClass}
          inputClass={inputClass}
        />

        <FormInput
          id="lastName"
          label="Nachname"
          type="text"
          value={formData.personalInfo?.lastName || ''}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                lastName: value,
              },
            }))
          }
          error={errors['personalInfo.lastName']}
          fieldContainerClass={fieldContainerClass}
          labelClass={labelClass}
          inputClass={inputClass}
        />

        <FormInput
          id="email"
          label="E-Mail"
          type="email"
          value={formData.personalInfo?.email || ''}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                email: value,
              },
            }))
          }
          error={errors['personalInfo.email']}
          fieldContainerClass={fieldContainerClass}
          labelClass={labelClass}
          inputClass={inputClass}
        />

        <FormInput
          id="phone"
          label="Telefon"
          type="tel"
          value={formData.personalInfo?.phone || ''}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                phone: value,
              },
            }))
          }
          error={errors['personalInfo.phone']}
          fieldContainerClass={fieldContainerClass}
          labelClass={labelClass}
          inputClass={inputClass}
        />
      </div>

      <div className={fieldContainerClass}>
        <label className={labelClass} htmlFor='notes'>
          Anmerkungen (optional)
        </label>
        <textarea
          id='notes'
          rows={4}
          className={textareaClass}
          value={formData.personalInfo?.notes || ''}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                notes: e.target.value,
              },
            }))
          }
        />
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto w-full max-w-5xl space-y-10 rounded-2xl bg-black/40 p-8 md:p-12 lg:p-16 shadow-xl backdrop-blur ${className}`}
    >
      {renderStepIndicator()}

      <div className='mb-8'>
        {currentStep === 1 && renderServiceSelection()}
        {currentStep === 2 && renderArtistAndTimeSelection()}
        {currentStep === 3 && renderPersonalInfo()}
      </div>

      {errors.submit && <p className='text-red-500 text-sm mb-8'>{errors.submit}</p>}

      <div className='flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between'>
        <Button
          type='button'
          onClick={handleBack}
          variant='secondary'
          className={`w-full sm:w-auto ${
            currentStep === 1 ? 'invisible sm:visible sm:opacity-0' : ''
          }`}
        >
          Zurück
        </Button>

        <Button
          type={currentStep === 3 ? 'submit' : 'button'}
          onClick={currentStep === 3 ? undefined : handleNext}
          disabled={isSubmitting}
          variant='primary'
          className='w-full sm:w-auto'
          isLoading={isSubmitting}
        >
          {currentStep === 3 ? 'Termin buchen' : 'Weiter'}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
