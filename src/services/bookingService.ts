import { v4 as uuidv4 } from 'uuid';

export interface BookingRequest {
  serviceId: string;
  artistId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  message?: string;
  gdprConsent: boolean;
}

export interface BookingResponse {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingNumber: string;
  createdAt: string;
}

// Simulated API call - replace with actual API implementation
export const submitBooking = async (_data: BookingRequest): Promise<BookingResponse> => {
  // In a real app, this would be a fetch/axios call to your backend
  // console.log('Submitting booking:', _data);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful response
  return {
    id: uuidv4(),
    status: 'pending',
    bookingNumber: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
  };
};

// Validate booking form data
export const validateBookingData = (data: Partial<BookingRequest>): string | null => {
  if (!data.serviceId) return 'Please select a service';
  if (!data.artistId) return 'Please select an artist';
  if (!data.name?.trim()) return 'Name is required';
  if (!data.email?.trim()) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(data.email)) return 'Please enter a valid email';
  if (!data.phone?.trim()) return 'Phone number is required';
  if (!data.date) return 'Please select a date';
  if (!data.gdprConsent) return 'You must accept the privacy policy';
  return null;
};
