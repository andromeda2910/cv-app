"use client";

import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { useResumeStore } from '@/stores/resumeStore';
import { useLanguageStore } from '@/stores/languageStore';
import { useTranslation } from '@/lib/useTranslation';

interface HeaderProps {
  onHomeClick?: () => void;
  showHomeButton?: boolean;
  onCreateCoverLetter?: () => void;
}

const UKFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-4 shadow-sm rounded-sm border border-gray-100">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM226 195 0 28v-9l243 181h-17zM0 452l213-157h55L0 479v-27zm640-425L418 195h22L640 31V27z" />
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
    <path fill="#C8102E" d="M281 0v480h80V0h-80zM0 200v80h640v-80H0z" />
  </svg>
);

const IDFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-4 shadow-sm rounded-sm border border-gray-100">
    <path fill="#E70011" d="M0 0h640v240H0z" />
    <path fill="#FFF" d="M0 240h640v240H0z" />
  </svg>
);

export const Header = ({ onHomeClick, showHomeButton = true, onCreateCoverLetter }: HeaderProps) => {
  const { resumeData } = useResumeStore();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const langRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          disabled={!showHomeButton}
        >
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 border border-blue-50">
            <img src="/favicon-brand.ico" alt="CVCraft Icon" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
            CVCraft
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {resumeData.personalInfo.photo && (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resumeData.personalInfo.photo} alt="avatar" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-200"
                title={`${t.header.switchTo} ${language === 'en' ? t.header.indonesian : t.header.english}`}
              >
                <span className="inline-flex items-center">{language === 'en' ? <UKFlag /> : <IDFlag />}</span>
                <span className="hidden sm:inline font-semibold">{language === 'en' ? 'EN' : 'ID'}</span>
                <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => { setLanguage('en'); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${language === 'en'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <UKFlag />
                    <span>English</span>
                    {language === 'en' && (
                      <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => { setLanguage('id'); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${language === 'id'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <IDFlag />
                    <span>Bahasa Indonesia</span>
                    {language === 'id' && (
                      <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
                aria-expanded={menuOpen}
              >
                <Menu className="w-4 h-4" />
                {t.header.menu}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-lg p-2 text-sm">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onCreateCoverLetter?.(); }}
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    {t.header.createCoverLetter}
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600">{t.header.help}</a>
                </div>

              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
