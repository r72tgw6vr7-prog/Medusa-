import React from 'react';
import { Icon } from '../atoms/Icon';

interface ContactInfoCardProps {
  icon: string;
  title: string;
  value: string;
  href?: string;
  className?: string;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  icon,
  title,
  value,
  href,
  className = '',
}) => {
  const content = (
    <div
      className={`flex items-start p-6 bg-[var(--deep-black)] rounded-lg border border-solid border-[#C0BFBF33] ${className}`}
    >
      <Icon size={24} className='text-[var(--brand-gold)] mr-8' />
      <div className='flex flex-col'>
        <span className='text-[#C0BFBF] text-sm mb-0'>{title}</span>
        <span className='text-white text-base'>{value}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className='block hover:opacity-90 transition-opacity transition duration-200 ease-out'
        target='_blank'
        rel='noopener noreferrer'
      >
        {content}
      </a>
    );
  }

  return content;
};

export default ContactInfoCard;
