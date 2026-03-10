import React from 'react';
import { Button } from '@/components/ui/button';
import {
  SERVICE_CONFIG,
  SPECIFIC_PIERCING_SERVICES,
  SPECIFIC_TATTOO_SERVICES,
} from '@/components/booking/bookingConfig';

interface ServiceSelectionStepProps {
  t: (key: string) => string;
  selectedService: string | null;
  setSelectedService: (service: string) => void;
  specificService: string | null;
  setSpecificService: (service: string | null) => void;
  projectDetails: string;
  setProjectDetails: (details: string) => void;
  canProceed: boolean;
  onNext: () => void;
}

const TattooIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z'></path>
    <path d='m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18'></path>
    <path d='m2.3 2.3 7.286 7.286'></path>
    <circle cx='11' cy='11' r='2'></circle>
  </svg>
);

const PiercingIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='10'></circle>
    <circle cx='12' cy='12' r='6'></circle>
    <circle cx='12' cy='12' r='2'></circle>
  </svg>
);

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  t,
  selectedService,
  setSelectedService,
  specificService,
  setSpecificService,
  projectDetails,
  setProjectDetails,
  canProceed,
  onNext,
}) => {
  // Get specific services based on selected service type
  const specificServices =
    selectedService === 'piercing'
      ? SPECIFIC_PIERCING_SERVICES
      : selectedService === 'tattoo'
        ? SPECIFIC_TATTOO_SERVICES
        : [];

  return (
    <div className='step-container'>
      <h3>{t('booking.modal.serviceQuestion') || 'Was möchtest du buchen?'}</h3>
      <div className='service-grid'>
        {SERVICE_CONFIG.map((service) => (
          <button
            key={service.id}
            className={`service-card ${selectedService === service.id ? 'selected' : ''}`}
            aria-pressed={selectedService === service.id}
            onClick={() => {
              setSelectedService(service.id);
              // Clear specific service when changing main service type
              if (selectedService !== service.id) {
                setSpecificService(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedService(service.id);
                if (selectedService !== service.id) {
                  setSpecificService(null);
                }
              }
            }}
            type='button'
          >
            <div className='service-icon'>
              {service.id === 'tattoo' ? <TattooIcon /> : <PiercingIcon />}
            </div>
            <h4>{t(service.titleKey)}</h4>
            <p className='price'>{t(service.priceKey)}</p>
            <ul className='features'>
              {service.featureKeys.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={`${service.id}-${feature.key}`}>
                    <Icon size={20} />
                    <span>{t(feature.key)}</span>
                  </li>
                );
              })}
            </ul>
          </button>
        ))}
      </div>

      {/* Specific service dropdown - shown when a service type is selected */}
      {selectedService && specificServices.length > 0 && (
        <div className='form-group'>
          <label htmlFor='specificService'>
            {selectedService === 'piercing' ? 'Welches Piercing?' : 'Welche Art Tattoo?'}
          </label>
          <select
            id='specificService'
            name='specificService'
            value={specificService || ''}
            onChange={(e) => setSpecificService(e.target.value || null)}
            className='specific-service-select'
          >
            <option value=''>— Bitte wählen (optional) —</option>
            {specificServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className='form-group'>
        <label htmlFor='projectDetails'>
          {t('booking.modal.projectLabel') || 'Was genau? (optional)'}
        </label>
        <textarea
          id='projectDetails'
          name='projectDetails'
          rows={4}
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          placeholder={t('booking.placeholders.specialRequests')}
        />
      </div>

      <Button variant='chrome' disabled={!canProceed} onClick={onNext} className='w-full'>
        {t('booking.modal.next') || 'Weiter'}
      </Button>
    </div>
  );
};
