import React from 'react';
import { FAQAccordion } from '@/components/organisms/FAQAccordion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  items: FAQ[];
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  subtitle,
  items,
  className = '',
}) => {
  return (
    <section className={`container mx-auto px-4 py-16 ${className}`}>
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-8'>{title}</h2>
        {subtitle && <p className='text-lg text-gray-600 max-w-2xl mx-auto'>{subtitle}</p>}
      </div>

      <div className='max-w-3xl mx-auto'>
        <FAQAccordion items={items} allowMultiple={false} />
      </div>
    </section>
  );
};

export default FAQSection;
