import React from 'react';
import { 
  History, 
  Trash2, 
  FileText, 
  ArrowRight, 
  Download, 
  Calendar, 
  Layers, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { generateAnalysisReportPDF } from '../utils/pdfGenerator';

interface HistoryViewProps {
  history: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  onClearHistory: () => void;
  onDeleteResult: (id: string) => void;
  onStartNewAnalysis: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectResult,
  onClearHistory,
  onDeleteResult,
  onStartNewAnalysis,
}) => {
  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-300 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>LOCAL ARCHIVE</span>
          </div>
          <h1 className="font-mono text-2xl font-bold tracking-tight text-white">
            Analysis History
          </h1>
          <p className="text-xs text-slate-400">
            Previously executed queries, detected evidence regions, and verified reports.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center space-x-2 rounded-lg border border-red-500/40 bg-red-950/30 px-3.5 py-2 text-xs font-mono text-red-300 hover:border-red-400 hover:bg-red-900/40 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History Items or Empty State */}
      {history.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#1c2e4a] bg-[#0c162a] p-12 text-center">
          <History className="h-10 w-10 text-slate-500 mx-auto mb-3" />
          <h3 className="font-mono text-base font-semibold text-white">
            No Previous Analyses
          </h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
            You haven&apos;t run any remote-sensing queries yet in this session. Start a new analysis or test a demo benchmark.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onStartNewAnalysis}
              className="flex items-center space-x-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 cursor-pointer"
            >
              <span>Launch First Analysis</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-5 transition-all hover:border-cyan-500/40 flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="flex items-start space-x-4">
                {/* Thumbnail */}
                <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
                  <img
                    src={item.imagePreviewUrl}
                    alt="Thumbnail"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      {item.modality}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {item.id}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <h3 className="font-mono text-sm font-semibold text-white">
                    &quot;{item.query}&quot;
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-1 max-w-2xl">
                    {item.answer}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => generateAnalysisReportPDF(item, 'comprehensive')}
                  className="p-2 rounded-lg border border-slate-700 bg-[#070e1c] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onDeleteResult(item.id)}
                  className="p-2 rounded-lg border border-slate-700 bg-[#070e1c] text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onSelectResult(item)}
                  className="flex items-center space-x-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-3 py-2 text-xs font-mono font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all cursor-pointer"
                >
                  <span>Inspect</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
