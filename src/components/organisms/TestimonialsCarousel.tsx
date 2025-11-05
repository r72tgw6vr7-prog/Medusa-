import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../styles/testimonials.css';

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  source: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: 'Ich empfehle dieses Studio gerne. Eine wunderbare Arbeit wurde mir auf dem rechten Oberarm gemacht. Perfektion bis ins Detail. Ich musste auch nicht sehr lange auf meinen Termin warten und es wurde sich wirklich um mich bemüht.',
    author: 'M.S.',
    source: 'Google Review',
  },
  {
    id: 2,
    text: 'Kunden berichten von präzisen und detailgetreuen Tattoos, die auch in Jahren noch hervorragend aussehen. Besonders hervorgehoben wird die Fähigkeit der Tätowierer, auch kleinste Motive sauber und scharf zu stechen.',
    author: 'Tattoola Review',
    source: 'Tattoola Review',
  },
  {
    id: 3,
    text: 'Das Medusa Tattoo Studio ist eine bemerkenswerte Einrichtung in der Münchner Tattoo-Szene. Die Kunden schätzen das Engagement des Studios für individuelle Designs und den kollaborativen Ansatz während des gesamten Prozesses.',
    author: 'TripAdvisor Review',
    source: 'TripAdvisor Review',
  },
];

const Star = () => (
  <svg className='w-5 h-5 fill-[#D4A841] text-[#D4A841]' viewBox='0 0 20 20'>
    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
  </svg>
);

export interface TestimonialsCarouselProps {
  className?: string;
  testimonialsList?: Testimonial[];
  title?: string;
}

export default function TestimonialsCarousel({
  className = '',
  testimonialsList = testimonials,
  title = 'Was Kunden sagen',
}: TestimonialsCarouselProps) {
  return (
    <section className={`py-20 relative z-10 ${className}`} aria-label='Customer testimonials'>
      <div className='responsive-container safe-area-padding'>
        <h2 className='font-playfair text-4xl md:text-5xl font-bold text-[var(--brand-gold)] text-center mb-16'>
          {title}
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.15}
          centeredSlides={false}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white/30',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#D4A841]',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
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
              <div className='bg-white/5 border border-[var(--brand-gold)]/30 rounded-2xl p-8 h-full'>
                <div className='flex gap-0 mb-8'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>

                <p className='text-white text-base leading-relaxed mb-8'>"{testimonial.text}"</p>

                <p className='text-[#C0C0C0] text-sm'>
                  — {testimonial.author}, {testimonial.source}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
