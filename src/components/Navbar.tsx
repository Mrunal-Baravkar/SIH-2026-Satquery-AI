import React from 'react';
import { Satellite, History } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  historyCount?: number;
  isDashboardOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  historyCount = 0,
}) => {
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => {
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1c2e4a] bg-[#060b14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('dashboard')} 
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
          id="navbar-brand"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <Satellite className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-lg font-bold tracking-wider text-white">SATQUERY</span>
              <span className="rounded border border-cyan-500/40 bg-cyan-950/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-400">
                AI
              </span>
            </div>
            <p className="font-mono text-[10px] tracking-tight text-slate-400">REMOTE SENSING INTELLIGENCE</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => onNavigate('landing')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentView === 'landing' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
            }`}
            id="nav-link-overview"
          >
            {t('nav.overview', 'Overview')}
          </button>
          <button
            onClick={() => handleScrollTo('capabilities-section')}
            className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400 cursor-pointer"
            id="nav-link-capabilities"
          >
            {t('nav.capabilities', 'Capabilities')}
          </button>
          <button
            onClick={() => handleScrollTo('pipeline-section')}
            className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400 cursor-pointer"
            id="nav-link-pipeline"
          >
            {t('nav.pipeline', 'Pipeline')}
          </button>
          <button
            onClick={() => handleScrollTo('technology-section')}
            className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400 cursor-pointer"
            id="nav-link-technology"
          >
            {t('nav.technology', 'Technology')}
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentView === 'dashboard' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
            id="nav-link-dashboard"
          >
            {t('nav.dashboard', 'Dashboard')}
          </button>
        </nav>

        {/* Right Status Indicator + Top-Right Language Dropdown */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">{t('nav.systemReady', 'SYSTEM READY')}</span>
          </div>

          {/* Top-Right Language Selector Dropdown */}
          <LanguageSelector />

          {historyCount > 0 && (
            <button
              onClick={() => onNavigate('history')}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
              title={t('nav.viewHistory', 'View History')}
              id="navbar-history-button"
            >
              <History className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-mono text-[11px]">{historyCount}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
