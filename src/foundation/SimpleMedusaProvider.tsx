import { createContext, useContext, useState, ReactNode } from 'react';
import { designTokens } from '../design-tokens';

// Use the design tokens directly
export const designSystemTokens = designTokens;

// Define the context type
interface MedusaDesignSystemContextType {
  language: 'DE' | 'EN';
  setLanguage: (lang: 'DE' | 'EN') => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  tokens: typeof designSystemTokens;
}

// Export types for module augmentation
export type { MedusaDesignSystemContextType };

// Create the context with default values
const MedusaDesignSystemContext = createContext<MedusaDesignSystemContextType>({
  language: 'DE',
  setLanguage: () => {},
  theme: 'dark',
  setTheme: () => {},
  tokens: designSystemTokens,
});

// Provider props
interface SimpleMedusaProviderProps {
  children: ReactNode;
  initialLanguage?: 'DE' | 'EN';
  initialTheme?: 'dark' | 'light';
}

// Provider component
export const SimpleMedusaProvider = ({
  children,
  initialLanguage = 'DE',
  initialTheme = 'dark',
}: SimpleMedusaProviderProps) => {
  const [language, setLanguage] = useState<'DE' | 'EN'>(initialLanguage);
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);

  return (
    <MedusaDesignSystemContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        tokens: designSystemTokens,
      }}
    >
      {children}
    </MedusaDesignSystemContext.Provider>
  );
};

// Hook for using the context
export const useMedusaDesignSystem = () => {
  const context = useContext(MedusaDesignSystemContext);
  if (!context) {
    throw new Error('useMedusaDesignSystem must be used within a SimpleMedusaProvider');
  }
  return context;
};

export default SimpleMedusaProvider;
