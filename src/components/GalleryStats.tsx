import React from 'react';
import { getStats } from '../utils/galleryUtils';

export const GalleryStats: React.FC = () => {
  const stats = getStats();

  return (
    <div className="bg-[var(--deep-black)]/90 backdrop-blur-md border border-[var(--brand-gold)]/20 rounded-xl p-8 mb-8">
      <h3 className="text-[var(--brand-gold)] text-lg font-semibold mb-8">📊 Portfolio Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className='text-2xl font-bold text-white'>{stats.totalImages}</div>
          <div className='text-sm text-white/60'>Total Works</div>
        </div>
        
        <div>
          <div className='text-2xl font-bold text-[var(--brand-gold)]'>{stats.featured}</div>
          <div className='text-sm text-white/60'>Featured</div>
        </div>
        
        <div>
          <div className='text-2xl font-bold text-white'>{Object.keys(stats.byArtist).length}</div>
          <div className='text-sm text-white/60'>Artists</div>
        </div>
        
        <div>
          <div className='text-2xl font-bold text-white'>{(stats.totalSize / 1024 / 1024).toFixed(0)}MB</div>
          <div className='text-sm text-white/60'>Portfolio</div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex flex-wrap gap-0">
          {Object.entries(stats.byArtist).map(([artist, count]) => (
            <span 
              key={artist}
              className="px-0 py-0 rounded-full bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/20 text-[var(--brand-gold)] text-xs"
            >
              {artist}: {count.toString()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};