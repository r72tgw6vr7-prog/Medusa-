import React from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';

export const AGBPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-texture flex flex-col'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section className='section-padding'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px]'>
              {/* Unified heading section applied: matches ServicesPageInteractive styling */}
              <div className='text-center mb-16'>
                <h1 className='typo-h1 text-[#D4AF37]'>Allgemeine Geschäftsbedingungen</h1>
                <p className='typo-subtitle text-[#C0C0C0]'>
                  Gültig bis zur Veröffentlichung der finalen Fassung
                </p>
              </div>

              <section className='space-y-8 text-white/90'>
                <p>
                  Hinweis: Dies ist eine vorläufige AGB-Seite, um Navigationsfehler (404) zu
                  vermeiden. Die verbindliche, vollständige Version der AGB wird hier in Kürze
                  veröffentlicht.
                </p>

                <h2 className='font-playfair text-2xl text-[#D4AF37]'>§ 1 Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Dienstleistungen
                  von Medusa Tattoo München.
                </p>

                <h2 className='font-playfair text-2xl text-[#D4AF37]'>§ 2 Termine & Zahlungen</h2>
                <p>
                  Termine sind verbindlich. Anzahlungen werden auf den Endpreis angerechnet. Preise
                  verstehen sich inkl. MwSt.
                </p>

                <h2 className='font-playfair text-2xl text-[#D4AF37]'>§ 3 Haftung & Nachsorge</h2>
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
