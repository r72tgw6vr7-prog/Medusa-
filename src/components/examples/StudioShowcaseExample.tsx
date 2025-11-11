import React from 'react';
import { StudioShowcase } from '../StudioShowcase';

export function StudioShowcaseExample() {
  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-xl mb-8'>Default Studio Showcase</h2>
        <StudioShowcase />
      </div>

      <div>
        <h2 className='text-xl mb-8'>Customized Studio Showcase</h2>
        <StudioShowcase 
          heading="INKED"
          className="custom-showcase-theme"
        />
      </div>
    </div>
  );
}

export default StudioShowcaseExample;
