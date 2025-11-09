import { z } from 'zod';

const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),

  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .max(100, { message: 'Email must be less than 100 characters' }),

  phone: z.string().regex(phoneRegex, {
    message: 'Please enter a valid phone number with country code (e.g., +1234567890)',
  }),

  date: z.string().refine(
    (val) => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    {
      message: 'Please select a future date',
    },
  ),

  time: z.string().refine(
    (val) => {
      const timeSlots = [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
      ];
      return timeSlots.includes(val);
    },
    {
      message: 'Please select a valid time slot',
    },
  ),

  guests: z
    .number()
    .min(1, { message: 'At least 1 guest is required' })
    .max(20, { message: 'Maximum 20 guests allowed' })
    .default(2)
    .optional()
    .transform((val) => val ?? 2), // Transform undefined to 2

  specialRequests: z
    .string()
    .max(500, { message: 'Special requests must be less than 500 characters' })
    .optional()
    .or(z.literal('')),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
