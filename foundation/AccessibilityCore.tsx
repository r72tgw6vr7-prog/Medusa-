import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useMedusaDesignSystem } from './MedusaDesignSystemProvider';

// ==========================================
// ACCESSIBILITY CORE v2.0
// WCAG 2.1 AA Comprehensive Implementation
// ==========================================

// ACCESSIBILITY TYPES
export type AccessibilityLevel = 'AA' | 'AAA';
export type AnnouncementPriority = 'polite' | 'assertive';
export type FocusOrigin = 'mouse' | 'keyboard' | 'touch' | 'program';
export type ScreenReaderType = 'nvda' | 'jaws' | 'voiceover' | 'talkback' | 'unknown';

export interface AccessibilityState {
  isScreenReaderActive: boolean;
  screenReaderType: ScreenReaderType;
  hasKeyboardNavigation: boolean;
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersReducedData: boolean;
  hasPointerDevice: boolean;
  hasTouchDevice: boolean;
  currentFocusOrigin: FocusOrigin;
  skipLinksVisible: boolean;
  announcementQueue: AnnouncementQueueItem[];
}

export interface AnnouncementQueueItem {
  id: string;
  message: string;
  priority: AnnouncementPriority;
  timestamp: number;
  category?: string;
}

export interface AccessibilityMetrics {
  focusableElements: number;
  headingStructure: HeadingNode[];
  landmarkElements: number;
  imagesWithoutAlt: number;
  formFieldsWithoutLabels: number;
  colorContrastViolations: number;
  keyboardTraps: number;
}

export interface HeadingNode {
  level: number;
  text: string;
  id?: string;
  element: HTMLElement;
}

// ACCESSIBILITY CONTEXT
interface AccessibilityContextValue {
  state: AccessibilityState;
  
  // Screen Reader Functions
  announce: (message: string, priority?: AnnouncementPriority, category?: string) => void;
  announceNavigation: (destination: string) => void;
  announcePageChange: (title: string, description?: string) => void;
  announceError: (error: string) => void;
  announceSuccess: (message: string) => void;
  
  // Focus Management
  focusElement: (selector: string | HTMLElement) => boolean;
  focusFirst: (container?: HTMLElement) => boolean;
  focusLast: (container?: HTMLElement) => boolean;
  trapFocus: (container: HTMLElement) => () => void;
  restoreFocus: () => void;
  
  // Keyboard Navigation
  addKeyboardShortcut: (key: string, handler: () => void, description: string) => () => void;
  removeKeyboardShortcut: (key: string) => void;
  enableSkipLinks: () => void;
  disableSkipLinks: () => void;
  
  // Content Structure
  generateAriaLabel: (context: string, details?: Record<string, any>) => string;
  generateAriaDescription: (type: string, properties: Record<string, any>) => string;
  validateHeadingStructure: () => HeadingNode[];
  
  // Accessibility Audit
  runAccessibilityAudit: () => Promise<AccessibilityMetrics>;
  checkColorContrast: (foreground: string, background: string) => number;
  
  // Settings
  setAccessibilityLevel: (level: AccessibilityLevel) => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

// CUSTOM HOOK
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

// SCREEN READER DETECTION
function detectScreenReader(): ScreenReaderType {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // NVDA detection
  if (window.navigator.userAgent.includes('NVDA') || 
      (window as any).speechSynthesis?.getVoices?.()?.some((voice: any) => 
        voice.name.includes('NVDA'))) {
    return 'nvda';
  }
  
  // JAWS detection
  if ((window as any).external?.JAWS || userAgent.includes('jaws')) {
    return 'jaws';
  }
  
  // VoiceOver detection (macOS/iOS)
  if (userAgent.includes('mac') && (window as any).speechSynthesis) {
    return 'voiceover';
  }
  
  // TalkBack detection (Android)
  if (userAgent.includes('android') && 'ontouchstart' in window) {
    return 'talkback';
  }
  
  // Generic screen reader detection
  if ('speechSynthesis' in window || (window as any).navigator?.userAgent?.includes('sr-only')) {
    return 'unknown';
  }
  
  return 'unknown';
}

// FOCUS ORIGIN DETECTION
function detectFocusOrigin(): FocusOrigin {
  let lastInteractionType: FocusOrigin = 'program';
  
  const handleMouseDown = () => { lastInteractionType = 'mouse'; };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
        e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      lastInteractionType = 'keyboard';
    }
  };
  const handleTouchStart = () => { lastInteractionType = 'touch'; };
  
  document.addEventListener('mousedown', handleMouseDown, true);
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('touchstart', handleTouchStart, true);
  
  return lastInteractionType;
}

