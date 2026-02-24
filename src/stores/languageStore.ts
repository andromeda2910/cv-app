import { create } from 'zustand';

type Language = 'en' | 'id';

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    initialize: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: 'en', // Constant default for SSR & initial hydration
    setLanguage: (lang) => {
        try { localStorage.setItem('cv-language', lang); } catch { }
        set({ language: lang });
    },
    toggleLanguage: () => {
        set((state) => {
            const next = state.language === 'en' ? 'id' : 'en';
            try { localStorage.setItem('cv-language', next); } catch { }
            return { language: next };
        });
    },
    initialize: () => {
        if (typeof window === 'undefined') return;
        try {
            const saved = localStorage.getItem('cv-language');
            if (saved === 'en' || saved === 'id') {
                set({ language: saved });
            }
        } catch { }
    }
}));
