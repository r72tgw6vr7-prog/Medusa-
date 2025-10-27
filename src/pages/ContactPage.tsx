import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';
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
    <div className='min-h-screen bg-[#222222]'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      {/* Unified heading section applied: matches ServicesPageInteractive styling */}
      <section className='relative section-padding bg-linear-to-b from-[#222222] to-black/40'>
        <div className='responsive-container safe-area-padding flex flex-col items-center text-center gap-8'>
          <p className='text-sm uppercase tracking-[0.3em] text-white/60'>Kontaktieren Sie uns</p>
          <div className='text-center'>
            <h1 className='typo-h1 text-[#D4AF37]'>Kontakt</h1>
            <p className='typo-subtitle text-[#C0C0C0]'>
              Wir begleiten Sie von der ersten Idee bis zum finalen Meisterwerk. Schreiben Sie uns –
              wir melden uns zeitnah zurück.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className='section-padding bg-[#1A1A1A]'>
        <div className='responsive-container safe-area-padding'>
          <div className='grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'>
            {/* Contact Form */}
            <div className='flex flex-col gap-16'>
              <div className='flex flex-col gap-8'>
                <p className='text-sm uppercase tracking-[0.25em] text-white/60'>Kontaktformular</p>
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#D4AF37]">
                  Schreiben Sie uns
                </h2>
                <p className='text-white/70 font-body'>
                  Hinterlassen Sie uns eine Nachricht – unser Team meldet sich innerhalb von 24
                  Stunden.
                </p>
              </div>

              {isSubmitted ? (
                <div className='flex h-full flex-col items-center justify-center gap-8 rounded-2xl border border-[#D4AF37]/60 bg-[#D4AF37]/10 p-16 text-center backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.45)]'>
                  <div className='text-5xl text-[#D4AF37]'>✓</div>
                  <h3 className="font-['Playfair_Display'] text-2xl text-[#D4AF37]">
                    Nachricht gesendet!
                  </h3>
                  <p className='max-w-md text-white/80 font-body'>
                    Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich bei Ihnen.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='flex h-full flex-col gap-8 rounded-2xl border border-white/10 bg-black/40 p-8 md:p-16 backdrop-blur-lg shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
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
                      className={`w-full rounded-xl border px-8 py-4 bg-white/[0.03] text-white placeholder-white/50 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/80 focus:border-transparent ${
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
                      className={`w-full rounded-xl border px-8 py-4 bg-white/[0.03] text-white placeholder-white/50 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/80 focus:border-transparent ${
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
                      className={`w-full rounded-xl border px-8 py-4 bg-white/[0.03] text-white placeholder-white/50 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/80 focus:border-transparent ${
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
                      className={`w-full rounded-xl border px-8 py-4 bg-white/[0.03] text-white placeholder-white/50 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/80 focus:border-transparent resize-none ${
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
                    className='h-12 w-full inline-flex items-center justify-center rounded-xl bg-[#D4AF37] text-[#1A1A1A] font-semibold text-lg tracking-wide transition-all duration-300 hover:bg-[#C19B26] hover:shadow-[0_12px_40px_rgba(212,175,55,0.35)] disabled:opacity-60 disabled:cursor-not-allowed flex-col h-full'
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
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#D4AF37]">
                  Unser Studio
                </h2>
                <p className='text-white/70 font-body'>
                  Besuchen Sie uns im Herzen von München oder vereinbaren Sie einen Beratungstermin.
                </p>
              </div>

              <div className='space-y-8'>
                <div className='bg-black/45 border border-white/10 rounded-2xl p-8 flex flex-col h-full'>
                  <div className='flex items-start gap-8'>
                    <div className='rounded-full bg-[#D4AF37]/15 h-12 w-12 flex items-center justify-center flex-col h-full'>
                      <MapPin className='text-[#D4AF37]' size={22} />
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
                    <div className='rounded-full bg-[#D4AF37]/15 h-12 w-12 flex items-center justify-center flex-col h-full'>
                      <Phone className='text-[#D4AF37]' size={22} />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Telefon</h3>
                      <a
                        href={`tel:${studioInfo.contact.phone.replace(/\s/g, '')}`}
                        className='text-white/80 hover:text-[#D4AF37] transition-colors transition duration-200 ease-out'
                      >
                        {studioInfo.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-8'>
                    <div className='rounded-full bg-[#D4AF37]/15 h-12 w-12 flex items-center justify-center flex-col h-full'>
                      <Mail className='text-[#D4AF37]' size={22} />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>E-Mail</h3>
                      <a
                        href={`mailto:${studioInfo.contact.email}`}
                        className='text-white/80 hover:text-[#D4AF37] transition-colors break-all transition duration-200 ease-out'
                      >
                        {studioInfo.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className='bg-black/45 border border-white/10 rounded-2xl p-8 flex flex-col h-full'>
                  <div className='flex items-start gap-8'>
                    <div className='rounded-full bg-[#D4AF37]/15 h-12 w-12 flex items-center justify-center flex-col h-full'>
                      <Clock className='text-[#D4AF37]' size={22} />
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
                    <div className='rounded-full bg-[#D4AF37]/15 h-12 w-12 flex items-center justify-center flex-col h-full'>
                      <Instagram className='text-[#D4AF37]' size={22} />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Instagram</h3>
                      <a
                        href='https://instagram.com/medusa_tattoo_munich'
                        className='text-white/80 hover:text-[#D4AF37] transition-colors transition duration-200 ease-out'
                        target='_blank'
                        rel='noreferrer'
                      >
                        {studioInfo.social.instagram}
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-8'>
                    <div className='rounded-full bg-[#D4AF37]/15 h-12 w-12 flex items-center justify-center flex-col h-full'>
                      <svg
                        className='text-[#D4AF37]'
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
                    <div className='rounded-full bg-[#D4AF37]/15 h-12 w-12 flex items-center justify-center flex-col h-full'>
                      <Star className='text-[#D4AF37]' size={20} fill='#D4AF37' />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg mb-0'>Google Reviews</h3>
                      <div className='flex items-center gap-0'>
                        <span className='text-[#D4AF37] font-bold text-xl'>
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
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
