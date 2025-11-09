import React, { useState, useEffect } from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import Button from '../components/atoms/Button/Button';
import { BookingForm } from '../components/organisms';
import { CheckCircle, Calendar, Users, Sparkles } from 'lucide-react';
// Using universal texture background instead of PageBackground

import type { Service, Artist, BookingFormData } from '../types/booking';

// Sample services data based on design system
const SERVICES: Service[] = [
  {
    id: 'tattoo-custom',
    name: 'Custom Tattoo Design',
    description: 'Individuelle Tattoo-Gestaltung nach Ihren Wünschen',
    duration: 180, // 3 hours
    price: 350,
  },
  {
    id: 'tattoo-small',
    name: 'Small Tattoo',
    description: 'Kleine Tattoos bis 5cm',
    duration: 60,
    price: 120,
  },
  {
    id: 'tattoo-medium',
    name: 'Medium Tattoo',
    description: 'Mittlere Tattoos 5-15cm',
    duration: 120,
    price: 240,
  },
  {
    id: 'tattoo-large',
    name: 'Large Tattoo',
    description: 'Große Tattoos über 15cm',
    duration: 240,
    price: 480,
  },
  {
    id: 'piercing-standard',
    name: 'Standard Piercing',
    description: 'Ohr, Nase, Augenbraue, Lippe',
    duration: 30,
    price: 60,
  },
  {
    id: 'piercing-advanced',
    name: 'Advanced Piercing',
    description: 'Surface, Dermal Anchor, Intim',
    duration: 45,
    price: 100,
  },
  {
    id: 'consultation',
    name: 'Design Consultation',
    description: 'Beratungsgespräch für Ihr Tattoo-Design',
    duration: 45,
    price: 50,
  },
  {
    id: 'coverup',
    name: 'Cover-Up Tattoo',
    description: 'Altes Tattoo überdecken',
    duration: 240,
    price: 450,
  },
];

