/**
 * BackgroundParallax Component
 * 
 * Phase 2: Background Parallax
 * Subtle parallax layers that move at different speeds based on scroll position.
 * Uses Framer Motion for smooth, GPU-accelerated transforms.
 */

import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface BackgroundParallaxProps {
  className?: string;
}

export const BackgroundParallax: React.FC<BackgroundParallaxProps> = ({ className = '' }) => {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Parallax transforms at different speeds (subtle effect)
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  // If reduced motion, don't render parallax
  if (prefersReducedMotion) return null;

  return (
    <div className={`parallax-container ${className}`} aria-hidden="true">
      <motion.div
        className="parallax-layer parallax-layer-1"
        style={{ y: y1 }}
      />
      <motion.div
        className="parallax-layer parallax-layer-2"
        style={{ y: y2 }}
      />
      <motion.div
        className="parallax-layer parallax-layer-3"
        style={{ y: y3 }}
      />
    </div>
  );
};

export default BackgroundParallax;
