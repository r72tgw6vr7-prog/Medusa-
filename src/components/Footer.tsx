// ============================================
// COMPONENT: Footer
// ============================================
// PURPOSE: Comprehensive footer with studio info, legal links, quick links, social follow section, newsletter signup, and map

import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Star } from 'lucide-react';

// TypeScript interfaces
interface StudioInfo {
  address: { icon: string; text: string };
  hours: { icon: string; text: string };
  phone: { icon: string; text: string; href: string };
  email: { icon: string; text: string; href: string };
}

interface Link {
  text: string;
  href: string;
}

interface SocialLink {
  icon: string;
  text: string;
  href: string;
}

// Data structures
const studioInfo: StudioInfo = {
  address: {
    icon: 'MapPin',
    text: 'Altheimer Eck 11, 80331 München',
  },
  hours: {
    icon: 'Clock',
    text: 'Mo-Fr: 11:30-18:30, Sa: 11:00-18:00, So: Geschlossen',
  },
  phone: {
    icon: 'Phone',
    text: '+49 (0) 89 269 313',
    href: 'tel:+4989269313',
  },
  email: {
    icon: 'Mail',
    text: 'info@medusa-tattoo.de',
    href: 'mailto:info@medusa-tattoo.de',
  },
};

const legalLinks: Link[] = [
  { text: 'Datenschutz', href: '/datenschutz' },
  { text: 'Impressum', href: '/impressum' },
  { text: 'AGB', href: '/agb' },
  { text: 'Nachsorge', href: '/aftercare' },
];

const quickLinks: Link[] = [
  { text: 'Startseite', href: '/' },
  { text: 'Leistungen', href: '/services' },
  { text: 'Künstler', href: '/artists' },
  { text: 'Galerie', href: '/gallery' },
  { text: 'Preise', href: '/pricing' },
  { text: 'FAQ', href: '/faq' },
  { text: 'Kontakt', href: '/contact' },
];

