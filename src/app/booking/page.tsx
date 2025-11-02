import { Metadata } from 'next';
import { BookingForm } from '@/components/BookingForm';
import { Card } from '@/components/ui/card/Card';

export const metadata: Metadata = {
  title: 'Book an Appointment | Medusa Tattoo Studio',
  description: 'Book your tattoo appointment with our talented artists at Medusa Tattoo Studio.',
};

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book Your Tattoo Session</h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to request an appointment. We'll get back to you shortly to confirm your booking.
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <BookingForm />
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Have questions?{' '}
            <a href="/contact" className="text-brand-gold hover:underline">
              Contact us directly
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
