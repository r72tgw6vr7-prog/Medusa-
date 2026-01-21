// ============================================
// PAGE ASSEMBLY: BookingPage
// ============================================
// PURPOSE: Booking page with appointment form for tattoo/piercing consultations.

import { Footer } from '../components/pages';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { BookingModalMobile } from '@/components/booking/BookingModalMobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeading } from '../components/PageHeading';
import './BookingPage.css';

export function BookingPage() {
  const { t } = useLanguage();

  return (
    <main className='booking-page w-full min-h-screen relative z-10 bg-luxury-bg-dark'>
      {/* Navigation */}
      <MainNavigation />

      {/* Hero Section */}
      <section className='pt-32 pb-12 md:pt-40 md:pb-16 relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <PageHeading
            eyebrow={t('booking.eyebrow')}
            title={t('booking.title')}
            subtitle={t('booking.subtitle')}
          />
        </div>
      </section>

      {/* Booking Wizard */}
      <section className='pb-12 md:pb-16 relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='max-w-4xl mx-auto'>
            <BookingModalMobile />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default BookingPage;
