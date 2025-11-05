import { Shield, Award, Heart } from 'lucide-react';

/**
 * TrustSignals Component
 *
 * Displays 3 trust badges horizontally on ALL screen sizes.
 *
 * MOBILE SPECS (iPhone 16 - 393px):
 * - Grid: 3 columns (grid-cols-3)
 * - Badge size: 100×80px
 * - Container padding: 16px (px-4)
 * - Gap: 16px (gap-4)
 * - Total width: 332px (fits in 361px available)
 *
 * TABLET (768px+):
 * - Same 3-column grid
 * - Badge size: Auto (scales up)
 * - Container padding: 24px (md:px-6)
 * - Gap: 24px (md:gap-6)
 *
 * DESKTOP (1200px+):
 * - Container padding: 32px (lg:px-8)
 * - Gap: 32px (lg:gap-8)
 *
 * BRAND COMPLIANCE:
 * - Background: var(--deep-black) only
 * - Text: #FFFFFF
 * - Gold: var(--brand-gold) (icons, titles, borders)
 * - Chrome: #C0C0C0 (not used here)
 * - Typography: Playfair Display (titles), Inter (descriptions)
 * - Effects: Gold glow only (no drop shadows)
 * - Accessibility: 48px+ touch targets, focus states
 */
export function TrustSignals() {
  return (
    <section className='py-16' style={{ backgroundColor: 'var(--deep-black)' }}>
      <div className='max-w-[1200px] mx-auto px-8 sm:px-8 lg:px-16'>
        {/* 3-column grid on ALL screen sizes */}
        <div className='grid grid-cols-3 gap-8 md:gap-8 lg:gap-8 max-w-4xl mx-auto'>
          {/* Badge 1: Certified */}
          <div
            className='w-[100px] h-[80px] lg:w-auto lg:h-auto\n              flex flex-col items-center justify-center\n              border rounded-lg\n              text-center\n              transition-all duration-300\n              focus-visible:outline-2 focus-visible:outline-offset-2\n             h-full'
            style={{
              backgroundColor: 'var(--deep-black)',
              borderColor: 'rgba(212, 175, 55, 0.2)',
              borderWidth: '1px',
              padding: '8px',
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.15)',
            }}
            tabIndex={0}
            role='group'
            aria-label='EU Health Standards Certified'
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(212, 175, 55, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px rgba(212, 175, 55, 0.15)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--brand-gold)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {/* Icon container */}
            <div className='flex justify-center mb-0 lg:mb-8'>
              <div
                className='w-8 h-8 lg:w-16 lg:h-16 rounded-full flex items-center justify-center flex-col h-full'
                style={{ background: 'var(--brand-gold)' }}
              >
                <Shield size={16} className='lg:w-8 lg:h-8' style={{ color: 'var(--deep-black)' }} />
              </div>
            </div>

            {/* Title - Always visible */}
            <h3
              className='mb-0 lg:mb-8'
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--brand-gold)',
              }}
            >
              Certified
            </h3>

            {/* Description - Hidden on mobile, visible on desktop */}
            <p
              className='hidden lg:block'
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                lineHeight: 1.4,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              EU Health Standards & Munich Tattoo Association certified artists
            </p>
          </div>

          {/* Badge 2: 25+ Years */}
          <div
            className='w-[100px] h-[80px] lg:w-auto lg:h-auto\n              flex flex-col items-center justify-center\n              border rounded-lg\n              text-center\n              transition-all duration-300\n              focus-visible:outline-2 focus-visible:outline-offset-2\n             h-full'
            style={{
              backgroundColor: 'var(--deep-black)',
              borderColor: 'rgba(212, 175, 55, 0.2)',
              borderWidth: '1px',
              padding: '8px',
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.15)',
            }}
            tabIndex={0}
            role='group'
            aria-label='25 Plus Years of Excellence'
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(212, 175, 55, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px rgba(212, 175, 55, 0.15)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--brand-gold)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {/* Icon container */}
            <div className='flex justify-center mb-0 lg:mb-8'>
              <div
                className='w-8 h-8 lg:w-16 lg:h-16 rounded-full flex items-center justify-center flex-col h-full'
                style={{
                  background: 'linear-gradient(to right, var(--brand-gold-hover), var(--brand-gold))',
                }}
              >
                <Award size={16} className='lg:w-8 lg:h-8' style={{ color: 'var(--deep-black)' }} />
              </div>
            </div>

            {/* Title - Always visible */}
            <h3
              className='mb-0 lg:mb-8'
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--brand-gold)',
              }}
            >
              25+ Years
            </h3>

            {/* Description - Hidden on mobile, visible on desktop */}
            <p
              className='hidden lg:block'
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                lineHeight: 1.4,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Quarter-century of excellence and trusted artistry in Munich
            </p>
          </div>

          {/* Badge 3: Premium Aftercare */}
          <div
            className='w-[100px] h-[80px] lg:w-auto lg:h-auto\n              flex flex-col items-center justify-center\n              border rounded-lg\n              text-center\n              transition-all duration-300\n              focus-visible:outline-2 focus-visible:outline-offset-2\n             h-full'
            style={{
              backgroundColor: 'var(--deep-black)',
              borderColor: 'rgba(212, 175, 55, 0.2)',
              borderWidth: '1px',
              padding: '8px',
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.15)',
            }}
            tabIndex={0}
            role='group'
            aria-label='Premium Aftercare Support'
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(212, 175, 55, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px rgba(212, 175, 55, 0.15)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--brand-gold)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {/* Icon container */}
            <div className='flex justify-center mb-0 lg:mb-8'>
              <div
                className='w-8 h-8 lg:w-16 lg:h-16 rounded-full flex items-center justify-center flex-col h-full'
                style={{
                  background: 'linear-gradient(to right, var(--brand-gold-hover), var(--brand-gold))',
                }}
              >
                <Heart size={16} className='lg:w-8 lg:h-8' style={{ color: 'var(--deep-black)' }} />
              </div>
            </div>

            {/* Title - Always visible */}
            <h3
              className='mb-0 lg:mb-8'
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--brand-gold)',
              }}
            >
              Premium Aftercare
            </h3>

            {/* Description - Hidden on mobile, visible on desktop */}
            <p
              className='hidden lg:block'
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                lineHeight: 1.4,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Comprehensive healing support with medical-grade products
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
