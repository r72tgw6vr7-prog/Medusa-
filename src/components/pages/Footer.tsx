// ============================================
// COMPONENT: Footer
// ============================================
// PURPOSE: Clean, flat footer with studio info, links, social, newsletter, and SEO location content

import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Container from '@/components/ui/Container';

// Data structures
const studioInfo = {
  phone: { text: '+49 (0) 89 269 313', href: 'tel:+4989269313' },
  email: { text: 'info@medusa-tattoo.de', href: 'mailto:info@medusa-tattoo.de' },
};

const legalLinks = [
  { i18nKey: 'common.footer.links.privacy', href: '/datenschutz' },
  { i18nKey: 'common.footer.links.imprint', href: '/impressum' },
  // { i18nKey: 'common.footer.links.terms', href: '/agb' },
  // AGB temporarily hidden - draft content
  { i18nKey: 'common.footer.links.aftercare', href: '/aftercare' },
];

const quickLinks = [
  { i18nKey: 'common.nav.home', href: '/' },
  { i18nKey: 'common.nav.services', href: '/services' },
  { i18nKey: 'common.nav.artists', href: '/artists' },
  { i18nKey: 'common.nav.about', href: '/about' },
  { i18nKey: 'common.nav.gallery', href: '/gallery' },
  { i18nKey: 'common.nav.faq', href: '/faq' },
  { i18nKey: 'common.nav.contact', href: '/contact' },
];

