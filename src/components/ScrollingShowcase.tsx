import React, { useEffect, useRef, useState } from 'react';
import './styles/ScrollingShowcase.css';

interface ShowcaseImage {
  src: string;
  alt: string;
}

interface ScrollingShowcaseProps {
  images?: ShowcaseImage[];
  className?: string;
}

// Default showcase images (replace these with your actual images)
const DEFAULT_IMAGES: ShowcaseImage[] = [
  { src: '/assets/images/icons/placeholder.svg', alt: 'Showcase Image 1' },
  { src: '/assets/images/icons/placeholder.svg', alt: 'Showcase Image 2' },
  { src: '/assets/images/icons/placeholder.svg', alt: 'Showcase Image 3' },
  { src: '/assets/images/icons/placeholder.svg', alt: 'Showcase Image 4' },
  { src: '/assets/images/icons/placeholder.svg', alt: 'Showcase Image 5' },
  { src: '/assets/images/icons/placeholder.svg', alt: 'Showcase Image 6' },
  { src: '/assets/images/icons/placeholder.svg', alt: 'Showcase Image 7' },
  { src: '/assets/images/icons/placeholder.svg', alt: 'Showcase Image 8' },
];

// Duplicate the images to create a seamless scroll effect
const createDuplicatedImages = (images: ShowcaseImage[]): ShowcaseImage[] => {
  return [...images, ...images];
};

export const ScrollingShowcase: React.FC<ScrollingShowcaseProps> = ({
  images = DEFAULT_IMAGES,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const duplicatedImages = createDuplicatedImages(images);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Calculate a dynamic scroll speed based on the container width
    // This ensures consistent scrolling speed regardless of screen size or number of images
    const containerWidth = scrollContainer.scrollWidth;
    const scrollSpeed = containerWidth / 20000; // Adjust the divisor to control the overall speed
    
    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (lastTime === 0) {
        lastTime = currentTime;
      }
      
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      if (!isPaused) {
        setScrollPosition(prevPos => {
          // Use deltaTime to ensure smooth and consistent scrolling
          let newPos = prevPos + scrollSpeed * deltaTime;
          
          // Reset position when we've scrolled too far
          // Use container width / 3 since we're duplicating the images
          if (newPos >= containerWidth / 2) {
            newPos = 0;
          }
          
          return newPos;
        });
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start the animation
    animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  // Handle hover effects
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className={`showcase-wrap ${className}`}>
      <div 
        ref={scrollRef}
        className="showcase-scroll"
        style={{
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          transform: `translate3d(-${scrollPosition}px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Group images in pairs within showcase-data divs */}
        {Array.from({ length: Math.ceil(duplicatedImages.length / 2) }).map((_, groupIndex) => {
          const startIdx = groupIndex * 2;
          return (
            <div key={`showcase-group-${groupIndex}`} className="showcase-data">
              {duplicatedImages.slice(startIdx, startIdx + 2).map((image, imageIndex) => (
                <div 
                  key={`showcase-img-${startIdx + imageIndex}`}
                  className="showcase-img"
                  data-w-id={`showcase-img-${startIdx + imageIndex}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="showcase-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/icons/placeholder.svg';
                    }}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollingShowcase;
