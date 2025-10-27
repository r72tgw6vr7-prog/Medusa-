import React, { useState } from 'react';
import { InputField } from '../atoms/InputField';
import { TextArea } from '../atoms/TextArea';
import { Button } from '../atoms/Button/Button';
import { Icon } from '../atoms/Icon/Icon';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon ist erforderlich';
    } else if (!/^[+\d\s-()]{6,}$/.test(formData.phone)) {
      newErrors.phone = 'Ungültige Telefonnummer';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className='mx-auto w-full max-w-[360px] md:max-w-[680px] px-8 py-8 bg-black/55 backdrop-blur border border-white/10 rounded-2xl md:rounded-xl hover:shadow-gold-glow focus-within:shadow-gold-glow transition-shadow duration-300'>
      <form onSubmit={handleSubmit} className={`space-y-6 md:space-y-8 ${className}`}>
        <InputField
          name='name'
          label='Ihr Name'
          placeholder='Wie sollen wir Sie nennen?'
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          name='email'
          type='email'
          label='E-Mail Adresse'
          placeholder='ihre.email@beispiel.de'
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          name='phone'
          type='tel'
          label='Gewünschter Service'
          placeholder='Service auswählen'
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <TextArea
          name='message'
          label='Nachricht'
          placeholder='Wie können wir dir helfen?'
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
        />

        <Button type='submit' fullWidth loading={isSubmitting} icon={<Icon name='send' />}>
          Nachricht senden
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
