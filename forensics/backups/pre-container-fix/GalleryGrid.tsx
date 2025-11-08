import React, { useState } from 'react';
import Button from '../atoms/Button/Button';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  artist: string;
  year: string;
  featured?: boolean;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick?: (image: GalleryImage) => void;
  className?: string;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  onImageClick,
  className = '',
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  const categories = ['all', ...new Set(images.map((img) => img.category))];

  const filteredImages = images
    .filter((img) => filter === 'all' || img.category === filter)
    .sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      return sortBy === 'latest' ? yearB - yearA : yearA - yearB;
    });

  return (
    <div className={className}>
      {/* Filters */}
      <div className='flex flex-wrap items-center gap-8 mb-8'>
        <div className='flex flex-wrap gap-0'>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'primary' : 'secondary'}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>

        <div className='ml-auto'>
          <Button
            variant='secondary'
            onClick={() => setSortBy(sortBy === 'latest' ? 'oldest' : 'latest')}
          >
            {sortBy === 'latest' ? 'Newest First' : 'Oldest First'}
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className='relative group cursor-pointer'
            onClick={() => onImageClick?.(image)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onImageClick?.(image)}
          >
            {/* Featured Badge */}
            {image.featured && (
              <div className='absolute top-3.5 left-3.5 z-10 flex flex-col h-full'>
                <div className='flex flex-col h-full w-20 h-8 flex items-center justify-center rounded-full bg-brand-gold text-brand-background text-xs font-bold'>
                  Featured
                </div>
              </div>
            )}

            {/* Image */}
            <div className='aspect-square rounded-2xl overflow-hidden flex flex-col h-full'>
              <img
                src={image.imageUrl}
                alt={`${image.title} by ${image.artist}`}
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                loading='lazy'
                decoding='async'
                sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw'
              />
            </div>

            {/* Hover Overlay */}
            <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center flex-col h-full'>
              <div className='text-center'>
                <h3 className='text-white text-lg font-bold'>{image.title}</h3>
                <p className='text-[var(--brand-gold)]'>{image.artist}</p>
              </div>
            </div>

            {/* Caption */}
            <div className='mt-0'>
              <p className='text-white text-xs'>
                {`${image.title} by ${image.artist}, ${image.year}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