const socialLinks: { [key: string]: SocialLink } = {
  rating: {
    icon: 'Star',
    text: '4.9★ Google',
    href: 'https://g.page/r/medusa-tattoo-munich/review',
  },
  instagram: {
    icon: 'Instagram',
    text: '@medusa_tattoo_munich',
    href: 'https://instagram.com/medusa_tattoo_munich',
  },
  facebook: {
    icon: 'Facebook',
    text: 'Medusa Tattoo München',
    href: 'https://facebook.com/medusa.tattoo.munich',
  },
};

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.5!2d11.5678!3d48.1351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDA4JzA2LjQiTiAxMcKwMzQnMDQuMSJF!5e0!3m2!1sen!2sde!4v1234567890';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [language, setLanguage] = useState<'DE' | 'EN'>('DE');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreeMarketing) {
      // Handle newsletter subscription
      // TODO: Implement newsletter API call
      setEmail('');
      setAgreeMarketing(false);
    }
  };

  const IconComponent = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin size={16} className='text-[#D4AF37]' />;
      case 'Clock':
        return <Clock size={16} className='text-[#D4AF37]' />;
      case 'Phone':
        return <Phone size={16} className='text-[#D4AF37]' />;
      case 'Mail':
        return <Mail size={16} className='text-[#D4AF37]' />;
      case 'Instagram':
        return (
          <Instagram
            size={16}
            className='text-[#D4AF37] hover:scale-110 transition-transform duration-300'
          />
        );
      case 'Facebook':
        return (
          <Facebook
            size={16}
            className='text-[#D4AF37] hover:scale-110 transition-transform duration-300'
          />
        );
      case 'Star':
        return (
          <Star
            size={16}
            className='text-[#D4AF37] hover:scale-110 transition-transform duration-300'
          />
        );
      default:
        return null;
    }
  };

  return (
    <footer className='bg-[#1A1A1A] w-full py-16 lg:py-16 xl:py-24'>
      <div className='max-w-[1104px] mx-auto px-8 sm:px-8 lg:px-16'>
        {/* Logo and Tagline */}
        <div className='text-center mb-16'>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold tracking-wider text-[#D4AF37] mb-8">
            MEDUSA
          </h2>
          <p className="font-['Inter'] text-base max-w-2xl mx-auto text-white/60">
            Münchens exklusivestes Tattoo-Studio für Kunst, die ein Leben lang hält.
          </p>
        </div>

        {/* Four-column grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
          {/* Unser Studio */}
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#D4AF37] mb-8">
              Unser Studio
            </h3>
            <div className='space-y-0'>
              <div className='flex items-start gap-0'>
                <IconComponent iconName={studioInfo.address.icon} />
                <span className="font-['Inter'] text-sm text-white/70 leading-relaxed">
                  {studioInfo.address.text}
                </span>
              </div>
              <div className='flex items-start gap-0'>
                <IconComponent iconName={studioInfo.hours.icon} />
                <span className="font-['Inter'] text-sm text-white/70 leading-relaxed">
                  {studioInfo.hours.text}
                </span>
              </div>
              <div className='flex items-start gap-0'>
                <IconComponent iconName={studioInfo.phone.icon} />
                <a
                  href={studioInfo.phone.href}
                  className="font-['Inter'] text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {studioInfo.phone.text}
                </a>
              </div>
              <div className='flex items-start gap-0'>
                <IconComponent iconName={studioInfo.email.icon} />
                <a
                  href={studioInfo.email.href}
                  className="font-['Inter'] text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {studioInfo.email.text}
                </a>
              </div>
            </div>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#D4AF37] mb-8">
              Rechtliches
            </h3>
            <nav aria-label='Legal Links' className='space-y-0'>
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block font-['Inter'] text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#D4AF37] mb-8">
              Quick Links
            </h3>
            <nav aria-label='Site Navigation' className='space-y-0'>
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block font-['Inter'] text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>

          {/* Folgen Sie uns */}
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#D4AF37] mb-8">
              Folgen Sie uns
            </h3>
            <div className='space-y-0'>
              {Object.entries(socialLinks).map(([key, social]) => (
                <a
                  key={key}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex items-center gap-0 font-['Inter'] text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
                  aria-label={social.text}
                >
                  <IconComponent iconName={social.icon} />
                  {social.text}
                </a>
              ))}
            </div>

            {/* Language Toggle */}
            <div className='mt-8'>
              <div className='flex gap-0'>
                <button
                  onClick={() => setLanguage('DE')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all duration-300 ${
                    language === 'DE'
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-transparent text-white border border-gray-600 hover:opacity-80'
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all duration-300 ${
                    language === 'EN'
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-transparent text-white border border-gray-600 hover:opacity-80'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='max-w-[1104px] mx-auto w-full mb-16'>
          <div className='text-center mb-8'>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#D4AF37] mb-0">
              Newsletter
            </h3>
            <p className="font-['Inter'] text-sm text-white/70">
              Erhalten Sie exklusive Updates zu neuen Künstlern, Events und Aktionen.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className='space-y-8'>
            <div>
              <label htmlFor='newsletter-email' className='sr-only'>
                E-Mail-Adresse
              </label>
              <input
                id='newsletter-email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='your.email@example.com'
                className='w-full px-8 py-0 bg-[#3A3A3A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors duration-300'
                required
              />
            </div>

            <div className='flex items-start gap-0'>
              <input
                id='marketing-consent'
                type='checkbox'
                checked={agreeMarketing}
                onChange={(e) => setAgreeMarketing(e.target.checked)}
                className='mt-0 w-4 h-4 text-[#D4AF37] bg-[#3A3A3A] border-gray-600 rounded focus:ring-[#D4AF37] focus:ring-1'
                required
              />
              <label
                htmlFor='marketing-consent'
                className="font-['Inter'] text-xs text-white/60"
                aria-describedby='marketing-consent-description'
              >
                I agree to receive marketing communications from Medusa Tattoo München. You can
                unsubscribe at any time.
              </label>
            </div>

            <button
              type='submit'
              disabled={!email || !agreeMarketing}
              className="w-full bg-[#D4AF37] text-black font-['Inter'] font-medium py-0 px-8 rounded-lg hover:bg-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
            >
              Abonnieren
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className='w-full mb-16'>
          <div className='flex items-center justify-center gap-0 mb-8'>
            <MapPin size={20} className='text-[#D4AF37]' />
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#D4AF37]">
              Wegbeschreibung
            </h3>
          </div>

          <div className='relative rounded-lg overflow-hidden border-2 border-[#D4AF37]/20'>
            <iframe
              src={mapEmbedUrl}
              width='100%'
              height='400'
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Medusa Studio Location Map'
              className='h-[300px] md:h-[350px] lg:h-[400px] border-0'
            ></iframe>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-[#C0C0C0]/20 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
            <p className="font-['Inter'] text-xs text-white/50 text-center md:text-left">
              © 2025 Medusa Tattoo München. Alle Rechte vorbehalten.
            </p>

            <div className='flex items-center gap-8'>
              <a
                href={socialLinks.instagram.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='text-[#D4AF37] hover:scale-110 transition-transform duration-300'
              >
                <Instagram size={20} />
              </a>
              <a
                href={socialLinks.facebook.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
                className='text-[#D4AF37] hover:scale-110 transition-transform duration-300'
              >
                <Facebook size={20} />
              </a>
              <a
                href={socialLinks.rating.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Google Reviews'
                className='text-[#D4AF37] hover:scale-110 transition-transform duration-300'
              >
                <Star size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
