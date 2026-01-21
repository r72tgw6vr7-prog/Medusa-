import React from 'react';
import { Button } from '@/components/ui/button';
import { SERVICE_CONFIG, type ServiceConfig } from '../bookingConfig';

interface ServiceSelectionStepProps {
  t: (key: string) => string;
  selectedService: string | null;
  setSelectedService: (service: string) => void;
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
  projectDetails,
  setProjectDetails,
  canProceed,
  onNext,
}) => {
  return (
    <div className='step-container'>
      <h3>{t('booking.modal.serviceQuestion') || 'Was möchtest du buchen?'}</h3>
      <div className='service-grid'>
        {SERVICE_CONFIG.map((service) => (
          <button
            key={service.id}
            className={`service-card ${selectedService === service.id ? 'selected' : ''}`}
            onClick={() => setSelectedService(service.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedService(service.id);
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
