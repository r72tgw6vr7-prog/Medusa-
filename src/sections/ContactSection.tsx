import React, { FormEvent } from 'react';

export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  href?: string;
}

export interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  privacyPolicy: boolean;
  [key: string]: string | boolean | undefined;
}

interface ContactSectionProps {
  title: string;
  subtitle: string;
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  onSubmit: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  subtitle,
  contactInfo,
  socialLinks,
  onSubmit,
  className = '',
}) => {
  return (
    <div className={` ${className}`}>
      <div className='container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16'>
        {/* Header */}
        <div className='text-center mb-6 md:mb-10 lg:mb-16'>
          <h2 className='text-brand-chrome text-5xl font-bold mb-4 md:mb-6'>{title}</h2>
          <p className='text-luxury-text-inverse text-lg max-w-2xl mx-auto'>{subtitle}</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16'>
          {/* Contact Form */}
          <div>
            <form
              onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (!onSubmit) return;

                const form = e.currentTarget;
                const formData = new FormData(form);

                const formValues: ContactFormData = {
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  subject: formData.get('subject') as string,
                  message: formData.get('message') as string,
                  privacyPolicy: formData.get('privacyPolicy') === 'on',
                };

                try {
                  await onSubmit(formValues);
                  form.reset();
                } catch (error) {
                  console.error('Failed to submit form:', error);
                }
              }}
              className='p-4 md:p-6 lg:p-8 rounded-lg flex flex-col h-full'
            >
              <h3 className='text-luxury-text-inverse text-2xl mb-4 md:mb-6'>Kontaktiere uns</h3>
              <div className='mb-4 md:mb-6'>
                <label htmlFor='name' className='block text-luxury-text-inverse mb-0'>
                  Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  className='w-full bg-deep-black text-luxury-text-inverse p-0 rounded flex flex-col h-full touch-target-mobile'
                  placeholder='Dein Name'
                  aria-required='true'
                />
              </div>
              <div className='mb-4 md:mb-6'>
                <label htmlFor='email' className='block text-luxury-text-inverse mb-0'>
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  className='w-full bg-deep-black text-luxury-text-inverse p-0 rounded flex flex-col h-full touch-target-mobile'
                  placeholder='Deine Email'
                  aria-required='true'
                />
              </div>
              <div className='mb-4 md:mb-6'>
                <label htmlFor='phone' className='block text-luxury-text-inverse mb-0'>
                  Telefon (optional)
                </label>
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  className='w-full bg-deep-black text-luxury-text-inverse p-0 rounded flex flex-col h-full touch-target-mobile'
                  placeholder='Deine Telefonnummer'
                />
              </div>
              <div className='mb-4 md:mb-6'>
                <label htmlFor='subject' className='block text-luxury-text-inverse mb-0'>
                  Betreff
                </label>
                <input
                  id='subject'
                  name='subject'
                  type='text'
                  required
                  className='w-full bg-deep-black text-luxury-text-inverse p-0 rounded flex flex-col h-full touch-target-mobile'
                  placeholder='Betreff'
                  aria-required='true'
                />
              </div>
              <div className='mb-4 md:mb-6'>
                <label htmlFor='message' className='block text-luxury-text-inverse mb-0'>
                  Nachricht
                </label>
                <textarea
                  id='message'
                  name='message'
                  required
                  className='w-full bg-deep-black text-luxury-text-inverse p-0 rounded flex flex-col h-full min-h-32 touch-target-mobile'
                  placeholder='Deine Nachricht'
                  rows={4}
                  aria-required='true'
                ></textarea>
              </div>
              <div className='mb-4 md:mb-6 flex items-start'>
                <input
                  id='privacyPolicy'
                  name='privacyPolicy'
                  type='checkbox'
                  required
                  className='mt-0 mr-0 focus:ring-2 focus:ring-brand-chrome focus:ring-offset-2 focus:ring-offset-deep-black touch-target-mobile' 
                  aria-required='true'
                />
                <label
                  htmlFor='privacyPolicy'
                  className='text-luxury-text-inverse text-sm ml-0 touch-target-mobile touch-target-mobile-inline'
                >
                  Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
                </label>
              </div>
              <button
                type='submit'
                className='bg-brand-chrome text-deep-black px-6 md:px-8 py-4 rounded hover:bg-brand-chrome/80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-brand-chrome focus:ring-offset-2 focus:ring-offset-deep-black flex flex-col h-full touch-target-mobile' 
                aria-label='Nachricht absenden'
              >
                Senden
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className='space-y-8'>
            {/* Contact Cards */}
            <div className='grid gap-4 md:gap-6'>
              {contactInfo.map((info) => (
                <div
                  key={`contact-${info.title}-${info.value}`}
                  className=' p-8 rounded-lg flex items-center flex-col h-full'
                >
                  {info.icon && <img src={info.icon} alt={info.title} className='w-8 h-8 mr-8' />}
                  <div>
                    <h4 className='text-luxury-text-inverse text-lg font-semibold'>{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className='text-brand-chrome hover:underline transition duration-200 ease-out touch-target-mobile touch-target-mobile-inline' 
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className='text-luxury-text-inverse'>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className='pt-4 md:pt-6 lg:pt-8 border-t border-brand-chrome/20 flex flex-col h-full'>
              <h3 className='text-white text-xl mb-4 md:mb-6'>Folge uns</h3>
              <div className='flex gap-4 md:gap-6'>
                {socialLinks.map((social) => (
                  <a
                    key={`social-${social.label}-${social.url}`}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-0 rounded-full hover:bg-brand-chrome/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-chrome focus:ring-offset-2 focus:ring-offset-deep-black flex flex-col h-full touch-target-mobile touch-target-mobile-inline touch-target-mobile-center' 
                    aria-label={social.label}
                  >
                    <img src={social.icon} alt={social.label} className='w-6 h-6' />
                  </a>
                ))}
              </div>
            </div>

            {/* Map or Additional Content */}
            <div className='rounded-lg overflow-hidden min-h-72 flex flex-col h-full'>
              <iframe
                title='Location Map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
