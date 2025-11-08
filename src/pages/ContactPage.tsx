import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageHeader } from '../components/ui/PageHeader';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { MapPin, Phone, Mail, Clock, Instagram, Star } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const studioInfo = {
  name: 'MEDUSA TATTOO MÜNCHEN',
  address: {
    street: 'Altheimer Eck 11',
    city: '80331 München',
  },
  contact: {
    phone: '+49 (0) 89 269 313',
    email: 'info@medusa-tattoo.de',
  },
  hours: {
    weekdays: 'Mo-Fr: 11:30-18:30',
    saturday: 'Sa: 11:00-16:00',
    sunday: 'So: Geschlossen',
  },
  social: {
    instagram: '@medusa_tattoo_munich',
    facebook: 'Medusa Tattoo München',
    googleRating: 4.9,
  },
};

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (_data: ContactFormData) => {
    try {
      setSubmitError(null);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 3000);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Form submission error:', error);
      }
      setSubmitError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <div className='min-h-screen relative z-10'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      {/* Page Header - Matches Services page exactly */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-[1104px] flex flex-col gap-16'>
            <PageHeader
              eyebrow="Kontaktieren Sie uns"
              title="Kontakt"
              subtitle="Wir begleiten Sie von der ersten Idee bis zum finalen Meisterwerk. Schreiben Sie uns – wir melden uns zeitnah zurück."
              alignment="left"
              maxWidth="lg"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-[1104px]'>
            <div className='grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'>
            {/* Contact Form */}
            <div className='flex flex-col gap-16'>
              <div className='text-center space-y-8'>
                <p className='text-sm uppercase tracking-[0.25em] text-white/60'>Kontaktformular</p>
                <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'>
                  Schreiben Sie uns
                </h2>
                <p className='text-base text-white/70 max-w-2xl mx-auto font-body leading-relaxed'>
                  Hinterlassen Sie uns eine Nachricht – unser Team meldet sich innerhalb von 24
                  Stunden.
                </p>
              </div>

              {isSubmitted ? (
                <div className='flex h-full flex-col items-center justify-center gap-8 rounded-3xl border-2 border-[var(--brand-gold)] bg-[var(--brand-gold)]/10 p-8 text-center backdrop-blur-md shadow-[0_20px_60px_rgba(212,175,55,0.35)]'>
                  <div className='text-5xl text-[var(--brand-gold)]'>✓</div>
                  <h3 className='font-headline text-2xl md:text-3xl text-[var(--brand-gold)]'>
                    Nachricht gesendet!
                  </h3>
                  <p className='text-base leading-7 text-white/70 max-w-md font-body'>
                    Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich bei Ihnen.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='flex h-full flex-col gap-8 rounded-3xl border-2 border-white/10 bg-[#222222] p-8'
                >
                  <div className='flex flex-col gap-8'>
                    <label
                      htmlFor='name'
                      className='block text-white/90 font-semibold tracking-wide'
                    >
                      Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='name'
                      type='text'
                      {...register('name', {
                        required: 'Name ist erforderlich',
                        minLength: {
                          value: 2,
                          message: 'Name muss mindestens 2 Zeichen lang sein',
                        },
                      })}
                      className={`w-full rounded-xl border px-8 py-4 bg-white/3 text-white placeholder-white/50 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]/80 focus:border-transparent ${
                        errors.name ? 'border-red-500/70' : 'border-white/10'
                      }`}
                      placeholder='Ihr Name'
                    />
                    {errors.name && <p className='text-sm text-red-400'>{errors.name.message}</p>}
                  </div>

                  <div className='flex flex-col gap-8'>
                    <label
                      htmlFor='email'
                      className='block text-white/90 font-semibold tracking-wide'
                    >
                      E-Mail <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='email'
                      type='email'
                      {...register('email', {
                        required: 'E-Mail ist erforderlich',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Ungültige E-Mail-Adresse',
                        },
                      })}
                      className={`w-full rounded-xl border px-8 py-4 bg-white/3 text-white placeholder-white/50 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]/80 focus:border-transparent ${
                        errors.email ? 'border-red-500/70' : 'border-white/10'
                      }`}
                      placeholder='ihre.email@beispiel.de'
                    />
                    {errors.email && <p className='text-sm text-red-400'>{errors.email.message}</p>}
                  </div>

                  <div className='flex flex-col gap-8'>
                    <label
                      htmlFor='subject'
                      className='block text-white/90 font-semibold tracking-wide'
                    >
                      Betreff <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='subject'
                      type='text'
                      {...register('subject', {
                        required: 'Betreff ist erforderlich',
                        minLength: {
                          value: 3,
                          message: 'Betreff muss mindestens 3 Zeichen lang sein',
                        },
                      })}
                      className={`w-full rounded-xl border px-8 py-4 bg-white/3 text-white placeholder-white/50 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]/80 focus:border-transparent ${
                        errors.subject ? 'border-red-500/70' : 'border-white/10'
                      }`}
                      placeholder='Worum geht es?'
                    />
                    {errors.subject && (
                      <p className='text-sm text-red-400'>{errors.subject.message}</p>
                    )}
                  </div>

                  <div className='flex flex-col gap-8'>
                    <label
                      htmlFor='message'
                      className='block text-white/90 font-semibold tracking-wide'
                    >
                      Nachricht <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      id='message'
                      rows={4}
                      {...register('message', {
                        required: 'Nachricht ist erforderlich',
                        minLength: {
                          value: 10,
                          message: 'Nachricht muss mindestens 10 Zeichen lang sein',
                        },
                      })}
                      className={`w-full rounded-xl border px-8 py-4 bg-white/[0.03] text-white placeholder-white/50 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]/80 focus:border-transparent resize-none ${
                        errors.message ? 'border-red-500/70' : 'border-white/10'
                      }`}
                      placeholder='Ihre Nachricht an uns...'
                    />
                    {errors.message && (
                      <p className='text-sm text-red-400'>{errors.message.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <div className='bg-red-500/10 border border-red-500/60 text-red-300 rounded-xl px-8 py-8 flex flex-col h-full'>
                      <p className='text-sm'>{submitError}</p>
                    </div>
                  )}

                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-200 bg-[var(--brand-gold)] text-[var(--deep-black)] hover:bg-[var(--brand-gold-hover)] focus:ring-2 focus:ring-[var(--brand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--deep-black)] disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
                  </button>
                </form>
              )}
            </div>

            {/* Studio Details */}
            <div className='space-y-16'>
              <div className='space-y-0'>
                <p className='text-sm uppercase tracking-[0.25em] text-white/60'>
                  Studio & Service
                </p>
                <h2 className="font-headline text-3xl md:text-4xl text-(--brand-gold)">
                  Unser Studio
                </h2>
                <p className='text-white/70 font-body'>
                  Besuchen Sie uns im Herzen von München oder vereinbaren Sie einen Beratungstermin.
                </p>
              </div>

              <div className='space-y-8'>
                <div className='bg-black/45 border border-white/10 rounded-2xl p-8 flex flex-col h-full'>
                  <div className='flex items-start gap-8'>
                    <div className='flex flex-col h-full rounded-full bg-[var(--brand-gold)]/15 h-12 flex items-center justify-center shrink-0'>
                      <MapPin className='text-[var(--brand-gold)]' size={22} />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Adresse</h3>
                      <p className='text-white/85 font-medium'>{studioInfo.name}</p>
                      <p className='text-white/70'>{studioInfo.address.street}</p>
                      <p className='text-white/70'>{studioInfo.address.city}</p>
                    </div>
                  </div>
                </div>

                <div className='bg-black/45 border border-white/10 rounded-2xl p-8 space-y-8 flex flex-col h-full'>
                  <div className='flex items-start gap-8'>
                    <div className='flex flex-col h-full rounded-full bg-[var(--brand-gold)]/15 h-12 flex items-center justify-center shrink-0'>
                      <Phone className='text-[var(--brand-gold)]' size={22} />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Telefon</h3>
                      <a
                        href={`tel:${studioInfo.contact.phone.replaceAll(/\s/g, '')}`}
                        className='text-white/80 hover:text-[var(--brand-gold)] transition-colors duration-200 ease-out'
                      >
                        {studioInfo.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-8'>
                    <div className='flex flex-col h-full rounded-full bg-[var(--brand-gold)]/15 h-12 flex items-center justify-center shrink-0'>
                      <Mail className='text-[var(--brand-gold)]' size={22} />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>E-Mail</h3>
                      <a
                        href={`mailto:${studioInfo.contact.email}`}
                        className='text-white/80 hover:text-[var(--brand-gold)] transition-colors duration-200 ease-out break-all'
                      >
                        {studioInfo.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className='bg-black/45 border border-white/10 rounded-2xl p-8 flex flex-col h-full'>
                  <div className='flex items-start gap-8'>
                    <div className='flex flex-col h-full rounded-full bg-[var(--brand-gold)]/15 h-12 flex items-center justify-center shrink-0'>
                      <Clock className='text-[var(--brand-gold)]' size={22} />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Öffnungszeiten</h3>
                      <ul className='text-white/75 space-y-0 font-body text-sm'>
                        <li>{studioInfo.hours.weekdays}</li>
                        <li>{studioInfo.hours.saturday}</li>
                        <li>{studioInfo.hours.sunday}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='bg-black/45 border border-white/10 rounded-2xl p-8 space-y-8 flex flex-col h-full'>
                  <div className='flex items-start gap-8'>
                    <div className='flex flex-col h-full rounded-full bg-[var(--brand-gold)]/15 h-12 flex items-center justify-center shrink-0'>
                      <Instagram className='text-[var(--brand-gold)]' size={22} />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Instagram</h3>
                      <a
                        href='https://instagram.com/medusa_tattoo_munich'
                        className='text-white/80 hover:text-[var(--brand-gold)] transition-colors duration-200 ease-out'
                        target='_blank'
                        rel='noreferrer'
                      >
                        {studioInfo.social.instagram}
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-8'>
                    <div className='flex flex-col h-full rounded-full bg-[var(--brand-gold)]/15 h-12 flex items-center justify-center shrink-0'>
                      <svg
                        className='text-[var(--brand-gold)]'
                        width='22'
                        height='22'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                      </svg>
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Facebook</h3>
                      <p className='text-white/80'>{studioInfo.social.facebook}</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-8'>
                    <div className='flex flex-col h-full rounded-full bg-[var(--brand-gold)]/15 h-12 flex items-center justify-center shrink-0'>
                      <Star className='text-[var(--brand-gold)]' size={20} fill='var(--brand-gold)' />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Google Reviews</h3>
                      <div className='flex items-center gap-0'>
                        <span className='text-[var(--brand-gold)] font-bold text-xl'>
                          {studioInfo.social.googleRating}
                        </span>
                        <span className='text-white/75'>★ Bewertungen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