export const BookingPage: React.FC = () => {
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);

  // Load team data from public directory
  useEffect(() => {
    fetch('/team.json')
      .then((res) => res.json())
      .then((teamData: { team: any[] }) => {
        const artistsList = teamData.team
          .filter((artist) => artist.bookable)
          .map((artist) => ({
            id: artist.id,
            name: artist.name,
            imageUrl: artist.photo,
            specialties: artist.specialties,
            availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          }));
        setArtists(artistsList);
      })
      .catch((error) => {
        console.error('Error loading team data:', error);
        setArtists([]);
      });
  }, []);

  const handleBookingSubmit = async (_data: BookingFormData) => {
    // In production, this would send to backend API
    // console.log('Booking submitted:', _data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setBookingSubmitted(true);
    globalThis.window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='relative z-10'>
      <div className='text-white'>
        <MainNavigation />
        <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

        {/* Page Header - Matches Services page exactly */}
        <section className='section-padding-lg relative z-10 pb-8 md:pb-16'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px] flex flex-col gap-16'>
              <div className='text-center space-y-8'>
                <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                  Medusa München
                </p>
                <h1 className='font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]'>
                  Termin Buchen
                </h1>
                <p className='text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed'>
                  Ihr Weg zum perfekten Kunstwerk beginnt hier. Buchen Sie jetzt Ihren Termin mit
                  unseren erfahrenen Künstlern.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Trust Badges */}
        <section className='section-padding-lg relative z-10 pt-16 md:pt-16'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px]'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-16'>
                <div className='text-center space-y-8'>
                  <div className='flex justify-center'>
                    <div className='h-14 w-14 rounded-full bg-[var(--brand-gold)] flex items-center justify-center flex-col h-full'>
                      <Calendar className='text-black' size={24} />
                    </div>
                  </div>
                  <h3 className='font-headline text-xl text-white'>Flexible Termine</h3>
                  <p className='text-base text-white/70 leading-relaxed'>
                    Buchen Sie zu Ihrer Wunschzeit - 7 Tage die Woche verfügbar
                  </p>
                </div>

                <div className='text-center space-y-8'>
                  <div className='flex justify-center'>
                    <div className='h-14 w-14 rounded-full bg-[var(--brand-gold)] flex items-center justify-center flex-col h-full'>
                      <Users className='text-black' size={24} />
                    </div>
                  </div>
                  <h3 className='font-headline text-xl text-white'>Erfahrene Künstler</h3>
                  <p className='text-base text-white/70 leading-relaxed'>
                    Wählen Sie aus unserem Team von 8 professionellen Künstlern
                  </p>
                </div>

                <div className='text-center space-y-8'>
                  <div className='flex justify-center'>
                    <div className='h-14 w-14 rounded-full bg-[var(--brand-gold)] flex items-center justify-center flex-col h-full'>
                      <Sparkles className='text-black' size={24} />
                    </div>
                  </div>
                  <h3 className='font-headline text-xl text-white'>Premium Qualität</h3>
                  <p className='text-base text-white/70 leading-relaxed'>
                    EU-zertifiziertes Studio mit höchsten Hygiene-Standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Section - Container → Section → Form */}
        <section className='section-padding-lg pt-24 md:pt-32 relative'>
          {/* Jewelry Image Background - positioned above the texture layer */}
          <div
            className='absolute inset-0 z-5 opacity-70'
            style={{
              backgroundImage: "url('/Bauchnabel echt gold vitrine_(3).jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              filter: 'brightness(0.7)',
            }}
            aria-hidden='true'
          />
          {/* Dark overlay to ensure form content is readable */}
          <div className='absolute inset-0 z-6 bg-black/60' aria-hidden='true' />
          <div className='responsive-container safe-area-padding relative z-7'>
            {bookingSubmitted ? (
              // Success Message
              <div className='max-w-2xl mx-auto'>
                <div className='rounded-3xl border-2 border-[var(--brand-gold)] bg-[var(--brand-gold)]/10 p-8 text-center backdrop-blur-md shadow-[0_20px_60px_rgba(212,175,55,0.35)]'>
                  <div className='inline-flex items-center justify-center w-20 h-20 bg-[var(--brand-gold)] rounded-full mb-8'>
                    <CheckCircle className='text-black' size={48} />
                  </div>

                  <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)] mb-8'>
                    Buchung Erfolgreich!
                  </h2>

                  <p className='text-lg text-white/80 mb-8 leading-relaxed'>
                    Vielen Dank für Ihre Buchung bei Medusa Tattoo München.
                  </p>

                  <div className='rounded-xl border-2 border-white/10 bg-black/30 p-8 mb-8 text-left'>
                    <h3 className='font-semibold text-white mb-8'>Was passiert als Nächstes?</h3>
                    <ul className='space-y-8 text-white/70'>
                      <li className='flex items-start gap-8'>
                        <CheckCircle
                          className='text-[var(--brand-gold)] shrink-0 mt-0.5'
                          size={20}
                        />
                        <span>Sie erhalten eine Bestätigungs-E-Mail mit allen Details</span>
                      </li>
                      <li className='flex items-start gap-8'>
                        <CheckCircle
                          className='text-[var(--brand-gold)] shrink-0 mt-0.5'
                          size={20}
                        />
                        <span>Unser Team wird Sie innerhalb von 24 Stunden kontaktieren</span>
                      </li>
                      <li className='flex items-start gap-8'>
                        <CheckCircle
                          className='text-[var(--brand-gold)] shrink-0 mt-0.5'
                          size={20}
                        />
                        <span>Wir bestätigen Ihren Termin und besprechen Details</span>
                      </li>
                      <li className='flex items-start gap-8'>
                        <CheckCircle
                          className='text-[var(--brand-gold)] shrink-0 mt-0.5'
                          size={20}
                        />
                        <span>Bei Fragen erreichen Sie uns jederzeit per WhatsApp</span>
                      </li>
                    </ul>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-8 justify-center'>
                    <a href='/' className='no-underline'>
                      <Button
                        variant='primary'
                        className='min-w-[180px] text-center justify-center'
                      >
                        Zur Startseite
                      </Button>
                    </a>
                    <a href='/gallery' className='no-underline'>
                      <Button
                        variant='secondary'
                        className='min-w-[180px] text-center justify-center'
                      >
                        Galerie ansehen
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              // Booking Form
              <div className='mx-auto max-w-6xl'>
                <BookingForm />
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        {!bookingSubmitted && (
          <section className='section-padding-lg relative z-10'>
            <div className='responsive-container safe-area-padding'>
              <div className='mx-auto w-full max-w-[1104px]'>
                <div className='text-center space-y-8 mb-24'>
                  <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                    Informationen
                  </p>
                  <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'>
                    Wichtige Informationen
                  </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
                  <div className='rounded-3xl border-2 border-white/10 bg-[#222222] p-8 flex flex-col h-full'>
                    <h3 className='font-headline text-xl text-white mb-8'>Vor dem Termin</h3>
                    <ul className='space-y-8 text-base text-white/70'>
                      <li>• Ausreichend Schlaf in der Nacht zuvor</li>
                      <li>• Gut gegessen und hydriert</li>
                      <li>• Keine Einnahme von Blutverdünnern</li>
                      <li>• Saubere, zugängliche Körperstelle</li>
                    </ul>
                  </div>

                  <div className='rounded-3xl border-2 border-white/10 bg-[#222222] p-8 flex flex-col h-full'>
                    <h3 className='font-headline text-xl text-white mb-8'>Mitzubringen</h3>
                    <ul className='space-y-8 text-base text-white/70'>
                      <li>• Gültiger Lichtbildausweis</li>
                      <li>• Referenzbilder (falls vorhanden)</li>
                      <li>• Bequeme Kleidung</li>
                      <li>• Snacks und Getränke für längere Sessions</li>
                    </ul>
                  </div>

                  <div className='rounded-3xl border-2 border-white/10 bg-[#222222] p-8 flex flex-col h-full'>
                    <h3 className='font-headline text-xl text-white mb-8'>Stornierung</h3>
                    <ul className='space-y-8 text-base text-white/70'>
                      <li>• Kostenlose Stornierung bis 48h vorher</li>
                      <li>• Terminverschiebung nach Absprache möglich</li>
                      <li>• Bei Krankheit bitte frühzeitig melden</li>
                    </ul>
                  </div>

                  <div className='rounded-3xl border-2 border-white/10 bg-[#222222] p-8 flex flex-col h-full'>
                    <h3 className='font-headline text-xl text-white mb-8'>Zahlung</h3>
                    <ul className='space-y-8 text-base text-white/70'>
                      <li>• Bar, EC-Karte oder Kreditkarte</li>
                      <li>• Anzahlung bei größeren Projekten</li>
                      <li>• Rechnung mit MwSt. inklusive</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        {!bookingSubmitted && (
          <section className='section-padding-lg relative z-10'>
            <div className='responsive-container safe-area-padding'>
              <div className='mx-auto w-full max-w-[1104px]'>
                <div className='text-center space-y-8'>
                  <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                    Unterstützung
                  </p>
                  <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'>
                    Fragen zur Buchung?
                  </h2>
                  <p className='text-base text-white/70 max-w-2xl mx-auto font-body leading-relaxed mb-16'>
                    Unser Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns über WhatsApp,
                    Telefon oder besuchen Sie uns direkt im Studio.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-8 justify-center'>
                    <a
                      href='https://wa.me/4989269313'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='no-underline'
                    >
                      <Button
                        variant='primary'
                        className='min-w-[180px] text-center justify-center bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-200'
                      >
                        WhatsApp
                      </Button>
                    </a>
                    <a href='/contact' className='no-underline'>
                      <Button
                        variant='secondary'
                        className='min-w-[180px] text-center justify-center'
                      >
                        Kontaktseite
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default BookingPage;
