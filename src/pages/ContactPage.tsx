import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageHeading } from '../components/PageHeading';
import { Button } from '@/components/ui/button';
import { Shield, Award, Check, Heart, Calendar, MessageCircle, Copy } from 'lucide-react';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const studioInfo = {
  contact: {
    email: 'info@medusa-tattoo.de',
  },
};

const trustBadges = [
  { icon: Shield, title: 'EU Zertifiziert', subtitle: 'Höchste Standards' },
  { icon: Award, title: 'Preisgekrönt 2024', subtitle: 'Ausgezeichnet' },
  { icon: Check, title: 'Sterile Ausrüstung', subtitle: '100% Hygiene' },
  { icon: Heart, title: '27 Jahre Erfahrung', subtitle: 'Seit 1994' },
];

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const { t } = useLanguage();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(studioInfo.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
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
        // eslint-disable-next-line no-console
        console.error('Form submission error:', error);
      }
      setSubmitError(t('validation.required') || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className='min-h-screen relative z-10 bg-luxury-bg-dark'>
      <MainNavigation />

      {/* Hero Section */}
      <Section variant="default" spacing="normal" className="pt-32 md:pt-40" bg="dark">
        <Container size="default">
          <PageHeading
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title')}
            subtitle={t('contact.subtitle')}
          />
        </Container>
      </Section>

      {/* 4 Feature Tiles Row */}
      <Section variant="default" spacing="tight" bg="dark">
        <Container size="default">
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className='flex flex-col h-full items-start gap-4 p-6 rounded-xl border border-white/10 bg-luxury-bg-dark/40'
                >
                  <Icon className='text-[var(--accent-chrome)]' size={24} />
                  <div>
                    <h3 className='text-luxury-text-inverse font-semibold text-base lg:text-sm'>
                      {badge.title}
                    </h3>
                    <p className='text-base md:text-sm text-luxury-text-inverse/70'>
                      {badge.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Direct Email Section */}
      <Section variant="default" spacing="tight" bg="dark">
        <Container size="default">
          <p className='text-base md:text-sm uppercase tracking-widest text-luxury-text-inverse/60 mb-4'>
            Direct Email
          </p>
          <button
            onClick={handleCopyEmail}
            className='w-full flex items-center justify-between gap-4 p-4 md:p-6 rounded-xl border border-white/10 bg-luxury-bg-dark/40 hover:border-white/20 transition-colors duration-200 group cursor-pointer touch-target-mobile'
          >
            <div className='text-left'>
              <p className='text-luxury-text-inverse font-medium text-base lg:text-sm'>
                {studioInfo.contact.email}
              </p>
              <p className='text-base md:text-sm text-luxury-text-inverse/50 uppercase tracking-wider mt-2'>
                {copied ? 'Copied!' : 'Click to copy'}
              </p>
            </div>
            <span className='inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors duration-200'>
              {copied ? (
                <Check className='text-[var(--accent-chrome)]' size={18} />
              ) : (
                <Copy className='text-luxury-text-inverse/70' size={18} />
              )}
            </span>
          </button>
        </Container>
      </Section>

      {/* Other Ways Section */}
      <Section variant="default" spacing="tight" bg="dark">
        <Container size="default">
          <p className='text-base md:text-sm uppercase tracking-widest text-luxury-text-inverse/60 mb-4'>
            Other Ways
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Calendly Tile */}
            <a
              href='https://calendly.com/medusa-tattoo'
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-col h-full items-center justify-center gap-4 p-8 rounded-xl border border-white/10 bg-luxury-bg-dark/40 hover:border-white/20 transition-colors duration-200 touch-target-mobile'
            >
              <Calendar className='text-[var(--accent-chrome)]' size={28} />
              <div className='text-center'>
                <h3 className='text-luxury-text-inverse font-semibold text-base lg:text-sm'>Calendly</h3>
                <p className='text-base md:text-sm text-luxury-text-inverse/60'>Book 30min</p>
              </div>
            </a>

            {/* WhatsApp Tile */}
            <a
              href='https://wa.me/4917612345678'
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-col h-full items-center justify-center gap-4 p-8 rounded-xl border border-white/10 bg-luxury-bg-dark/40 hover:border-white/20 transition-colors duration-200 touch-target-mobile'
            >
              <MessageCircle className='text-[var(--accent-chrome)]' size={28} />
              <div className='text-center'>
                <h3 className='text-luxury-text-inverse font-semibold text-base lg:text-sm'>WhatsApp</h3>
                <p className='text-base md:text-sm text-luxury-text-inverse/60'>Direct message</p>
              </div>
            </a>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section variant="default" spacing="normal" bg="dark">
        <Container size="default">
          <p className='text-base md:text-sm uppercase tracking-widest text-luxury-text-inverse/60 mb-6'>
            Or send me a quick message
          </p>

          {isSubmitted ? (
            <div className='flex flex-col items-center justify-center gap-4 rounded-xl border border-[var(--accent-chrome)]/60 bg-[var(--accent-chrome)]/10 text-center p-8'>
              <div className='text-5xl text-(--brand-accent)'>✓</div>
              <h3 className='font-headline text-2xl text-(--brand-accent)'>
                {t('contact.successTitle')}
              </h3>
              <p className='text-base lg:text-sm text-luxury-text-inverse/80 font-body'>
                {t('contact.successBody')}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4 border border-white/10 bg-luxury-bg-dark/40 p-6 md:p-8 rounded-xl'
            >
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='name'
                  className='block text-base lg:text-sm font-medium text-luxury-text-inverse mb-2'
                >
                  {t('contact.labels.name')} <span className='text-red-500'>*</span>
                </label>
                <input
                  id='name'
                  type='text'
                  {...register('name', {
                    required: t('validation.required'),
                    minLength: {
                      value: 2,
                      message: t('validation.minLength').replace('{{count}}', '2'),
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-3 bg-white/3 text-luxury-text-inverse placeholder-white/40 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-(--brand-accent)/80 focus:border-transparent touch-target-mobile ${
                    errors.name ? 'border-red-500/70' : 'border-white/10'
                  }`}
                  placeholder={t('contact.placeholders.name')}
                />
                {errors.name && (
                  <p className="text-base md:text-sm text-red-400 mt-2">{errors.name.message}</p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='email'
                  className='block text-base lg:text-sm font-medium text-luxury-text-inverse mb-2'
                >
                  {t('contact.labels.email')} <span className='text-red-500'>*</span>
                </label>
                <input
                  id='email'
                  type='email'
                  {...register('email', {
                    required: t('validation.required'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('validation.email'),
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-3 bg-white/3 text-luxury-text-inverse placeholder-white/40 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-(--brand-accent)/80 focus:border-transparent touch-target-mobile ${
                    errors.email ? 'border-red-500/70' : 'border-white/10'
                  }`}
                  placeholder={t('contact.placeholders.email')}
                />
                {errors.email && (
                  <p className="text-base md:text-sm text-red-400 mt-2">{errors.email.message}</p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='message'
                  className='block text-base lg:text-sm font-medium text-luxury-text-inverse mb-2'
                >
                  {t('contact.labels.message')} <span className='text-red-500'>*</span>
                </label>
                <textarea
                  id='message'
                  rows={4}
                  {...register('message', {
                    required: t('validation.required'),
                    minLength: {
                      value: 10,
                      message: t('validation.minLength').replace('{{count}}', '10'),
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-3 bg-white/3 text-luxury-text-inverse placeholder-white/40 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-(--brand-accent)/80 focus:border-transparent resize-none touch-target-mobile ${
                    errors.message ? 'border-red-500/70' : 'border-white/10'
                  }`}
                  placeholder={t('contact.placeholders.message')}
                />
                {errors.message && (
                  <p className='text-base md:text-sm text-red-400'>{errors.message.message}</p>
                )}
              </div>

              <div className='flex items-start gap-2 mt-2'>
                <div className='min-h-11 min-w-11 flex items-start justify-center pt-2'>
                  <input
                    type='checkbox'
                    id='privacy'
                    required
                    className='w-4 h-4 rounded border-white/20 bg-white/5 text-[var(--accent-chrome)] focus:ring-[var(--accent-chrome)]/50' 
                  />
                </div>
                <label htmlFor='privacy' className='text-base md:text-sm text-luxury-text-inverse/70'>
                  I have read and accept the{' '}
                  <a
                    href='/datenschutz'
                    className='underline hover:text-(--brand-accent) transition-colors duration-200 inline-block min-h-11 py-2'
                  >
                    privacy policy
                  </a>{' '}
                  *
                </label>
              </div>

              {submitError && (
                <div className='bg-red-500/10 border border-red-500/60 text-red-300 rounded-lg px-4 py-4'>
                  <p className='text-base md:text-sm'>{submitError}</p>
                </div>
              )}

              <Button
                type='submit'
                variant='chrome'
                className='w-full text-base rounded-lg h-12 mt-2'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : '→ Send'}
              </Button>
            </form>
          )}
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default ContactPage;
