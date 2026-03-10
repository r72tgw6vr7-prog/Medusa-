import type { TranslationKeys } from './generated/translationKeys';

export type TranslationParamValue = string | number | boolean | Date;

export type TranslationParams = Record<string, TranslationParamValue>;

export type { TranslationKeys };

export interface TranslationFunction {
  (key: TranslationKeys, params?: TranslationParams): string;
}
