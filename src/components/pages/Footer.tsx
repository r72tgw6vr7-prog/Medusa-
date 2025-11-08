// ============================================
// COMPONENT: Footer
// ============================================
// PURPOSE: Comprehensive footer with studio info, legal links, quick links, social follow section, newsletter signup, and map

import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Star } from 'lucide-react';
import GoogleMap from '../GoogleMap';

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
    // Consistent 20px size for contact icons
    switch (iconName) {
      case 'MapPin':
        return <MapPin size={20} className='text-(--brand-gold) shrink-0' />;
      case 'Clock':
        return <Clock size={20} className='text-(--brand-gold) shrink-0' />;
      case 'Phone':
        return <Phone size={20} className='text-(--brand-gold) shrink-0' />;
      case 'Mail':
        return <Mail size={20} className='text-(--brand-gold) shrink-0' />;
      case 'Instagram':
        return (
          <Instagram
            size={28} // Larger size for social icons
            className='text-white hover:text-(--brand-gold) transition-colors duration-300 shrink-0'
          />
        );
      case 'Facebook':
        return (
          <Facebook
            size={28} // Larger size for social icons
            className='text-white hover:text-(--brand-gold) transition-colors duration-300 shrink-0'
          />
        );
      case 'Star':
        return (
          <Star
            size={28} // Larger size for social icons
            className='text-white hover:text-(--brand-gold) transition-colors duration-300 shrink-0'
          />
        );
      default:
        return null;
    }
  };

  return (
    <footer className='relative z-10 w-full py-16 md:py-16 lg:py-24'>
      <div className='max-w-7xl mx-auto px-8 md:px-16 lg:px-16'>
        {/* Logo and Tagline */}
        <div className='mb-16'>
          <h2 className="font-headline text-4xl font-bold text-(--brand-gold) mb-8">
            MEDUSA
          </h2>
          <p className="font-body text-base text-white/80">
            Münchens exklusivestes Tattoo-Studio für Kunst, die ein Leben lang hält.
          </p>
        </div>

        {/* Four-column grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16'>
          {/* Unser Studio */}
          <div className='space-y-8'>
            <h3 className="font-headline text-sm font-semibold tracking-wider uppercase text-(--brand-gold) mb-8">
              UNSER STUDIO
            </h3>
            <div className='space-y-8'>
              <div className='flex items-start gap-8'>
                <IconComponent iconName={studioInfo.address.icon} />
                <span className="font-body text-sm text-white/80 leading-relaxed">
                  {studioInfo.address.text}
                </span>
              </div>
              <div className='flex items-start gap-8'>
                <IconComponent iconName={studioInfo.hours.icon} />
                <span className="font-body text-sm text-white/80 leading-relaxed">
                  {studioInfo.hours.text}
                </span>
              </div>
              <div className='flex items-start gap-8'>
                <IconComponent iconName={studioInfo.phone.icon} />
                <a
                  href={studioInfo.phone.href}
                  className="font-body text-sm text-white/80 hover:text-(--brand-gold) transition-colors duration-300"
                >
                  {studioInfo.phone.text}
                </a>
              </div>
              <div className='flex items-start gap-8'>
                <IconComponent iconName={studioInfo.email.icon} />
                <a
                  href={studioInfo.email.href}
                  className="font-body text-sm text-white/80 hover:text-(--brand-gold) transition-colors duration-300"
                >
                  {studioInfo.email.text}
                </a>
              </div>
            </div>
          </div>

          {/* Rechtliches */}
          <div className='space-y-8'>
            <h3 className="font-headline text-sm font-semibold tracking-wider uppercase text-(--brand-gold) mb-8">
              RECHTLICHES
            </h3>
            <ul className='space-y-8'>
              {legalLinks.map((link, index) => (
                <li key={`legal-${link.text}`}>
                  <a
                    href={link.href}
                    className="block font-body text-sm text-white/80 hover:text-(--brand-gold) transition-colors duration-300"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className='space-y-8'>
            <h3 className="font-headline text-sm font-semibold tracking-wider uppercase text-(--brand-gold) mb-8">
              QUICK LINKS
            </h3>
            <ul className='space-y-8'>
              {quickLinks.map((link, index) => (
                <li key={`quick-${link.text}`}>
                  <a
                    href={link.href}
                    className="block font-body text-sm text-white/80 hover:text-(--brand-gold) transition-colors duration-300"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Folgen Sie uns */}
          <div className='space-y-8'>
            <h3 className="font-headline text-sm font-semibold tracking-wider uppercase text-(--brand-gold) mb-8">
              FOLGEN SIE UNS
            </h3>
            {/* Social Icons */}
            <div className='flex gap-8 mb-16'>
              <a
                href={socialLinks.instagram.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='text-white hover:text-(--brand-gold) transition-colors duration-300'
              >
                <Instagram size={28} />
              </a>
              <a
                href={socialLinks.facebook.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
                className='text-white hover:text-(--brand-gold) transition-colors duration-300'
              >
                <Facebook size={28} />
              </a>
              <a
                href={socialLinks.rating.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Google Reviews'
                className='text-white hover:text-(--brand-gold) transition-colors duration-300'
              >
                <Star size={28} />
              </a>
            </div>
            
            <div className='space-y-8'>
              {Object.entries(socialLinks).map(([key, social]) => (
                <div key={key} className='flex items-center gap-8'>
                  <IconComponent iconName={social.icon} />
                  <a
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className="font-body text-sm text-white/80 hover:text-brand-gold transition-colors duration-300"
                    aria-label={social.text}
                  >
                    {social.text}
                  </a>
                </div>
              ))}
            </div>

            {/* Language Toggle */}
            <div className='mt-16'>
              <div className='flex gap-8'>
                <button
                  onClick={() => setLanguage('DE')}
                  className={`px-8 py-8 text-sm font-medium rounded transition-all duration-300 ${
                    language === 'DE'
                      ? 'bg-(--brand-gold) text-black'
                      : 'bg-transparent text-white border border-(--brand-gold)/40 hover:border-(--brand-gold)'
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-8 py-8 text-sm font-medium rounded transition-all duration-300 ${
                    language === 'EN'
                      ? 'bg-(--brand-gold) text-black'
                      : 'bg-transparent text-white border border-(--brand-gold)/40 hover:border-(--brand-gold)'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='border-t border-white/20 pt-16 mb-16'>
          <div className='text-center mb-8'>
            <h3 className="font-headline text-2xl font-bold text-(--brand-gold) mb-8">
              Newsletter
            </h3>
            <p className="font-body text-base text-white/80 mb-8">
              Erhalten Sie exklusive Updates zu neuen Künstlern, Events und Aktionen.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className='max-w-md mx-auto mb-8'>
            <div className='flex gap-8 mb-8'>
              <div className='flex-1'>
                <label htmlFor='newsletter-email' className='sr-only'>
                  E-Mail-Adresse
                </label>
                <input
                  id='newsletter-email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='your.email@example.com'
                  className='w-full px-8 py-8 bg-white/10 border border-white/30 rounded text-white placeholder-white/50 focus:border-(--brand-gold) focus:outline-none transition-colors duration-300'
                  required
                />
              </div>
              <button
                type='submit'
                disabled={!email || !agreeMarketing}
                className="bg-(--brand-gold) text-black font-body font-medium py-8 px-8 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-(--brand-gold) focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
              >
                Abonnieren
              </button>
            </div>

            <div className='flex items-center justify-center gap-8'>
              <input
                id='marketing-consent'
                type='checkbox'
                checked={agreeMarketing}
                onChange={(e) => setAgreeMarketing(e.target.checked)}
                className='w-4 h-4 text-(--brand-gold) bg-white/10 border-white/30 rounded focus:ring-(--brand-gold) focus:ring-0'
                required
              />
              <label
                htmlFor='marketing-consent'
                className="font-body text-sm text-white/80"
                aria-describedby='marketing-consent-description'
              >
                I agree to receive marketing communications from Medusa Tattoo München. You can
                unsubscribe at any time.
              </label>
            </div>
          </form>
        </div>

        {/* Map Section */}
        <div className='border-t border-white/20 pt-16 mb-16 text-center'>
          <h3 className="font-headline text-xl font-bold text-(--brand-gold) mb-8 flex items-center justify-center gap-8">
            <MapPin size={20} className='text-(--brand-gold)' />
            Wegbeschreibung
          </h3>

          <div className='bg-white/10 rounded h-64 overflow-hidden'>
            <GoogleMap 
              width="100%"
              height="100%"
              className=""
              title="Medusa Studio Location Map"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-white/20 pt-16'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-16'>
            <p className="font-body text-sm text-white/50">
              © 2025 Medusa Tattoo München. Alle Rechte vorbehalten.
            </p>

            <div className='flex items-center gap-16'>
              <a
                href={socialLinks.instagram.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='text-white hover:text-(--brand-gold) transition-colors duration-300'
              >
                <Instagram size={28} />
              </a>
              <a
                href={socialLinks.facebook.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
                className='text-white hover:text-(--brand-gold) transition-colors duration-300'
              >
                <Facebook size={28} />
              </a>
              <a
                href={socialLinks.rating.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Google Reviews'
                className='text-white hover:text-(--brand-gold) transition-colors duration-300'
              >
                <Star size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
