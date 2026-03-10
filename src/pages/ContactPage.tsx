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
import { contactSubmit } from '@/services/contactService';
import GoogleMapSection from '@/components/GoogleMapSection';
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

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError(null);

      await contactSubmit({
        name: data.name,
        email: data.email,
        serviceId: data.reason,
        message: data.message,
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 3000);
    } catch (error) {
      if (import.meta.env.DEV) {
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

  const trustBadges = [
    {
      id: 'eu-certified',
      icon: Shield,
      title: t('contact.trustBadges.euCertified.title'),
      subtitle: t('contact.trustBadges.euCertified.subtitle'),
    },
    {
      id: 'award',
      icon: Award,
      title: t('contact.trustBadges.award2024.title'),
      subtitle: t('contact.trustBadges.award2024.subtitle'),
    },
    {
      id: 'sterile',
      icon: Check,
      title: t('contact.trustBadges.sterileEquipment.title'),
      subtitle: t('contact.trustBadges.sterileEquipment.subtitle'),
    },
    {
      id: 'experience',
      icon: MessageCircle,
      title: t('contact.trustBadges.experience.title'),
      subtitle: t('contact.trustBadges.experience.subtitle'),
    },
  ];

  return (
    <div className='min-h-screen relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
      <MainNavigation />

      <main id='main-content' className='flex-1'>
        <div className='w-full' data-testid='map-embed'>
          <GoogleMapSection />
        </div>

        {/* Hero Section */}
        <Section variant='default' spacing='normal' bg='dark'>
          <Container size='form'>
            <PageHeading
              eyebrow={t('contact.eyebrow')}
              title={t('contact.title')}
              subtitle={t('contact.subtitle')}
            />

            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className='premium-choice-card flex flex-col h-full min-h-0 items-start gap-4 p-4'
                    data-selected='false'
                  >
                    <span className='inline-flex flex flex-col h-full h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-(--accent-chrome)'>
                      <Icon size={18} />
                    </span>
                      <div className='space-y-2'>
                      <p className='text-(length:--text-sm) font-semibold text-white'>
                        {badge.title}
                      </p>
                      <p className='text-(length:--text-xs) text-white/60'>{badge.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
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
                  <div className='premium-feedback-panel premium-feedback-panel--success flex-col items-center justify-center gap-4 text-center p-8'>
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
                      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                        {reasonCards.map((card) => {
                          const Icon = card.icon;
                          const isSelected = selectedReason === card.id;
                          return (
                            <button
                              key={card.id}
                              type='button'
                              className='premium-choice-card items-center text-center'
                              data-selected={isSelected ? 'true' : 'false'}
                              onClick={() => setValue('reason', card.id, { shouldDirty: true })}
                            >
                              <span className='inline-flex flex flex-col h-full h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white'>
                                <Icon size={20} />
                              </span>
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
                    <div
                      className='premium-form-field'
                      data-field-state={errors.name ? 'error' : 'default'}
                    >
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
                        className='premium-field-control'
                      />
                      {errors.name && (
                        <p className='premium-field-hint premium-field-hint--error'>
                          {t('contact.errors.nameRequired')}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div
                      className='premium-form-field'
                      data-field-state={errors.email ? 'error' : 'default'}
                    >
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
                        className='premium-field-control'
                      />
                      {errors.email && (
                        <p className='premium-field-hint premium-field-hint--error'>
                          {t('contact.errors.emailInvalid')}
                        </p>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div
                      className='premium-form-field'
                      data-field-state={errors.message ? 'error' : 'default'}
                    >
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
                        className='premium-field-control min-h-36 resize-y'
                      />
                      {errors.message && (
                        <p className='premium-field-hint premium-field-hint--error'>
                          {t('contact.errors.messageRequired')}
                        </p>
                      )}
                    </div>

                    {/* Privacy Consent */}
                    <div className='premium-feedback-panel items-start gap-4 bg-white/2'>
                      <input
                        type='checkbox'
                        id='privacy'
                        required
                        className='mt-2 h-4 w-4 rounded border-white/20 bg-white/5 accent-white'
                      />
                      <label htmlFor='privacy' className='text-(length:--text-sm) text-white/70'>
                        {t('contact.privacyConsent.prefix')}{' '}
                        <a
                          href='/datenschutz'
                          className='premium-link h-auto min-h-0 underline-offset-4'
                        >
                          {t('contact.privacyConsent.linkText')}
                        </a>{' '}
                        {t('contact.privacyConsent.suffix')}
                      </label>
                    </div>

                    {/* Error Message */}
                    {submitError && (
                      <div className='premium-feedback-panel premium-feedback-panel--error'>
                        <p className='text-(length:--text-sm) text-red-100'>{submitError}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type='submit'
                      variant='chrome'
                      className='w-full'
                      disabled={isSubmitting}
                      loading={isSubmitting}
                    >
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
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {/* Email Card */}
              <button
                type='button'
                onClick={handleCopyEmail}
                className='premium-choice-card items-center text-center cursor-pointer'
                data-selected={copied ? 'true' : 'false'}
              >
                <div
                  className='rounded-full border border-(--card-border) flex flex-col h-full h-12 w-12 items-center justify-center'
                  style={{ width: 'var(--space-5)', height: 'var(--space-5)' }}
                >
                  {copied ? (
                    <Check className='text-white' size={18} />
                  ) : (
                    <Mail className='text-white' size={18} />
                  )}
                </div>
                <div className='text-center flex flex-col h-full' aria-live='polite'>
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
                className='premium-choice-card items-center text-center'
                data-selected='false'
              >
                <div
                  className='rounded-full border border-(--card-border) flex flex-col h-full h-12 w-12 items-center justify-center'
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
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
