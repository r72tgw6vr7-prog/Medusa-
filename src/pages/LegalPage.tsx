import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState, useMemo } from 'react';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { PageHeading } from '@/components/PageHeading';
import { Card } from '@/components/ui/Card';
import LocalizedMeta from '@/components/LocalizedMeta';

export const LegalPage: React.FC = () => {
  const { t } = useLanguage();
  const [showBackToTop, _setShowBackToTop] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = useMemo(
    () => [
      {
        id: t('common.legalPage.sections.scope.id'),
        title: t('common.legalPage.sections.scope.title'),
        content: t('common.legalPage.content.scope', { returnObjects: true }) as unknown as string[],
      },
      {
        id: t('common.legalPage.sections.services.id'),
        title: t('common.legalPage.sections.services.title'),
        content: t('common.legalPage.content.services', { returnObjects: true }) as unknown as string[],
      },
      {
        id: t('common.legalPage.sections.appointments.id'),
        title: t('common.legalPage.sections.appointments.title'),
        content: t('common.legalPage.content.appointments', { returnObjects: true }) as unknown as string[],
      },
      {
        id: t('common.legalPage.sections.pricing.id'),
        title: t('common.legalPage.sections.pricing.title'),
        content: t('common.legalPage.content.pricing', { returnObjects: true }) as unknown as string[],
      },
      {
        id: t('common.legalPage.sections.health.id'),
        title: t('common.legalPage.sections.health.title'),
        content: t('common.legalPage.content.health', { returnObjects: true }) as unknown as string[],
      },
      {
        id: t('common.legalPage.sections.aftercare.id'),
        title: t('common.legalPage.sections.aftercare.title'),
        content: t('common.legalPage.content.aftercare', { returnObjects: true }) as unknown as string[],
      },
      {
        id: t('common.legalPage.sections.copyright.id'),
        title: t('common.legalPage.sections.copyright.title'),
        content: t('common.legalPage.content.copyright', { returnObjects: true }) as unknown as string[],
      },
      {
        id: t('common.legalPage.sections.privacy.id'),
        title: t('common.legalPage.sections.privacy.title'),
        content: t('common.legalPage.content.privacy', { returnObjects: true }) as unknown as string[],
      },
      {
        id: t('common.legalPage.sections.final.id'),
        title: t('common.legalPage.sections.final.title'),
        content: t('common.legalPage.content.final', { returnObjects: true }) as unknown as string[],
      },
    ],
    [t]
  );

  const tocItems = useMemo(
    () => [
      { id: 'section-1', label: t('common.legalPage.sections.scope.title') },
      { id: 'section-2', label: t('common.legalPage.sections.services.title') },
      { id: 'section-3', label: t('common.legalPage.sections.appointments.title') },
      { id: 'section-4', label: t('common.legalPage.sections.pricing.title') },
      { id: 'section-5', label: t('common.legalPage.sections.health.title') },
      { id: 'section-6', label: t('common.legalPage.sections.aftercare.title') },
      { id: 'section-7', label: t('common.legalPage.sections.copyright.title') },
      { id: 'section-8', label: t('common.legalPage.sections.privacy.title') },
      { id: 'section-9', label: t('common.legalPage.sections.final.title') },
    ],
    [t]
  );

  return (
    <>
      <LocalizedMeta titleKey='meta.legal.title' descriptionKey='meta.legal.description' />
      <div className='min-h-screen bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
        <MainNavigation />

        <main>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-container-main'>
              {/* Page Header - Standardized */}
              <PageHeading
                eyebrow={t('common.legalPage.eyebrow')}
                title={t('common.legalPage.title')}
                subtitle={t('common.legalPage.subtitle')}
              />

              {/* Table of Contents */}
              <Card
                variant='default'
                size='default'
                className='w-full min-w-0 overflow-hidden lg:overflow-visible'
                asChild
              >
                <nav className='w-full'>
                  <h2 className='font-headline text-(length:--text-h3) font-semibold text-brand-accent mb-8'>
                    {t('common.legalPage.tocTitle')}
                  </h2>
                  <ul className='space-y-0 text-(length:--text-body) text-brand-lightGray wrap-break-word lg:break-normal'>
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Card>

              {/* Content Sections */}
              {sections.map((section) => (
                <Card
                  key={section.id}
                  variant='default'
                  size='default'
                  className='w-full min-w-0 overflow-hidden lg:overflow-visible'
                  asChild
                >
                  <div>
                    <h3 className='font-headline text-(length:--text-h4) text-luxury-text-inverse mb-4'>
                      {section.title}
                    </h3>
                    <div className='space-y-4'>
                      <ul className='space-y-2 ml-6 list-disc'>
                        {section.content.map((item: string, index: number) => (
                          <li
                            key={index}
                            className='text-(length:--text-body) text-luxury-text-inverse/70 leading-(--line-height-normal)'
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <Footer />

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className='fixed bottom-8 right-8 bg-brand-chrome text-luxury-text-primary p-8 rounded-xl shadow-lg hover:bg-accent-hover transition-all duration-200 z-50 focus:outline-none focus:ring-2 focus:ring-brand-chrome focus:ring-offset-2 focus:ring-offset-luxury-bg-dark'
            aria-label={t('common.legalPage.backToTop')}
          >
            <p className='text-(length:--text-label) uppercase tracking-widest text-luxury-text-inverse/60 mb-6'>
              {t('common.legalPage.backToTop')}
            </p>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 15l7-7 7 7'
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default LegalPage;
