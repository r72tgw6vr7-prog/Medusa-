import { useState, useEffect } from 'react';
import type { PageType } from '../../types/page-types';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';

interface CookieConsentBannerProps {
  onNavigate: (page: PageType) => void;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const storedConsent = localStorage.getItem('cookieConsent');
    if (!storedConsent) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(storedConsent);
        setPreferences(parsed);
      } catch {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
  };

  const handleRejectAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    setShowPreferences(false);
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      <div className='fixed bottom-0 left-0 right-0 bg-(--color-surface-dark)/95 backdrop-blur-lg border-t border-[var(--accent-chrome)]/20 p-8 z-50'>
        <div className='max-w-container-main mx-auto'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-8'>
            <div className='flex-1'>
              <h2 className='text-xl font-headline text-[var(--accent-chrome)] mb-0'>Cookie-Einstellungen</h2>
              <p className='text-brand-white text-sm mb-8 md:mb-0'>
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu
                bieten. Essentielle Cookies sind für die Grundfunktionen erforderlich. Optional
                können Sie Analyse- und Marketing-Cookies zulassen.{' '}
                <button
                  onClick={() => onNavigate('datenschutz')}
                  className='text-[var(--accent-chrome)] hover:text-[var(--accent-chrome)]/80 underline transition duration-200 ease-out touch-target-mobile touch-target-mobile-inline'
                >
                  Mehr erfahren
                </button>
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-0 w-full md:w-auto'>
              <button
                onClick={() => setShowPreferences(true)}
                className='px-8 py-0 border border-[var(--accent-chrome)] text-[var(--accent-chrome)] hover:bg-[var(--accent-chrome)]/10 rounded-lg transition duration-200 ease-out touch-target-mobile'
              >
                Anpassen
              </button>
              <button
                onClick={handleRejectAll}
                className='px-8 py-0 border border-brand-chrome text-brand-chrome hover:bg-brand-chrome/10 rounded-lg transition duration-200 ease-out touch-target-mobile'
              >
                Ablehnen
              </button>
              <button
                onClick={handleAcceptAll}
                className='px-8 py-0 bg-[var(--accent-chrome)] text-[var(--deep-black)] hover:bg-[var(--accent-chrome)]/80 rounded-lg transition duration-200 ease-out touch-target-mobile'
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Dialog */}
      <Dialog.Root open={showPreferences} onOpenChange={setShowPreferences}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-luxury-bg-dark/50 z-50' />
          <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-brand-background border border-brand-chrome/20 rounded-xl p-8 z-50 max-h-screen overflow-y-auto'>
            <div className='flex items-center justify-between mb-8'>
              <Dialog.Title className='text-2xl font-headline text-brand-accent'>
                Cookie-Einstellungen
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className='text-brand-chrome hover:text-brand-white transition duration-200 ease-out touch-target-mobile touch-target-mobile-inline touch-target-mobile-center'
                  aria-label='Schließen'
                >
                  <X size={24} />
                </button>
              </Dialog.Close>
            </div>

            <div className='space-y-8'>
              {/* Essential Cookies */}
              <Card variant="default" size="default" asChild>
                <div>
                  <div className='flex items-center justify-between mb-0'>
                    <h3 className='text-lg font-headline text-brand-accent'>Essentielle Cookies</h3>
                    <input
                      type='checkbox'
                      checked={preferences.essential}
                      disabled
                      aria-label='Essentielle Cookies (erforderlich)'
                      className='h-5 w-5 rounded border-brand-chrome/20 touch-target-mobile'
                    />
                  </div>
                  <p className='text-sm text-brand-chrome'>
                    Diese Cookies sind für die Grundfunktionen der Website erforderlich und können
                    nicht deaktiviert werden.
                  </p>
                </div>
              </Card>

              {/* Analytics Cookies */}
              <Card variant="default" size="default" asChild>
                <div>
                  <div className='flex items-center justify-between mb-0'>
                    <h3 className='text-lg font-headline text-brand-accent'>Analyse-Cookies</h3>
                    <input
                      type='checkbox'
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className='h-5 w-5 rounded border-brand-chrome/20 touch-target-mobile'
                      aria-label='Analyse-Cookies aktivieren'
                    />
                  </div>
                  <p className='text-sm text-brand-chrome'>
                    Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen.
                  </p>
                </div>
              </Card>

              {/* Marketing Cookies */}
              <Card variant="default" size="default" asChild>
                <div>
                  <div className='flex items-center justify-between mb-0'>
                    <h3 className='text-lg font-headline text-brand-accent'>Marketing-Cookies</h3>
                    <input
                      type='checkbox'
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({ ...preferences, marketing: e.target.checked })
                      }
                      className='h-5 w-5 rounded border-brand-chrome/20 touch-target-mobile'
                      aria-label='Marketing-Cookies aktivieren'
                    />
                  </div>
                  <p className='text-sm text-brand-chrome'>
                    Diese Cookies werden verwendet, um Werbung relevanter zu gestalten.
                  </p>
                </div>
              </Card>
            </div>

            <div className='flex justify-end gap-0 mt-8'>
              <Dialog.Close asChild>
                <button className='px-8 py-0 border border-brand-chrome text-brand-chrome hover:bg-brand-chrome/10 rounded-lg transition-colors duration-200 ease-out touch-target-mobile'>
                  Abbrechen
                </button>
              </Dialog.Close>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-base lg:text-sm font-medium bg-luxury-accent-chrome text-luxury-text-primary rounded hover:bg-luxury-accent-chrome-hover transition-colors duration-200 ease-out touch-target-mobile"
              >
                Einstellungen speichern
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
