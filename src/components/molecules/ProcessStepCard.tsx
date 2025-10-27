import React from 'react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

interface ProcessStepCardProps {
  number: number;
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  isActive?: boolean;
  isComplete?: boolean;
  isLast?: boolean;
  className?: string;
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  number,
  title,
  description,
  icon: IconComponent,
  isActive = false,
  isComplete = false,
  isLast = false,
  className = '',
}) => {
  return (
    <div className={`flex ${isLast ? '' : 'mb-8'} ${className}`}>
      {/* Step Number Circle */}
      <div
        className={`
        shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${isActive || isComplete ? 'bg-[#D4AF37]' : 'bg-[#222222] border border-[#D4AF37]'}
        ${isComplete ? 'text-white' : ''}
      `}
      >
        {isComplete ? (
          <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        ) : (
          <span className='text-white font-bold'>{number}</span>
        )}
      </div>

      {/* Vertical Line Connector */}
      {!isLast && (
        <div className='absolute ml-8 mt-8 w-0.5 h-16 bg-linear-to-b from-[#D4AF37] to-[#222222]' />
      )}

      {/* Content */}
      <div className='ml-8'>
        <div className='flex items-center mb-0'>
          <IconComponent size={32} className='text-[#D4AF37] mr-0' />
          <h3 className={`text-xl font-bold ${isActive ? 'text-[#D4AF37]' : 'text-white'}`}>
            {title}
          </h3>
        </div>
        <p className='text-[#C0BFBF] text-base max-w-md'>{description}</p>
      </div>
    </div>
  );
};

export default ProcessStepCard;
