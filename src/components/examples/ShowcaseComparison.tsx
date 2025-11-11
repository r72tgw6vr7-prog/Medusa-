import React from 'react';
import { StudioShowcase } from '../StudioShowcase';
import { SalonCarousel } from '../organisms/SalonCarousel';

/**
 * Component to directly compare StudioShowcase and SalonCarousel to identify conflicts
 * This helps visualize how both components use the same resources and might conflict
 */
export function ShowcaseComparison() {
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-16">Component Comparison</h1>
        
        <div className="mb-32">
          <h2 className="text-2xl font-bold text-white mb-8">StudioShowcase Component</h2>
          <div className="p-8 border border-dashed border-white/20 rounded-lg">
            <StudioShowcase 
              heading="STUDIO"
              className="rounded-lg overflow-hidden"
            />
          </div>
        </div>
        
        <div className="mb-32">
          <h2 className="text-2xl font-bold text-white mb-8">SalonCarousel Component</h2>
          <div className="p-8 border border-dashed border-white/20 rounded-lg">
            <SalonCarousel 
              heading="SALON"
              images={[
                {
                  src: '/images/studio/studio-interior-1.jpg',
                  alt: 'Studio Interior 1',
                  caption: 'Main Studio Area'
                },
                {
                  src: '/images/studio/studio-interior-2.jpg',
                  alt: 'Studio Interior 2',
                  caption: 'Workspace'
                },
                {
                  src: '/images/studio/studio-interior-3.jpg',
                  alt: 'Studio Interior 3',
                  caption: 'Client Area'
                }
              ]}
            />
          </div>
        </div>
        
        <div className="mb-32">
          <h2 className="text-2xl font-bold text-white mb-8">InkedStorySection Component (Reference)</h2>
          <div className="p-8 border border-dashed border-white/20 rounded-lg">
            {/* Commented out to prevent further conflicts */}
            {/* <InkedStorySection /> */}
            <p className="text-white">Component not shown to avoid further conflicts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseComparison;
