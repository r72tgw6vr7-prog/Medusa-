import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './NavigationStyles.css';

type NavItem = {
  to: string;
  i18nKey: string;
  isActive: (pathname: string) => boolean;
};

const NAV_ITEMS: NavItem[] = [
  { to: '/', i18nKey: 'nav.home', isActive: (path) => path === '/' },
  { to: '/services', i18nKey: 'nav.services', isActive: (path) => path.startsWith('/services') },
  { to: '/artists', i18nKey: 'nav.artists', isActive: (path) => path.startsWith('/artists') },
  { to: '/gallery', i18nKey: 'nav.gallery', isActive: (path) => path.startsWith('/gallery') },
  { to: '/booking', i18nKey: 'nav.booking', isActive: (path) => path.startsWith('/booking') },
  { to: '/faq', i18nKey: 'nav.faq', isActive: (path) => path.startsWith('/faq') },
  { to: '/contact', i18nKey: 'nav.contact', isActive: (path) => path.startsWith('/contact') },
];

export function MainNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const isGerman = language === 'de';

  useEffect(() => {
    const handleScroll = () => {
      const heroSection =
        document.querySelector('.hero-section') ||
        document.querySelector('[class*="hero"]') ||
        document.querySelector('section:first-of-type');

      let heroHeight = window.innerHeight;

      if (heroSection) {
        heroHeight = (heroSection as HTMLElement).offsetHeight;
      }

      const isPastHero = window.scrollY > heroHeight - 100;
      setScrolled((prev) => (prev === isPastHero ? prev : isPastHero));
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !overlayRef.current) {
        return;
      }

      const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
        'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';

      window.setTimeout(() => {
        const first = overlayRef.current?.querySelector<HTMLElement>(
          'button, a, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        first?.focus();
      }, 0);
    } else {
      document.body.style.overflow = '';
      openButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const nav = document.querySelector('.navigation') as HTMLElement | null;

      if (nav) {
        document.documentElement.style.setProperty('--header-height', `${nav.offsetHeight}px`);
      }
    };

    updateHeaderHeight();

    const nav = document.querySelector('.navigation') as HTMLElement | null;
    let resizeObserver: ResizeObserver | undefined;

    if (nav && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(nav);
    }

    window.addEventListener('resize', updateHeaderHeight);
    document.addEventListener('scroll', updateHeaderHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      document.removeEventListener('scroll', updateHeaderHeight);
      if (resizeObserver && nav) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (openButtonRef.current) {
      openButtonRef.current.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
    }
  }, [menuOpen]);

  const switchLanguage = (nextLanguage: 'de' | 'en') => {
    if (nextLanguage !== language) {
      setLanguage(nextLanguage);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`navigation fixed top-0 left-0 right-0 z-1000 w-full px-4 sm:px-8 transition-all duration-300 ease-out ${
        scrolled ? 'scrolled' : ''
      } ${menuOpen ? 'menu-open' : ''}`}
    >
      <div className='mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-8 px-8 sm:px-16'>
        <Link
          to='/'
          className="nav-logo text-[28px] leading-none tracking-tight text-brand-gold sm:text-[36px] md:text-[48px] font-['Playfair_Display'] font-bold"
        >
          MEDUSA
        </Link>

        <div className='hidden flex-1 xl:flex'>
          <div className='flex w-full items-center justify-center gap-16'>
            {NAV_ITEMS.map(({ to, i18nKey, isActive }) => {
              const active = isActive(location.pathname);

              return (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link text-[18px] font-['Playfair_Display'] font-medium transition-all duration-300 ${
                    active ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {t(i18nKey)}
                </Link>
              );
            })}
          </div>
        </div>

        <div className='hidden items-center gap-8 xl:flex'>
          <div className='language-toggle' role='group' aria-label='Language selection'>
            <div
              className={`language-toggle__indicator ${isGerman ? '' : 'language-toggle__indicator--en'}`}
            />
            <button
              type='button'
              className={`language-toggle__button ${
                isGerman ? 'language-toggle__button--active' : 'language-toggle__button--inactive'
              }`}
              onClick={() => switchLanguage('de')}
            >
              DE
            </button>
            <button
              type='button'
              className={`language-toggle__button ${
                isGerman ? 'language-toggle__button--inactive' : 'language-toggle__button--active'
              }`}
              onClick={() => switchLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>

        <div className='flex items-center xl:hidden'>
          <button
            ref={openButtonRef}
            type='button'
            aria-controls='mobile-menu-overlay'
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setMenuOpen((value) => !value)}
            className={`mobile-menu-button focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70 ${
              menuOpen ? 'is-open' : ''
            }`}
          >
            <span aria-hidden className='mobile-menu-button__box'>
              <span className='mobile-menu-button__line mobile-menu-button__line--top' />
              <span className='mobile-menu-button__line mobile-menu-button__line--middle' />
              <span className='mobile-menu-button__line mobile-menu-button__line--bottom' />
            </span>
          </button>
        </div>
      </div>

      {menuOpen &&
        createPortal(
          <div
            id='mobile-menu-overlay'
            ref={overlayRef}
            role='dialog'
            aria-modal='true'
            className='mobile-menu-overlay'
          >
            <div className='mobile-menu-overlay__panel'>
              <nav className='mobile-menu-overlay__links'>
                {NAV_ITEMS.map(({ to, i18nKey, isActive }) => {
                  const active = isActive(location.pathname);

                  return (
                    <Link
                      key={`mobile-${to}`}
                      to={to}
                      onClick={closeMenu}
                      className={`mobile-nav-link ${active ? 'text-brand-gold' : 'text-white hover:text-brand-gold'}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {t(i18nKey)}
                    </Link>
                  );
                })}
              </nav>

              <div className='mobile-menu-overlay__language'>
                <div className='language-toggle' role='group' aria-label='Language selection'>
                  <div
                    className={`language-toggle__indicator ${isGerman ? '' : 'language-toggle__indicator--en'}`}
                  />
                  <button
                    type='button'
                    className={`language-toggle__button ${
                      isGerman
                        ? 'language-toggle__button--active'
                        : 'language-toggle__button--inactive'
                    }`}
                    onClick={() => switchLanguage('de')}
                  >
                    DE
                  </button>
                  <button
                    type='button'
                    className={`language-toggle__button ${
                      isGerman
                        ? 'language-toggle__button--inactive'
                        : 'language-toggle__button--active'
                    }`}
                    onClick={() => switchLanguage('en')}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className='mobile-menu-overlay__cta'>
                <Link
                  to='/booking'
                  onClick={closeMenu}
                  className='hero-appointment-cta nav-cta inline-flex h-12 w-full items-center justify-center rounded-lg text-base font-semibold text-[#C0C0C0] transition-all duration-300 hover:border-[#D4D4D4] hover:text-white'
                  aria-label={t('nav.booking')}
                >
                  {t('nav.bookingShort')}
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
}
