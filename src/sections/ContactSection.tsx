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
      <div className='container mx-auto px-8 py-24'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-brand-gold text-[42px] font-bold mb-8'>{title}</h2>
          <p className='text-white text-lg max-w-2xl mx-auto'>{subtitle}</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
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
              className=' p-8 rounded-lg flex flex-col h-full'
            >
              <h3 className='text-white text-2xl mb-8'>Kontaktiere uns</h3>
              <div className='mb-8'>
                <label htmlFor='name' className='block text-white mb-0'>
                  Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  className='w-full bg-[#2E2E2E] text-white p-0 rounded flex flex-col h-full'
                  placeholder='Dein Name'
                  aria-required='true'
                />
              </div>
              <div className='mb-8'>
                <label htmlFor='email' className='block text-white mb-0'>
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  className='w-full bg-[#2E2E2E] text-white p-0 rounded flex flex-col h-full'
                  placeholder='Deine Email'
                  aria-required='true'
                />
              </div>
              <div className='mb-8'>
                <label htmlFor='phone' className='block text-white mb-0'>
                  Telefon (optional)
                </label>
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  className='w-full bg-[#2E2E2E] text-white p-0 rounded flex flex-col h-full'
                  placeholder='Deine Telefonnummer'
                />
              </div>
              <div className='mb-8'>
                <label htmlFor='subject' className='block text-white mb-0'>
                  Betreff
                </label>
                <input
                  id='subject'
                  name='subject'
                  type='text'
                  required
                  className='w-full bg-[#2E2E2E] text-white p-0 rounded flex flex-col h-full'
                  placeholder='Betreff'
                  aria-required='true'
                />
              </div>
              <div className='mb-8'>
                <label htmlFor='message' className='block text-white mb-0'>
                  Nachricht
                </label>
                <textarea
                  id='message'
                  name='message'
                  required
                  className='w-full bg-[#2E2E2E] text-white p-0 rounded flex flex-col h-full min-h-[120px]'
                  placeholder='Deine Nachricht'
                  rows={4}
                  aria-required='true'
                ></textarea>
              </div>
              <div className='mb-8 flex items-start'>
                <input
                  id='privacyPolicy'
                  name='privacyPolicy'
                  type='checkbox'
                  required
                  className='mt-0 mr-0'
                  aria-required='true'
                />
                <label htmlFor='privacyPolicy' className='text-white text-sm ml-0'>
                  Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
                </label>
              </div>
              <button
                type='submit'
                className='bg-brand-gold text-black px-8 py-0 rounded hover:opacity-80 transition-opacity duration-200 flex flex-col h-full'
                aria-label='Nachricht absenden'
              >
                Senden
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className='space-y-8'>
            {/* Contact Cards */}
            <div className='grid gap-8'>
              {contactInfo.map((info) => (
                <div
                  key={`contact-${info.title}-${info.value}`}
                  className=' p-8 rounded-lg flex items-center flex-col h-full'
                >
                  {info.icon && <img src={info.icon} alt={info.title} className='w-8 h-8 mr-8' />}
                  <div>
                    <h4 className='text-white text-lg font-semibold'>{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className='text-brand-gold hover:underline transition duration-200 ease-out'
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className='text-white'>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className='pt-8 border-t border-[#C0BFBF33] flex flex-col h-full'>
              <h3 className='text-white text-xl mb-8'>Folge uns</h3>
              <div className='flex gap-8'>
                {socialLinks.map((social) => (
                  <a
                    key={`social-${social.label}-${social.url}`}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-0  rounded-full hover:bg-brand-gold transition-colors duration-200 flex flex-col h-full'
                    aria-label={social.label}
                  >
                    <img src={social.icon} alt={social.label} className='w-6 h-6' />
                  </a>
                ))}
              </div>
            </div>

            {/* Map or Additional Content */}
            <div className='rounded-lg overflow-hidden h-[300px]  flex flex-col h-full'>
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
