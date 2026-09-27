import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES, Language } from '../i18n/translations';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef} id="language-selector-container">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg border border-[#1c2e4a] bg-[#0c162a] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/50 hover:bg-[#12223c] hover:text-white transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
        id="language-selector-button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
        <span className="font-sans font-semibold tracking-wide">{currentOption.label}</span>
        <ChevronDown
          className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-44 rounded-xl border border-[#1c2e4a] bg-[#070d19] p-1.5 shadow-2xl shadow-cyan-950/40 z-50 animate-in fade-in zoom-in-95 duration-150"
          role="menu"
          id="language-dropdown-menu"
        >
          <div className="px-2 py-1 border-b border-[#1c2e4a]/60 mb-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Select Language
            </span>
          </div>

          <div className="space-y-0.5">
            {LANGUAGES.map((option) => {
              const isSelected = option.code === language;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => handleSelect(option.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-cyan-950/60 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-[#0c162a] hover:text-white'
                  }`}
                  role="menuitem"
                  id={`lang-option-${option.code}`}
                >
                  <div className="flex flex-col">
                    <span className="font-sans">{option.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {option.nativeLabel}
                    </span>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
