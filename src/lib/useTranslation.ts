import { useLanguageStore } from '@/stores/languageStore';
import en from '@/locales/en';
import id from '@/locales/id';
import type { Translations } from '@/locales/en';

const translations: Record<'en' | 'id', Translations> = { en, id };

export const useTranslation = () => {
    const language = useLanguageStore((s) => s.language);
    const t = translations[language];
    return { t, language };
};
