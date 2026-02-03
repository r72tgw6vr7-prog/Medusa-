import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './PiercingPhotoModal.css';

interface PiercingPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  photos: string[];
}

export const PiercingPhotoModal: React.FC<PiercingPhotoModalProps> = ({
  isOpen,
  onClose,
  title,
  photos,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const modalContent = document.querySelector('.piercing-photo-modal-content');
    const focusableElements = modalContent?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className='piercing-photo-modal-overlay'
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role='presentation'
      tabIndex={-1}
    >
      <div
        className='piercing-photo-modal-content'
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-piercing-title'
      >
        <button className='modal-close-button' onClick={onClose} aria-label='Close' type='button'>
          <X size={24} />
        </button>

        <div className='piercing-photo-modal-header'>
          <h3 id='modal-piercing-title' className='piercing-photo-modal-title'>
            {title}
          </h3>
        </div>

        <div className='piercing-photo-grid-container'>
          {photos.length > 0 ? (
            <div className='piercing-photo-modal-grid'>
              {photos.slice(0, 4).map((photo, idx) => (
                <img
                  key={`modal-photo-${idx}`}
                  src={photo}
                  alt={`${title} piercing example ${idx + 1}`}
                  className='piercing-photo-modal-image'
                  loading='lazy'
                  decoding='async'
                />
              ))}
            </div>
          ) : (
            <div className='piercing-photo-placeholder'>
              <span>Keine Beispielbilder verfügbar</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PiercingPhotoModal;
