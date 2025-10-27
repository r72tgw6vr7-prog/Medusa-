declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module 'motion/react' {
  import { ComponentType, PropsWithChildren } from 'react';

  export interface MotionProps {
    initial?: Record<string, any>;
    animate?: Record<string, any>;
    exit?: Record<string, any>;
    transition?: Record<string, any>;
    variants?: Record<string, any>;
    whileHover?: Record<string, any>;
    whileTap?: Record<string, any>;
  }

  export type Motion = {
    [K in keyof JSX.IntrinsicElements]: ComponentType<PropsWithChildren<JSX.IntrinsicElements[K] & MotionProps>>;
  };

  const motion: Motion;
  export default motion;
  
  export const AnimatePresence: ComponentType<PropsWithChildren<{
    initial?: boolean;
    mode?: 'sync' | 'wait' | 'popLayout';
  }>>;
}