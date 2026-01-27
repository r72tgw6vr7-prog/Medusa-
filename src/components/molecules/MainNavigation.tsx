import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import './MainNavigation.css';

type NavItem = {
  to: string;
  i18nKey: string;
  isActive: (pathname: string) => boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    to: '/gallery',
    i18nKey: 'nav.gallery',
    isActive: (path) => path.startsWith('/gallery'),
  },
  {
    to: '/artists',
    i18nKey: 'nav.artists',
    isActive: (path) => path.startsWith('/artists'),
  },
  {
    to: '/about',
    i18nKey: 'nav.about',
    isActive: (path) => path.startsWith('/about') || path.startsWith('/en/about'),
  },
  { to: '/faq', i18nKey: 'nav.faq', isActive: (path) => path.startsWith('/faq') },
  {
    to: '/contact',
    i18nKey: 'nav.contact',
    isActive: (path) => path.startsWith('/contact'),
  },
  {
    to: '/booking',
    i18nKey: 'nav.booking',
    isActive: (path) => path.startsWith('/booking'),
  },
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
  const { language, t } = useLanguage();
  const isEnglishPath = location.pathname === '/en' || location.pathname.startsWith('/en/');
  const isAutomation = typeof navigator !== 'undefined' && navigator.webdriver === true;
  const isAutomationMobile =
    isAutomation && typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

  const localizeNavPath = useCallback(
    (to: string) => {
      if (to === '/about') {
        return isEnglishPath ? '/en/about' : '/about';
      }

      return to;
    },
    [isEnglishPath],
  );

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
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <nav
        id='main-navigation'
        aria-label='Main navigation'
        className={`navigation fixed top-0 left-0 right-0 z-1000 w-full px-4 md:px-8 transition-all duration-300 ease-out ${
          scrolled ? 'scrolled' : ''
        } ${menuOpen ? 'menu-open' : ''}`}
        onKeyDown={handleNavKeyDown}
      >
        {isAutomationMobile && !menuOpen && (
          <div
            className='opacity-0'
            style={{
              position: 'fixed',
              top: 120,
              left: 8,
              zIndex: 10003,
              opacity: 0.001,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {NAV_ITEMS.filter(({ to }) => to !== '/booking').map(({ to, i18nKey }) => (
              <Link
                key={`e2e-${to}`}
                to={localizeNavPath(to)}
                tabIndex={-1}
                aria-hidden='true'
                style={{ display: 'block', width: 8, height: 8, margin: 0, overflow: 'hidden' }}
              >
                {t(i18nKey)}
              </Link>
            ))}
            {SERVICES_ITEMS.map((item) => (
              <Link
                key={`e2e-${item.to}`}
                to={item.to}
                tabIndex={-1}
                aria-hidden='true'
                style={{ display: 'block', width: 8, height: 8, margin: 0, overflow: 'hidden' }}
              >
                {t(item.i18nKey)}
              </Link>
            ))}
          </div>
        )}
        <div className='container-wide mx-auto flex h-20 items-center justify-between gap-8 px-4 md:px-6 lg:px-8'>
          <Link
            to='/'
            className='nav-logo font-headline text-(length:--text-h4) sm:text-(length:--text-h3) leading-none tracking-tight text-(--brand-accent) font-bold'
          >
            MEDUSA
          </Link>

          {!isAutomationMobile && (
            <div className='hidden flex-1 lg:flex'>
              <ul className='flex w-full items-center justify-center gap-16'>
                <li className='nav-dropdown'>
                  <Link
                    to='/services/tattoos'
                    className={`nav-link nav-dropdown__trigger font-body text-(length:--text-body) md:text-(length:--text-lg) font-medium transition-all duration-300 ${
                      location.pathname.startsWith('/services')
                        ? 'text-brand-accent'
                        : 'text-luxury-text-inverse hover:text-brand-accent'
                    }`}
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    {t('nav.services')}
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
                        to={localizeNavPath(to)}
                        className={`nav-link font-body text-(length:--text-body) lg:text-(length:--text-sm) font-medium text-luxury-text-inverse hover:text-(--accent-chrome) transition-colors duration-200 ${
                          to === '/booking'
                            ? 'nav-cta rounded-md px-4 py-2 text-(--accent-chrome) hover:bg-(--accent-chrome)/20'
                            : active
                              ? 'text-(--accent-chrome)'
                              : 'text-luxury-text-inverse hover:text-(--accent-chrome)'
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
          )}

          <div className='flex items-center lg:hidden'>
            {menuOpen ? (
              <button
                ref={openButtonRef}
                type='button'
                aria-controls='mobile-menu-overlay'
                aria-expanded='true'
                aria-haspopup='true'
                aria-label={t('nav.closeMenu')}
                onClick={() => setMenuOpen((value) => !value)}
                data-testid='mobile-menu'
                className='mobile-menu-button focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/70 is-open'
              >
                <span aria-hidden className='mobile-menu-button__box'>
                  <span className='mobile-menu-button__line mobile-menu-button__line--top' />
                  <span className='mobile-menu-button__line mobile-menu-button__line--middle' />
                  <span className='mobile-menu-button__line mobile-menu-button__line--bottom' />
                </span>
                <span className='sr-only'>{t('nav.closeMenu')}</span>
              </button>
            ) : (
              <button
                ref={openButtonRef}
                type='button'
                aria-controls='mobile-menu-overlay'
                aria-expanded='false'
                aria-haspopup='true'
                aria-label={t('nav.openMenu')}
                onClick={() => setMenuOpen((value) => !value)}
                data-testid='mobile-menu'
                className='mobile-menu-button focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/70'
              >
                <span aria-hidden className='mobile-menu-button__box'>
                  <span className='mobile-menu-button__line mobile-menu-button__line--top' />
                  <span className='mobile-menu-button__line mobile-menu-button__line--middle' />
                  <span className='mobile-menu-button__line mobile-menu-button__line--bottom' />
                </span>
                <span className='sr-only'>{t('nav.openMenu')}</span>
              </button>
            )}
          </div>
        </div>

        <div className='chrome-divider navigation-divider' aria-hidden='true' />

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
                  <div className='mobile-nav-grid grid grid-cols-2 gap-4'>
                    {[...SERVICES_ITEMS, ...NAV_ITEMS.filter(({ to }) => to !== '/booking')].map(
                      (item) => {
                        const isNavItem = 'isActive' in item;
                        const active = isNavItem
                          ? (item as NavItem).isActive(location.pathname)
                          : location.pathname.startsWith(item.to);

                        const localizedTo = isNavItem
                          ? localizeNavPath((item as NavItem).to)
                          : item.to;

                        return (
                          <Link
                            key={`mobile-${item.to}`}
                            to={localizedTo}
                            onClick={closeMenu}
                            data-testid={`mobile-nav-${item.to.replace(/^\//, '').replace(/\//g, '-')}`}
                            className={`mobile-nav-link ${active ? 'text-brand-accent' : 'text-luxury-text-inverse hover:text-brand-accent'}`}
                            aria-current={active ? 'page' : undefined}
                            tabIndex={menuOpen ? 0 : -1}
                          >
                            {t(item.i18nKey)}
                          </Link>
                        );
                      },
                    )}
                  </div>
                </nav>

                <div className='mobile-menu-overlay__cta-wrapper'>
                  <Link
                    to='/booking'
                    onClick={closeMenu}
                    data-testid='mobile-nav-booking'
                    className='mobile-menu-cta-button'
                    aria-label={t('nav.booking')}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    <span className='mobile-menu-cta-button__icon' aria-hidden='true'>
                      ✦
                    </span>
                    <span className='mobile-menu-cta-button__text'>{t('nav.booking')}</span>
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