const socialLinks = {
  instagram: {
    href: 'https://www.instagram.com/medusa_tattoo_munich/',
    label: 'Medusa Instagram',
  },
  facebook: {
    href: 'https://www.facebook.com/MedusaTattooPiercingMuenchen/?locale=de_DE',
    label: 'Medusa Facebook',
  },
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const isEnglishPath = location.pathname === '/en' || location.pathname.startsWith('/en/');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreeMarketing) {
      setEmail('');
      setAgreeMarketing(false);
    }
  };

  return (
    <footer
      className='relative z-10 w-full py-16 text-luxury-text-inverse'
      style={{
        background: 'var(--card-bg)',
        borderTop: 'calc(var(--space-0-5) / 4) solid var(--card-border)',
        boxShadow: 'var(--card-shadow-depth), var(--card-shadow-glow)',
      }}
    >
      <div className='chrome-divider footer-divider' aria-hidden='true' />
      <Container>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 max-md:grid-cols-2 max-md:gap-8'>
          {/* Brand + Contact */}
          <div className='lg:col-span-1 max-md:col-span-2 text-center'>
            <h2 className='font-headline text-3xl font-bold text-white mb-4'>MEDUSA</h2>
            <p className='font-body text-base text-white/80 mb-6 leading-relaxed max-w-md mx-auto'>
              30 JAHRE, 30.000 TATTOOS UND FAST JEDES GENRE. Andere folgen Trends – wir erschaffen
              sie. Wir bringen Ihre Vision mit Präzision und Leidenschaft zum Leben.
            </p>

            <div className='space-y-4 max-md:flex max-md:flex-col max-md:items-center'>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <MapPin size={18} className='text-white/60 shrink-0' />
                <span className='font-body text-base text-white max-md:text-center'>
                  {t('common.footer.studio.address')}
                </span>
              </div>
              <div className='flex items-start gap-4 max-md:justify-center'>
                <Clock size={18} className='text-white/60 shrink-0 mt-2' />
                <div className='flex flex-col gap-2 max-md:text-center'>
                  <span className='font-body text-sm font-medium text-white/90'>
                    Öffnungszeiten
                  </span>
                  <div className='flex flex-col gap-0.5'>
                    <div className='flex items-center justify-between gap-4'>
                      <span className='font-body text-sm text-white/70'>Mo - Fr:</span>
                      <span className='font-body text-sm text-(--accent-chrome) font-medium'>
                        11:00 - 19:00
                      </span>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                      <span className='font-body text-sm text-white/70'>Sa:</span>
                      <span className='font-body text-sm text-(--accent-chrome) font-medium'>
                        10:00 - 16:00
                      </span>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                      <span className='font-body text-sm text-white/70'>So:</span>
                      <span className='font-body text-sm text-red-400 font-medium'>
                        Geschlossen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <Phone size={18} className='text-white/60 shrink-0' />
                <a
                  href={studioInfo.phone.href}
                  className='font-body text-base text-white hover:text-(--accent-chrome) transition-colors duration-300 touch-target-mobile touch-target-mobile-inline max-md:text-center'
                >
                  {studioInfo.phone.text}
                </a>
              </div>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <Mail size={18} className='text-white/60 shrink-0' />
                <a
                  href={studioInfo.email.href}
                  className='font-body text-base text-white hover:text-(--accent-chrome) transition-colors duration-300 touch-target-mobile touch-target-mobile-inline max-md:text-center'
                >
                  {studioInfo.email.text}
                </a>
              </div>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <MessageSquare size={18} className='text-green-400 shrink-0' />
                <a
                  href='https://wa.me/4917680196286?text=Hallo%20Medusa%20Tattoo'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-body text-base text-green-400 hover:text-green-300 transition-colors duration-300 touch-target-mobile touch-target-mobile-inline max-md:text-center'
                >
                  WhatsApp: +49 176 80196286
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-headline text-lg font-semibold text-white mb-4'>
              {t('common.footer.headings.quickLinks')}
            </h3>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={
                      link.href === '/about' ? (isEnglishPath ? '/en/about' : '/about') : link.href
                    }
                    className='font-body text-base text-white/80 hover:text-(--accent-chrome) transition-colors duration-300 touch-target-mobile touch-target-mobile-inline'
                  >
                    {t(link.i18nKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className='font-headline text-lg font-semibold text-white mb-4'>
              {t('common.footer.headings.legal')}
            </h3>
            <ul className='space-y-2'>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className='font-body text-base text-white/80 hover:text-(--accent-chrome) transition-colors duration-300 touch-target-mobile touch-target-mobile-inline'
                  >
                    {t(link.i18nKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div className='max-md:col-span-2'>
            <h3 className='font-headline text-lg font-semibold text-white mb-4'>
              {t('common.footer.headings.newsletter')}
            </h3>
            <p className='font-body text-base text-white/80 mb-4'>
              {t('common.footer.newsletter.description')}
            </p>

            <form onSubmit={handleNewsletterSubmit} className='space-y-4'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('common.footer.newsletter.emailPlaceholder')}
                className='flex flex-col h-full w-full px-4 py-4 bg-(--card-bg) border border-(--card-border) rounded-lg text-white placeholder-white/50 focus:border-(--accent-chrome) focus:outline-none transition-colors duration-300 touch-target-mobile'
                required
              />
              <div className='flex items-start gap-2'>
                <input
                  id='footer-consent'
                  type='checkbox'
                  checked={agreeMarketing}
                  onChange={(e) => setAgreeMarketing(e.target.checked)}
                  className='flex flex-col h-full mt-2 w-4 min-h-4 rounded border-white/30 bg-white/10 focus:ring-(--accent-chrome) touch-target-mobile'
                />
                <label
                  htmlFor='footer-consent'
                  className='font-body text-sm text-white/70 cursor-pointer touch-target-mobile touch-target-mobile-inline'
                >
                  {t('common.footer.newsletter.marketingConsent')}
                </label>
              </div>
              <button
                type='submit'
                disabled={!email || !agreeMarketing}
                className='flex flex-col h-full w-full bg-(--accent-chrome) text-(--deep-black) font-body font-semibold py-4 px-6 rounded-lg hover:bg-(--accent-chrome)/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 touch-target-mobile'
              >
                {t('common.footer.newsletter.subscribe')}
              </button>
            </form>

            {/* Social Icons */}
            <div className='flex items-center gap-4 mt-6'>
              <a
                href={socialLinks.instagram.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={socialLinks.instagram.label}
                className='text-white/80 hover:text-pink-400 transition-colors duration-300 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
              >
                <Instagram size={24} />
              </a>
              <a
                href={socialLinks.facebook.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={socialLinks.facebook.label}
                className='text-white/80 hover:text-blue-400 transition-colors duration-300 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Location section has been moved to a separate component */}

        {/* Bottom Bar */}
        <div className='mt-8 pt-8 border-t border-white/10'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='font-body text-sm text-white/60'>
              © {new Date().getFullYear()} {t('common.footer.bottomBar.rights')}
            </p>
            <p className='font-body text-sm text-white/60'>{t('common.footer.bottomBar.since')}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
