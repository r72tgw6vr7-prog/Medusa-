import React from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen = false,
  onToggle,
  className = '',
}) => {
  return (
    <div className={`border-b border-brand-chrome/20 ${className}`}>
      <button
        type='button'
        className='w-full text-left py-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent'
        onClick={onToggle}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={`answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium pr-8 text-brand-accent'>{question}</h3>
          <span
            className={`transform transition-transform duration-200 text-brand-chrome ${isOpen ? 'rotate-180' : ''}`}
          >
            ↓
          </span>
        </div>
      </button>
      <div
        id={`answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className='py-8 text-luxury-text-inverse/80'>{answer}</div>
      </div>
    </div>
  );
};

export default FAQItem;
