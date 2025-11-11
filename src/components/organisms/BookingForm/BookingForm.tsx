import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, BookingFormData } from '@/schemas/bookingSchema';
import { Input, Button, Textarea, Select } from '@/components/atoms';
import { ChangeEvent } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import './BookingForm.css';

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

interface BookingFormProps {
  className?: string;
}

export function BookingForm({ className = '' }: BookingFormProps) {
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
      const resp = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          guests: data.guests ?? 1,
          specialRequests: data.specialRequests || '',
        }),
      });

      const result = await resp.json().catch(() => ({ success: false }));
      if (!resp.ok || !result?.success) {
        throw new Error(result?.message || 'Booking failed');
      }

      toast.success('Booking submitted successfully!', {
        description: 'We will contact you shortly to confirm your reservation.',
      });
      reset();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking', {
        description: 'Please try again or contact us directly.',
      });
    }
  };

  return (
    <div className={`booking-form-container ${className}`}>
      <div className="container mx-auto max-w-3xl px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Book Your Appointment
          </h2>
          <p className="text-white/60 max-w-lg mx-auto">
            Ready to get inked? Booking an appointment is easy and convenient. Simply fill out the form below to schedule your consultation or tattoo session.
          </p>
        </div>
        
        <form
          onSubmit={handleSubmit((data) => {
            // Cast data to BookingFormData
            onSubmit(data as unknown as BookingFormData);
          })}
          className="space-y-8 w-full"
          noValidate
        >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div className='form-group'>
          <label htmlFor='name' className="block text-sm font-medium text-white/80 mb-0">
            Full Name *
          </label>
          <Input 
            id='name' 
            placeholder='John Doe' 
            error={errors.name?.message} 
            {...register('name')} 
            className={cn(
              'bg-white/5 border',
              errors.name ? 'border-red-500' : 'border-white/20',
              'w-full p-3 rounded-md text-white focus:border-white/50 transition-all'
            )}
          />
          {errors.name && <p className="text-sm text-red-500 mt-0">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className='form-group'>
          <label htmlFor='email' className="block text-sm font-medium text-white/80 mb-0">
            Email Address *
          </label>
          <Input
            id='email'
            type='email'
            placeholder='your@email.com'
            error={errors.email?.message}
            {...register('email')}
            className={cn(
              'bg-white/5 border',
              errors.email ? 'border-red-500' : 'border-white/20',
              'w-full p-3 rounded-md text-white focus:border-white/50 transition-all'
            )}
          />
          {errors.email && <p className="text-sm text-red-500 mt-0">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className='form-group'>
          <label htmlFor='phone' className="block text-sm font-medium text-white/80 mb-0">
            Phone Number *
          </label>
          <Input
            id='phone'
            type='tel'
            placeholder='+1 (123) 456-7890'
            error={errors.phone?.message}
            {...register('phone')}
            className={cn(
              'bg-white/5 border',
              errors.phone ? 'border-red-500' : 'border-white/20',
              'w-full p-3 rounded-md text-white focus:border-white/50 transition-all'
            )}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-0">{errors.phone.message}</p>}
        </div>

        {/* Date */}
        <div className='form-group'>
          <label htmlFor='date' className="block text-sm font-medium text-white/80 mb-0">
            Preferred Date *
          </label>
          <Input
            id='date'
            type='date'
            min={new Date().toISOString().split('T')[0]}
            error={errors.date?.message}
            {...register('date')}
            className={cn(
              'bg-white/5 border',
              errors.date ? 'border-red-500' : 'border-white/20',
              'w-full p-3 rounded-md text-white focus:border-white/50 transition-all'
            )}
          />
          {errors.date && <p className="text-sm text-red-500 mt-0">{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div className='form-group'>
          <label htmlFor='time' className="block text-sm font-medium text-white/80 mb-0">
            Preferred Time *
          </label>
          <Controller
            name='time'
            control={control}
            render={({ field }) => (
              <Select
                id='time'
                value={field.value}
                onChange={field.onChange}
                placeholder='Select a time'
                className={cn(
                  'bg-white/5 border',
                  errors.time ? 'border-red-500' : 'border-white/20',
                  'w-full p-3 rounded-md text-white focus:border-white/50 transition-all'
                )}
              >
                {timeSlots.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.time && <p className="text-sm text-red-500 mt-0">{errors.time.message}</p>}
        </div>

        {/* Guests */}
        <div className='form-group'>
          <label htmlFor='guests' className="block text-sm font-medium text-white/80 mb-0">
            Number of Guests *
          </label>
          <Controller
            name='guests'
            control={control}
            render={({ field }) => (
              <Select
                id='guests'
                value={field.value?.toString()}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  field.onChange(Number.parseInt(e.target.value, 10))
                }
                className={cn(
                  'bg-white/5 border',
                  errors.guests ? 'border-red-500' : 'border-white/20',
                  'w-full p-3 rounded-md text-white focus:border-white/50 transition-all'
                )}
              >
                {guestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.guests && <p className="text-sm text-red-500 mt-0">{errors.guests.message}</p>}
        </div>
      </div>

      {/* Special Requests */}
      <div className='form-group md:col-span-2'>
        <label htmlFor='specialRequests' className="block text-sm font-medium text-white/80 mb-0">
          Special Requests (Optional)
        </label>
        <Textarea
          id='specialRequests'
          placeholder='Any special requirements or notes...'
          rows={4}
          error={errors.specialRequests?.message}
          {...register('specialRequests')}
          className={cn(
            'bg-white/5 border',
            errors.specialRequests ? 'border-red-500' : 'border-white/20',
            'w-full p-3 rounded-md text-white focus:border-white/50 transition-all'
          )}
        />
        <p className="text-xs text-white/50 mt-0">
          {errors.specialRequests ? (
            <span className='text-red-500'>{errors.specialRequests.message}</span>
          ) : (
            'Maximum 500 characters'
          )}
        </p>
      </div>

      <div className='flex justify-center mt-8'>
        <Button
          type='submit'
          className={cn(
            'inline-flex items-center gap-3 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 group',
            isSubmitting ? 'opacity-70 cursor-not-allowed' : '',
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Book Now'}
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
      </form>
    </div>
    </div>
  );
}
