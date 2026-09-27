import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Cpu, 
  GitBranch, 
  Layers, 
  FileText, 
  Settings,
  Satellite,
  Compass,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  activeAnalysisCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  activeAnalysisCount = 0,
}) => {
  const { t } = useLanguage();

  const mainNav = [
    { id: 'dashboard', label: t('sidebar.dashboard', 'Dashboard'), icon: LayoutDashboard },
    { id: 'new-analysis', label: t('sidebar.newAnalysis', 'New Analysis'), icon: PlusCircle },
    { id: 'history', label: t('sidebar.history', 'Analysis History'), icon: History },
  ];

  const intelligenceNav = [
    { id: 'model-registry', label: t('sidebar.modelRegistry', 'Model Registry'), icon: Cpu },
    { id: 'rs-adaptation', label: t('sidebar.rsAdaptation', 'RS Adaptation'), icon: Layers },
    { id: 'execution-trace', label: t('sidebar.executionTrace', 'Execution Trace'), icon: GitBranch },
    { id: 'reports', label: t('sidebar.reports', 'Reports Archive'), icon: FileText },
  ];

  const systemNav = [
    { id: 'settings', label: t('sidebar.settings', 'Settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-[#1c2e4a] bg-[#070d19] flex flex-col justify-between select-none">
      <div>
        {/* Brand header */}
        <div className="p-5 border-b border-[#1c2e4a]">
          <div 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="sidebar-brand-button"
          >
            <div className="h-9 w-9 rounded-lg border border-cyan-500/40 bg-cyan-950/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,212,255,0.2)] group-hover:border-cyan-400">
              <Satellite className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-base font-bold tracking-wider text-white">SATQUERY</span>
                <span className="rounded border border-cyan-500/40 bg-cyan-950/80 px-1 py-0.2 font-mono text-[9px] font-bold text-cyan-400">
                  AI
                </span>
              </div>
              <p className="font-mono text-[9px] tracking-tight text-slate-400">REMOTE INTELLIGENCE</p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-4 space-y-6">
          {/* MAIN */}
          <div>
            <div className="px-3 mb-2 font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              MAIN
            </div>
            <nav className="space-y-1">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                        : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    }`}
                    id={`sidebar-nav-${item.id}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3 w-3 text-cyan-400" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* INTELLIGENCE */}
          <div>
            <div className="px-3 mb-2 font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              INTELLIGENCE
            </div>
            <nav className="space-y-1">
              {intelligenceNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                        : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    }`}
                    id={`sidebar-nav-${item.id}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3 w-3 text-cyan-400" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SYSTEM */}
          <div>
            <div className="px-3 mb-2 font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              SYSTEM
            </div>
            <nav className="space-y-1">
              {systemNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                        : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    }`}
                    id={`sidebar-nav-${item.id}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3 w-3 text-cyan-400" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="p-4 border-t border-[#1c2e4a] bg-[#050a14]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-emerald-400">
              SYSTEM ONLINE
            </span>
          </div>
          <button
            onClick={() => onNavigate('landing')}
            title="Overview"
            className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
            id="sidebar-overview-toggle"
          >
            <Compass className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 font-mono text-[9px] text-slate-500">
          PROTOTYPE V1.0 • GEMINI MULTIMODAL
        </p>
      </div>
    </aside>
  );
};
