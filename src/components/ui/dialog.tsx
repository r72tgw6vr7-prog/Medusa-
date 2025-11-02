import type { ReactNode, KeyboardEvent, MouseEvent } from 'react';

interface DialogProps {
  open: boolean;
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({ open, children, onOpenChange }: DialogProps) {
  if (!open) return null;

  const handleOverlayClick = () => {
    onOpenChange?.(false);
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onOpenChange?.(false);
    }
  };

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleContentKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl"
        role="document"
        tabIndex={-1}
        onClick={handleContentClick}
        onKeyDown={handleContentKeyDown}
      >
        {children}
      </div>
    </div>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
  return <div className={className}>{children}</div>;
}

interface DialogSectionProps {
  children: ReactNode;
  className?: string;
}

export function DialogHeader({ children, className = '' }: DialogSectionProps) {
  return <div className={`mb-8 ${className}`.trim()}>{children}</div>;
}

export function DialogTitle({ children, className = '' }: DialogSectionProps) {
  return <h2 className={`text-lg font-bold ${className}`.trim()}>{children}</h2>;
}
