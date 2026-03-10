import type { Locale } from '@/i18n';

export type PluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export function getPluralCategory(locale: Locale, count: number): PluralCategory {
  const rules = new Intl.PluralRules(locale);
  return rules.select(count) as PluralCategory;
}
