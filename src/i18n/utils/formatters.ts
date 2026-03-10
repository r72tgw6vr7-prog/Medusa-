import type { Locale } from '@/i18n';

export function formatDate(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value);
}

export function formatTime(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(value);
}

export function formatDateTime(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(value);
}

export function formatCurrency(amount: number, locale: Locale, currency: string = 'EUR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatPhone(input: string, locale: Locale) {
  const digits = input.replace(/[^+\d]/g, '');

  if (locale === 'de') {
    // Minimal German-friendly grouping: +49 89 123456
    const normalized = digits.startsWith('00') ? `+${digits.slice(2)}` : digits;
    if (!normalized.startsWith('+')) return normalized;
    const country = normalized.slice(0, 3); // +49
    const rest = normalized.slice(3).trim();
    const area = rest.slice(0, 2);
    const number = rest.slice(2);
    return `${country} ${area} ${number}`.trim();
  }

  return digits;
}
