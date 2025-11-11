import React from 'react';

export type CarouselApi = {
  scrollNext: () => void;
  scrollPrev: () => void;
};

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  setApi?: (api: CarouselApi) => void;
}

export function Carousel({ children, className = '', setApi, ...rest }: CarouselProps) {
  React.useEffect(() => {
    if (setApi) {
      setApi({ scrollNext: () => {}, scrollPrev: () => {} });
    }
  }, [setApi]);

  return (
    <div className={`relative w-full ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CarouselContent({ children, className = '', ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex gap-(--gap,1rem) overflow-hidden ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CarouselItem({ children, className = '', ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`shrink-0 ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CarouselPrevious({ className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button aria-label="Previous" className={`absolute left-2 top-1/2 -translate-y-1/2 ${className}`} {...rest}>
      ‹
    </button>
  );
}

export function CarouselNext({ className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button aria-label="Next" className={`absolute right-2 top-1/2 -translate-y-1/2 ${className}`} {...rest}>
      ›
    </button>
  );
}
