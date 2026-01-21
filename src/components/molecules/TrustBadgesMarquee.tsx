const uniqueBadges = [
  { icon: '/assets/images/icons/icon-2.svg', label: 'Preisgekrönt 2024' },
  { icon: '/assets/images/icons/icon-3.svg', label: 'Sterile Ausrüstung' },
  { icon: '/assets/images/icons/icon-5.svg', label: '27 Jahre Erfahrung' },
  { icon: '/assets/images/icons/icon-6.svg', label: 'EU Zertifiziert' },
  { icon: '/assets/images/icons/icon-8.svg', label: '10,000+ Bewertungen' },
];

// Duplicate twice for seamless loop segment
const badges = [...uniqueBadges, ...uniqueBadges];

export default function TrustBadgesMarquee() {
  // Optional: respect prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const containerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '120px',
    overflow: 'hidden',
    background: 'rgb(var(--color-text-primary-rgb) / 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderTop: '1px solid rgb(var(--color-text-primary-rgb) / 0.18)',
    boxShadow: 'inset 0 1px 0 rgb(var(--color-text-primary-rgb) / 0.06), 0 8px 32px rgb(0 0 0 / 0.37)',
  } as React.CSSProperties;

  const trackStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    columnGap: '64px',
    padding: '0 64px',
    willChange: 'transform' as const,
    animation: prefersReduced ? undefined : 'marqueeLeft 45s linear infinite',
  } as React.CSSProperties;

  const badgeItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '8px',
    minWidth: '248px', // target ~4 visible at a time on desktop (8px grid)
  } as React.CSSProperties;

  const iconStyle = {
    width: '56px',
    height: '56px',
  } as React.CSSProperties;

  const labelStyle = {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial',
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgb(255 255 255)',
    whiteSpace: 'nowrap' as const,
  };

  const maskLeftStyle = {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    height: '100%',
    width: '128px',
    background: 'linear-gradient(to right, rgb(var(--color-text-primary-rgb) / 0.16), rgb(var(--color-text-primary-rgb) / 0))',
  };

  const maskRightStyle = {
    position: 'absolute' as const,
    right: 0,
    top: 0,
    height: '100%',
    width: '128px',
    background: 'linear-gradient(to left, rgb(var(--color-text-primary-rgb) / 0.16), rgb(var(--color-text-primary-rgb) / 0))',
  };

  return (
    <div className="z-20" style={containerStyle} role='region' aria-label='Trust badges'>
      {/* Scoped keyframes for smooth, slow right-to-left marquee */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="z-30" style={maskLeftStyle} aria-hidden />
      <div className="z-30" style={maskRightStyle} aria-hidden />
      <div style={trackStyle}>
        {badges.concat(badges).map((badge, index) => (
          <div key={index} style={badgeItemStyle}>
            <img src={badge.icon} alt='' style={iconStyle} />
            <p style={labelStyle}>{badge.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
