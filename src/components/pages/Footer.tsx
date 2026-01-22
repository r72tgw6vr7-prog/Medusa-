// ============================================
// COMPONENT: Footer
// ============================================
// PURPOSE: Clean, flat footer with studio info, links, social, newsletter, and SEO location content

import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Star, ChevronDown, Landmark, Train, Car } from 'lucide-react';
import Container from '../ui/Container';

// Data structures
const studioInfo = {
  address: 'Altheimer Eck 11, 80331 München',
  hours: 'Mo-Fr: 11:30-18:30, Sa: 11:00-18:00',
  phone: { text: '+49 (0) 89 269 313', href: 'tel:+4989269313' },
  email: { text: 'info@medusa-tattoo.de', href: 'mailto:info@medusa-tattoo.de' },
};

const legalLinks = [
  { text: 'Datenschutz', href: '/datenschutz' },
  { text: 'Impressum', href: '/impressum' },
  { text: 'AGB', href: '/agb' },
  { text: 'Nachsorge', href: '/aftercare' },
];

const quickLinks = [
  { text: 'Startseite', href: '/' },
  { text: 'Leistungen', href: '/services' },
  { text: 'Künstler', href: '/artists' },
  { text: 'Galerie', href: '/gallery' },
  { text: 'FAQ', href: '/faq' },
  { text: 'Kontakt', href: '/contact' },
];

