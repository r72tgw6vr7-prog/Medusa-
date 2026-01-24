import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { PageHeading } from '@/components/PageHeading';
import { Button } from '@/components/ui/button';
import { Shield, Award, MessageCircle, Check, Mail } from 'lucide-react';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import '@/components/booking/BookingModalMobile.css';

interface ContactFormData {
  name: string;
  email: string;
  reason: 'tattoo' | 'piercing' | 'general';
  message: string;
}

const studioInfo = {
  contact: {
    email: 'info@medusa-tattoo.de',
    whatsapp: '+4917612345678',
  },
};

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const mapsKey =
    typeof window !== 'undefined'
      ? ((window as unknown as { __MOCKED_ENV__?: Record<string, string> }).__MOCKED_ENV__
          ?.VITE_GOOGLE_MAPS_API_KEY ??
        (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GOOGLE_MAPS_API_KEY)
      : undefined;
  const hasMapsKey = typeof mapsKey === 'string' && mapsKey.length > 0;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      reason: 'general',
    },
  });

  const { t } = useLanguage();
  const selectedReason = watch('reason');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(studioInfo.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = studioInfo.contact.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
        console.error('Form submission error:', error);
      }
      setSubmitError(t('contact.errors.submitFailed'));
    }
  };

  const reasonCards = [
    {
      id: 'tattoo' as const,
      icon: Award,
      titleKey: 'contact.reasons.tattoo.title',
      subtitleKey: 'contact.reasons.tattoo.subtitle',
    },
    {
      id: 'piercing' as const,
      icon: Shield,
      titleKey: 'contact.reasons.piercing.title',
      subtitleKey: 'contact.reasons.piercing.subtitle',
    },
    {
      id: 'general' as const,
      icon: MessageCircle,
      titleKey: 'contact.reasons.general.title',
      subtitleKey: 'contact.reasons.general.subtitle',
    },
  ];

  return (
    <div className='min-h-screen relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
      <MainNavigation />

      <div
        data-testid={hasMapsKey ? 'map-embed' : 'map-fallback'}
        className={hasMapsKey ? 'google-map' : 'map-fallback'}
        aria-hidden='true'
        style={{
          position: 'fixed',
          top: 160,
          left: 8,
          width: 320,
          height: 200,
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {hasMapsKey ? null : (
          <div style={{ width: '100%', height: '100%' }}>
            <p>Karte ist temporär nicht verfügbar</p>
            <a
              href='https://www.google.com/maps/search/?api=1&query=Medusa%20Tattoo%20M%C3%BCnchen'
              target='_blank'
              rel='noopener noreferrer'
              tabIndex={-1}
            >
              Medusa Tattoo München – Google Maps
            </a>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <Section variant='default' spacing='normal' bg='dark'>
        <Container size='form'>
          <PageHeading
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title')}
            subtitle={t('contact.subtitle')}
          />
        </Container>
      </Section>

      {/* Main Contact Form Card */}
      <Section variant='default' spacing='tight' bg='dark'>
        <Container size='form'>
          <div className='booking-modal-mobile'>
            <div className='modal-header'>
              <h2 className='font-semibold'>{t('contact.sections.quickMessage')}</h2>
            </div>

            <div className='modal-body'>
              {isSubmitted ? (
                <div
                  className='flex flex-col items-center justify-center gap-4 rounded-(--card-radius) border border-(--card-border) bg-(--card-bg) text-center p-8'
                  style={{ boxShadow: 'var(--card-shadow-depth), var(--card-shadow-glow)' }}
                >
                  <div className='w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center'>
                    <Check className='text-green-400' size={24} />
                  </div>
                  <h3 className='font-headline text-(length:--text-h3) text-white'>
                    {t('contact.successTitle')}
                  </h3>
                  <p className='text-(length:--text-body) text-white/70 font-body'>
                    {t('contact.successBody')}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='step-container flex flex-col gap-6'
                >
                  {/* Reason Selection - Horizontal Cards */}
                  <div className='flex flex-col gap-4'>
                    <label className='text-(length:--text-sm) text-white/80 font-medium'>
                      {t('contact.reasons.label')}
                    </label>
                    <div className='grid grid-cols-3 gap-4'>
                      {reasonCards.map((card) => {
                        const Icon = card.icon;
                        const isSelected = selectedReason === card.id;
                        return (
                          <button
                            key={card.id}
                            type='button'
                            className={`flex flex-col h-full items-center gap-2 p-4 rounded-(--card-radius) border transition-all duration-200 ${
                              isSelected
                                ? 'border-white bg-white/10'
                                : 'border-(--card-border) bg-(--card-bg) hover:border-white/40'
                            }`}
                            style={{
                              boxShadow: isSelected
                                ? 'var(--card-shadow-hover-glow)'
                                : 'var(--card-shadow-glow)',
                            }}
                            onClick={() => setValue('reason', card.id, { shouldDirty: true })}
                          >
                            <Icon className='text-white' size={20} />
                            <span className='text-(length:--text-sm) font-medium text-white'>
                              {t(card.titleKey)}
                            </span>
                            <span className='text-(length:--text-xs) text-brand-chrome font-semibold'>
                              {t(card.subtitleKey)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <input type='hidden' {...register('reason')} />
                  </div>

                  {/* Name Input */}
                  <div className='form-group'>
                    <label htmlFor='name'>
                      {t('contact.labels.name')}
                      <span className='text-red-400' aria-hidden='true'>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      type='text'
                      id='name'
                      placeholder={t('contact.placeholders.name')}
                      {...register('name', { required: true, minLength: 2 })}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className='text-(length:--text-sm) text-red-400 mt-2'>
                        Bitte geben Sie Ihren Namen ein
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className='form-group'>
                    <label htmlFor='email'>
                      {t('contact.labels.email')}
                      <span className='text-red-400' aria-hidden='true'>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      type='email'
                      id='email'
                      placeholder={t('contact.placeholders.email')}
                      {...register('email', {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className='text-(length:--text-sm) text-red-400 mt-2'>
                        Bitte geben Sie eine gültige E-Mail ein
                      </p>
                    )}
                  </div>

                  {/* Message Textarea */}
                  <div className='form-group'>
                    <label htmlFor='message'>
                      {t('contact.labels.message')}
                      <span className='text-red-400' aria-hidden='true'>
                        {' '}
                        *
                      </span>
                    </label>
                    <textarea
                      id='message'
                      rows={4}
                      placeholder={t('contact.placeholders.message')}
                      {...register('message', { required: true, minLength: 10 })}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className='text-(length:--text-sm) text-red-400 mt-2'>
                        Bitte geben Sie eine Nachricht ein (min. 10 Zeichen)
                      </p>
                    )}
                  </div>

                  {/* Privacy Consent */}
                  <div className='flex items-start gap-4'>
                    <input
                      type='checkbox'
                      id='privacy'
                      required
                      className='mt-2 w-4 h-4 rounded border-white/20 bg-white/5 accent-white'
                    />
                    <label htmlFor='privacy' className='text-(length:--text-sm) text-white/70'>
                      {t('contact.privacyConsent.prefix')}{' '}
                      <a
                        href='/datenschutz'
                        className='underline hover:text-white transition-colors duration-200'
                      >
                        {t('contact.privacyConsent.linkText')}
                      </a>{' '}
                      {t('contact.privacyConsent.suffix')}
                    </label>
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className='bg-red-500/10 border border-red-500/60 text-red-300 rounded-lg px-4 py-4'>
                      <p className='text-(length:--text-sm)'>{submitError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button type='submit' variant='chrome' className='w-full' disabled={isSubmitting}>
                    {isSubmitting ? t('contact.submit.sending') : t('contact.submit.send')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Secondary Contact Options */}
      <Section variant='default' spacing='tight' bg='dark'>
        <Container size='form'>
          <p
            className='text-(length:--text-sm) uppercase tracking-widest text-brand-chrome/80 font-semibold mb-4 text-center'
            style={{ textShadow: '0 0 12px var(--chrome-glow-soft)' }}
          >
            {t('contact.sections.otherWays')}
          </p>
          <div className='grid grid-cols-2 gap-4'>
            {/* Email Card */}
            <button
              type='button'
              onClick={handleCopyEmail}
              className='flex flex-col h-full items-center gap-4 p-6 rounded-(--card-radius) border border-(--card-border) bg-(--card-bg) hover:border-white/40 transition-all duration-200 cursor-pointer'
              style={{ boxShadow: 'var(--card-shadow-glow)' }}
            >
              <div
                className='rounded-full border border-(--card-border) flex flex-col h-full items-center justify-center'
                style={{ width: 'var(--space-5)', height: 'var(--space-5)' }}
              >
                {copied ? (
                  <Check className='text-white' size={18} />
                ) : (
                  <Mail className='text-white' size={18} />
                )}
              </div>
              <div className='text-center flex flex-col h-full'>
                <p className='text-(length:--text-sm) font-medium text-white'>E-Mail</p>
                <p className='text-(length:--text-xs) text-brand-chrome/80 font-semibold'>
                  {copied ? t('contact.actions.copied') : t('contact.actions.clickToCopy')}
                </p>
              </div>
            </button>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${studioInfo.contact.whatsapp.replace(/\+/g, '')}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-col h-full items-center gap-4 p-6 rounded-(--card-radius) border border-(--card-border) bg-(--card-bg) hover:border-white/40 transition-all duration-200'
              style={{ boxShadow: 'var(--card-shadow-glow)' }}
            >
              <div
                className='rounded-full border border-(--card-border) flex flex-col h-full items-center justify-center'
                style={{ width: 'var(--space-5)', height: 'var(--space-5)' }}
              >
                <MessageCircle className='text-white' size={18} />
              </div>
              <div className='text-center flex flex-col h-full'>
                <p className='text-(length:--text-sm) font-medium text-white'>WhatsApp</p>
                <p className='text-(length:--text-xs) text-brand-chrome/80 font-semibold'>
                  {t('contact.otherWays.whatsapp.subtitle')}
                </p>
              </div>
            </a>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default ContactPage;
