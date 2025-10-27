import React from 'react';
// import { ContactForm } from '../organisms/ContactForm';
// import { ContactInfoCard } from '../molecules/ContactInfoCard';

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  href?: string;
}

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

interface ContactSectionProps {
  title: string;
  subtitle: string;
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  onSubmit: (data: any) => Promise<void>;
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
    <div className={`bg-[#222222] ${className}`}>
      <div className='container mx-auto px-8 py-24'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-[#D4AF37] text-[42px] font-bold mb-8'>{title}</h2>
          <p className='text-white text-lg max-w-2xl mx-auto'>{subtitle}</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Contact Form */}
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) {
                  onSubmit({});
                }
              }}
              className='bg-[#1E1E1E] p-8 rounded-lg flex flex-col h-full'
            >
              <h3 className='text-white text-2xl mb-8'>Kontaktiere uns</h3>
              <div className='mb-8'>
                <label className='block text-white mb-0'>Name</label>
                <input
                  type='text'
                  className='w-full bg-[#2E2E2E] text-white p-0 rounded flex flex-col h-full'
                  placeholder='Dein Name'
                />
              </div>
              <div className='mb-8'>
                <label className='block text-white mb-0'>Email</label>
                <input
                  type='email'
                  className='w-full bg-[#2E2E2E] text-white p-0 rounded flex flex-col h-full'
                  placeholder='Deine Email'
                />
              </div>
              <div className='mb-8'>
                <label className='block text-white mb-0'>Nachricht</label>
                <textarea
                  className='w-full bg-[#2E2E2E] text-white p-0 rounded flex flex-col h-full'
                  placeholder='Deine Nachricht'
                  rows={4}
                ></textarea>
              </div>
              <button
                type='submit'
                className='bg-[#D4AF37] text-black px-8 py-0 rounded hover:opacity-80 transition-opacity flex flex-col h-full transition duration-200 ease-out'
              >
                Senden
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className='space-y-8'>
            {/* Contact Cards */}
            <div className='grid gap-8'>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className='bg-[#1E1E1E] p-8 rounded-lg flex items-center flex-col h-full'
                >
                  {info.icon && <img src={info.icon} alt={info.title} className='w-8 h-8 mr-8' />}
                  <div>
                    <h4 className='text-white text-lg font-semibold'>{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className='text-[#D4AF37] hover:underline transition duration-200 ease-out'
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
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-0 bg-[#1E1E1E] rounded-full hover:bg-[#D4AF37] transition-colors flex flex-col h-full transition duration-200 ease-out'
                    aria-label={social.label}
                  >
                    <img src={social.icon} alt={social.label} className='w-6 h-6' />
                  </a>
                ))}
              </div>
            </div>

            {/* Map or Additional Content */}
            <div className='rounded-lg overflow-hidden h-[300px] bg-[#1E1E1E] flex flex-col h-full'>
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
