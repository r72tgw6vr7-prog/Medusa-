import React from 'react';

export function UniversalTextureBackground() {
  return (
    <>
      {/* Layer 0: Texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/texture.webp')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      
      {/* Layer 1: 20% black overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
    </>
  );
}
