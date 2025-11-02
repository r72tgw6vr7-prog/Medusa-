import { SalonCarousel } from '../organisms/SalonCarousel';

// Add type declaration for Vite's import.meta.env
interface ImportMetaEnv {
  DEV: boolean;
  PROD: boolean;
  MODE: string;
}

// Example custom images (optional)
const customImages = [
  {
    src: '/images/salon/image1.jpg',
    alt: 'Custom salon image 1',
    caption: 'Our main salon area',
  },
  {
    src: '/images/salon/image2.jpg',
    alt: 'Custom salon image 2',
    caption: 'Professional workstations',
  },
];

export function SalonCarouselExample() {
  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-xl mb-8'>Default SalonCarousel</h2>
        <SalonCarousel />
      </div>

      <div>
        <h2 className='text-xl mb-8'>Custom SalonCarousel</h2>
        <SalonCarousel
          images={customImages}
          autoplay={true}
          autoplayInterval={3000}
          pauseOnHover={true}
          showArrows={true}
          showIndicators={true}
          heading='OUR SALON'
          onSlideChange={(index) => {
            if (import.meta.env.DEV) {
              console.log(`Slide changed to ${index}`);
            }
          }}
        />
      </div>

      <div>
        <h2 className='text-xl mb-8'>Minimal SalonCarousel</h2>
        <SalonCarousel showArrows={false} showIndicators={false} autoplay={false} heading='' />
      </div>
    </div>
  );
}
