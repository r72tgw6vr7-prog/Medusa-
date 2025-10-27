import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout Component
 *
 * Master layout component that enforces consistent width, padding, and alignment
 * across the entire application. Fixes critical misalignment between navigation
 * and page sections.
 *
 * Design Specifications:
 * - Max width: 1280px (max-w-7xl)
 * - Centered with mx-auto
 * - Responsive horizontal padding: px-4 sm:px-6 lg:px-8
 * - Vertical padding: py-8 sm:py-12
 * - Inherits background from body (#1A1A1A)
 *
 * @example
 * ```tsx
 * <MainLayout>
 *   <StudioHero />
 *   <ServiceCards />
 * </MainLayout>
 * ```
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <main className='max-w-7xl mx-auto px-8 sm:px-8 lg:px-8 py-8 sm:py-16'>{children}</main>;
};

export default MainLayout;
