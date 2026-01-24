import React from 'react';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { SectionHeading } from '@/components/SectionHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';

export const AGBPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col relative bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
      <MainNavigation />

      <main className='flex-1'>
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            {/* Page Header - Standardized */}
            <SectionHeading
              eyebrow='Medusa München'
              title='Allgemeine Geschäftsbedingungen'
              subtitle='Gültig bis zur Veröffentlichung der finalen Fassung'
            />

            <section className='space-y-8 text-luxury-text-inverse/70'>
              <p>
                Hinweis: Dies ist eine vorläufige AGB-Seite, um Navigationsfehler (404) zu
                vermeiden. Die verbindliche, vollständige Version der AGB wird hier in Kürze
                veröffentlicht.
              </p>

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

              <p
                className='font-body text-(length:--text-xs) md:text-(length:--text-sm) uppercase tracking-widest text-brand-chrome/80 font-semibold mb-6'
                style={{ textShadow: '0 0 12px var(--chrome-glow-soft)' }}
              >
                Stand: vorläufige Fassung
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
