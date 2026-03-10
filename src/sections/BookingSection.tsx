import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';

interface BookingSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  return (
    <section className={`container mx-auto px-4 py-16 ${className}`}>
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-8'>{title}</h2>
        {subtitle && (
          <p className='text-lg text-luxury-text-secondary max-w-2xl mx-auto'>{subtitle}</p>
        )}
      </div>

      <div className='flex justify-center'>
        <Button
          variant='chrome'
          size='lg'
          onClick={() => navigate(localizePath('/booking', language))}
        >
          {t('common.sharedSections.bookingSection.cta')}
        </Button>
      </div>
    </section>
  );
};

export default BookingSection;
