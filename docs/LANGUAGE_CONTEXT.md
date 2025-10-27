# Language Context Documentation

## Overview

The Language Context system provides a centralized way to handle multilingual content in the Medusa Tattoo München website. It supports German (DE) and English (EN) languages with easy switching between them.

## Features

- **Centralized Translation Management:** All translations are stored in JSON files
- **Context-Based Access:** Use the `useLanguage` hook to access translations
- **Persistent Language Setting:** User language preference is saved in localStorage
- **Browser Language Detection:** Automatically detects browser language on first visit
- **Nested Translation Keys:** Support for hierarchical translation keys (e.g., `nav.home`)
- **Language Switcher Component:** Ready-to-use UI component for language switching

## File Structure

```
src/
├── contexts/
│   └── LanguageContext.tsx    // Context, Provider and Hook
├── locales/
│   ├── de.json                // German translations
│   └── en.json                // English translations
└── components/
    └── molecules/
        └── LanguageSwitcher.tsx // UI component for switching languages
```

## Usage

### Wrap your application with LanguageProvider

```jsx
import { LanguageProvider } from '@/contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      {/* Your app content */}
    </LanguageProvider>
  );
}
```

### Access translations in components

```jsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta')}</button>
      
      <p>Current language: {language}</p>
    </div>
  );
}
```

### Add the LanguageSwitcher to your UI

```jsx
import LanguageSwitcher from '@/components/molecules/LanguageSwitcher';

function Header() {
  return (
    <header>
      <nav>
        {/* Navigation items */}
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
```

## Adding New Translations

1. Add new keys to both `de.json` and `en.json` files
2. Maintain the same structure in both files
3. Use nested objects for logical grouping

Example:
```json
{
  "section": {
    "title": "Title text",
    "description": "Description text"
  }
}
```

## Types

### Language
```typescript
type Language = 'de' | 'en';
```

### LanguageContextType
```typescript
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
```

## API Reference

### LanguageContext

React context that holds the language state and functions.

### LanguageProvider

Provider component that wraps the application and manages language state.

Props:
- `children`: ReactNode - Child components

### useLanguage

Custom hook to access the language context.

Returns:
- `language`: Current language ('de' or 'en')
- `setLanguage`: Function to change the language
- `t`: Translation function

### LanguageSwitcher

UI component for switching languages.

Props:
- `className?`: Optional CSS class name for styling

## Demo

A demo component is available at `/language-demo` route to showcase the language switching functionality.

## Fallback Behavior

- If a translation key is not found, the key itself is returned as fallback
- A warning is logged to the console for missing translations