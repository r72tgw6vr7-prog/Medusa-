import React from 'react';
import { Icon } from '../atoms/Icon';
import { Card } from '../ui/Card';

interface ContactInfoCardProps {
  icon: string;
  title: string;
  value: string;
  href?: string;
  className?: string;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  icon: _icon,
  title,
  value,
  href,
  className = '',
}) => {
  const content = (
    <Card variant="default" size="sm" asChild>
      <div className={`flex items-start ${className}`}>
        <Icon size={24} className='text-brand-accent mr-4 md:mr-6' />
        <div className='flex flex-col'>
          <span className='text-brand-chrome text-sm mb-0'>{title}</span>
          <span className='text-luxury-text-inverse text-base'>{value}</span>
        </div>
      </div>
    </Card>
  );

  if (href) {
    return (
      <a
        href={href}
        className='block hover:opacity-90 transition-opacity duration-200 ease-out'
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
