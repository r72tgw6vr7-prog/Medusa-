// ============================================
// COMPONENT: Footer
// ============================================
// PURPOSE: Clean, flat footer with studio info, links, social, newsletter, and SEO location content

import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Star,
  ChevronDown,
  Landmark,
  Train,
  Car,
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
  { i18nKey: 'common.nav.gallery', href: '/gallery' },
  { i18nKey: 'common.nav.faq', href: '/faq' },
  { i18nKey: 'common.nav.contact', href: '/contact' },
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
  const { t } = useLanguage();

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
          <div className='lg:col-span-1 max-md:col-span-2 max-md:text-center'>
            <h2 className='font-headline text-3xl font-bold text-white mb-4'>MEDUSA</h2>
            <p className='font-body text-base text-white/80 mb-6 leading-relaxed max-md:mx-auto max-md:max-w-md'>
              {t('common.footer.brandTagline')}
            </p>

            <div className='space-y-4 max-md:flex max-md:flex-col max-md:items-center'>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <MapPin size={18} className='text-white/60 shrink-0' />
                <span className='font-body text-base text-white max-md:text-center'>
                  {t('common.footer.studio.address')}
                </span>
              </div>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <Clock size={18} className='text-white/60 shrink-0' />
                <span className='font-body text-base text-white max-md:text-center'>
                  {t('common.footer.studio.hours')}
                </span>
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
                    to={link.href}
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
                className='text-white/80 hover:text-(--accent-chrome) transition-colors duration-300 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
              >
                <Instagram size={24} />
              </a>
              <a
                href={socialLinks.facebook.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={socialLinks.facebook.label}
                className='text-white/80 hover:text-(--accent-chrome) transition-colors duration-300 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
              >
                <Facebook size={24} />
              </a>
              <a
                href={socialLinks.google.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={socialLinks.google.label}
                className='text-white/80 hover:text-(--accent-chrome) transition-colors duration-300 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
              >
                <Star size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Location Accordion Section - SEO Content */}
        <div className='mt-12 pt-8 border-t border-white/10'>
          {isLocationAccordionOpen ? (
            <button
              onClick={toggleLocationAccordion}
              className='flex items-center justify-between w-full text-left py-4 hover:bg-(--accent-chrome)/10 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-(--accent-chrome) touch-target-mobile'
              aria-expanded='true'
              aria-controls='location-accordion-content'
            >
              <div className='flex items-center gap-4'>
                <MapPin size={20} className='text-white/60 shrink-0' />
                <h3 className='font-headline text-xl font-semibold text-white'>
                  {t('common.footer.location.title')}
                </h3>
              </div>
              <ChevronDown
                size={20}
                className='text-white/60 transition-transform duration-300 rotate-180'
              />
            </button>
          ) : (
            <button
              onClick={toggleLocationAccordion}
              className='flex items-center justify-between w-full text-left py-4 hover:bg-(--accent-chrome)/10 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-(--accent-chrome) touch-target-mobile'
              aria-expanded='false'
              aria-controls='location-accordion-content'
            >
              <div className='flex items-center gap-4'>
                <MapPin size={20} className='text-white/60 shrink-0' />
                <h3 className='font-headline text-xl font-semibold text-white'>
                  {t('common.footer.location.title')}
                </h3>
              </div>
              <ChevronDown size={20} className='text-white/60 transition-transform duration-300' />
            </button>
          )}

          {isLocationAccordionOpen && (
            <div id='location-accordion-content' className='pt-8 pb-8 space-y-12'>
              {/* Location Icons Grid */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                <div className='flex flex-col h-full text-center'>
                  <Landmark className='mx-auto mb-4 w-8 h-8 text-white/80' />
                  <h4 className='font-semibold text-base text-white mb-2'>
                    {t('common.footer.location.items.marienplatz.title')}
                  </h4>
                  <p className='text-base text-white/70'>
                    {t('common.footer.location.items.marienplatz.subtitle')}
                  </p>
                </div>
                <div className='flex flex-col h-full text-center'>
                  <Train className='mx-auto mb-4 w-8 h-8 text-white/80' />
                  <h4 className='font-semibold text-base text-white mb-2'>
                    {t('common.footer.location.items.subway.title')}
                  </h4>
                  <p className='text-base text-white/70'>
                    {t('common.footer.location.items.subway.subtitle')}
                  </p>
                </div>
                <div className='flex flex-col h-full text-center'>
                  <Train className='mx-auto mb-4 w-8 h-8 text-white/80' />
                  <h4 className='font-semibold text-base text-white mb-2'>
                    {t('common.footer.location.items.suburbanRail.title')}
                  </h4>
                  <p className='text-base text-white/70'>
                    {t('common.footer.location.items.suburbanRail.subtitle')}
                  </p>
                </div>
                <div className='flex flex-col h-full text-center'>
                  <Car className='mx-auto mb-4 w-8 h-8 text-white/80' />
                  <h4 className='font-semibold text-base text-white mb-2'>
                    {t('common.footer.location.items.parking.title')}
                  </h4>
                  <p className='text-base text-white/70'>
                    {t('common.footer.location.items.parking.subtitle')}
                  </p>
                </div>
              </div>

              {/* SEO Tags */}
              <div className='flex flex-wrap gap-2 justify-center'>
                <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                  {t('common.footer.location.tags.marienplatz')}
                </span>
                <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                  {t('common.footer.location.tags.innerCity')}
                </span>
                <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                  {t('common.footer.location.tags.cityCenter')}
                </span>
                <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                  {t('common.footer.location.tags.altheimerEck')}
                </span>
                <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                  {t('common.footer.location.tags.englishSpeaking')}
                </span>
              </div>

              {/* Divider */}
              <hr className='border-t border-white/10' />

              {/* FAQ Cards */}
              <div>
                <h3 className='text-xl font-semibold mb-8 text-center text-white'>
                  {t('common.footer.location.faq.title')}
                </h3>

                <div className='grid md:grid-cols-3 gap-8'>
                  <div className='flex flex-col h-full bg-white/5 rounded-lg p-6'>
                    <h4 className='font-semibold text-lg text-white mb-4'>
                      {t('common.footer.location.faq.cards.locals.title')}
                    </h4>
                    <p className='text-base text-white/70 leading-relaxed'>
                      {t('common.footer.location.faq.cards.locals.body')}
                    </p>
                  </div>

                  <div className='flex flex-col h-full bg-white/5 rounded-lg p-6'>
                    <h4 className='font-semibold text-lg text-white mb-4'>
                      {t('common.footer.location.faq.cards.tourists.title')}
                    </h4>
                    <p className='text-base text-white/70 leading-relaxed'>
                      {t('common.footer.location.faq.cards.tourists.body')}
                    </p>
                  </div>

                  <div className='flex flex-col h-full bg-white/5 rounded-lg p-6'>
                    <h4 className='font-semibold text-lg text-white mb-4'>
                      {t('common.footer.location.faq.cards.hours.title')}
                    </h4>
                    <div className='text-base text-white/70 space-y-2'>
                      <p>
                        <strong className='text-white'>
                          {t('common.footer.location.faq.cards.hours.monFriLabel')}
                        </strong>{' '}
                        {t('common.footer.location.faq.cards.hours.monFriValue')}
                      </p>
                      <p>
                        <strong className='text-white'>
                          {t('common.footer.location.faq.cards.hours.satLabel')}
                        </strong>{' '}
                        {t('common.footer.location.faq.cards.hours.satValue')}
                      </p>
                      <p>
                        <strong className='text-white'>
                          {t('common.footer.location.faq.cards.hours.sunLabel')}
                        </strong>{' '}
                        {t('common.footer.location.faq.cards.hours.sunValue')}
                      </p>
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
