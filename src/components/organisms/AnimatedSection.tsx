/**
 * AnimatedSection Component
 *
 * A reusable wrapper component that animates its children when they enter the viewport.
 * Uses Framer Motion and the animation utilities for consistent animation experience.
 */

import { motion } from 'framer-motion';
import React from 'react';
import { useScrollAnimation } from '../../lib/animations/hooks';

interface AnimatedSectionProps {
  /** Content to be animated */
  children: React.ReactNode;

  /** Optional CSS class name */
  className?: string;

  /** Additional HTML attributes */
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * AnimatedSection component that animates content when scrolled into view
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', ...rest }) => {
  // Use the custom hook from hooks.ts
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 20,
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      ref={ref}
      {...rest}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
