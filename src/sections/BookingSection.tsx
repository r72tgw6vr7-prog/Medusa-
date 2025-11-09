import React from 'react';
import { BookingForm } from '@/components/organisms/BookingForm/BookingForm';

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
  return (
    <section className={`container mx-auto px-4 py-16 ${className}`}>
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-8'>{title}</h2>
        {subtitle && <p className='text-lg text-gray-600 max-w-2xl mx-auto'>{subtitle}</p>}
      </div>

      <BookingForm />
    </section>
  );
};

export default BookingSection;
