// ============================================
// PAGE: AftercarePage
// ============================================
// Comprehensive tattoo aftercare guide with healing timeline, tips, products, and warnings

import React, { useState } from 'react';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { PageHeading } from '@/components/PageHeading';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/ui/Card';
import LocalizedMeta from '@/components/LocalizedMeta';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import {
  CheckCircle,
  AlertTriangle,
  Phone,
  Calendar,
  Droplets,
  Sparkles,
  Shield,
  Check,
  Star,
  Heart,
  Clock,
} from 'lucide-react';
import {
  AFTERCARE_PHASES,
  AFTERCARE_TIPS,
  AFTERCARE_PRODUCTS,
  WARNING_SIGNS,
} from '@/data/aftercare';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';

export const AftercarePage: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const { language, t } = useLanguage();

  // Phase icons mapping
  const phaseIcons = [
    <Droplets size={28} />,
    <Sparkles size={28} />,
    <Shield size={28} />,
    <Check size={28} />,
    <Star size={28} />,
    <Heart size={28} />,
  ];

  const togglePhase = (phaseId: string) => {
    setActivePhase(activePhase === phaseId ? null : phaseId);
  };

  return (
    <>
      <LocalizedMeta titleKey='meta.aftercare.title' descriptionKey='meta.aftercare.description' />
      <div className='min-h-screen bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
        <MainNavigation />

        {/* Page Header - Matches Services page exactly */}
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            <div className='flex flex-col gap-16'>
              <div className='text-center'>
                <PageHeading
                  eyebrow={t('aftercare.pageHeading.eyebrow')}
                  title={t('aftercare.pageHeading.title')}
                  subtitle={t('aftercare.pageHeading.subtitle')}
                />
                <div className='flex items-center justify-center gap-8 text-luxury-text-inverse/70 -mt-8'>
                  <Clock size={20} />
                  <span className='text-(length:--text-body) font-body'>
                    {t('aftercare.pageHeading.healingDuration')}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Healing Timeline Section - Container → Section → List */}
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            <div className='mb-16'>
              <SectionHeading
                eyebrow={t('aftercare.timeline.eyebrow')}
                title={t('aftercare.timeline.title')}
              />
            </div>

            <div className='relative'>
              {/* Chrome connecting line */}
              <div
                className='absolute left-8 top-0 bottom-0 w-0.5 hidden md:block'
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, var(--accent-chrome) 10%, var(--accent-chrome) 90%, transparent)',
                }}
              />

              {AFTERCARE_PHASES.map((phase, index) => (
                <div key={phase.id} className='relative md:pl-24 pb-16 last:pb-0'>
                  {/* Phase icon */}
                  <div className='md:absolute md:left-0 w-14 h-14 bg-(--accent-chrome) rounded-full flex items-center justify-center text-luxury-text-primary mb-8 md:mb-0 mx-auto md:mx-0'>
                    <span className='hidden md:block font-bold text-(length:--text-lg)'>
                      {index + 1}
                    </span>
                    <span className='md:hidden'>{phaseIcons[index]}</span>
                  </div>

                  {/* Phase content */}
                  <Card variant='default' size='default' asChild>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-0'>
                      <div>
                        <span className='inline-block bg-brand-accent/10 text-brand-accent px-0 py-0 rounded-full text-(length:--text-sm) lg:text-(length:--text-label) font-bold mb-0'>
                          {t(phase.dayKey)}
                        </span>
                        <h3 className='font-headline text-(length:--text-h4) text-brand-accent'>
                          {t(phase.titleKey)}
                        </h3>
                      </div>
                      <span className='text-(--chrome-silver) text-(length:--text-body) lg:text-(length:--text-sm) flex items-center gap-0'>
                        <Clock size={16} />
                        {t(phase.durationKey)}
                      </span>
                    </div>

                    <p className='text-(length:--text-body) text-luxury-text-inverse/80 mb-8 leading-(--line-height-normal) font-body'>
                      {t(phase.descriptionKey)}
                    </p>

                    {activePhase === phase.id ? (
                      <button
                        onClick={() => togglePhase(phase.id)}
                        className='text-brand-accent hover:text-brand-accent-hover font-medium flex items-center gap-0 transition-colors duration-200 ease-out'
                        aria-expanded='true'
                        aria-controls={`phase-details-${phase.id}`}
                      >
                        {t('aftercare.timeline.showLess')}
                        <span className='text-(length:--text-lg)'>↑</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => togglePhase(phase.id)}
                        className='text-brand-accent hover:text-brand-accent-hover font-medium flex items-center gap-0 transition-colors duration-200 ease-out'
                        aria-expanded='false'
                        aria-controls={`phase-details-${phase.id}`}
                      >
                        {t('aftercare.timeline.showDetails')}
                        <span className='text-(length:--text-lg)'>→</span>
                      </button>
                    )}

                    {activePhase === phase.id && (
                      <div
                        id={`phase-details-${phase.id}`}
                        className='mt-8 space-y-8 border-t border-[rgba(var(--color-accent-silver-rgb),0.2)] pt-8'
                      >
                        <div>
                          <h4 className='text-brand-accent text-(length:--text-body) font-bold mb-0 flex items-center gap-0'>
                            <CheckCircle size={20} />
                            {t('aftercare.timeline.instructionsLabel')}
                          </h4>
                          <ul className='space-y-0'>
                            {phase.instructionKeys.map((instructionKey, i) => (
                              <li
                                key={i}
                                className='flex items-start gap-0 text-(length:--text-body) text-luxury-text-inverse/80 leading-(--line-height-normal) font-body'
                              >
                                <span className='text-brand-accent shrink-0 mt-0'>•</span>
                                <span>{t(instructionKey)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Do's & Don'ts Section - Container → Section → Grid → Cards */}
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            <div className='mb-16'>
              <SectionHeading
                eyebrow={t('aftercare.dosDonts.eyebrow')}
                title={t('aftercare.dosDonts.title')}
              />
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              {/* DO's */}
              <div>
                <h3 className='font-headline text-(length:--text-h3) text-green-400 mb-8 flex items-center gap-0'>
                  <div className='w-10 min-h-10 rounded-full bg-green-400/20 flex flex-col h-full items-center justify-center'>
                    <CheckCircle size={24} />
                  </div>
                  {t('aftercare.dosDonts.dosTitle')}
                </h3>
                <div className='space-y-8'>
                  {AFTERCARE_TIPS.filter((tip) => tip.category === 'do').map((tip) => (
                    <Card
                      key={tip.id}
                      variant={tip.critical ? 'featured' : 'default'}
                      size='sm'
                      asChild
                    >
                      <div>
                        <div className='flex items-start gap-0'>
                          <span className='text-(length:--text-h4) shrink-0'>{tip.icon}</span>
                          <div className='flex-1'>
                            <p className='text-(length:--text-body) text-luxury-text-inverse/90 leading-(--line-height-normal) font-body'>
                              {t(tip.textKey)}
                            </p>
                            {tip.critical && (
                              <span className='inline-block mt-0 text-(length:--text-sm) lg:text-(length:--text-label) text-(--brand-accent) font-bold'>
                                {t('aftercare.dosDonts.importantLabel')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* DON'Ts */}
              <div>
                <h3 className='font-headline text-(length:--text-h3) text-red-400 mb-8 flex items-center gap-0'>
                  <div className='w-10 min-h-10 rounded-full bg-red-400/20 flex flex-col h-full items-center justify-center'>
                    <span className='text-(length:--text-h3) leading-none'>✕</span>
                  </div>
                  {t('aftercare.dosDonts.dontsTitle')}
                </h3>
                <div className='space-y-8'>
                  {AFTERCARE_TIPS.filter((tip) => tip.category === 'dont').map((tip) => (
                    <Card
                      key={tip.id}
                      variant={tip.critical ? 'featured' : 'default'}
                      size='sm'
                      asChild
                    >
                      <div>
                        <div className='flex items-start gap-0'>
                          <span className='text-(length:--text-h4) shrink-0'>{tip.icon}</span>
                          <div className='flex-1'>
                            <p className='text-(length:--text-body) text-luxury-text-inverse/90 leading-(--line-height-normal) font-body'>
                              {t(tip.textKey)}
                            </p>
                            {tip.critical && (
                              <span className='inline-block mt-0 text-(length:--text-sm) lg:text-(length:--text-label) text-(--brand-accent) font-bold'>
                                {t('aftercare.dosDonts.importantLabel')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Products Section - Container → Section → Grid → Cards */}
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            <div className='mb-16'>
              <SectionHeading
                eyebrow={t('aftercare.products.eyebrow')}
                title={t('aftercare.products.title')}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
              {AFTERCARE_PRODUCTS.map((product) => (
                <Card
                  key={product.id}
                  variant={product.recommended ? 'featured' : 'default'}
                  size='default'
                  asChild
                >
                  <div className='flex flex-col'>
                    {product.recommended && (
                      <div className='flex flex-col h-full bg-(--brand-accent) text-luxury-text-primary px-2 py-2 lg:py-(--space-0-5) rounded-full text-(length:--text-sm) lg:text-(length:--text-label) font-bold mb-4 self-start'>
                        {t('aftercare.products.recommendedLabel')}
                      </div>
                    )}

                    <h3 className='font-bold text-(length:--text-body) text-luxury-text-inverse mb-0'>
                      {t(product.nameKey)}
                    </h3>
                    <p className='text-(--chrome-silver) text-(length:--text-sm) mb-0 capitalize'>
                      {t(`aftercare.productCategories.${product.category}`)}
                    </p>
                    <p className='text-(length:--text-sm) text-luxury-text-inverse/70 mb-4 flex-1 leading-(--line-height-normal) font-body'>
                      {t(product.descriptionKey)}
                    </p>

                    {product.price && (
                      <p className='text-(--brand-accent) text-(length:--text-body) font-bold mb-4'>
                        {product.price}
                      </p>
                    )}

                    {product.link && (
                      <a
                        href={product.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-(--accent-chrome) hover:text-(--accent-chrome)/80 text-(length:--text-sm) font-medium transition-colors duration-200 ease-out'
                      >
                        {t('aftercare.products.learnMore')}
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Warning Signs Section */}
        <Section variant='default' spacing='normal' className='bg-red-500/10'>
          <Container size='narrow'>
            <div className='bg-red-500/20 border-2 border-red-500 rounded-xl p-8'>
              <h2 className='font-headline text-(length:--text-h2) text-red-400 mb-8 flex items-center gap-0'>
                <AlertTriangle size={36} />
                {t(WARNING_SIGNS.titleKey)}
              </h2>

              <p className='text-luxury-text-inverse mb-8 text-(length:--text-lg) leading-(--line-height-normal) font-body'>
                {t(WARNING_SIGNS.descriptionKey)}
              </p>

              <ul className='space-y-0 mb-8'>
                {WARNING_SIGNS.signKeys.map((signKey, index) => (
                  <li
                    key={index}
                    className='flex items-start gap-0 text-(length:--text-body) text-luxury-text-inverse leading-(--line-height-normal) font-body'
                  >
                    <span className='text-red-400 shrink-0 mt-0'>⚠️</span>
                    <span>{t(signKey)}</span>
                  </li>
                ))}
              </ul>

              <div className='bg-luxury-bg-dark/30 rounded-lg p-8 border border-red-400/30'>
                <p className='text-(--brand-accent) text-(length:--text-body) font-bold mb-0 flex items-center gap-0'>
                  <Phone size={20} />
                  {t('aftercare.warningSigns.emergencyLabel')}
                </p>
                <a
                  href='tel:+4989269313'
                  className='text-luxury-text-inverse text-(length:--text-h3) font-bold hover:text-(--brand-accent-hover) transition-colors duration-200 ease-out block'
                >
                  +49 (0) 89 269 313
                </a>
                <p className='text-luxury-text-inverse/60 text-(length:--text-sm) mt-0'>
                  {t('aftercare.warningSigns.hours')}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            <SectionHeading
              eyebrow={t('aftercare.cta.eyebrow')}
              title={t('aftercare.cta.title')}
              subtitle={t('aftercare.cta.subtitle')}
            />
            <div className='flex flex-col md:flex-row gap-8 justify-center'>
              <a
                href={localizePath('/contact', language)}
                className='inline-flex items-center justify-center px-8 py-8 bg-(--accent-chrome) hover:bg-(--accent-chrome)/80 text-luxury-text-primary font-semibold text-(length:--text-lg) rounded-xl transition-all duration-200 min-w-50'
              >
                {t('aftercare.cta.contact')}
              </a>
              <a
                href={localizePath('/booking', language)}
                className='inline-flex items-center justify-center gap-8 px-8 py-8 border-2 border-(--brand-accent) text-(--brand-accent) hover:bg-(--brand-accent) hover:text-luxury-text-primary font-semibold text-(length:--text-lg) rounded-xl transition-all duration-200 min-w-50'
              >
                <Calendar size={20} />
                {t('aftercare.cta.booking')}
              </a>
            </div>
          </Container>
        </Section>

        <Footer />
      </div>
    </>
  );
};

export default AftercarePage;
