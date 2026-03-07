import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  className?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ onSubmit, className = '' }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError(t('common.newsletterForm.errorRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('common.newsletterForm.errorInvalid'));
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(email);
      setIsSuccess(true);
      setEmail('');
    } catch {
      setError(t('common.newsletterForm.errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor='newsletter-email' className='sr-only'>
          {t('common.newsletterForm.emailLabel')}
        </label>
        <div className='relative'>
          <input
            id='newsletter-email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('common.newsletterForm.emailPlaceholder')}
            className={`w-full px-4 py-3 rounded-lg bg-white/10 border
              ${error ? 'border-red-500' : 'border-brand-chrome/30'}
              text-luxury-text-inverse placeholder-luxury-text-inverse/50 focus:outline-none focus:ring-2 focus:ring-brand-accent`}
            required
            disabled={isSubmitting}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'newsletter-error' : undefined}
          />
          {error && (
            <p id='newsletter-error' className='mt-0 text-sm text-red-500' role='alert'>
              {error}
            </p>
          )}
          {isSuccess && (
            <p className='mt-0 text-sm text-green-500' role='status'>
              {t('common.newsletterForm.success')}
            </p>
          )}
        </div>
      </div>

      <button
        type='submit'
        disabled={isSubmitting || isSuccess}
        className={`w-full px-6 py-3 text-base font-medium rounded-lg
          ${
            isSuccess
              ? 'bg-[var(--accent-chrome)] text-[var(--deep-black)] cursor-default'
              : 'bg-[var(--accent-chrome)] text-luxury-text-inverse hover:bg-[var(--accent-chrome)]/80'
          } transition-colors disabled:opacity-50`}
      >
        {isSubmitting
          ? t('common.newsletterForm.submitting')
          : isSuccess
            ? t('common.newsletterForm.subscribed')
            : t('common.newsletterForm.subscribe')}
      </button>
    </form>
  );
};

export default NewsletterForm;
