import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { SectionHeading } from '@/components/SectionHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import LocalizedMeta from '@/components/LocalizedMeta';

export const ImpressumPage: React.FC = () => {
  const { t, language } = useLanguage();
  const isGerman = language === 'de';

  return (
    <>
      <LocalizedMeta titleKey='meta.impressum.title' descriptionKey='meta.impressum.description' />
      <div className='min-h-screen bg-luxury-bg-dark text-luxury-text-inverse flex flex-col relative lg:pt-16 md:pt-24 max-md:pt-32'>
        <MainNavigation />

        <main className='flex-1'>
          <Section variant='default' spacing='normal'>
            <Container size='default'>
              <h1 className='sr-only'>{t('common.impressumPage.title')}</h1>
              {/* Page Header */}
              <SectionHeading
                eyebrow={t('common.impressumPage.eyebrow')}
                title={t('common.impressumPage.title')}
                subtitle={t('common.impressumPage.subtitle')}
              />

              <div className='reading-measure space-y-16'>
                {/* TMG Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.tmg.title')}
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p className='font-semibold'>
                      {t('common.impressumPage.sections.tmg.company')}
                    </p>
                    <p>{t('common.impressumPage.sections.tmg.tradeName')}</p>
                    <p className='pb-2'>&nbsp;</p>
                    <p>{t('common.impressumPage.sections.tmg.studioAddressLabel')}</p>
                    <p>{t('common.impressumPage.sections.tmg.studioAddress')}</p>
                    <p className='pb-2'>&nbsp;</p>
                    <p>{t('common.impressumPage.sections.tmg.registeredOfficeLabel')}</p>
                    <p>{t('common.impressumPage.sections.tmg.registeredAddress')}</p>
                  </div>
                </section>

                {/* Contact Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.contact.title')}
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p>
                      {t('common.impressumPage.sections.contact.phoneMunichLabel')}{' '}
                      {t('common.impressumPage.sections.contact.phoneMunich')}
                    </p>
                    <p>
                      {t('common.impressumPage.sections.contact.phoneIngolstadtLabel')}{' '}
                      {t('common.impressumPage.sections.contact.phoneIngolstadt')}
                    </p>
                    <p className='pb-2'>&nbsp;</p>
                    <p>
                      {t('common.impressumPage.sections.contact.emailLabel')}{' '}
                      {t('common.impressumPage.sections.contact.email')}
                    </p>
                    <p>
                      {t('common.impressumPage.sections.contact.websiteLabel')}{' '}
                      {t('common.impressumPage.sections.contact.website')}
                    </p>
                    <p className='pb-2'>&nbsp;</p>
                    <p>
                      {t('common.impressumPage.sections.contact.contactPersonLabel')}{' '}
                      {t('common.impressumPage.sections.contact.contactPerson')}
                    </p>
                    <p>
                      {t('common.impressumPage.sections.contact.emailLabel')}{' '}
                      {t('common.impressumPage.sections.contact.email')}
                    </p>
                  </div>
                </section>

                {/* Registration Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.registration.title')}
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p>
                      {t('common.impressumPage.sections.registration.regNumberLabel')}{' '}
                      {t('common.impressumPage.sections.registration.regNumber')}
                    </p>
                    <p>
                      {t('common.impressumPage.sections.registration.vatLabel')}{' '}
                      {t('common.impressumPage.sections.registration.vatNumber')}
                    </p>
                    <p>
                      {t('common.impressumPage.sections.registration.responsibleLabel')}{' '}
                      {t('common.impressumPage.sections.registration.responsible')}
                    </p>
                    <p className='font-body text-(length:--text-xs) md:text-(length:--text-sm) text-luxury-text-inverse/60'>
                      {t('common.impressumPage.sections.registration.court')}
                    </p>
                  </div>
                </section>

                {/* Content Responsibility Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.contentResponsibility.title')}
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p>{t('common.impressumPage.sections.contentResponsibility.person')}</p>
                    <p>{t('common.impressumPage.sections.contentResponsibility.company')}</p>
                    <p>{t('common.impressumPage.sections.contentResponsibility.address')}</p>
                  </div>
                </section>

                {/* Professional Insurance Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.professionalInsurance.title')}
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p>
                      {t('common.impressumPage.sections.professionalInsurance.insurerLabel')}{' '}
                      {t('common.impressumPage.sections.professionalInsurance.insurerPlaceholder')}
                    </p>
                    <p>
                      {t('common.impressumPage.sections.professionalInsurance.coverageAreaLabel')}{' '}
                      {t('common.impressumPage.sections.professionalInsurance.coverageArea')}
                    </p>
                    <p>
                      {t('common.impressumPage.sections.professionalInsurance.coverageAmountLabel')}{' '}
                      {t(
                        'common.impressumPage.sections.professionalInsurance.coverageAmountPlaceholder',
                      )}
                    </p>
                  </div>
                </section>

                {/* Dispute Resolution Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.disputeResolution.title')}
                  </h2>
                  <p className='text-brand-white/85'>
                    {t('common.impressumPage.sections.disputeResolution.intro')}
                  </p>
                  <a
                    href={t('common.impressumPage.sections.disputeResolution.link')}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex text-brand-accent hover:text-brand-accent/80 underline transition-colors duration-200 ease-out'
                  >
                    {t('common.impressumPage.sections.disputeResolution.link')}
                  </a>
                  <p className='font-body text-(length:--text-xs) md:text-(length:--text-sm) text-luxury-text-inverse/60'>
                    {t('common.impressumPage.sections.disputeResolution.notice')}
                  </p>
                </section>

                {/* Content Liability Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.contentLiability.title')}
                  </h2>
                  <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) text-luxury-text-inverse/80 leading-(--line-height-normal)'>
                    {t('common.impressumPage.sections.contentLiability.text')}
                  </p>
                </section>

                {/* Link Liability Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.linkLiability.title')}
                  </h2>
                  <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) text-luxury-text-inverse/80 leading-(--line-height-normal)'>
                    {t('common.impressumPage.sections.linkLiability.text')}
                  </p>
                </section>

                {/* Copyright Section */}
                <section className='space-y-8'>
                  <h2 className='font-headline text-(length:--text-h4) font-semibold text-brand-accent'>
                    {t('common.impressumPage.sections.copyright.title')}
                  </h2>
                  <p className='font-semibold text-brand-white/90'>
                    {t('common.impressumPage.sections.copyright.text')}
                  </p>
                  <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) text-luxury-text-inverse/80 leading-(--line-height-normal)'>
                    {isGerman
                      ? t('common.impressumPage.sections.copyrightNotice.paragraph1')
                      : t('common.impressumPage.sections.copyrightNotice.paragraph1')}
                  </p>
                  <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) text-luxury-text-inverse/80 leading-(--line-height-normal)'>
                    {isGerman
                      ? t('common.impressumPage.sections.copyrightNotice.paragraph2')
                      : t('common.impressumPage.sections.copyrightNotice.paragraph2')}
                  </p>
                </section>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImpressumPage;
