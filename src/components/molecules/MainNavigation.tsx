import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { SkipLink } from '../accessibility/SkipLink';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';
import './MainNavigation.css';

type NavItem = {
  to: string;
  i18nKey: string;
  isActive: (pathname: string) => boolean;
};

const NAV_ITEMS: NavItem[] = [
  { to: '/gallery', i18nKey: 'common.nav.gallery', isActive: (path) => path.startsWith('/gallery') },
  { to: '/artists', i18nKey: 'common.nav.artists', isActive: (path) => path.startsWith('/artists') },
  { to: '/faq', i18nKey: 'common.nav.faq', isActive: (path) => path.startsWith('/faq') },
  { to: '/contact', i18nKey: 'common.nav.contact', isActive: (path) => path.startsWith('/contact') },
  { to: '/booking', i18nKey: 'common.nav.booking', isActive: (path) => path.startsWith('/booking') },
];

const SERVICES_ITEMS = [
  { to: '/services/tattoos', i18nKey: 'nav.tattoos' },
  { to: '/services/piercings', i18nKey: 'nav.piercings' },
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
    const heroHeightRef = { current: window.innerHeight };
    let rafId = 0;

    const computeHeroHeight = () => {
      const heroSection =
        document.querySelector('.hero-section') ||
        document.querySelector('[class*="hero"]') ||
        document.querySelector('section:first-of-type');

      heroHeightRef.current =
        heroSection instanceof HTMLElement ? heroSection.offsetHeight : window.innerHeight;
    };

    const updateScrolledState = () => {
      const isPastHero = window.scrollY > heroHeightRef.current - 100;
      setScrolled((prev) => (prev === isPastHero ? prev : isPastHero));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateScrolledState();
      });
    };

    const onResize = () => {
      computeHeroHeight();
      updateScrolledState();
    };

    computeHeroHeight();
    updateScrolledState();

    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [location.pathname]);

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
      document.body.classList.add('menu-open');

      globalThis.setTimeout(() => {
        const first = overlayRef.current?.querySelector<HTMLElement>(
          'button, a, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        first?.focus();
      }, 0);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
      openButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const nav = document.querySelector('.navigation');

      if (nav) {
        document.documentElement.style.setProperty(
          '--header-height',
          `${(nav as HTMLElement).offsetHeight}px`,
        );
      }
    };

    updateHeaderHeight();

    const nav = document.querySelector('.navigation') as HTMLElement;
    let resizeObserver: ResizeObserver | undefined;

    if (nav && 'ResizeObserver' in globalThis) {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(nav);
    }

    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      if (resizeObserver && nav) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const switchLanguage = (nextLanguage: 'de' | 'en') => {
    if (nextLanguage !== language) {
      setLanguage(nextLanguage);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  // Use keyboard navigation hook for better keyboard control
  const { onKeyDown: handleNavKeyDown } = useKeyboardNav({
    onEscape: closeMenu,
  });

  // Handle overlay click to close menu
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  }, []);

  return (
    <>
      <SkipLink />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <nav
        id='main-navigation'
        aria-label='Main navigation'
        className={`navigation fixed top-0 left-0 right-0 z-1000 w-full px-4 sm:px-8 transition-all duration-300 ease-out ${
          scrolled ? 'scrolled' : ''
        } ${menuOpen ? 'menu-open' : ''}`}
        onKeyDown={handleNavKeyDown}
      >
        <div className='container-wide mx-auto flex h-20 items-center justify-between gap-8 px-8 md:px-8'>
          <Link
            to='/'
            className='nav-logo font-headline text-2xl sm:text-3xl md:text-4xl leading-none tracking-tight text-brand-accent font-bold'
          >
            MEDUSA
          </Link>

          <div className='hidden flex-1 lg:flex'>
            <ul
              className='flex w-full items-center justify-center gap-16'
            >
              <li className='nav-dropdown'>
                <Link
                  to='/services/tattoos'
                  className={`nav-link nav-dropdown__trigger font-body text-base md:text-lg font-medium transition-all duration-300 ${
                    location.pathname.startsWith('/services')
                      ? 'text-brand-accent'
                      : 'text-luxury-text-inverse hover:text-brand-accent'
                  }`}
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  {t('common.nav.services')}
                </Link>
                <div className='nav-dropdown__menu' role='menu'>
                  {SERVICES_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className='nav-dropdown__item'
                      role='menuitem'
                    >
                      {t(item.i18nKey)}
                    </Link>
                  ))}
                </div>
              </li>
              {NAV_ITEMS.map(({ to, i18nKey, isActive }) => {
                const active = isActive(location.pathname);

                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`nav-link font-body text-base md:text-lg font-medium transition-all duration-300 ${
                        to === '/booking'
                          ? 'nav-cta rounded-md px-4 py-2 text-brand-accent hover:bg-brand-accent/20'
                          : active
                            ? 'text-brand-accent'
                            : 'text-luxury-text-inverse hover:text-brand-accent'
                      }`}
                      aria-current={active ? 'page' : undefined}
                      tabIndex={0}
                    >
                      {t(i18nKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className='hidden items-center gap-8 lg:flex'>
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

          <div className='flex items-center lg:hidden'>
            <button
              ref={openButtonRef}
              type='button'
              aria-controls='mobile-menu-overlay'
              aria-expanded={menuOpen}
              aria-haspopup='true'
              aria-label={menuOpen ? t('common.nav.closeMenu') : t('common.nav.openMenu')}
              onClick={() => setMenuOpen((value) => !value)}
              className={`mobile-menu-button focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/70 ${
                menuOpen ? 'is-open' : ''
              }`}
            >
              <span aria-hidden className='mobile-menu-button__box'>
                <span className='mobile-menu-button__line mobile-menu-button__line--top' />
                <span className='mobile-menu-button__line mobile-menu-button__line--middle' />
                <span className='mobile-menu-button__line mobile-menu-button__line--bottom' />
              </span>
              <span className='sr-only'>
                {menuOpen ? t('common.nav.closeMenu') : t('common.nav.openMenu')}
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
              aria-labelledby='mobile-menu-title'
              className='mobile-menu-overlay'
              onClick={handleOverlayClick}
              onKeyDown={handleNavKeyDown}
            >
              <div className='mobile-menu-overlay__panel'>
                <h2 id='mobile-menu-title' className='sr-only'>
                  Main Menu
                </h2>
                <nav className='mobile-menu-overlay__links' aria-label='Mobile navigation'>
                  <div className='mobile-nav-group'>
                    <span className='mobile-nav-group__title'>{t('common.nav.services')}</span>
                    {SERVICES_ITEMS.map((item) => (
                      <Link
                        key={`mobile-${item.to}`}
                        to={item.to}
                        onClick={closeMenu}
                        className={`mobile-nav-link ${location.pathname.startsWith(item.to) ? 'text-brand-accent' : 'text-luxury-text-inverse hover:text-brand-accent'}`}
                        aria-current={location.pathname.startsWith(item.to) ? 'page' : undefined}
                        tabIndex={menuOpen ? 0 : -1}
                      >
                        {t(item.i18nKey)}
                      </Link>
                    ))}
                  </div>
                  {NAV_ITEMS.map(({ to, i18nKey, isActive }) => {
                    const active = isActive(location.pathname);

                    return (
                      <Link
                        key={`mobile-${to}`}
                        to={to}
                        onClick={closeMenu}
                        className={`mobile-nav-link ${active ? 'text-brand-accent' : 'text-luxury-text-inverse hover:text-brand-accent'}`}
                        aria-current={active ? 'page' : undefined}
                        tabIndex={menuOpen ? 0 : -1}
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
                      tabIndex={menuOpen ? 0 : -1}
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
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <div className='mobile-menu-overlay__cta'>
                  <Link
                    to='/booking'
                    onClick={closeMenu}
                    className='hero-appointment-cta nav-cta inline-flex h-12 w-full items-center justify-center rounded-lg text-base font-semibold transition-all duration-300'
                    aria-label={t('common.nav.booking')}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    {t('common.nav.bookingShort')}
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </nav>
    </>
  );
}
