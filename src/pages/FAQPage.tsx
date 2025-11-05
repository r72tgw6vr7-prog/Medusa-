import { useState } from 'react';
import { ChevronDown, MessageCircle, Globe } from 'lucide-react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';
import { PageTitle } from '../components/atoms/PageTitle';
import { PageBackground } from '../components/atoms/PageBackground';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface _FAQSection {
  id: string;
  title: string;
  items: FAQItem[];
}

interface FAQPageProps {
  language?: 'DE' | 'EN';
  onLanguageChange?: (lang: 'DE' | 'EN') => void;
}

export function FAQPage({ language = 'DE', onLanguageChange }: FAQPageProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const content = {
    DE: {
      title: 'FAQ',
      subtitle:
        'Finden Sie Antworten auf die wichtigsten Fragen zu unserem Studio, Services und Buchungen.',
      stillNeedHelp: 'Brauchen Sie noch Hilfe?',
      contactWhatsApp: 'WhatsApp Chat Starten',
      sections: [
        {
          id: 'booking',
          title: 'Buchungen & Termine',
          items: [
            {
              id: 'booking-1',
              question: 'Wie kann ich einen Termin buchen?',
              answer:
                'Sie können **online über unsere Website** buchen oder uns direkt **per WhatsApp** kontaktieren. Für Custom Tattoos empfehlen wir immer **ein kostenloses Beratungsgespräch** im Vorfeld. **Mindestens 48 Stunden Vorlaufzeit** sind erforderlich.',
            },
            {
              id: 'booking-2',
              question: 'Kann ich meinen Termin stornieren oder verschieben?',
              answer:
                '**Bis 24 Stunden vor dem Termin** ist eine kostenlose Stornierung möglich. Bei **kurzfristigeren Absagen** berechnen wir eine **Ausfallpauschale von 50€**. Termine können **bis zu 2 Mal verschoben** werden.',
            },
            {
              id: 'booking-3',
              question: 'Brauche ich eine Anzahlung?',
              answer:
                'Ja, für alle Termine über **2 Stunden** ist eine **Anzahlung von 100€** erforderlich. Diese wird bei Ihrem Termin **vollständig angerechnet**. Die Anzahlung erfolgt **online per Kreditkarte** oder **vor Ort in bar**.',
            },
          ],
        },
        {
          id: 'aftercare',
          title: 'Nachpflege & Heilung',
          items: [
            {
              id: 'aftercare-1',
              question: 'Wie pflege ich mein frisches Tattoo?',
              answer:
                '**Erste 2-3 Stunden**: Folie drauf lassen. **Tag 1-3**: 2x täglich mit **antibakterieller Seife** waschen und dünn **Bepanthen** auftragen. **Tag 4-14**: **Feuchtigkeitslotion ohne Parfum** verwenden. **Keine Bäder, Sauna oder Schwimmbad** für 2 Wochen.',
            },
            {
              id: 'aftercare-2',
              question: 'Wann ist mein Tattoo vollständig geheilt?',
              answer:
                'Die **oberflächliche Heilung** dauert **10-14 Tage**. Die **komplette Heilung** in tieferen Hautschichten benötigt **4-6 Wochen**. **Juckreiz und Schuppenbildung** sind normal. **Nicht kratzen oder rubbeln**!',
            },
          ],
        },
        {
          id: 'payment',
          title: 'Preise & Bezahlung',
          items: [
            {
              id: 'payment-1',
              question: 'Was kostet ein Tattoo?',
              answer:
                '**Mindestpreis**: 80€ für kleine Tattoos. **Stundensatz**: 120-180€ je nach Künstler und Komplexität. **Flat-Rate** für größere Projekte möglich. **Kostenlose Beratung** mit **transparenter Preisgestaltung** im Vorfeld.',
            },
            {
              id: 'payment-2',
              question: 'Welche Zahlungsmethoden akzeptieren Sie?',
              answer:
                'Wir akzeptieren **Bargeld, EC-Karte, Kreditkarte** und **PayPal**. **Ratenzahlung** ist bei Tattoos über **500€** möglich. **Trinkgeld** ist freiwillig, aber **sehr geschätzt**.',
            },
          ],
        },
      ],
    },
    EN: {
      title: 'FAQ',
      subtitle:
        'Find answers to the most important questions about our studio, services, and bookings.',
      stillNeedHelp: 'Still Need Help?',
      contactWhatsApp: 'Start WhatsApp Chat',
      sections: [
        {
          id: 'booking',
          title: 'Bookings & Appointments',
          items: [
            {
              id: 'booking-1',
              question: 'How can I book an appointment?',
              answer:
                'You can book **online through our website** or contact us directly **via WhatsApp**. For custom tattoos, we always recommend **a free consultation** beforehand. **At least 48 hours notice** is required.',
            },
            {
              id: 'booking-2',
              question: 'Can I cancel or reschedule my appointment?',
              answer:
                '**Up to 24 hours before the appointment**, cancellation is free. For **short-notice cancellations**, we charge **a cancellation fee of €50**. Appointments can be **rescheduled up to 2 times**.',
            },
            {
              id: 'booking-3',
              question: 'Do I need to pay a deposit?',
              answer:
                'Yes, for all appointments over **2 hours**, **a €100 deposit** is required. This will be **fully credited** at your appointment. Payment can be made **online by credit card** or **in cash on-site**.',
            },
          ],
        },
        {
          id: 'aftercare',
          title: 'Aftercare & Healing',
          items: [
            {
              id: 'aftercare-1',
              question: 'How do I care for my fresh tattoo?',
              answer:
                '**First 2-3 hours**: Keep the film on. **Day 1-3**: Wash 2x daily with **antibacterial soap** and apply **Bepanthen** thinly. **Day 4-14**: Use **fragrance-free moisturizer**. **No baths, sauna, or swimming** for 2 weeks.',
            },
            {
              id: 'aftercare-2',
              question: 'When is my tattoo fully healed?',
              answer:
                "**Surface healing** takes **10-14 days**. **Complete healing** in deeper skin layers requires **4-6 weeks**. **Itching and peeling** are normal. **Don't scratch or rub**!",
            },
          ],
        },
        {
          id: 'payment',
          title: 'Pricing & Payment',
          items: [
            {
              id: 'payment-1',
              question: 'How much does a tattoo cost?',
              answer:
                '**Minimum price**: €80 for small tattoos. **Hourly rate**: €120-180 depending on artist and complexity. **Flat rate** possible for larger projects. **Free consultation** with **transparent pricing** upfront.',
            },
            {
              id: 'payment-2',
              question: 'What payment methods do you accept?',
              answer:
                'We accept **cash, debit card, credit card**, and **PayPal**. **Payment plans** available for tattoos over **€500**. **Tips** are voluntary but **greatly appreciated**.',
            },
          ],
        },
      ],
    },
  };

  const t = content[language];

  return (
    <PageBackground>
      <div className='text-white flex flex-col'>
        <MainNavigation />
        <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

        <main className='flex-1'>
          {/* Unified heading section applied: matches ServicesPageInteractive styling */}
          <section className='section-padding bg-deep-black'>
            <div className='responsive-container safe-area-padding'>
              <div className='text-center'>
                <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 text-[var(--brand-gold)]'>
                  {t.title}
                </h1>
                <p className='text-lg text-[#C0C0C0] max-w-2xl mx-auto'>{t.subtitle}</p>
              </div>
            </div>
          </section>

          {/* FAQ Sections */}
          <section className='section-padding bg-deep-black'>
            <div className='responsive-container safe-area-padding'>
              <div className='mx-auto w-full max-w-4xl space-y-16'>
                {t.sections.map((section) => (
                  <div key={section.id} className='space-y-8'>
                    <h2 className='text-antique-gold text-3xl md:text-4xl font-headline text-center'>
                      {section.title}
                    </h2>

                    <div className='space-y-8'>
                      {section.items.map((item) => {
                        const isOpen = openItems.has(item.id);

                        return (
                          <div
                            key={item.id}
                            className={`bg-deep-black border rounded-2xl overflow-hidden transition-all duration-300 ${
                              isOpen
                                ? 'border-antique-gold shadow-gold-glow'
                                : 'border-chrome-silver/20 hover:border-antique-gold/40'
                            }`}
                          >
                            <button
                              onClick={() => toggleItem(item.id)}
                              className='w-full px-8 py-8 text-left flex items-center justify-between gap-8 focus:outline-none focus:ring-2 focus:ring-antique-gold focus:ring-offset-2 focus:ring-offset-deep-black'
                              aria-expanded={isOpen}
                              aria-controls={`answer-${item.id}`}
                            >
                              <h3 className='text-antique-gold text-xl md:text-2xl font-headline flex-1'>
                                {item.question}
                              </h3>
                              <ChevronDown
                                size={24}
                                className={`text-antique-gold transition-transform duration-300 shrink-0 ${
                                  isOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                              />
                            </button>

                            <div
                              id={`answer-${item.id}`}
                              className={`overflow-hidden transition-all duration-300 ${
                                isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                              }`}
                              aria-hidden={!isOpen}
                            >
                              <div className='px-8 pb-8 pt-0'>
                                <div className='border-t border-chrome-silver/20 mb-8' />
                                <div
                                  className='text-base md:text-lg text-stone-grey font-body leading-relaxed'
                                  dangerouslySetInnerHTML={{
                                    __html: item.answer.replace(
                                      /\*\*(.*?)\*\*/g,
                                      '<strong class="text-antique-gold font-medium">$1</strong>',
                                    ),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Still Need Help Section */}
          <section className='section-padding bg-black/90 border-t border-antique-gold/10'>
            <div className='responsive-container safe-area-padding'>
              <div className='mx-auto w-full max-w-4xl text-center space-y-8'>
                <h2 className='text-antique-gold text-3xl md:text-4xl font-headline'>
                  {t.stillNeedHelp}
                </h2>
                <p className='text-stone-grey text-base md:text-lg font-body leading-relaxed'>
                  {language === 'DE'
                    ? 'Unser Team ist bereit, Ihnen persönlich zu helfen. Starten Sie einen WhatsApp-Chat für sofortige Unterstützung.'
                    : 'Our team is ready to help you personally. Start a WhatsApp chat for immediate support.'}
                </p>

                <div className='flex flex-col sm:flex-row items-center justify-center gap-8'>
                  <a
                    href='https://wa.me/491234567890'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex min-h-[48px] items-center gap-8 bg-antique-gold text-deep-black px-8 py-8 rounded-xl font-semibold hover:bg-antique-gold-hover hover:shadow-gold-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-antique-gold focus:ring-offset-2 focus:ring-offset-black'
                  >
                    <MessageCircle size={20} />
                    {t.contactWhatsApp}
                  </a>

                  <div className='flex items-center gap-8'>
                    <Globe size={18} className='text-antique-gold' />
                    <button
                      onClick={() => onLanguageChange?.('DE')}
                      className={`px-4 py-2 rounded transition-colors duration-300 border ${
                        language === 'DE'
                          ? 'text-antique-gold border-antique-gold'
                          : 'text-stone-grey border-chrome-silver/20 hover:text-base-white hover:border-antique-gold/40'
                      }`}
                    >
                      Deutsch
                    </button>
                    <button
                      onClick={() => onLanguageChange?.('EN')}
                      className={`px-4 py-2 rounded transition-colors duration-300 border ${
                        language === 'EN'
                          ? 'text-antique-gold border-antique-gold'
                          : 'text-stone-grey border-chrome-silver/20 hover:text-base-white hover:border-antique-gold/40'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageBackground>
  );
}

export default FAQPage;
