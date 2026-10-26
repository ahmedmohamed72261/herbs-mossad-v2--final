import { en } from './locales/en';
import { ar } from './locales/ar';
import { de } from './locales/de';
import { fr } from './locales/fr';
import { es } from './locales/es';
import type { Language } from '@/store';

export type TranslationSchema = typeof en;

export const translations: Record<Language, TranslationSchema> = {
  en,
  ar,
  de,
  fr,
  es,
};

export default translations;
