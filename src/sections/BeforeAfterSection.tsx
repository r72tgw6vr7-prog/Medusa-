import React from 'react';
import { BeforeAfterCard } from '@/components/molecules/BeforeAfterCard';

interface BeforeAfterImage {
  id: string;
  beforeImage: string;
  afterImage: string;
  title?: string;
  artist?: string;
}

interface BeforeAfterSectionProps {
  title: string;
  subtitle?: string;
  images: BeforeAfterImage[];
  className?: string;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  title,
  subtitle,
  images,
  className = '',
}) => {
  return (
    <section className={`container mx-auto px-4 py-16 ${className}`}>
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-8'>{title}</h2>
        {subtitle && <p className='text-lg text-gray-600 max-w-2xl mx-auto'>{subtitle}</p>}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {images.map((image) => (
          <BeforeAfterCard
            key={image.id}
            beforeImage={image.beforeImage}
            afterImage={image.afterImage}
            title={image.title}
            artist={image.artist}
          />
        ))}
      </div>
    </section>
  );
};

export default BeforeAfterSection;
