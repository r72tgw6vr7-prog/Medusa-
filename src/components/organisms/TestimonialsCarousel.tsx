import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Card } from '@/components/ui/Card';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import '@/styles/testimonials.css';

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  source: string;
  rating: number;
  date: string;
  service?: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: 1,
    text: 'Das Studio ist extrem sauber und modern. Die Piercerin war super freundlich und hat sich viel Zeit genommen. Ich habe mich die ganze Zeit wohl gefühlt – perfekt für meinen ersten Piercing in München!',
    author: 'Sarah M.',
    source: 'Wheree.com aggregated reviews',
    rating: 5,
    date: 'January 2026',
  },
  {
    id: 2,
    text: 'Ich empfehle dieses Studio gerne. Eine wunderbare Arbeit wurde mir auf dem rechten Oberarm gemacht. Perfektion bis ins Detail – auch nach Jahren sieht es noch hervorragend aus!',
    author: 'Michael K.',
    source: 'Tattoola.de reviews',
    rating: 5,
    date: 'December 2025',
  },
  {
    id: 3,
    text: 'I did one at Medusa in Munich, which turned out to be a bit more work than a typical walk-in, but the artist took it on and created an amazing piece. Highly recommend for spontaneous tattoos!',
    author: 'Alex R.',
    source: 'Reddit r/germany',
    rating: 5,
    date: 'June 2025',
  },
  {
    id: 4,
    text: 'Perfekte Lage im Herzen von München! Direkt am Altheimer Eck, super erreichbar mit U-Bahn. Das Studio ist modern und das Team sehr professionell.',
    author: 'Julia S.',
    source: 'Wheree.com',
    rating: 5,
    date: 'November 2025',
  },
  {
    id: 5,
    text: 'Hygiene wird hier GROSS geschrieben! Alles steril, Handschuhe wurden gewechselt, und ich habe mich absolut sicher gefühlt. Top Studio für Piercings in München!',
    author: 'Thomas W.',
    source: 'Tattoola.de',
    rating: 5,
    date: 'October 2025',
  },
  {
    id: 6,
    text: 'The staff at Medusa are incredibly welcoming and professional. They take time to explain everything and make you feel comfortable, even for nerve-wracking piercings. Highly recommend!',
    author: 'Emma L.',
    source: 'Reddit r/Munich',
    rating: 5,
    date: 'May 2025',
  },
  {
    id: 7,
    text: 'Die Preise sind fair für die Qualität, die man bekommt. Keine versteckten Kosten und das Ergebnis ist jeden Cent wert. Bestes Preis-Leistungs-Verhältnis in München!',
    author: 'Markus B.',
    source: 'Wheree.com',
    rating: 5,
    date: 'September 2025',
  },
  {
    id: 8,
    text: 'Der "Ohrlochzauberer" war ein Highlight für meine Tochter! Spielerisch und mit viel Einfühlungsvermögen – sie hatte überhaupt keine Angst. Perfekt für Familien!',
    author: 'Anna P.',
    source: 'Tattoola.de',
    rating: 5,
    date: 'August 2025',
  },
];

const TESTIMONIALS_MARQUEE_SPEED = 24000;

const buildReviewSchema = (review: Testimonial) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'LocalBusiness',
    name: 'Medusa Piercing Studio',
    address: 'München, Bayern, Germany',
    ...(review.service ? { serviceType: review.service } : {}),
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating,
    bestRating: '5',
  },
  author: {
    '@type': 'Person',
    name: review.author,
  },
  reviewBody: review.text,
  datePublished: review.date,
});

export interface TestimonialsCarouselProps {
  className?: string;
  testimonialsList?: Testimonial[];
  title?: string;
}

export default function TestimonialsCarousel({
  className = '',
  testimonialsList = REVIEWS,
  title = 'Was Kunden sagen',
}: TestimonialsCarouselProps) {
  useEffect(() => {
    const existingSchemas = document.querySelectorAll(
      'script[data-review-schema="true"]',
    ) as NodeListOf<HTMLScriptElement>;
    existingSchemas.forEach((schema) => schema.remove());

    testimonialsList.forEach((review) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.reviewSchema = 'true';
      script.text = JSON.stringify(buildReviewSchema(review));
      document.head.appendChild(script);
    });

    return () => {
      const schemas = document.querySelectorAll(
        'script[data-review-schema="true"]',
      ) as NodeListOf<HTMLScriptElement>;
      schemas.forEach((schema) => schema.remove());
    };
  }, [testimonialsList]);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < rating;
      return (
        <span
          key={`star-${index}`}
          className={`testimonial-star ${isFilled ? 'testimonial-star--filled' : 'testimonial-star--empty'}`}
          aria-hidden='true'
        >
          {isFilled ? '★' : '☆'}
        </span>
      );
    });

  return (
    <Section
      variant='default'
      spacing='normal'
      className={className}
      aria-label='Customer testimonials'
    >
      <Container size='default'>
        <h3 className='font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-(--brand-accent) text-center mb-16'>
          {title}
        </h3>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1.15}
          centeredSlides={false}
          loop
          speed={TESTIMONIALS_MARQUEE_SPEED}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 32,
            },
          }}
          className='testimonials-swiper'
          aria-label='Customer testimonials carousel'
        >
          {testimonialsList.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Card variant='default' size='default' asChild className='testimonial-card'>
                <div className='testimonial-card__inner'>
                  <div className='testimonial-header'>
                    <span className='testimonial-name'>— {testimonial.author}</span>
                    <div
                      className='testimonial-stars'
                      aria-label={`Rating: ${testimonial.rating} out of 5`}
                      role='img'
                    >
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <p className='testimonial-text'>"{testimonial.text}"</p>

                  <div className='testimonial-meta'>
                    <span className='testimonial-source'>{testimonial.source}</span>
                    <span className='testimonial-date'>{testimonial.date}</span>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Section>
  );
}
