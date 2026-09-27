import React, { useState } from 'react';
import { FileText, Download, CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { AnalysisResult } from '../types';
import { generateAnalysisReportPDF } from '../utils/pdfGenerator';

interface ReportsViewProps {
  history: AnalysisResult[];
  latestResult: AnalysisResult | null;
  onNavigateToResult: (result: AnalysisResult) => void;
  onNewAnalysis: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  history,
  latestResult,
  onNavigateToResult,
  onNewAnalysis,
}) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (result: AnalysisResult, format: 'comprehensive' | 'evidence') => {
    setDownloadingId(result.id + format);
    try {
      await generateAnalysisReportPDF(result, format);
    } catch (e) {
      console.error('PDF generation failed:', e);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>REPORT GENERATION &amp; EXPORT</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white preserve-title">
            Mission Reports
          </h1>
          <p className="text-xs text-slate-400">
            Export comprehensive remote-sensing evaluation dossiers and statistical summaries in PDF format.
          </p>
        </div>

        <button
          onClick={onNewAnalysis}
          className="flex items-center space-x-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
        >
          <span>New Analysis</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Latest Analysis Report Banner if available */}
      {latestResult && (
        <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-r from-[#0c1b33] via-[#09152b] to-[#060b14] p-6 shadow-[0_0_20px_rgba(0,212,255,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="rounded bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                LATEST COMPLETED RUN
              </span>
              <span className="font-mono text-xs text-slate-400">
                {latestResult.id}
              </span>
            </div>
            <h3 className="font-mono text-base font-bold text-white">
              &quot;{latestResult.query}&quot;
            </h3>
            <p className="text-xs text-slate-300 line-clamp-1 max-w-xl">
              {latestResult.answer}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleDownload(latestResult, 'comprehensive')}
              disabled={Boolean(downloadingId)}
              className="flex items-center space-x-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Comprehensive PDF</span>
            </button>
            <button
              onClick={() => handleDownload(latestResult, 'evidence')}
              disabled={Boolean(downloadingId)}
              className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Evidence Brief</span>
            </button>
          </div>
        </div>
      )}

      {/* Available Mission Records */}
      <div className="space-y-4">
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-slate-200">
          ARCHIVED SESSIONS READY FOR EXPORT ({history.length})
        </h3>

        {history.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#1c2e4a] bg-[#0c162a] p-8 text-center text-xs text-slate-400 font-mono">
            No query runs available to generate reports from. Run an analysis or test a demo case.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-cyan-400 font-bold">{item.id}</span>
                    <span className="text-slate-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-mono text-sm font-semibold text-white">
                    {item.query}
                  </h4>
                  <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                    {item.answer}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="font-mono text-[10px] text-slate-400">
                    Modality: <span className="text-white">{item.modality}</span> • Evidence:{' '}
                    <span className="text-cyan-300">{item.evidence.length} ROIs</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(item, 'comprehensive')}
                      className="flex items-center space-x-1 px-2.5 py-1.5 rounded border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-mono hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="h-3 w-3" />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => onNavigateToResult(item)}
                      className="px-2.5 py-1.5 rounded border border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono hover:text-white transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
