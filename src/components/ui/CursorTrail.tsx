/**
 * CursorTrail Component (Optional - Phase 3)
 * 
 * Chrome particles trail behind cursor.
 * Canvas-based for performance (limited to 12 particles max).
 * Only renders on desktop (disabled on mobile/touch).
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface CursorTrailProps {
  enabled?: boolean;
  particleCount?: number;
  className?: string;
}

export const CursorTrail: React.FC<CursorTrailProps> = ({
  enabled = true,
  particleCount = 12,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>(0);
  const chromeRgb = useRef('');
  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice = useRef(false);

  const addParticle = useCallback(() => {
    if (particles.current.length >= particleCount) return;
    
    particles.current.push({
      x: mousePos.current.x,
      y: mousePos.current.y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      life: 45,
      maxLife: 45,
    });
  }, [particleCount]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.current = particles.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      if (p.life <= 0) return false;

      const alpha = p.life / p.maxLife;
      const size = 4 * alpha;

      const rgb = chromeRgb.current || '192, 192, 192';

      ctx.save();
      ctx.globalAlpha = alpha * 0.7;
      ctx.fillStyle = `rgba(${rgb}, 0.9)`;
      ctx.shadowColor = `rgba(${rgb}, 0.6)`;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return true;
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Detect touch device
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Read design token for chrome rgb once
    chromeRgb.current =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-chrome-rgb')
        .trim() || chromeRgb.current;

    // Don't enable on touch devices or if reduced motion
    if (!enabled || prefersReducedMotion || isTouchDevice.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();

    // Track mouse
    let spawnCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      spawnCounter++;
      if (spawnCounter % 3 === 0) { // Spawn every 3rd move event
        addParticle();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [enabled, prefersReducedMotion, addParticle, animate]);

  // Don't render if disabled, reduced motion, or touch device
  if (!enabled || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-toast ${className}`}
      aria-hidden="true"
    />
  );
};

export default CursorTrail;
