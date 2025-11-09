import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, BookingFormData } from '@/schemas/bookingSchema';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { Select } from '@/components/ui/select/Select';
import { ChangeEvent } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
];

const guestOptions = Array.from({ length: 20 }, (_, i) => ({
  value: (i + 1).toString(),
  label: i === 0 ? '1 person' : `${i + 1} people`,
}));

export function BookingForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: {
      guests: 2,
      specialRequests: '',
    },
    mode: 'onBlur',
  });

  // Define onSubmit with the correct type
  const onSubmit = async (data: BookingFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Booking submitted:', data);

      // Show success message
      toast.success('Booking submitted successfully!', {
        description: 'We will contact you shortly to confirm your reservation.',
      });

      // Reset form
      reset();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking', {
        description: 'Please try again or contact us directly.',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // Cast data to BookingFormData
        onSubmit(data as unknown as BookingFormData);
      })}
      className='space-y-8 w-full max-w-4xl mx-auto'
      noValidate
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Name */}
        <div className='space-y-0'>
          <label htmlFor='name' className='block text-sm font-medium'>
            Full Name *
          </label>
          <Input id='name' placeholder='John Doe' error={!!errors.name} {...register('name')} />
          {errors.name && <p className='text-sm text-red-600'>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className='space-y-0'>
          <label htmlFor='email' className='block text-sm font-medium'>
            Email *
          </label>
          <Input
            id='email'
            type='email'
            placeholder='your@email.com'
            error={!!errors.email}
            {...register('email')}
          />
          {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className='space-y-0'>
          <label htmlFor='phone' className='block text-sm font-medium'>
            Phone Number *
          </label>
          <Input
            id='phone'
            type='tel'
            placeholder='+1 (123) 456-7890'
            error={!!errors.phone}
            {...register('phone')}
          />
          {errors.phone && <p className='text-sm text-red-600'>{errors.phone.message}</p>}
        </div>

        {/* Date */}
        <div className='space-y-0'>
          <label htmlFor='date' className='block text-sm font-medium'>
            Date *
          </label>
          <Input
            id='date'
            type='date'
            min={new Date().toISOString().split('T')[0]}
            error={!!errors.date}
            {...register('date')}
          />
          {errors.date && <p className='text-sm text-red-600'>{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div className='space-y-0'>
          <label htmlFor='time' className='block text-sm font-medium'>
            Time *
          </label>
          <Controller
            name='time'
            control={control}
            render={({ field }) => (
              <Select
                id='time'
                error={!!errors.time}
                value={field.value}
                onChange={field.onChange}
                placeholder='Select a time'
              >
                {timeSlots.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.time && <p className='text-sm text-red-600'>{errors.time.message}</p>}
        </div>

        {/* Guests */}
        <div className='space-y-0'>
          <label htmlFor='guests' className='block text-sm font-medium'>
            Number of Guests *
          </label>
          <Controller
            name='guests'
            control={control}
            render={({ field }) => (
              <Select
                id='guests'
                error={!!errors.guests}
                value={field.value?.toString()}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  field.onChange(parseInt(e.target.value, 10))
                }
              >
                {guestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.guests && <p className='text-sm text-red-600'>{errors.guests.message}</p>}
        </div>
      </div>

      {/* Special Requests */}
      <div className='space-y-0'>
        <label htmlFor='specialRequests' className='block text-sm font-medium'>
          Special Requests (Optional)
        </label>
        <Textarea
          id='specialRequests'
          placeholder='Any special requirements or notes...'
          rows={4}
          error={!!errors.specialRequests}
          {...register('specialRequests')}
        />
        <p className='text-xs text-gray-500'>
          {errors.specialRequests ? (
            <span className='text-red-600'>{errors.specialRequests.message}</span>
          ) : (
            'Maximum 500 characters'
          )}
        </p>
      </div>

      <div className='pt-0'>
        <Button
          type='submit'
          className={cn(
            'w-full py-3 text-base',
            isSubmitting ? 'opacity-70 cursor-not-allowed' : '',
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Book Now'}
        </Button>
      </div>
    </form>
  );
}
