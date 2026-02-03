// ============================================
// PAGE: FAQPageNew - Luxury Glassmorphic FAQ
// ============================================
// Inspired by top salons: Glossier, Bang Bang Tattoo, Sang Bleu, Drybar, Heyday
// Features: Glassmorphic cards, gold accents, Playfair/Inter fonts, responsive grid

import React, { useMemo, useState } from 'react';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/ui/Card';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { useLanguage } from '@/contexts/LanguageContext';

export function FAQPageNew() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqSections = useMemo(
    () => [
      {
        title: t('faqPage.sections.booking.title'),
        questions: [
          {
            q: t('faqPage.sections.booking.questions.howToBook.question'),
            a: t('faqPage.sections.booking.questions.howToBook.answer'),
          },
          {
            q: t('faqPage.sections.booking.questions.reschedule.question'),
            a: t('faqPage.sections.booking.questions.reschedule.answer'),
          },
          {
            q: t('faqPage.sections.booking.questions.deposit.question'),
            a: t('faqPage.sections.booking.questions.deposit.answer'),
          },
        ],
      },
      {
        title: t('faqPage.sections.pricing.title'),
        questions: [
          {
            q: t('faqPage.sections.pricing.questions.pricing.question'),
            a: t('faqPage.sections.pricing.questions.pricing.answer'),
          },
          {
            q: t('faqPage.sections.pricing.questions.paymentMethods.question'),
            a: t('faqPage.sections.pricing.questions.paymentMethods.answer'),
          },
        ],
      },
      {
        title: t('faqPage.sections.hygiene.title'),
        questions: [
          {
            q: t('faqPage.sections.hygiene.questions.hygiene.question'),
            a: t('faqPage.sections.hygiene.questions.hygiene.answer'),
          },
          {
            q: t('faqPage.sections.hygiene.questions.inkSafety.question'),
            a: t('faqPage.sections.hygiene.questions.inkSafety.answer'),
          },
        ],
      },
      {
        title: t('faqPage.sections.artists.title'),
        questions: [
          {
            q: t('faqPage.sections.artists.questions.chooseArtist.question'),
            a: t('faqPage.sections.artists.questions.chooseArtist.answer'),
          },
          {
            q: t('faqPage.sections.artists.questions.styles.question'),
            a: t('faqPage.sections.artists.questions.styles.answer'),
          },
        ],
      },
      {
        title: t('faqPage.sections.aftercare.title'),
        questions: [
          {
            q: t('faqPage.sections.aftercare.questions.care.question'),
            a: t('faqPage.sections.aftercare.questions.care.answer'),
          },
          {
            q: t('faqPage.sections.aftercare.questions.problems.question'),
            a: t('faqPage.sections.aftercare.questions.problems.answer'),
          },
        ],
      },
      {
        title: t('faqPage.sections.location.title'),
        questions: [
          {
            q: t('faqPage.sections.location.questions.directions.question'),
            a: t('faqPage.sections.location.questions.directions.answer'),
          },
        ],
      },
    ],
    [t],
  );

  return (
    <div className='min-h-screen text-luxury-text-inverse flex flex-col relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
      <MainNavigation />

      <main className='flex-1'>
        <Section variant='default' spacing='normal'>
          <Container size='default'>
            <div className='space-y-16'>
              {/* Page Header - Matches Services page exactly */}
              <SectionHeading
                eyebrow={t('faqPage.eyebrow')}
                title={t('faqPage.title')}
                subtitle={t('faqPage.subtitle')}
              />

              <div className='space-y-8'>
                {faqSections.map((section, idx) => {
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
