import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { NewAnalysisView } from './components/NewAnalysisView';
import { ResultView } from './components/ResultView';
import { HistoryView } from './components/HistoryView';
import { ModelRegistryView } from './components/ModelRegistryView';
import { RSAdaptationView } from './components/RSAdaptationView';
import { ExecutionTraceView } from './components/ExecutionTraceView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { AnalysisResult, DemoCase } from './types';
import { DEMO_CASES } from './data/demoCases';
import { 
  getAnalysisHistory, 
  saveAnalysisResult, 
  clearAnalysisHistory, 
  deleteAnalysisResult 
} from './utils/historyStorage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [initialPairType, setInitialPairType] = useState<'optical-sar' | 'temporal' | undefined>(undefined);
  const [initialDemoCase, setInitialDemoCase] = useState<DemoCase | null>(null);

  // Load history on mount
  useEffect(() => {
    const saved = getAnalysisHistory();
    setHistory(saved);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = () => {
    setInitialPairType(undefined);
    setInitialDemoCase(null);
    setCurrentView('new-analysis');
  };

  const handleStartNewAnalysisWithPair = (pairType?: 'optical-sar' | 'temporal') => {
    setInitialPairType(pairType);
    setInitialDemoCase(null);
    setCurrentView('new-analysis');
  };

  const handleSelectDemo = (demoId: string) => {
    const demo = DEMO_CASES.find((d) => d.id === demoId);
    if (demo) {
      setInitialDemoCase(demo);
      setInitialPairType(demo.modality === 'Bi-temporal' ? 'temporal' : undefined);
      setCurrentView('new-analysis');
    }
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    saveAnalysisResult(result);
    setCurrentResult(result);
    const updated = getAnalysisHistory();
    setHistory(updated);
    setCurrentView('result');
  };

  const handleClearHistory = () => {
    clearAnalysisHistory();
    setHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    deleteAnalysisResult(id);
    setHistory(getAnalysisHistory());
  };

  const handleSelectHistoricalResult = (result: AnalysisResult) => {
    setCurrentResult(result);
    setCurrentView('result');
  };

  const isWorkspaceView = currentView !== 'landing';

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      {isWorkspaceView ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            activeAnalysisCount={history.length}
          />

          {/* Dynamic Workspace Canvas */}
          <main className="flex-1 overflow-y-auto bg-[#060b14] min-w-0">
            {currentView === 'dashboard' && (
              <DashboardView
                onStartNewAnalysis={handleStartNewAnalysisWithPair}
                onSelectDemo={handleSelectDemo}
                onNavigate={handleNavigate}
                historyCount={history.length}
              />
            )}

            {currentView === 'new-analysis' && (
              <NewAnalysisView
                initialPairType={initialPairType}
                initialDemoCase={initialDemoCase}
                onAnalysisComplete={handleAnalysisComplete}
              />
            )}

            {currentView === 'result' && currentResult && (
              <ResultView
                result={currentResult}
                onNavigateToTrace={() => handleNavigate('execution-trace')}
                onNewAnalysis={handleStartAnalysis}
              />
            )}

            {currentView === 'history' && (
              <HistoryView
                history={history}
                onSelectResult={handleSelectHistoricalResult}
                onClearHistory={handleClearHistory}
                onDeleteResult={handleDeleteHistoryItem}
                onStartNewAnalysis={handleStartAnalysis}
              />
            )}

            {currentView === 'model-registry' && <ModelRegistryView />}

            {currentView === 'rs-adaptation' && <RSAdaptationView />}

            {currentView === 'execution-trace' && (
              <ExecutionTraceView
                currentResult={currentResult}
                onBackToResult={() => setCurrentView('result')}
                onNewAnalysis={handleStartAnalysis}
              />
            )}

            {currentView === 'reports' && (
              <ReportsView
                history={history}
                latestResult={currentResult}
                onNavigateToResult={handleSelectHistoricalResult}
                onNewAnalysis={handleStartAnalysis}
              />
            )}

            {currentView === 'settings' && <SettingsView />}
          </main>
        </div>
      ) : (
        /* Landing Page Overview */
        <main className="flex-1">
          <LandingPage
            onStartAnalysis={handleStartAnalysis}
            onSelectDemo={handleSelectDemo}
          />
        </main>
      )}
    </div>
  );
}
