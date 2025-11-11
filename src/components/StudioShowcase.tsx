import React, { useState, useEffect } from 'react';
import '../styles/StudioShowcase.css';
import { IMAGE_PATHS } from '../config/imagePaths';

// Use stable image references to prevent unnecessary re-renders
const FALLBACK_IMAGE = '/assets/images/icons/placeholder.svg';

export interface StudioShowcaseProps {
  /** Optional heading to display at the top */
  heading?: string;
  /** Optional custom class name */
  className?: string;
}

// Use optimized assets from the new consolidated structure
// These are the 3 most important studio images
const studioImages = [
  IMAGE_PATHS.studio.interior1,
  IMAGE_PATHS.studio.interior2,
  IMAGE_PATHS.studio.interior3,
];

// Studio facts for the counter section with proper icons paths and fallbacks
const studioStats = [
  {
    // Use SVG icons with fallback paths
    icon: '/icons/satisfy.svg',
    fallbackIcon: '/assets/images/icons/placeholder.svg', 
    count: '1250+',
    label: 'Satisfied Customers'
  },
  {
    icon: '/icons/experience.svg',
    fallbackIcon: '/assets/images/icons/placeholder.svg',
    count: '14',
    label: 'Years of Experience'
  },
  {
    icon: '/icons/collection.svg',
    fallbackIcon: '/assets/images/icons/placeholder.svg',
    count: '2,000',
    label: 'Tattoos & Artworks Collection'
  },
  {
    icon: '/icons/team.svg',
    fallbackIcon: '/assets/images/icons/placeholder.svg',
    count: '25+',
    label: 'The Awesome Team'
  }
];

// Studio workflow steps
const workflowSteps = [
  {
    title: 'Consultation',
    description: 'Turning your ideas into a creative blueprint.'
  },
  {
    title: 'Design',
    description: 'Crafting custom artwork to match your vision.'
  },
  {
    title: 'Tattooing',
    description: 'Precision ink application in a hygienic environment.'
  },
  {
    title: 'Aftercare',
    description: 'Ensuring your tattoo heals beautifully and lasts.'
  }
];

