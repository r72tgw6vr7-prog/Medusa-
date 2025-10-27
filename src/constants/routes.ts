import { lazy } from 'react';
import { RouteConfig } from '../types/routes';

// Lazy load components for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const ArtistsPage = lazy(() => import('../pages/ArtistsPage'));
const ServicesPage = lazy(() => import('../components/organisms/ServicesPage'));
const AftercarePage = lazy(() => import('../pages/AftercarePage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Route paths
export const ROUTE_PATHS = {
  HOME: '/',
  ARTISTS: '/artists',
  SERVICES: '/services',
  AFTERCARE: '/aftercare',
  CONTACT: '/contact',
  NOT_FOUND: '/404',
} as const;

// Navigation items
export const NAV_ITEMS = [
  { name: 'Home', path: ROUTE_PATHS.HOME, exact: true },
  { name: 'Artists', path: ROUTE_PATHS.ARTISTS },
  { name: 'Services', path: ROUTE_PATHS.SERVICES },
  { name: 'Aftercare', path: ROUTE_PATHS.AFTERCARE },
  { name: 'Contact', path: ROUTE_PATHS.CONTACT },
];

// Application routes configuration
export const routes: RouteConfig[] = [
  {
    path: ROUTE_PATHS.HOME,
    name: 'Home',
    component: HomePage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.ARTISTS,
    name: 'Artists',
    component: ArtistsPage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.SERVICES,
    name: 'Services',
    component: ServicesPage,
  },
  {
    path: ROUTE_PATHS.AFTERCARE,
    name: 'Aftercare',
    component: AftercarePage,
  },
  {
    path: ROUTE_PATHS.CONTACT,
    name: 'Contact',
    component: ContactPage,
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    name: 'Not Found',
    component: NotFoundPage,
  },
];

// Helper functions
export const getRoutePath = (name: string, params: Record<string, string> = {}) => {
  const route = routes.find((r) => r.name === name);
  if (!route) return '/';

  let path = route.path;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });

  return path;
};

export const isActiveRoute = (pathname: string, path: string, exact = false) => {
  if (exact) {
    return pathname === path;
  }
  return pathname.startsWith(path);
};
