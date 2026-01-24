// ============================================
// PAGE ASSEMBLY: BookingPage
// ============================================
// PURPOSE: Booking page with appointment form for tattoo/piercing consultations.

import { Footer } from '@/components/pages';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { BookingModalMobile } from '@/components/booking/BookingModalMobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeading } from '@/components/PageHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import './BookingPage.css';

export function BookingPage() {
  const { t } = useLanguage();

  return (
    <main className='booking-page w-full min-h-screen relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
      {/* Navigation */}
      <MainNavigation />

      {/* Hero Section */}
      <Section variant='default' spacing='normal' bg='dark'>
        <Container size='default'>
          <PageHeading
            eyebrow={t('booking.eyebrow')}
            title={t('booking.title')}
            subtitle={t('booking.subtitle')}
          />
        </Container>
      </Section>

      {/* Booking Wizard */}
      <Section variant='default' spacing='tight' bg='dark'>
        <Container size='narrow'>
          <BookingModalMobile />
        </Container>
      </Section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default BookingPage;
