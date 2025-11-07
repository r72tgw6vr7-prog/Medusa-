// ============================================
// PAGE: FAQPageNew - Luxury Glassmorphic FAQ
// ============================================
// Inspired by top salons: Glossier, Bang Bang Tattoo, Sang Bleu, Drybar, Heyday
// Features: Glassmorphic cards, gold accents, Playfair/Inter fonts, responsive grid

import React, { useState } from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';

const FAQ_SECTIONS = [
  {
    title: 'Buchung & Termine',
    questions: [
      {
        q: 'Wie buche ich einen Termin?',
        a: 'Sie können direkt über unsere Online-Buchung einen Termin wählen oder uns telefonisch kontaktieren. Wir empfehlen die Online-Buchung für eine schnelle und bequeme Planung.',
      },
      {
        q: 'Kann ich meinen Termin verschieben?',
        a: 'Ja, Sie können Ihren Termin bis zu 24 Stunden vorher kostenlos verschieben. Kontaktieren Sie uns einfach per E-Mail oder Telefon.',
      },
      {
        q: 'Brauche ich eine Anzahlung?',
        a: 'Für exklusive und längere Sitzungen bitten wir um eine kleine Anzahlung, die bei der Buchung angezeigt wird.',
      },
    ],
  },
  {
    title: 'Preise & Bezahlung',
    questions: [
      {
        q: 'Wie werden die Preise berechnet?',
        a: 'Unsere Preise richten sich nach Aufwand, Größe und Stil des Tattoos oder Piercings. Sie erhalten vorab eine transparente Preisauskunft.',
      },
      {
        q: 'Welche Zahlungsmethoden akzeptieren Sie?',
        a: 'Wir akzeptieren Bargeld, EC-Karte, Kreditkarte und Apple Pay.',
      },
    ],
  },
  {
    title: 'Hygiene & Sicherheit',
    questions: [
      {
        q: 'Wie garantieren Sie Hygiene?',
        a: 'Unser Studio ist EU-REACH zertifiziert und arbeitet ausschließlich mit sterilen Einwegmaterialien. Unsere Künstler sind regelmäßig geschult.',
      },
      {
        q: 'Sind die Farben sicher?',
        a: 'Wir verwenden ausschließlich geprüfte, vegane Farben nach EU-REACH Standard.',
      },
    ],
  },
  {
    title: 'Künstler & Stilrichtungen',
    questions: [
      {
        q: 'Kann ich meinen Künstler wählen?',
        a: 'Ja, Sie können Ihren Wunschkünstler bei der Buchung auswählen. Unsere Profile helfen Ihnen bei der Entscheidung.',
      },
      {
        q: 'Welche Stilrichtungen bieten Sie an?',
        a: 'Von Realismus über Watercolor bis zu Geometrie und Old School – unser Team deckt alle modernen und klassischen Stile ab.',
      },
    ],
  },
  {
    title: 'Nachsorge & Pflege',
    questions: [
      {
        q: 'Wie pflege ich mein neues Tattoo?',
        a: 'Sie erhalten von uns ein Nachsorge-Kit und eine ausführliche Beratung. Unsere Pflegeprodukte sind speziell für Tattoos und Piercings entwickelt.',
      },
      {
        q: 'Was tun bei Problemen?',
        a: 'Kontaktieren Sie uns jederzeit – wir sind für Sie da und helfen bei allen Fragen zur Heilung und Pflege.',
      },
    ],
  },
  {
    title: 'Standort & Anfahrt',
    questions: [
      {
        q: 'Wie erreiche ich das Studio?',
        a: 'Unser Studio liegt zentral in München, nur 5 Minuten von U/S-Bahn entfernt. Alle Infos zur Anfahrt finden Sie auf unserer Kontaktseite.',
      },
    ],
  },
];

export function FAQPageNew() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <div className='min-h-screen text-white flex flex-col relative z-10'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section className='section-padding'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px] space-y-16'>
              {/* Unified heading section applied: matches ServicesPageInteractive styling */}
              <div className='text-center'>
                <h1 className='typo-h1 text-[var(--brand-gold)]'>Häufige Fragen (FAQ)</h1>
                <p className='typo-subtitle text-[#C0C0C0]'>
                  Alles, was Sie zur Buchung, Pflege und zu unseren Künstlern wissen müssen.
                </p>
              </div>

              <div className='space-y-8'>
                {FAQ_SECTIONS.map((section, idx) => {
                  const isOpen = openSection === idx;
                  return (
                    <div
                      key={section.title}
                      className='rounded-3xl border border-[#C0C0C0]/25 bg-[rgba(34,34,34,0.85)] backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-300'
                    >
                      <button
                        className='w-full px-8 py-8 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--deep-black)]'
                        onClick={() => setOpenSection(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className='font-headline text-2xl md:text-3xl text-[var(--brand-gold)]'>
                          {section.title}
                        </span>
                        <span
                          className={`ml-4 text-[var(--brand-gold)] transition-transform duration-300 ${
                            isOpen ? 'rotate-90' : ''
                          }`}
                        >
                          ▶
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-[800px]' : 'max-h-0'
                        }`}
                        aria-hidden={!isOpen}
                      >
                        <div className='px-8 pb-8 space-y-8 border-t border-[#C0C0C0]/20'>
                          {section.questions.map((q) => (
                            <div key={q.q} className='space-y-8'>
                              <h3 className='font-headline text-xl md:text-2xl text-[var(--brand-gold)]'>
                                {q.q}
                              </h3>
                              <p className='font-body text-base md:text-lg text-white/85 leading-relaxed'>
                                {q.a}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FAQPageNew;