// ACCESSIBILITY PROVIDER
interface AccessibilityProviderProps {
  children: React.ReactNode;
  level?: AccessibilityLevel;
  enableAudit?: boolean;
}

export function AccessibilityProvider({ 
  children, 
  level = 'AA',
  enableAudit = process.env.NODE_ENV === 'development'
}: AccessibilityProviderProps) {
  const { announceToScreenReader } = useMedusaDesignSystem();
  
  const [state, setState] = useState<AccessibilityState>(() => ({
    isScreenReaderActive: false,
    screenReaderType: 'unknown',
    hasKeyboardNavigation: false,
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersReducedData: false,
    hasPointerDevice: false,
    hasTouchDevice: false,
    currentFocusOrigin: 'program',
    skipLinksVisible: false,
    announcementQueue: [],
  }));

  const announcementRegion = useRef<HTMLDivElement>(null);
  const focusHistory = useRef<HTMLElement[]>([]);
  const keyboardShortcuts = useRef<Map<string, { handler: () => void; description: string }>>(new Map());
  const announcementCounter = useRef(0);

  // Initialize accessibility detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const screenReaderType = detectScreenReader();
    const isScreenReaderActive = screenReaderType !== 'unknown' || 
      window.navigator.userAgent.includes('sr-only') ||
      !!(window as any).speechSynthesis;

    setState(prev => ({
      ...prev,
      isScreenReaderActive,
      screenReaderType,
      hasKeyboardNavigation: true, // Assume true for accessibility
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
      prefersReducedData: window.matchMedia('(prefers-reduced-data: reduce)').matches,
      hasPointerDevice: window.matchMedia('(pointer: fine)').matches,
      hasTouchDevice: window.matchMedia('(pointer: coarse)').matches,
      currentFocusOrigin: detectFocusOrigin(),
    }));

    // Listen for media query changes
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-reduced-data: reduce)'),
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(pointer: coarse)'),
    ];

    const handleMediaQueryChange = () => {
      setState(prev => ({
        ...prev,
        prefersReducedMotion: mediaQueries[0].matches,
        prefersHighContrast: mediaQueries[1].matches,
        prefersReducedData: mediaQueries[2].matches,
        hasPointerDevice: mediaQueries[3].matches,
        hasTouchDevice: mediaQueries[4].matches,
      }));
    };

    mediaQueries.forEach(mq => mq.addEventListener('change', handleMediaQueryChange));

    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', handleMediaQueryChange));
    };
  }, []);

  // ANNOUNCEMENT FUNCTIONS
  const announce = useCallback((
    message: string, 
    priority: AnnouncementPriority = 'polite',
    category?: string
  ) => {
    const id = `announcement-${++announcementCounter.current}`;
    const announcement: AnnouncementQueueItem = {
      id,
      message,
      priority,
      timestamp: Date.now(),
      category,
    };

    setState(prev => ({
      ...prev,
      announcementQueue: [...prev.announcementQueue, announcement],
    }));

    // Create temporary announcement element
    const element = document.createElement('div');
    element.setAttribute('aria-live', priority);
    element.setAttribute('aria-atomic', 'true');
    element.className = 'sr-only';
    element.textContent = message;
    
    document.body.appendChild(element);
    
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
      
      setState(prev => ({
        ...prev,
        announcementQueue: prev.announcementQueue.filter(a => a.id !== id),
      }));
    }, 1000);

    // Fallback to design system announcer
    announceToScreenReader(message);
  }, [announceToScreenReader]);

  const announceNavigation = useCallback((destination: string) => {
    announce(`Navigated to ${destination}`, 'polite', 'navigation');
  }, [announce]);

  const announcePageChange = useCallback((title: string, description?: string) => {
    const message = description 
      ? `Page changed to ${title}. ${description}`
      : `Page changed to ${title}`;
    announce(message, 'polite', 'page-change');
  }, [announce]);

  const announceError = useCallback((error: string) => {
    announce(`Error: ${error}`, 'assertive', 'error');
  }, [announce]);

  const announceSuccess = useCallback((message: string) => {
    announce(`Success: ${message}`, 'polite', 'success');
  }, [announce]);

  // FOCUS MANAGEMENT FUNCTIONS
  const focusElement = useCallback((selector: string | HTMLElement): boolean => {
    try {
      const element = typeof selector === 'string' 
        ? document.querySelector(selector) as HTMLElement
        : selector;
      
      if (element && typeof element.focus === 'function') {
        // Store current focus for restoration
        if (document.activeElement && document.activeElement !== document.body) {
          focusHistory.current.push(document.activeElement as HTMLElement);
        }
        
        element.focus();
        return true;
      }
    } catch (error) {
      console.warn('Failed to focus element:', error);
    }
    return false;
  }, []);

  const focusFirst = useCallback((container?: HTMLElement): boolean => {
    const root = container || document.body;
    const focusableElements = root.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    return focusElement(firstElement);
  }, [focusElement]);

  const focusLast = useCallback((container?: HTMLElement): boolean => {
    const root = container || document.body;
    const focusableElements = root.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    return focusElement(lastElement);
  }, [focusElement]);

  const restoreFocus = useCallback(() => {
    const lastFocusedElement = focusHistory.current.pop();
    if (lastFocusedElement) {
      focusElement(lastFocusedElement);
    }
  }, [focusElement]);

  // KEYBOARD SHORTCUTS
  const addKeyboardShortcut = useCallback((
    key: string, 
    handler: () => void, 
    description: string
  ): (() => void) => {
    keyboardShortcuts.current.set(key, { handler, description });
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcut = keyboardShortcuts.current.get(e.key);
      if (shortcut && (e.ctrlKey || e.metaKey || e.altKey || e.key.length === 1)) {
        e.preventDefault();
        shortcut.handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      keyboardShortcuts.current.delete(key);
    };
  }, []);

  const removeKeyboardShortcut = useCallback((key: string) => {
    keyboardShortcuts.current.delete(key);
  }, []);

  // SKIP LINKS
  const enableSkipLinks = useCallback(() => {
    setState(prev => ({ ...prev, skipLinksVisible: true }));
  }, []);

  const disableSkipLinks = useCallback(() => {
    setState(prev => ({ ...prev, skipLinksVisible: false }));
  }, []);

  // ARIA LABEL GENERATION
  const generateAriaLabel = useCallback((context: string, details?: Record<string, any>): string => {
    let label = context;
    
    if (details) {
      const detailParts = Object.entries(details)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${key}: ${value}`);
      
      if (detailParts.length > 0) {
        label += `. ${detailParts.join(', ')}`;
      }
    }
    
    return label;
  }, []);

  const generateAriaDescription = useCallback((type: string, properties: Record<string, any>): string => {
    const relevantProps = Object.entries(properties)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}: ${value}`);
    
    return `${type} with ${relevantProps.join(', ')}`;
  }, []);

  // HEADING STRUCTURE VALIDATION
  const validateHeadingStructure = useCallback((): HeadingNode[] => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    
    return headings.map(heading => ({
      level: parseInt(heading.tagName.charAt(1)),
      text: heading.textContent || '',
      id: heading.id,
      element: heading as HTMLElement,
    }));
  }, []);

  // COLOR CONTRAST CHECKER
  const checkColorContrast = useCallback((foreground: string, background: string): number => {
    // Simplified contrast calculation - in production, use a proper color contrast library
    const getRGBValues = (color: string) => {
      const div = document.createElement('div');
      div.style.color = color;
      document.body.appendChild(div);
      const computedColor = window.getComputedStyle(div).color;
      document.body.removeChild(div);
      
      const match = computedColor.match(/\d+/g);
      return match ? match.map(Number) : [0, 0, 0];
    };

    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const fgRGB = getRGBValues(foreground);
    const bgRGB = getRGBValues(background);
    
    const fgLuminance = getLuminance(fgRGB[0], fgRGB[1], fgRGB[2]);
    const bgLuminance = getLuminance(bgRGB[0], bgRGB[1], bgRGB[2]);
    
    const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                    (Math.min(fgLuminance, bgLuminance) + 0.05);
    
    return Math.round(contrast * 100) / 100;
  }, []);

  // ACCESSIBILITY AUDIT
  const runAccessibilityAudit = useCallback(async (): Promise<AccessibilityMetrics> => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).length;

    const headingStructure = validateHeadingStructure();
    
    const landmarkElements = document.querySelectorAll(
      'main, nav, header, footer, aside, section[aria-label], section[aria-labelledby]'
    ).length;

    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])').length;
    
    const formFieldsWithoutLabels = Array.from(document.querySelectorAll('input, select, textarea')).filter(
      field => !field.hasAttribute('aria-label') && 
               !field.hasAttribute('aria-labelledby') && 
               !document.querySelector(`label[for="${field.id}"]`)
    ).length;

    // Simplified contrast checking - would need more sophisticated logic in production
    const colorContrastViolations = 0; // Placeholder

    const keyboardTraps = 0; // Would need sophisticated detection

    return {
      focusableElements,
      headingStructure,
      landmarkElements,
      imagesWithoutAlt,
      formFieldsWithoutLabels,
      colorContrastViolations,
      keyboardTraps,
    };
  }, [validateHeadingStructure]);

  // SETTINGS
  const setAccessibilityLevel = useCallback((newLevel: AccessibilityLevel) => {
    // Implementation would adjust various accessibility features based on level
    console.log(`Accessibility level set to: ${newLevel}`);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setState(prev => ({ ...prev, prefersHighContrast: !prev.prefersHighContrast }));
    document.documentElement.classList.toggle('high-contrast');
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setState(prev => ({ ...prev, prefersReducedMotion: !prev.prefersReducedMotion }));
    document.documentElement.classList.toggle('reduce-motion');
  }, []);

  // FOCUS TRAP IMPLEMENTATION
  const trapFocus = useCallback((container: HTMLElement): (() => void) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  // Context value
  const contextValue: AccessibilityContextValue = {
    state,
    announce,
    announceNavigation,
    announcePageChange,
    announceError,
    announceSuccess,
    focusElement,
    focusFirst,
    focusLast,
    trapFocus,
    restoreFocus,
    addKeyboardShortcut,
    removeKeyboardShortcut,
    enableSkipLinks,
    disableSkipLinks,
    generateAriaLabel,
    generateAriaDescription,
    validateHeadingStructure,
    runAccessibilityAudit,
    checkColorContrast,
    setAccessibilityLevel,
    toggleHighContrast,
    toggleReducedMotion,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      
      {/* Screen Reader Announcement Region */}
      <div
        ref={announcementRegion}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
        aria-label="Screen reader announcements"
      />
      
      {/* Skip Links */}
      {state.skipLinksVisible && (
        <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50">
          <a
            href="#main-content"
            className="bg-brand-gold text-brand-background px-8 py-0 rounded focus:outline-none focus:ring-2 focus:ring-brand-white"
            onClick={() => focusElement('#main-content')}
          >
            Skip to main content
          </a>
        </div>
      )}
      
      {/* Development Accessibility Audit Panel */}
      {enableAudit && process.env.NODE_ENV === 'development' && (
        <AccessibilityAuditPanel />
      )}
    </AccessibilityContext.Provider>
  );
}

