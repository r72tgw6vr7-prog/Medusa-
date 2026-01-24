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
  const controlsId = `answer-${question.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`border-b border-brand-chrome/20 ${className}`}>
      {isOpen ? (
        <button
          type='button'
          className='w-full text-left py-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent'
          onClick={onToggle}
          aria-expanded="true"
          aria-controls={controlsId}
        >
          <div className='flex items-center justify-between'>
            <h3 className='font-headline text-(length:--text-lg) font-medium pr-8 text-brand-accent'>
              {question}
            </h3>
            <span className='transform transition-transform duration-200 text-brand-chrome rotate-180'>
              ↓
            </span>
          </div>
        </button>
      ) : (
        <button
          type='button'
          className='w-full text-left py-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent'
          onClick={onToggle}
          aria-expanded="false"
          aria-controls={controlsId}
        >
          <div className='flex items-center justify-between'>
            <h3 className='font-headline text-(length:--text-lg) font-medium pr-8 text-brand-accent'>
              {question}
            </h3>
            <span className='transform transition-transform duration-200 text-brand-chrome'>
              ↓
            </span>
          </div>
        </button>
      )}
      <div
        id={controlsId}
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className='py-8 text-(length:--text-body) text-luxury-text-inverse/80 leading-(--line-height-normal) font-body'>
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
