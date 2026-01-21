import React from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { SectionHeading } from '../components/SectionHeading';

export const AGBPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col relative bg-luxury-bg-dark'>
      <MainNavigation />

      <main className='flex-1'>
        <section className='section-padding relative z-10'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-container-main'>
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
                <p>
                  Es gelten die in der Nachsorge beschriebenen Hinweise. Eine Haftung für
                  Missachtung der Pflegehinweise ist ausgeschlossen.
                </p>

                <p className='text-luxury-text-inverse/60 text-sm'>Stand: vorläufige Fassung</p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AGBPage;
