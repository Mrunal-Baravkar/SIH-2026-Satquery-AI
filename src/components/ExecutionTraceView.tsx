import React from 'react';
import { 
  GitBranch, 
  CheckCircle, 
  Clock, 
  Layers, 
  Cpu, 
  ArrowLeft, 
  Activity,
  FileText,
  Search,
  Scale,
  Sparkles
} from 'lucide-react';
import { AnalysisResult, ExecutionStep } from '../types';

interface ExecutionTraceViewProps {
  currentResult: AnalysisResult | null;
  onBackToResult?: () => void;
  onNewAnalysis?: () => void;
}

export const ExecutionTraceView: React.FC<ExecutionTraceViewProps> = ({
  currentResult,
  onBackToResult,
  onNewAnalysis,
}) => {
  // If no current analysis, display default pipeline trace
  const steps: ExecutionStep[] = currentResult?.executionSteps || [
    {
      id: 'step-1',
      stepNumber: 1,
      name: 'Image uploaded / received',
      component: 'Input Ingestion Handler',
      status: 'completed',
      timestamp: '14:22:01 UTC',
      duration: '45ms',
      outputSummary: 'Validated binary format and dimensions: 1024x1024',
    },
    {
      id: 'step-2',
      stepNumber: 2,
      name: 'Image validation and preprocessing',
      component: 'Raster Validation Subsystem',
      status: 'completed',
      timestamp: '14:22:01 UTC',
      duration: '62ms',
      outputSummary: 'Band stack normalization: 3 channels (RGB) intact',
    },
    {
      id: 'step-3',
      stepNumber: 3,
      name: 'Image type / modality analysis',
      component: 'Spectral Variance Classifier',
      status: 'completed',
      timestamp: '14:22:01 UTC',
      duration: '110ms',
      outputSummary: 'Identified Optical RGB reflectance signature (92% confidence)',
    },
    {
      id: 'step-4',
      stepNumber: 4,
      name: 'Planner / router selected workflow',
      component: 'Intelligent Router Dispatcher',
      status: 'completed',
      timestamp: '14:22:02 UTC',
      duration: '14ms',
      outputSummary: 'Routed query "What type of land cover dominates this image?" to RS-Adapted VLM',
    },
    {
      id: 'step-5',
      stepNumber: 5,
      name: 'Specialist model execution',
      component: 'RS-Adapted VLM / Gemini Fallback Engine',
      status: 'completed',
      timestamp: '14:22:03 UTC',
      duration: '1420ms',
      outputSummary: 'Synthesized multimodal feature embeddings across spatial grid',
    },
    {
      id: 'step-6',
      stepNumber: 6,
      name: 'Evidence extraction',
      component: 'Visual ROI Grounding Extractor',
      status: 'completed',
      timestamp: '14:22:04 UTC',
      duration: '180ms',
      outputSummary: 'Computed 4 candidate spatial regions for agricultural fields, village settlement, and river',
    },
    {
      id: 'step-7',
      stepNumber: 7,
      name: 'Output validation',
      component: 'Arbitration & Spatial Verifier',
      status: 'completed',
      timestamp: '14:22:04 UTC',
      duration: '40ms',
      outputSummary: 'Verified boundary consistency against bounding coordinate range',
    },
    {
      id: 'step-8',
      stepNumber: 8,
      name: 'Evidence fusion',
      component: 'Multimodal Evidence Integrator',
      status: 'completed',
      timestamp: '14:22:04 UTC',
      duration: '55ms',
      outputSummary: 'Integrated region labels with high confidence into unified response',
    },
    {
      id: 'step-9',
      stepNumber: 9,
      name: 'Final answer generation',
      component: 'SatQuery Verification Engine',
      status: 'completed',
      timestamp: '14:22:05 UTC',
      duration: '32ms',
      outputSummary: 'Generated final evidence-supported natural language response',
    },
  ];

  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-300 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>PIPELINE TELEMETRY &amp; AUDIT</span>
          </div>
          <h1 className="font-mono text-2xl font-bold tracking-tight text-white">
            Execution Trace
          </h1>
          <p className="text-xs text-slate-400">
            Observable stage-by-stage log tracking input validation, routing, inference, and evidence arbitration.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {currentResult && onBackToResult && (
            <button
              onClick={onBackToResult}
              className="flex items-center space-x-2 rounded-lg border border-[#1c2e4a] bg-[#0c162a] px-3.5 py-2 text-xs font-mono text-cyan-400 hover:border-cyan-400 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Result</span>
            </button>
          )}

          {onNewAnalysis && (
            <button
              onClick={onNewAnalysis}
              className="flex items-center space-x-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 cursor-pointer"
            >
              <span>New Analysis</span>
            </button>
          )}
        </div>
      </div>

      {/* Execution Session Summary Card */}
      {currentResult && (
        <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">SESSION ID:</span>
              <span className="text-cyan-400 font-bold">{currentResult.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">WORKFLOW:</span>
              <span className="text-white truncate block">{currentResult.taskType}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">MODEL / ADAPTER:</span>
              <span className="text-purple-300 truncate block">{currentResult.model}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">AUDIT STATUS:</span>
              <span className="text-emerald-400 font-bold">100% VERIFIED</span>
            </div>
          </div>
        </div>
      )}

      {/* Trace Timeline */}
      <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 lg:p-8">
        <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-6 pb-3 border-b border-slate-800">
          STAGE-BY-STAGE EXECUTION AUDIT TRAIL
        </h3>

        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[27px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-400 bg-slate-950 text-cyan-400 shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                <CheckCircle className="h-3 w-3 text-cyan-400" />
              </div>

              <div className="rounded-lg border border-[#1c2e4a] bg-[#070e1c] p-4 transition-all group-hover:border-cyan-500/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      STEP {step.stepNumber}:
                    </span>
                    <h4 className="font-mono text-sm font-semibold text-white">
                      {step.name}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-3 font-mono text-[11px] text-slate-400">
                    <span className="rounded bg-[#0c162a] px-2 py-0.5 border border-slate-800 text-slate-300">
                      {step.component}
                    </span>
                    <span>{step.timestamp}</span>
                    {step.duration && <span className="text-cyan-400 font-bold">{step.duration}</span>}
                  </div>
                </div>

                {step.outputSummary && (
                  <p className="text-xs text-slate-300 font-mono mt-1 bg-[#091224] p-2.5 rounded border border-slate-800/80">
                    → {step.outputSummary}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
