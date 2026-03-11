// ============================================
// COMPONENT: Footer
// ============================================
// PURPOSE: Clean, flat footer with studio info, links, social, and SEO location content

import React from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Container from '@/components/ui/Container';
import { localizePath } from '@/i18n/utils/localizePath';

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
  const { language, t } = useLanguage();

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
            <p className='reading-measure font-body text-base text-white/74 mb-6 leading-relaxed max-w-md mx-auto'>
              {t('common.footer.brandDescription')}
            </p>

            <div className='space-y-4 max-md:flex max-md:flex-col max-md:items-center'>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <MapPin size={18} className='text-white/60 shrink-0' />
                <span className='font-body text-base text-white max-md:text-center'>
                  {t('common.footer.studio.address')}
                </span>
              </div>
              <div className='flex flex-col h-full items-start gap-4 max-md:justify-center rounded-[24px] border border-white/8 bg-white/3 px-4 py-4'>
                <Clock size={18} className='text-white/60 shrink-0 mt-2' />
                <div className='flex flex-col gap-2 max-md:text-center'>
                  <span className='font-body text-sm font-medium text-white/90'>
                    {t('common.footer.hoursCard.heading')}
                  </span>
                  <div className='grid grid-cols-[auto_auto] gap-x-4 gap-y-2'>
                    <div className='contents'>
                      <span className='font-body text-sm text-white/70'>
                        {t('common.footer.hoursCard.weekdaysLabel')}
                      </span>
                      <span className='font-body text-sm text-(--accent-chrome) font-medium'>
                        {t('common.footer.hoursCard.weekdaysValue')}
                      </span>
                    </div>
                    <div className='contents'>
                      <span className='font-body text-sm text-white/70'>
                        {t('common.footer.hoursCard.weekendLabel')}
                      </span>
                      <span className='font-body text-sm text-(--accent-chrome) font-medium'>
                        {t('common.footer.hoursCard.weekendValue')}
                      </span>
                    </div>
                    <div className='contents'>
                      <span className='font-body text-sm text-white/70'>
                        {t('common.footer.hoursCard.sundayLabel')}
                      </span>
                      <span className='font-body text-sm text-red-400 font-medium'>
                        {t('common.footer.hoursCard.sundayValue')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <Phone size={18} className='text-white/60 shrink-0' />
                <a
                  href={studioInfo.phone.href}
                  className='premium-link font-body text-base touch-target-mobile touch-target-mobile-inline max-md:text-center'
                >
                  {studioInfo.phone.text}
                </a>
              </div>
              <div className='flex items-center gap-4 max-md:justify-center'>
                <Mail size={18} className='text-white/60 shrink-0' />
                <a
                  href={studioInfo.email.href}
                  className='premium-link font-body text-base touch-target-mobile touch-target-mobile-inline max-md:text-center'
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
                  className='premium-link font-body text-base text-green-400 touch-target-mobile touch-target-mobile-inline max-md:text-center'
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
                    to={localizePath(link.href, language)}
                    className='premium-link font-body text-base touch-target-mobile touch-target-mobile-inline'
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
                    to={localizePath(link.href, language)}
                    className='premium-link font-body text-base touch-target-mobile touch-target-mobile-inline'
                  >
                    {t(link.i18nKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div className='max-md:col-span-2 self-start'>
            <div className='flex flex-col items-start rounded-(--card-radius) border border-white/8 bg-white/3 p-5 shadow-[var(--premium-elevation)]'>
              <h3 className='mb-3 font-headline text-lg font-semibold text-white'>
                {t('common.footer.headings.newsletter')}
              </h3>
              <p className='mb-4 font-body text-base text-white/72 reading-measure'>
                {t('common.footer.newsletter.description')}
              </p>

              <div className='flex items-center gap-3'>
                <a
                  href={socialLinks.instagram.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={socialLinks.instagram.label}
                  className='premium-interactive flex flex-col h-full min-h-12 min-w-12 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/80 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
                >
                  <Instagram size={22} />
                </a>
                <a
                  href={socialLinks.facebook.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={socialLinks.facebook.label}
                  className='premium-interactive flex flex-col h-full min-h-12 min-w-12 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/80 touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
                >
                  <Facebook size={22} />
                </a>
              </div>
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
