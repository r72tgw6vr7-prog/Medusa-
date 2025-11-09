import React from 'react';

export function UniversalTextureBackground() {
  return (
    <>
      {/* Layer 0: Texture */}
      <div
        className='fixed pointer-events-none inset-0 min-h-screen w-screen overflow-hidden'
        data-texture-bg
        style={{
          backgroundImage: "url('/texture.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0)', // Forces GPU acceleration
          zIndex: 0,
          margin: 0,
          padding: 0,
        }}
        aria-hidden='true'
      />

      {/* Layer 1: 20% black overlay */}
      <div
        className='fixed pointer-events-none inset-0 min-h-screen w-screen overflow-hidden'
        data-texture-bg
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1,
          margin: 0,
          padding: 0,
        }}
        aria-hidden='true'
      />
    </>
  );
}
