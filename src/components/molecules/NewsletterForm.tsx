import React, { useState } from 'react';

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  className?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ onSubmit, className = '' }) => {
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
      setError('Bitte geben Sie Ihre E-Mail-Adresse ein');
      return;
    }

    if (!validateEmail(email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(email);
      setIsSuccess(true);
      setEmail('');
    } catch (_err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor='newsletter-email' className='sr-only'>
          E-Mail Adresse
        </label>
        <div className='relative'>
          <input
            id='newsletter-email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Ihre E-Mail-Adresse'
            className={`w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border
              ${error ? 'border-red-500' : 'border-gray-600'}
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]`}
            required
            disabled={isSubmitting}
            aria-invalid={!!error}
            aria-describedby={error ? 'newsletter-error' : undefined}
          />
          {error && (
            <p id='newsletter-error' className='mt-0 text-sm text-red-500' role='alert'>
              {error}
            </p>
          )}
          {isSuccess && (
            <p className='mt-0 text-sm text-green-500' role='status'>
              Danke für Ihre Anmeldung!
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
              ? 'bg-[var(--brand-gold)] text-[var(--deep-black)] cursor-default'
              : 'bg-[var(--brand-gold)] text-white hover:bg-[#B69121]'
          } transition-colors disabled:opacity-50`}
      >
        {isSubmitting
          ? 'Wird angemeldet...'
          : isSuccess
            ? 'Erfolgreich angemeldet'
            : 'Newsletter abonnieren'}
      </button>
    </form>
  );
};

export default NewsletterForm;
