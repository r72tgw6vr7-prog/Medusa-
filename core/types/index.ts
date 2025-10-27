/**
 * MEDUSA TATTOO SALON - CORE TYPE DEFINITIONS
 * Central export for all type definitions
 */

// Route types
export type { PageType, RouteConfig, NavItem, BreadcrumbData } from './routes';
export { ROUTES } from './routes';

// State types
export type { AppState, AppAction } from '../state/appReducer';

// Common UI types
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationHandler {
  onNavigate: (page: PageType) => void;
}

export interface BookingHandler {
  onBookNow?: () => void;
  onBookService?: (serviceId: string) => void;
  onBookArtist?: (artistId: string) => void;
}

export interface BreadcrumbHandler {
  setBreadcrumbContext?: (data: BreadcrumbData) => void;
}

// Language types
export type Language = 'DE' | 'EN';

export interface LanguageContent {
  de: string;
  en: string;
}

// Error types
export interface AppError {
  message: string;
  code?: string;
  timestamp: Date;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export default {
  ROUTES
};