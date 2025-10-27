import React from 'react';
import { motion } from 'framer-motion';

interface ArtworkItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  tags: string[];
}

interface ArtistPortfolioProps {
  artworks: ArtworkItem[];
  onArtworkClick: (artwork: ArtworkItem) => void;
}

export const ArtistPortfolio: React.FC<ArtistPortfolioProps> = ({ artworks, onArtworkClick }) => {
  return (
    <div className='py-16'>
      <div className='max-w-[1104px] mx-auto px-8 sm:px-8 lg:px-8'>
        <h2 className='text-3xl font-headline text-brand-gold mb-8'>Portfolio</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {artworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              layoutId={`artwork-${artwork.id}`}
              whileHover={{ scale: 1.02 }}
              className='group cursor-pointer'
              onClick={() => onArtworkClick(artwork)}
            >
              <div className='aspect-square relative overflow-hidden rounded-xl flex flex-col h-full'>
                {/* Image */}
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className='w-full h-full object-cover transition-transform duration-500 
                           group-hover:scale-110'
                />

                {/* Overlay */}
                <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent \n                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col h-full'>
                  <div className='absolute bottom-0 left-0 right-0 p-8'>
                    <h3 className='text-brand-gold font-headline text-lg mb-0'>{artwork.title}</h3>
                    {artwork.description && (
                      <p className='text-brand-white text-sm line-clamp-2'>{artwork.description}</p>
                    )}

                    {/* Tags */}
                    <div className='flex flex-wrap gap-0 mt-0'>
                      {artwork.tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-xs px-0 py-0 rounded-full bg-brand-gold/20 text-brand-gold flex flex-col h-full'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