// ACCESSIBILITY AUDIT PANEL (Development Only)
function AccessibilityAuditPanel() {
  const { runAccessibilityAudit, state } = useAccessibility();
  const [auditResults, setAuditResults] = useState<AccessibilityMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleRunAudit = async () => {
    const results = await runAccessibilityAudit();
    setAuditResults(results);
  };

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-brand-gold text-brand-background px-0 py-0 rounded-lg text-sm font-medium"
      >
        A11y Audit
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 left-0 bg-brand-background border border-brand-gold rounded-lg p-8 w-80 max-h-96 overflow-y-auto">
          <div className="text-brand-gold font-bold mb-0">Accessibility Status</div>
          
          <div className="space-y-0 text-sm text-brand-white">
            <div>Screen Reader: {state.isScreenReaderActive ? '✓' : '✗'}</div>
            <div>High Contrast: {state.prefersHighContrast ? '✓' : '✗'}</div>
            <div>Reduced Motion: {state.prefersReducedMotion ? '✓' : '✗'}</div>
            <div>Touch Device: {state.hasTouchDevice ? '✓' : '✗'}</div>
          </div>
          
          <button
            onClick={handleRunAudit}
            className="w-full mt-0 bg-brand-chrome text-brand-background px-0 py-0 rounded text-sm"
          >
            Run Audit
          </button>
          
          {auditResults && (
            <div className="mt-0 space-y-0 text-xs text-brand-chrome">
              <div>Focusable Elements: {auditResults.focusableElements}</div>
              <div>Headings: {auditResults.headingStructure.length}</div>
              <div>Landmarks: {auditResults.landmarkElements}</div>
              <div>Images w/o Alt: {auditResults.imagesWithoutAlt}</div>
              <div>Unlabeled Fields: {auditResults.formFieldsWithoutLabels}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ACCESSIBILITY UTILITIES
export function useScreenReader() {
  const { announce, state } = useAccessibility();
  
  return {
    isActive: state.isScreenReaderActive,
    type: state.screenReaderType,
    announce,
  };
}

export function useKeyboardNavigation() {
  const { addKeyboardShortcut, removeKeyboardShortcut, focusElement, focusFirst, focusLast } = useAccessibility();
  
  return {
    addShortcut: addKeyboardShortcut,
    removeShortcut: removeKeyboardShortcut,
    focus: focusElement,
    focusFirst,
    focusLast,
  };
}

export function useFocusManagement() {
  const { focusElement, restoreFocus, trapFocus } = useAccessibility();
  
  return {
    focus: focusElement,
    restore: restoreFocus,
    trap: trapFocus,
  };
}

export function useAriaLabels() {
  const { generateAriaLabel, generateAriaDescription } = useAccessibility();
  
  return {
    generateLabel: generateAriaLabel,
    generateDescription: generateAriaDescription,
  };
}