export const StudioShowcase: React.FC<StudioShowcaseProps> = ({ 
  heading = 'MEDUSA',
  className = ''
}) => {
  // State for managing the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === studioImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="studio-section-wrapper">
      {/* Studio Story Section */}
      <section className="studio-story-section">
        <div className="container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left content - Studio story */}
            <div className="story-content">
              <h2 className="section-title mb-8">Our Story</h2>
              <h3 className="section-subtitle mb-8">Dedicated professionals bringing your tattoo ideas to life with skill and care</h3>
              
              <div className="story-images grid grid-cols-3 gap-8 mb-8">
                {studioImages.map((src, index) => (
                  <div 
                    key={`story-image-${src.substring(src.lastIndexOf('/') + 1)}-${index}`} 
                    className="studio-thumbnail flex flex-col h-full"
                  >
                    <img 
                      src={src} 
                      alt={`Studio Interior ${index + 1}`} 
                      className="w-full h-40 object-cover rounded-md shadow-md flex flex-col h-full"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                        e.currentTarget.dataset.usedFallback = 'true';
                      }}
                    />
                  </div>
                ))}
              </div>
              
              <div className="studio-hours mb-8">
                <h4 className="text-lg font-semibold mb-8">Operational Hour</h4>
                <div className="grid grid-cols-2 gap-x-8">
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-brand-magenta">07AM - 10PM</p>
                  </div>
                  <div>
                    <p className="font-medium">Saturday</p>
                    <p className="text-brand-magenta">09AM - 10PM</p>
                  </div>
                  <div className="mt-0">
                    <p className="font-medium">Sunday</p>
                    <p className="text-brand-magenta">Closed</p>
                  </div>
                </div>
              </div>
              
              <p className="studio-description mb-8">
                With a team of talented tattoo artists who blend skill with passion, we specialize in crafting bespoke tattoos that reflect your individuality. Whether you're drawn to bold designs, intricate details, or meaningful symbols.
              </p>
              
              <a 
                href="/about" 
                className="about-link px-8 py-8 rounded-md bg-brand-magenta text-white font-medium hover:bg-brand-magenta-hover transition-all duration-300 inline-block flex flex-col h-full"
              >
                About us
              </a>
            </div>
            
            {/* Right content - Large image & Stats */}
            <div className="studio-visual">
              <div className="main-image-container mb-8 flex flex-col h-full">
                <img 
                  src={studioImages[0]}
                  alt="Tattoo Studio Interior" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg flex flex-col h-full"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                    // Add a class for styling empty placeholders
                    e.currentTarget.classList.add('placeholder-image');
                    // Add data attribute for debugging
                    e.currentTarget.dataset.usedFallback = 'true';
                  }}
                />
              </div>
              
              <div className="studio-stats grid grid-cols-2 gap-x-8 gap-y-8">
                {studioStats.map((stat, index) => (
                  <div key={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`} className="stat-item flex flex-col items-center h-full">
                    <div className="stat-icon bg-brand-primary p-0 rounded-full mb-8 flex items-center justify-center w-16 h-16 flex-col h-full">
                      <img 
                        src={stat.icon} 
                        alt={`${stat.label} icon`} 
                        className="w-8 h-8" 
                        onError={(e) => {
                          // Use the fallback icon defined in the stat object
                          e.currentTarget.src = stat.fallbackIcon || FALLBACK_IMAGE;
                          // Add data attribute for debugging
                          e.currentTarget.dataset.usedFallback = 'true';
                        }}
                      />
                    </div>
                    <h3 className="stat-count text-3xl font-bold">{stat.count}</h3>
                    <p className="stat-label text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tattoo Workflow Section */}
      <section className="workflow-section bg-gray-100 py-16">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-8">Tattoo Workflow</h2>
            <p className="max-w-3xl mx-auto">
              We believe that creating a tattoo is a journey that requires collaboration, creativity, and precision.
              Our process is designed to ensure that every customer receives a unique and meaningful piece of art.
            </p>
          </div>
          
          <div className="workflow-steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div 
                key={`workflow-${step.title.toLowerCase().replace(/\s+/g, '-')}`} 
                className="step-item bg-white p-8 rounded-lg shadow-md flex flex-col h-full"
                /* Card elements need flex flex-col h-full for proper layout per lint rule */
              >
                <div className="step-number text-brand-primary text-5xl font-bold mb-8">{index + 1}</div>
                <h3 className="step-title text-xl font-semibold mb-8">{step.title}</h3>
                <p className="step-description flex-grow">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="workflow-images grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {studioImages.map((src, index) => (
              <div 
                key={`process-${src.substring(src.lastIndexOf('/') + 1)}-${index}`} 
                className="process-image-container flex flex-col h-full"
                /* Adding flex flex-col h-full per lint requirements */
              >
                <img 
                  src={src} 
                  alt={`Tattoo Process Step ${index + 1}`} 
                  className="w-full h-64 object-cover rounded-lg shadow-md grow flex flex-col h-full"
                  onError={(e) => {
                    // Use placeholder image and add styling for better visualization
                    e.currentTarget.src = FALLBACK_IMAGE;
                    e.currentTarget.classList.add('placeholder-image');
                    // Center the placeholder
                    e.currentTarget.style.objectFit = 'contain';
                    e.currentTarget.style.padding = '24px';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                    // Add data attribute for debugging
                    e.currentTarget.dataset.usedFallback = 'true';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Studio Showcase Carousel */}
      <section
        className={`relative w-full studio-showcase h-[350px] md:h-[450px] lg:h-[600px] mb-0 overflow-hidden ${className}`}
        aria-label={`${heading} Interior Showcase`}
        data-texture-bg
        data-component-type="StudioShowcase"
      >
        {/* Background image carousel */}
        <div className='absolute inset-0 studio-carousel-container'>
          {studioImages.map((src, index) => {
            const isActive = index === currentImageIndex;
            const uniqueId = `carousel-${src.substring(src.lastIndexOf('/') + 1)}-${index}`;
            return (
              <div
                key={uniqueId}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out studio-carousel-image ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${src})` }}
                aria-label={`Medusa Tattoo Studio Interior ${index + 1}`}
                data-image-id={uniqueId}
              >
                <img 
                  src={src} 
                  alt={`${heading} Studio Interior ${index + 1}`} 
                  className="hidden" // Hidden but provided for SEO/accessibility
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                    // Add data attribute for debugging
                    e.currentTarget.dataset.usedFallback = 'true';
                  }}
                  loading="eager" // Ensure images load eagerly to prevent flickering
                />
              </div>
            );
          })}
        </div>

        {/* Studio name overlay with readability background */}
        <div className='absolute inset-0 flex items-center justify-center bg-black/30 z-10 pointer-events-none studio-overlay'>
          <h1
            className='font-playfair text-5xl md:text-6xl lg:text-8xl font-bold text-brand-magenta tracking-widest medusa-logo'
            aria-label={`${heading} Tattoo Studio`}
          >
            {heading}
          </h1>
        </div>

        {/* Content container (kept for optional tagline and dots) */}
        <div className='relative h-full flex flex-col items-center justify-center z-20'>
          {/* Navigation dots - absolute bottom centered */}
          <div className='flex space-x-0 absolute bottom-8 left-1/2 -translate-x-1/2'>
            {studioImages.map((src, index) => {
              const isActive = index === currentImageIndex;
              return (
                <button
                  key={`carousel-dot-${src.substring(src.lastIndexOf('/') + 1)}-${index}`}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-magenta'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`View studio image ${index + 1}`}
                  aria-current={isActive ? "true" : "false"}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudioShowcase;
