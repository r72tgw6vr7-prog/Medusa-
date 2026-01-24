// ============================================
// PAGE: FAQPageNew - Luxury Glassmorphic FAQ
// ============================================
// Inspired by top salons: Glossier, Bang Bang Tattoo, Sang Bleu, Drybar, Heyday
// Features: Glassmorphic cards, gold accents, Playfair/Inter fonts, responsive grid

import React, { useState } from 'react';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/ui/Card';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';

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
    <div className='min-h-screen text-luxury-text-inverse flex flex-col relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
      <MainNavigation />

      <main className='flex-1'>
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            <div className='space-y-16'>
              {/* Page Header - Matches Services page exactly */}
              <SectionHeading
                eyebrow='Medusa München'
                title='Häufige Fragen (FAQ)'
                subtitle='Alles, was Sie zur Buchung, Pflege und zu unseren Künstlern wissen müssen.'
              />

              <div className='space-y-8'>
                {FAQ_SECTIONS.map((section, idx) => {
                  const isOpen = openSection === idx;
                  return (
                    <Card key={section.title} variant='default' size='default' asChild>
                      <div>
                        {isOpen ? (
                          <button
                            className='w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-(--accent-chrome) focus:ring-offset-2 focus:ring-offset-(--deep-black)'
                            onClick={() => setOpenSection(null)}
                            aria-expanded='true'
                          >
                            <span className='font-headline text-(length:--text-h3) text-(--color-text-primary)'>
                              {section.title}
                            </span>
                            <span className='ml-4 text-(--accent-chrome) transition-transform duration-300 rotate-90'>
                              ▶
                            </span>
                          </button>
                        ) : (
                          <button
                            className='w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-(--accent-chrome) focus:ring-offset-2 focus:ring-offset-(--deep-black)'
                            onClick={() => setOpenSection(idx)}
                            aria-expanded='false'
                          >
                            <span className='font-headline text-(length:--text-h3) text-(--color-text-primary)'>
                              {section.title}
                            </span>
                            <span className='ml-4 text-(--accent-chrome) transition-transform duration-300'>
                              ▶
                            </span>
                          </button>
                        )}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'max-h-screen' : 'max-h-0'
                          }`}
                          aria-hidden={!isOpen}
                        >
                          <div className='pt-8 space-y-8 border-t border-brand-chrome/20'>
                            {section.questions.map((q) => (
                              <div key={q.q} className='space-y-8'>
                                <h3 className='font-headline text-(length:--text-h4) text-(--color-text-primary)'>
                                  {q.q}
                                </h3>
                                <p className='font-body text-(length:--text-body) text-luxury-text-inverse/85 leading-(--line-height-normal)'>
                                  {q.a}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

export default FAQPageNew;
