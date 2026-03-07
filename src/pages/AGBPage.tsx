import React from 'react';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { SectionHeading } from '@/components/SectionHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { useLanguage } from '@/contexts/LanguageContext';

export const AGBPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className='min-h-screen flex flex-col relative bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
      <MainNavigation />

      <main className='flex-1'>
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            <h1 className='sr-only'>{t('common.meta.agb.title')}</h1>
            {/* Page Header - Standardized */}
            <SectionHeading
              eyebrow='Medusa München'
              title={t('common.meta.agb.title')}
              subtitle={t('common.agbPage.subtitle')}
            />

            <section className='space-y-8 text-luxury-text-inverse/70'>
              <p>{t('common.agbPage.intro')}</p>

              <h2 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                § 1 Geltungsbereich
              </h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Dienstleistungen
                von Medusa Tattoo München.
              </p>

              <h2 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                § 2 Termine & Zahlungen
              </h2>
              <p>
                Termine sind verbindlich. Anzahlungen werden auf den Endpreis angerechnet. Preise
                verstehen sich inkl. MwSt.
              </p>

              <h2 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                § 3 Haftung & Nachsorge
              </h2>
              <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) leading-(--line-height-normal)'>
                Es gelten die in der Nachsorge beschriebenen Hinweise. Eine Haftung für Missachtung
                der Pflegehinweise ist ausgeschlossen.
              </p>

              <h2 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                {t('common.agbPage.sections.payment.title')}
              </h2>
              <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) leading-(--line-height-normal)'>
                {t('common.agbPage.sections.payment.body')}
              </p>

              <h2 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                {t('common.agbPage.sections.cancellation.title')}
              </h2>
              <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) leading-(--line-height-normal)'>
                {t('common.agbPage.sections.cancellation.body')}
              </p>

              <h2 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                {t('common.agbPage.sections.design.title')}
              </h2>
              <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) leading-(--line-height-normal)'>
                {t('common.agbPage.sections.design.body')}
              </p>

              <h2 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                {t('common.agbPage.sections.health.title')}
              </h2>
              <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) leading-(--line-height-normal)'>
                {t('common.agbPage.sections.health.body')}
              </p>

              <h2 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                {t('common.agbPage.sections.dispute.title')}
              </h2>
              <p className='font-body text-(length:--text-body) lg:text-(length:--text-sm) leading-(--line-height-normal)'>
                {t('common.agbPage.sections.dispute.body')}
              </p>

              <p
                className='font-body text-(length:--text-xs) md:text-(length:--text-sm) uppercase tracking-widest text-brand-chrome/80 font-semibold mb-6'
                style={{ textShadow: '0 0 12px var(--chrome-glow-soft)' }}
              >
                {t('common.agbPage.status')}
              </p>
            </section>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default AGBPage;
