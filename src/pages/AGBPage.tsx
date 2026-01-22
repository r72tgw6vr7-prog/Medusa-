import React from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { SectionHeading } from '../components/SectionHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';

export const AGBPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col relative bg-luxury-bg-dark'>
      <MainNavigation />

      <main className='flex-1'>
        <Section variant="default" spacing="normal">
          <Container size="default">
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

                <h2 className='font-headline text-2xl text-brand-chrome'>§ 1 Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Dienstleistungen
                  von Medusa Tattoo München.
                </p>

                <h2 className='font-headline text-2xl text-brand-chrome'>
                  § 2 Termine & Zahlungen
                </h2>
                <p>
                  Termine sind verbindlich. Anzahlungen werden auf den Endpreis angerechnet. Preise
                  verstehen sich inkl. MwSt.
                </p>

                <h2 className='font-headline text-2xl text-brand-chrome'>
                  § 3 Haftung & Nachsorge
                </h2>
                <p className='text-base lg:text-sm'>
                  Es gelten die in der Nachsorge beschriebenen Hinweise. Eine Haftung für
                  Missachtung der Pflegehinweise ist ausgeschlossen.
                </p>

                <p className='text-xs md:text-sm uppercase tracking-widest text-luxury-text-inverse/60 mb-6'>Stand: vorläufige Fassung</p>
              </section>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default AGBPage;
