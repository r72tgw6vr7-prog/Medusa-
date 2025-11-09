import React from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageHeader } from '../components/ui/PageHeader';

export const AGBPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section className='section-padding relative z-10'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px]'>
              {/* Page Header - Standardized */}
              <PageHeader
                eyebrow='Medusa München'
                title='Allgemeine Geschäftsbedingungen'
                subtitle='Gültig bis zur Veröffentlichung der finalen Fassung'
                alignment='center'
              />

              <section className='space-y-8 text-white/70'>
                <p>
                  Hinweis: Dies ist eine vorläufige AGB-Seite, um Navigationsfehler (404) zu
                  vermeiden. Die verbindliche, vollständige Version der AGB wird hier in Kürze
                  veröffentlicht.
                </p>

                <h2 className='font-headline text-2xl text-(--brand-gold)'>§ 1 Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Dienstleistungen
                  von Medusa Tattoo München.
                </p>

                <h2 className='font-headline text-2xl text-(--brand-gold)'>
                  § 2 Termine & Zahlungen
                </h2>
                <p>
                  Termine sind verbindlich. Anzahlungen werden auf den Endpreis angerechnet. Preise
                  verstehen sich inkl. MwSt.
                </p>

                <h2 className='font-headline text-2xl text-(--brand-gold)'>
                  § 3 Haftung & Nachsorge
                </h2>
                <p>
                  Es gelten die in der Nachsorge beschriebenen Hinweise. Eine Haftung für
                  Missachtung der Pflegehinweise ist ausgeschlossen.
                </p>

                <p className='text-white/60 text-sm'>Stand: vorläufige Fassung</p>
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