const socialLinks = {
  instagram: { href: 'https://instagram.com/medusa_tattoo_munich', label: 'Instagram' },
  facebook: { href: 'https://facebook.com/medusa.tattoo.munich', label: 'Facebook' },
  google: { href: 'https://g.page/r/medusa-tattoo-munich/review', label: 'Google Reviews' },
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [isLocationAccordionOpen, setIsLocationAccordionOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreeMarketing) {
      setEmail('');
      setAgreeMarketing(false);
    }
  };

  const toggleLocationAccordion = () => {
    setIsLocationAccordionOpen(!isLocationAccordionOpen);
  };

  return (
    <footer className='relative z-10 w-full py-16 bg-luxury-bg-dark text-luxury-text-inverse'>
      <Container>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16'>
          
          {/* Brand + Contact */}
          <div className='lg:col-span-1'>
            <h2 className='font-headline text-3xl font-bold text-white mb-4'>MEDUSA</h2>
            <p className='font-body text-base text-white/80 mb-6 leading-relaxed'>
              Münchens exklusivestes Tattoo-Studio für Kunst, die ein Leben lang hält.
            </p>
            
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <MapPin size={18} className='text-white/60 shrink-0' />
                <span className='font-body text-base text-white'>{studioInfo.address}</span>
              </div>
              <div className='flex items-center gap-4'>
                <Clock size={18} className='text-white/60 shrink-0' />
                <span className='font-body text-base text-white'>{studioInfo.hours}</span>
              </div>
              <div className='flex items-center gap-4'>
                <Phone size={18} className='text-white/60 shrink-0' />
                <a
                  href={studioInfo.phone.href}
                  className='font-body text-base text-white hover:text-brand-accent transition-colors duration-300 touch-target-mobile touch-target-mobile-inline'
                >
                  {studioInfo.phone.text}
                </a>
              </div>
              <div className='flex items-center gap-4'>
                <Mail size={18} className='text-white/60 shrink-0' />
                <a
                  href={studioInfo.email.href}
                  className='font-body text-base text-white hover:text-brand-accent transition-colors duration-300 touch-target-mobile touch-target-mobile-inline'
                >
                  {studioInfo.email.text}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-headline text-lg font-semibold text-white mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='font-body text-base text-white/80 hover:text-white transition-colors duration-300 touch-target-mobile touch-target-mobile-inline'
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className='font-headline text-lg font-semibold text-white mb-4'>
              Rechtliches
            </h3>
            <ul className='space-y-2'>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='font-body text-base text-white/80 hover:text-white transition-colors duration-300 touch-target-mobile touch-target-mobile-inline'
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h3 className='font-headline text-lg font-semibold text-white mb-4'>
              Newsletter
            </h3>
            <p className='font-body text-base text-white/80 mb-4'>
              Exklusive Updates zu Events und Aktionen.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className='space-y-4'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='E-Mail Adresse'
                className='flex flex-col h-full w-full px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-brand-accent focus:outline-none transition-colors duration-300 touch-target-mobile'
                required
              />
              <div className='flex items-start gap-2'>
                <input
                  id='footer-consent'
                  type='checkbox'
                  checked={agreeMarketing}
                  onChange={(e) => setAgreeMarketing(e.target.checked)}
                  className='flex flex-col h-full mt-2 w-4 min-h-4 rounded border-white/30 bg-white/10 focus:ring-brand-accent touch-target-mobile'
                />
                <label
                  htmlFor='footer-consent'
                  className='font-body text-sm text-white/70 cursor-pointer touch-target-mobile touch-target-mobile-inline'
                >
                  Ich stimme dem Erhalt von Marketing-E-Mails zu.
                </label>
              </div>
              <button
                type='submit'
                disabled={!email || !agreeMarketing}
                className='flex flex-col h-full w-full bg-[var(--accent-chrome)] text-[var(--deep-black)] font-body font-semibold py-4 px-6 rounded-lg hover:bg-[var(--accent-chrome)]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 touch-target-mobile' 
              >
                Abonnieren
              </button>
            </form>

            {/* Social Icons */}
            <div className='flex items-center gap-4 mt-6'>
              <a
                href={socialLinks.instagram.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={socialLinks.instagram.label}
                className='text-white/80 hover:text-white transition-colors duration-300 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
              >
                <Instagram size={24} />
              </a>
              <a
                href={socialLinks.facebook.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={socialLinks.facebook.label}
                className='text-white/80 hover:text-white transition-colors duration-300 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
              >
                <Facebook size={24} />
              </a>
              <a
                href={socialLinks.google.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={socialLinks.google.label}
                className='text-white/80 hover:text-white transition-colors duration-300 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
              >
                <Star size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Location Accordion Section - SEO Content */}
        <div className='mt-12 pt-8 border-t border-white/10'>
          <button
            onClick={toggleLocationAccordion}
            className="flex items-center justify-between w-full text-left py-4 hover:bg-white/5 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent touch-target-mobile"
            aria-expanded={isLocationAccordionOpen}
            aria-controls="location-accordion-content"
          >
            <div className="flex items-center gap-4">
              <MapPin size={20} className='text-white/60 shrink-0' />
              <h3 className='font-headline text-xl font-semibold text-white'>
                Studio Lage & Anfahrt
              </h3>
            </div>
            <ChevronDown
              size={20}
              className={`text-white/60 transition-transform duration-300 ${isLocationAccordionOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isLocationAccordionOpen && (
            <div
              id="location-accordion-content"
              className="pt-8 pb-8 space-y-12"
            >
              {/* Location Icons Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col h-full text-center">
                  <Landmark className="mx-auto mb-4 w-8 h-8 text-white/80" />
                  <h4 className="font-semibold text-base text-white mb-2">Marienplatz</h4>
                  <p className="text-base text-white/70">Nur 2 Minuten vom zentralen Marienplatz entfernt</p>
                </div>
                <div className="flex flex-col h-full text-center">
                  <Train className="mx-auto mb-4 w-8 h-8 text-white/80" />
                  <h4 className="font-semibold text-base text-white mb-2">U-Bahn</h4>
                  <p className="text-base text-white/70">U3/U6 Marienplatz Station</p>
                </div>
                <div className="flex flex-col h-full text-center">
                  <Train className="mx-auto mb-4 w-8 h-8 text-white/80" />
                  <h4 className="font-semibold text-base text-white mb-2">S-Bahn</h4>
                  <p className="text-base text-white/70">S1-S8 Marienplatz Station</p>
                </div>
                <div className="flex flex-col h-full text-center">
                  <Car className="mx-auto mb-4 w-8 h-8 text-white/80" />
                  <h4 className="font-semibold text-base text-white mb-2">Parken</h4>
                  <p className="text-base text-white/70">Parkhaus Tal 26 oder Q-Park Marienplatz</p>
                </div>
              </div>

              {/* SEO Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm bg-white/10 text-white px-4 py-2 rounded-full">Tattoo Marienplatz</span>
                <span className="text-sm bg-white/10 text-white px-4 py-2 rounded-full">Tattoo Studio Innenstadt</span>
                <span className="text-sm bg-white/10 text-white px-4 py-2 rounded-full">Tattoo Zentrum München</span>
                <span className="text-sm bg-white/10 text-white px-4 py-2 rounded-full">Tattoo Altheimer Eck</span>
                <span className="text-sm bg-white/10 text-white px-4 py-2 rounded-full">English Speaking Tattoo Munich</span>
              </div>

              {/* Divider */}
              <hr className="border-t border-white/10" />

              {/* FAQ Cards */}
              <div>
                <h3 className="text-xl font-semibold mb-8 text-center text-white">
                  Tattoo Studio München – Ihre Fragen, unsere Antworten
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col h-full bg-white/5 rounded-lg p-6">
                    <h4 className="font-semibold text-lg text-white mb-4">Für Einheimische:</h4>
                    <p className="text-base text-white/70 leading-relaxed">
                      Unser Tattoo Studio in München Innenstadt ist von allen Stadtteilen perfekt erreichbar.
                      Ob aus Schwabing, Haidhausen, Neuhausen oder Sendling – die Anreise im öffentlichen
                      Verkehrsmitteln dauert maximal 20 Minuten.
                    </p>
                  </div>

                  <div className="flex flex-col h-full bg-white/5 rounded-lg p-6">
                    <h4 className="font-semibold text-lg text-white mb-4">Für Touristen:</h4>
                    <p className="text-base text-white/70 leading-relaxed">
                      Als zentral gelegenes Tattoo Studio am Marienplatz sind wir die perfekte Adresse für
                      Besucher Münchens. Kombinieren Sie Ihr Tattoo mit einem Bummel über den Viktualienmarkt
                      oder einer Tour durch die Altstadt.
                    </p>
                  </div>

                  <div className="flex flex-col h-full bg-white/5 rounded-lg p-6">
                    <h4 className="font-semibold text-lg text-white mb-4">Öffnungszeiten:</h4>
                    <div className="text-base text-white/70 space-y-2">
                      <p><strong className="text-white">Mo-Fr:</strong> 11:30-18:30</p>
                      <p><strong className="text-white">Sa:</strong> 11:00-18:00</p>
                      <p><strong className="text-white">So:</strong> Geschlossen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 pt-8 border-t border-white/10'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='font-body text-sm text-white/60'>
              © {new Date().getFullYear()} Medusa Tattoo München. Alle Rechte vorbehalten.
            </p>
            <p className='font-body text-sm text-white/60'>
              Seit 1994 im Herzen Münchens
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
