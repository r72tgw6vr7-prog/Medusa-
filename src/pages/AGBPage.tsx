import React from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';

export const AGBPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section className='section-padding relative z-10'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px]'>
              {/* Page Header - Matches Services page exactly */}
              <div className='text-center space-y-8 mb-16'>
                <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                  Medusa München
                </p>
                <h1 className='font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]'>
                  Allgemeine Geschäftsbedingungen
                </h1>
                <p className='text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed'>
                  Gültig bis zur Veröffentlichung der finalen Fassung
                </p>
              </div>

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

                <h2 className='font-headline text-2xl text-(--brand-gold)'>§ 2 Termine & Zahlungen</h2>
                <p>
                  Termine sind verbindlich. Anzahlungen werden auf den Endpreis angerechnet. Preise
                  verstehen sich inkl. MwSt.
                </p>

                <h2 className='font-headline text-2xl text-(--brand-gold)'>§ 3 Haftung & Nachsorge</h2>
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
