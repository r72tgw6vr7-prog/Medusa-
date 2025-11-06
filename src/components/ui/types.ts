import { ReactNode, HTMLAttributes } from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'ghost' | 'link' | 'outline' | 'destructive';
export type State = 'default' | 'disabled' | 'loading' | 'error' | 'success';

export interface CommonProps extends HTMLAttributes<HTMLElement> {
  /** Additional class names to apply */
  className?: string;
  /** The content of the component */
  children?: ReactNode;
  /** The HTML element or React component to render */
  as?: React.ElementType;
  /** The size of the component */
  size?: Size;
  /** The visual style variant */
  variant?: Variant;
  /** The state of the component */
  state?: State;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is in a loading state */
  loading?: boolean;
  /** Whether the component has an error */
  error?: boolean;
  /** Whether the component indicates success */
  success?: boolean;
}

// Specific component prop types
export interface ButtonProps extends CommonProps {
  /** The type of button */
  type?: 'button' | 'submit' | 'reset';
  /** The icon to display before the button's content */
  icon?: ReactNode;
  /** The position of the icon */
  iconPosition?: 'left' | 'right';
  /** Whether the button should take up the full width of its container */
  fullWidth?: boolean;
}

// No recursive export here
