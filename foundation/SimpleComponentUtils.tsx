// ==========================================
// SIMPLE COMPONENT UTILITIES
// Lightweight replacements for enhanced components
// ==========================================



// Simple component ID generation
export function useSimpleComponentId(type: string): string {
  return React.useMemo(() => 
    `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    [type]
  );
}

// Simple responsive utility
export function useSimpleResponsive() {
  const [device, setDevice] = React.useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window === 'undefined') return 'mobile';
    const width = window.innerWidth;
    if (width >= 1200) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
  });

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const newDevice = width >= 1200 ? 'desktop' : width >= 768 ? 'tablet' : 'mobile';
        setDevice(prev => prev !== newDevice ? newDevice : prev);
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  };
}

// Simple announcement utility
export function useSimpleAnnouncement() {
  return React.useCallback((message: string) => {
    if (typeof document === 'undefined') return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);
}

// Export aliases for compatibility
export { useSimpleComponentId as useMedusaComponent };
export { useSimpleResponsive as useMedusaResponsive };
export { useSimpleAnnouncement as useAnnouncement };