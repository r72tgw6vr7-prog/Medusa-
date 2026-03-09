import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Card } from '@/components/ui/Card';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { SectionHeading } from '@/components/SectionHeading';
import '@/styles/testimonials.css';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Testimonial {
  id: number;
  text: string | { de: string; en: string };
  author: string;
  source: string;
  rating: number;
  date: string;
  service?: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: 1,
    text: {
      de: 'Das Studio ist extrem sauber und modern. Die Piercerin war super freundlich und hat sich viel Zeit genommen. Ich habe mich die ganze Zeit wohl gefühlt – perfekt für meinen ersten Piercing in München!',
      en: 'The studio is extremely clean and modern. The piercer was warm, patient and took plenty of time. I felt comfortable throughout the whole appointment, which made it perfect for my first piercing in Munich.',
    },
    author: 'Sarah M.',
    source: 'Wheree.com aggregated reviews',
    rating: 5,
    date: 'January 2026',
  },
  {
    id: 2,
    text: {
      de: 'Ich empfehle dieses Studio gerne. Eine wunderbare Arbeit wurde mir auf dem rechten Oberarm gemacht. Perfektion bis ins Detail – auch nach Jahren sieht es noch hervorragend aus!',
      en: 'I happily recommend this studio. They created a beautiful piece on my right upper arm. The detail work is exceptional, and even years later it still looks fantastic.',
    },
    author: 'Michael K.',
    source: 'Tattoola.de reviews',
    rating: 5,
    date: 'December 2025',
  },
  {
    id: 3,
    text: {
      de: 'Ich habe mir bei Medusa in München ein Tattoo stechen lassen, das am Ende etwas aufwendiger war als ein typischer Walk-in. Der Artist hat es trotzdem übernommen und ein großartiges Piece daraus gemacht. Klare Empfehlung auch für spontane Tattoos!',
      en: 'I did one at Medusa in Munich, which turned out to be a bit more work than a typical walk-in, but the artist took it on and created an amazing piece. Highly recommend for spontaneous tattoos!',
    },
    author: 'Alex R.',
    source: 'Reddit r/germany',
    rating: 5,
    date: 'June 2025',
  },
  {
    id: 4,
    text: {
      de: 'Perfekte Lage im Herzen von München! Direkt am Altheimer Eck, super erreichbar mit U-Bahn. Das Studio ist modern und das Team sehr professionell.',
      en: 'Perfect location in the heart of Munich. Right at Altheimer Eck, easy to reach by underground. The studio is modern and the team is highly professional.',
    },
    author: 'Julia S.',
    source: 'Wheree.com',
    rating: 5,
    date: 'November 2025',
  },
  {
    id: 5,
    text: {
      de: 'Hygiene wird hier GROSS geschrieben! Alles steril, Handschuhe wurden gewechselt, und ich habe mich absolut sicher gefühlt. Top Studio für Piercings in München!',
      en: 'Hygiene is taken seriously here. Everything was sterile, gloves were changed properly, and I felt completely safe. A top studio for piercings in Munich.',
    },
    author: 'Thomas W.',
    source: 'Tattoola.de',
    rating: 5,
    date: 'October 2025',
  },
  {
    id: 6,
    text: {
      de: 'Das Team bei Medusa ist unglaublich herzlich und professionell. Alles wird in Ruhe erklärt und man fühlt sich selbst bei nervenaufreibenden Piercings sicher und gut begleitet. Sehr zu empfehlen!',
      en: 'The staff at Medusa are incredibly welcoming and professional. They take time to explain everything and make you feel comfortable, even for nerve-wracking piercings. Highly recommend!',
    },
    author: 'Emma L.',
    source: 'Reddit r/Munich',
    rating: 5,
    date: 'May 2025',
  },
  {
    id: 7,
    text: {
      de: 'Die Preise sind fair für die Qualität, die man bekommt. Keine versteckten Kosten und das Ergebnis ist jeden Cent wert. Bestes Preis-Leistungs-Verhältnis in München!',
      en: 'The pricing is fair for the quality you get. No hidden costs, and the result is worth every cent. One of the best value-for-quality studios in Munich.',
    },
    author: 'Markus B.',
    source: 'Wheree.com',
    rating: 5,
    date: 'September 2025',
  },
  {
    id: 8,
    text: {
      de: 'Der "Ohrlochzauberer" war ein Highlight für meine Tochter! Spielerisch und mit viel Einfühlungsvermögen – sie hatte überhaupt keine Angst. Perfekt für Familien!',
      en: 'The ear-piercing specialist was the highlight for my daughter. Playful, patient and incredibly reassuring, so she was not scared at all. Perfect for families.',
    },
    author: 'Anna P.',
    source: 'Tattoola.de',
    rating: 5,
    date: 'August 2025',
  },
];

const TESTIMONIALS_MARQUEE_SPEED = 24000;

const resolveReviewText = (review: Testimonial, language: 'de' | 'en') =>
  typeof review.text === 'string' ? review.text : review.text[language];

const buildReviewSchema = (review: Testimonial, language: 'de' | 'en') => ({
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
  reviewBody: resolveReviewText(review, language),
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
  title,
}: TestimonialsCarouselProps) {
  const { language, t } = useLanguage();
  const resolvedTitle = title ?? t('common.testimonials.title');
  useEffect(() => {
    const existingSchemas = document.querySelectorAll(
      'script[data-review-schema="true"]',
    ) as NodeListOf<HTMLScriptElement>;
    existingSchemas.forEach((schema) => schema.remove());

    testimonialsList.forEach((review) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.reviewSchema = 'true';
      script.text = JSON.stringify(buildReviewSchema(review, language));
      document.head.appendChild(script);
    });

    return () => {
      const schemas = document.querySelectorAll(
        'script[data-review-schema="true"]',
      ) as NodeListOf<HTMLScriptElement>;
      schemas.forEach((schema) => schema.remove());
    };
  }, [language, testimonialsList]);

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
      aria-label={t('common.testimonials.sectionAria')}
    >
      <Container size='default'>
        <SectionHeading title={resolvedTitle} level='secondary' />

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
          aria-label={t('common.testimonials.carouselAria')}
        >
          {testimonialsList.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Card
                variant='default'
                size='default'
                asChild
                interactive
                className='testimonial-card'
              >
                <div className='testimonial-card__inner'>
                  <div className='testimonial-header'>
                    <span className='testimonial-name'>{testimonial.author}</span>
                    <div
                      className='testimonial-stars'
                      aria-label={t('common.testimonials.ratingAria', {
                        rating: testimonial.rating,
                      })}
                      role='img'
                    >
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <p className='testimonial-text'>{resolveReviewText(testimonial, language)}</p>

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
