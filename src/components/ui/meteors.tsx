import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

export const Meteors = ({ number, className }: { number?: number; className?: string }) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <motion.div
      className='pointer-events-none absolute inset-0 overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 20;
        const position = idx * (800 / meteorCount) - 400;

        return (
          <span
            key={'meteor' + idx}
            className={cn(
              'animate-meteor-effect absolute h-0.5 w-0.5 rotate-45 rounded-full bg-brand-chrome shadow-[0_0_0_1px_rgba(var(--color-accent-silver-rgb),0.12)]',
              "before:absolute before:top-1/2 before:h-px before:w-12 before:-translate-y-1/2 before:bg-linear-to-r before:from-brand-chrome before:to-transparent before:opacity-70 before:content-['']",
              className,
            )}
            style={{
              top: '-40px',
              left: position + 'px',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.floor(Math.random() * (10 - 5) + 5) + 's',
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
