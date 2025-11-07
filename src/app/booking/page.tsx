import React from 'react';
import { BookingForm } from '@/components/organisms/BookingForm/BookingForm';
import { Card } from '@/components/ui/card/Card';

export default function BookingPage() {
  return (
    <div className="container mx-auto px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-8">Book Your Tattoo Session</h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to request an appointment. We'll get back to you shortly to confirm your booking.
          </p>
        </div>

        <Card className="p-8 md:p-8">
          <BookingForm />
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Have questions?{' '}
            <a href="/contact" className="text-brand-gold hover:underline transition duration-200 ease-out">
              Contact us directly
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
