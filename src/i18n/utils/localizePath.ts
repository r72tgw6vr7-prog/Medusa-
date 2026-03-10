import type { Language } from '@/contexts/LanguageContext';

export function localizePath(path: string, _language: Language) {
  if (!path || path.startsWith('#') || /^[a-z]+:/i.test(path)) {
    return path;
  }

  const match = path.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] || path;
  const suffix = match?.[2] || '';

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return `${pathname === '/en' ? '/' : pathname.slice(3)}${suffix}`;
  }

  return `${pathname}${suffix}`;
}
