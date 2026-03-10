/**
 * MotionProvider Component
 * 
 * Phase 4: Integration Pass
 * Centralized motion orchestration provider.
 * Wraps app with scroll progress line, background parallax, and optional cursor trail.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { ScrollProgressLine } from '@/components/ui/ScrollProgressLine';
import { BackgroundParallax } from '@/components/ui/BackgroundParallax';
import { CursorTrail } from '@/components/ui/CursorTrail';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionConfig {
  scrollProgressEnabled: boolean;
  parallaxEnabled: boolean;
  cursorTrailEnabled: boolean;
}

const defaultConfig: MotionConfig = {
  scrollProgressEnabled: true,
  parallaxEnabled: true,
  cursorTrailEnabled: false, // Disabled by default - opt-in feature
};

const MotionContext = createContext<MotionConfig>(defaultConfig);

export function useMotionConfig() {
  return useContext(MotionContext);
}

interface MotionProviderProps {
  children: ReactNode;
  config?: Partial<MotionConfig>;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({
  children,
  config = {},
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  const mergedConfig: MotionConfig = {
    ...defaultConfig,
    ...config,
  };

  // Disable all motion effects if user prefers reduced motion
  const effectiveConfig: MotionConfig = prefersReducedMotion
    ? {
        scrollProgressEnabled: false,
        parallaxEnabled: false,
        cursorTrailEnabled: false,
      }
    : mergedConfig;

  return (
    <MotionContext.Provider value={effectiveConfig}>
      {/* Scroll Progress Line */}
      {effectiveConfig.scrollProgressEnabled && <ScrollProgressLine />}
      
      {/* Background Parallax */}
      {effectiveConfig.parallaxEnabled && <BackgroundParallax />}
      
      {/* Cursor Trail (optional) */}
      {effectiveConfig.cursorTrailEnabled && <CursorTrail enabled />}
      
      {children}
    </MotionContext.Provider>
  );
};

export default MotionProvider;
