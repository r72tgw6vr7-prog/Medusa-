import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterCardProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  artist?: string;
  onCardClick?: () => void;
  className?: string;
}

export const BeforeAfterCard: React.FC<BeforeAfterCardProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher',
  title,
  artist,
  onCardClick,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLButtonElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      updateSliderPosition(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    }
  };

  const updateSliderPosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const position = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(position, 0), 100));
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <button
      className={`relative overflow-hidden rounded-2xl cursor-pointer group block w-full ${className}`}
      onClick={onCardClick}
      ref={containerRef}
      aria-label={title ? `Vorher-Nachher-Vergleich: ${title}` : 'Vorher-Nachher-Vergleich'}
    >
      <div className='relative w-full aspect-square'>
        {/* After Image (Full) */}
        <img
          src={afterImage}
          alt='Nach der Behandlung'
          className='absolute inset-0 w-full h-full object-cover'
        />

        {/* Before Image (Clipped) */}
        <div className='absolute inset-0 overflow-hidden' style={{ width: `${sliderPosition}%` }}>
          <img
            src={beforeImage}
            alt='Vor der Behandlung'
            className='absolute inset-0 w-full h-full object-cover'
          />
        </div>

        {/* Slider Control */}
        <div
          role='slider'
          tabIndex={0}
          aria-label='Vergleichsregler'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          className='absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize'
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onKeyDown={handleKeyDown}
        >
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center'>
              <span className='text-[var(--deep-black)] text-xs'>↔</span>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className='absolute top-4 left-4 bg-[#1A1A1A] bg-opacity-90 px-0 py-0 rounded-full'>
          <span className='text-white text-sm'>{beforeLabel}</span>
        </div>
        <div className='absolute top-4 right-4 bg-[#1A1A1A] bg-opacity-90 px-0 py-0 rounded-full'>
          <span className='text-white text-sm'>{afterLabel}</span>
        </div>
      </div>

      {/* Caption */}
      {(title || artist) && (
        <div className='absolute bottom-0 inset-x-0 bg-linear-to-t from-black to-transparent p-8'>
          {title && <h3 className='text-white text-lg font-bold'>{title}</h3>}
          {artist && <p className='text-[var(--brand-gold)] text-sm'>{artist}</p>}
        </div>
      )}
    </button>
  );
};

export default BeforeAfterCard;
