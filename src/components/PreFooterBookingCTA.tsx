// ============================================
// COMPONENT: PreFooterBookingCTA
// ============================================
// PURPOSE: Final booking call-to-action section above footer with animated breathing chrome glow effect

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import styles from './PreFooterBookingCTA.module.css';
import { Card } from './ui/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';

interface PreFooterBookingCTAProps {
  readonly selectedArtist?: string;
  readonly selectedService?: string;
}

export function PreFooterBookingCTA({ selectedArtist, selectedService }: PreFooterBookingCTAProps) {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  return (
    <section
      className='pre-footer-booking-cta relative w-full py-24 md:py-24 lg:py-32 overflow-hidden'
      style={{
        backgroundImage: 'url(/assets/images/photos/backgrounds/tattoo-card-bg.webp)', // Updated to new asset path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-[rgba(var(--color-surface-darker-rgb),0.85)] z-0' />

      {/* Animated background accent */}
      <div className='absolute inset-0 bg-linear-to-b from-transparent via-[rgba(var(--brand-accent-rgb),0.05)] to-transparent z-0 opacity-50' />

      {/* Content */}
      <div className='relative z-10 max-w-230 mx-auto px-8 md:px-8'>
        {/* Heading */}
        <div className='text-center mb-16 md:mb-16'>
          <h2 className='font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-(--brand-accent) mb-8 md:mb-8'>
            {t('common.sharedSections.preFooterBookingCta.title')}
          </h2>
          <p className='font-body text-(length:--text-lg) md:text-(length:--text-h4) text-luxury-text-inverse opacity-90 max-w-175 mx-auto leading-(--line-height-normal)'>
            {t('common.sharedSections.preFooterBookingCta.subtitle')}
          </p>
        </div>

        {/* Booking Form Card with BREATHING CHROME GLOW */}
        <Card variant='featured' size='default' className={`${styles['breathing-glow']} relative`}>
          <div className='p-8 md:p-8 lg:p-16'>
            <h3 className='font-headline text-(length:--text-h4) md:text-(length:--text-h3) font-semibold text-(--brand-accent) text-center mb-8'>
              {t('common.sharedSections.preFooterBookingCta.cardTitle')}
            </h3>

            <div className='space-y-8'>
              <Button
                type='button'
                variant='chrome'
                className='cool-lines-cta w-full h-14 text-(length:--text-lg) rounded-xl hover:shadow-chrome-glow transition duration-200 ease-out'
                onClick={() => navigate(localizePath('/booking', language))}
              >
                {selectedService || selectedArtist
                  ? t('common.sharedSections.preFooterBookingCta.ctaSelected')
                  : t('common.sharedSections.preFooterBookingCta.ctaDefault')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default PreFooterBookingCTA;
