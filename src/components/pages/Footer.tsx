// ============================================
// COMPONENT: Footer
// ============================================
// PURPOSE: Comprehensive footer with studio info, legal links, quick links, social follow section, newsletter signup, and map

import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Star, Twitter, Youtube, ArrowRight } from 'lucide-react';
import './Footer.css';
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
    text: '[Client Address], [Client City]',
  },
  hours: {
    icon: 'Clock',
    text: '[Client Hours]',
  },
  phone: {
    icon: 'Phone',
    text: '[Client Phone]',
    href: 'tel:[client-phone]',
  },
  email: {
    icon: 'Mail',
    text: 'info@client-site.com',
    href: 'mailto:info@client-site.com',
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

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [language, setLanguage] = useState<'DE' | 'EN'>('DE');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: agreeMarketing }),
      });
    } catch (err) {
      // swallow errors for now; UI remains
      // console.error('Newsletter subscribe failed', err);
    } finally {
      setEmail('');
      setAgreeMarketing(false);
    }
  };

  const IconComponent = ({ iconName }: { iconName: string }) => {
    // Consistent 20px size for contact icons
    switch (iconName) {
      case 'MapPin':
        return <MapPin size={20} className='text-brand-gold shrink-0' />;
      case 'Clock':
        return <Clock size={20} className='text-brand-gold shrink-0' />;
      case 'Phone':
        return <Phone size={20} className='text-brand-gold shrink-0' />;
      case 'Mail':
        return <Mail size={20} className='text-brand-gold shrink-0' />;
      case 'Instagram':
        return (
          <Instagram
            size={28} // Larger size for social icons
            className='text-white hover:text-brand-gold transition-colors duration-300 shrink-0'
          />
        );
      case 'Facebook':
        return (
          <Facebook
            size={28} // Larger size for social icons
            className='text-white hover:text-brand-gold transition-colors duration-300 shrink-0'
          />
        );
      case 'Star':
        return (
          <Star
            size={28} // Larger size for social icons
            className='text-white hover:text-brand-gold transition-colors duration-300 shrink-0'
          />
        );
      default:
        return null;
    }
  };

  return (
    <footer className={`inked-footer relative z-10 w-full py-16 bg-brand-background text-white ${className}`}>
      <div className="container mx-auto px-8">
        {/* Logo and Social Media */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-16'>
          <h2 className='text-4xl font-bold mb-8 md:mb-0'>
            <a href="/" className="hover:opacity-80 transition-opacity transition duration-200 ease-out">Inked</a>
          </h2>
          
          <div className="flex space-x-8">
            <a 
              href="https://instagram.com" 
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors transition duration-200 ease-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com" 
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors transition duration-200 ease-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com" 
              aria-label="Twitter"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors transition duration-200 ease-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com" 
              aria-label="Youtube"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors transition duration-200 ease-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Main Footer Content - Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-8">
              Contact
            </h3>
            <ul className="space-y-8">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mt-0 mr-0 flex-shrink-0" />
                <span className="text-white/60">
                  123 Tattoo Street<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-0 flex-shrink-0" />
                <a href="mailto:info@inked.com" className="text-white/60 hover:text-white transition duration-200 ease-out">
                  info@inked.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-0 flex-shrink-0" />
                <a href="tel:+12125551234" className="text-white/60 hover:text-white transition duration-200 ease-out">
                  +1 (212) 555-1234
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-bold mb-8">
              Opening Hours
            </h3>
            
            <ul className="space-y-0 text-white/60">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>07AM - 10PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>09AM - 10PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-8">
              Newsletter
            </h3>
            <p className="text-white/60 mb-8">
              Subscribe to our newsletter to get the latest updates.
            </p>
            
            <form className="flex flex-col space-y-8" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/20 px-8 py-0 rounded-md focus:outline-none focus:border-white/50 flex flex-col h-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="inline-flex items-center gap-0 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-0 rounded-full font-medium transition-all duration-300 group flex-col h-full"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Links */}
        <div className='py-8 border-t border-white/10'>
          <div className="flex flex-wrap gap-y-0 gap-x-8">
            <a 
              href="/"
              className="text-white/60 hover:text-white transition-colors transition duration-200 ease-out"
            >
              Home
            </a>
            <a 
              href="/about"
              className="text-white/60 hover:text-white transition-colors transition duration-200 ease-out"
            >
              About
            </a>
            <a 
              href="/blog"
              className="text-white/60 hover:text-white transition-colors transition duration-200 ease-out"
            >
              Blog
            </a>
            <a 
              href="/gallery"
              className="text-white/60 hover:text-white transition-colors transition duration-200 ease-out"
            >
              Gallery
            </a>
            <a 
              href="/contact"
              className="text-white/60 hover:text-white transition-colors transition duration-200 ease-out"
            >
              Contact
            </a>
            <a 
              href="/services"
              className="text-white/60 hover:text-white transition-colors transition duration-200 ease-out"
            >
              Services
            </a>
            <a 
              href="/faq"
              className="text-white/60 hover:text-white transition-colors transition duration-200 ease-out"
            >
              FAQ
            </a>
            <a 
              href="/legal"
              className="text-white/60 hover:text-white transition-colors transition duration-200 ease-out"
            >
              Legal
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='pt-8 border-t border-white/10 text-center md:text-left text-white/40 text-sm'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div>
              © {new Date().getFullYear()} Inked. All rights reserved.
            </div>
            <div className="mt-8 md:mt-0">
              Made with passion for tattoo enthusiasts
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
