import React from 'react';
import { 
  Upload, 
  ArrowRight, 
  Layers, 
  Clock, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Sparkles,
  Satellite,
  Compass
} from 'lucide-react';
import { DEMO_CASES } from '../data/demoCases';
import { useLanguage } from '../i18n/LanguageContext';

interface DashboardViewProps {
  onStartNewAnalysis: (pairType?: 'optical-sar' | 'temporal') => void;
  onSelectDemo: (demoId: string) => void;
  onNavigate: (view: string) => void;
  historyCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartNewAnalysis,
  onSelectDemo,
  onNavigate,
  historyCount,
}) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>{t('dashboard.statusOperational', 'OPERATIONAL WORKSPACE')}</span>
        </div>
        <h1 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {t('dashboard.title', 'Remote Sensing Intelligence Center')}
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          {t('dashboard.subtitle', 'Analyze remote-sensing imagery using natural language.')}
        </p>
      </div>

      {/* Main Action Card: NEW ANALYSIS */}
      <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-br from-[#0c1a33] via-[#091326] to-[#060b14] p-6 lg:p-8 shadow-[0_0_25px_rgba(0,212,255,0.15)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              NEW ANALYSIS
            </div>
            <h2 className="text-xl font-bold text-white">
              Upload Remote-Sensing Data
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Drop single rasters or paired acquisitions. Supported raster formats include GeoTIFF, TIFF, PNG, and JPEG. Automatic modality classification detects optical spectra, radar backscatter, or temporal pairs.
            </p>
            <div className="pt-2">
              <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-300">
                SUPPORTED TYPES:&nbsp;
              </span>
              <span className="font-mono text-[11px] text-cyan-300">
                OPTICAL • SAR • MULTISPECTRAL • TEMPORAL
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onStartNewAnalysis()}
              className="flex items-center justify-center space-x-2 rounded-lg bg-cyan-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-md hover:bg-cyan-400 transition-all cursor-pointer"
              id="dashboard-btn-upload-raster"
            >
              <Upload className="h-4 w-4" />
              <span>{t('dashboard.startNewAnalysis', 'Upload Imagery')}</span>
            </button>

            <button
              onClick={() => onStartNewAnalysis('optical-sar')}
              className="flex items-center justify-center space-x-2 rounded-lg border border-blue-500/50 bg-blue-950/40 px-5 py-2.5 text-xs font-medium text-blue-300 hover:border-blue-400 hover:text-white transition-all cursor-pointer"
              id="dashboard-btn-upload-optical-sar"
            >
              <Layers className="h-4 w-4 text-blue-400" />
              <span>{t('dashboard.opticalSarPair', 'Upload Optical + SAR Pair')}</span>
            </button>

            <button
              onClick={() => onStartNewAnalysis('temporal')}
              className="flex items-center justify-center space-x-2 rounded-lg border border-purple-500/50 bg-purple-950/40 px-5 py-2.5 text-xs font-medium text-purple-300 hover:border-purple-400 hover:text-white transition-all cursor-pointer"
              id="dashboard-btn-upload-temporal"
            >
              <Clock className="h-4 w-4 text-purple-400" />
              <span>{t('dashboard.biTemporalChange', 'Upload Temporal Pair')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Try Demo Analysis Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-slate-200">
              {t('dashboard.quickDemoBenchmarks', 'Try Demo Analysis')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('dashboard.quickDemoDesc', 'Run registered evaluation benchmarks with known ground-truth answers:')}
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded">
            {t('dashboard.verifiedEvaluation', 'KNOWN IMAGE EVALUATION')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Demo 1: SAR Scene */}
          <div
            onClick={() => onSelectDemo('SAR_COASTAL_01')}
            className="group cursor-pointer rounded-xl border border-[#1c2e4a] bg-[#0c162a] overflow-hidden transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] flex flex-col justify-between"
            id="dash-demo-sar"
          >
            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
              <img
                src="/demo/sar_coastal_01.jpg"
                alt="SAR Scene"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 rounded border border-purple-500/40 bg-purple-950/80 px-2 py-0.5 font-mono text-[9px] text-purple-300 backdrop-blur-sm">
                SAR MONOCHROME
              </div>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-sm font-semibold text-white group-hover:text-cyan-300">
                  SAR Scene
                </h4>
                <div className="mt-1 font-mono text-xs text-cyan-400/90">
                  Question: &quot;Describe image.&quot;
                </div>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                  Monochrome radar acquisition showing coastal urban area, river channel, mountainous terrain and road networks.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400">
                <span>Run Demo Test →</span>
                <span className="font-mono text-[10px] text-slate-500">94% Demo conf</span>
              </div>
            </div>
          </div>

          {/* Demo 2: Flood Change */}
          <div
            onClick={() => onSelectDemo('FLOOD_TEMPORAL_01')}
            className="group cursor-pointer rounded-xl border border-[#1c2e4a] bg-[#0c162a] overflow-hidden transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] flex flex-col justify-between"
            id="dash-demo-flood"
          >
            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
              <div className="grid grid-cols-2 h-full w-full">
                <img
                  src="/demo/flood_before.jpg"
                  alt="Flood Before"
                  className="h-full w-full object-cover border-r border-slate-900 group-hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="/demo/flood_after.jpg"
                  alt="Flood After"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-2 left-2 rounded border border-blue-500/40 bg-blue-950/80 px-2 py-0.5 font-mono text-[9px] text-blue-300 backdrop-blur-sm">
                BI-TEMPORAL PAIR
              </div>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-sm font-semibold text-white group-hover:text-cyan-300">
                  Flood Change
                </h4>
                <div className="mt-1 font-mono text-xs text-cyan-400/90">
                  Question: &quot;What changed between these two images?&quot;
                </div>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                  Pre- and post-flood event comparison identifying substantial river expansion and inundated agricultural floodplain.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400">
                <span>Run Demo Test →</span>
                <span className="font-mono text-[10px] text-slate-500">92% Demo conf</span>
              </div>
            </div>
          </div>

          {/* Demo 3: Agricultural Scene */}
          <div
            onClick={() => onSelectDemo('AGRICULTURE_OPTICAL_01')}
            className="group cursor-pointer rounded-xl border border-[#1c2e4a] bg-[#0c162a] overflow-hidden transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] flex flex-col justify-between"
            id="dash-demo-agri"
          >
            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
              <img
                src="/demo/agriculture_optical_01.jpg"
                alt="Agricultural Scene"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 rounded border border-emerald-500/40 bg-emerald-950/80 px-2 py-0.5 font-mono text-[9px] text-emerald-300 backdrop-blur-sm">
                OPTICAL RGB
              </div>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-sm font-semibold text-white group-hover:text-cyan-300">
                  Agricultural Scene
                </h4>
                <div className="mt-1 font-mono text-xs text-cyan-400/90">
                  Question: &quot;What type of land cover dominates this image?&quot;
                </div>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                  True-color agricultural scene dominated by cultivated fields, a compact village settlement, and natural river channel.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400">
                <span>Run Demo Test →</span>
                <span className="font-mono text-[10px] text-slate-500">92% Demo conf</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Telemetry & Architecture Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-[#1c2e4a] bg-[#09101f] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-slate-400">SPECIALIST ADAPTERS</span>
            <Cpu className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="font-mono text-xl font-bold text-white">5 Registered</div>
          <p className="mt-1 text-xs text-slate-400">
            RS-Adapted VLM, VisTA, Optical-SAR, Change-Agent, TEOChat
          </p>
          <button 
            onClick={() => onNavigate('model-registry')} 
            className="mt-3 text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            View Model Registry →
          </button>
        </div>

        <div className="rounded-xl border border-[#1c2e4a] bg-[#09101f] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-slate-400">RS ADAPTATION</span>
            <Layers className="h-4 w-4 text-purple-400" />
          </div>
          <div className="font-mono text-xl font-bold text-white">Stage 0 Ready</div>
          <p className="mt-1 text-xs text-slate-400">
            BigEarthNet-S2 data prep pipeline &amp; LoRA PEFT architecture
          </p>
          <button 
            onClick={() => onNavigate('rs-adaptation')} 
            className="mt-3 text-xs text-purple-400 hover:underline cursor-pointer"
          >
            Open RS Adaptation →
          </button>
        </div>

        <div className="rounded-xl border border-[#1c2e4a] bg-[#09101f] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-slate-400">ANALYSIS ARCHIVE</span>
            <FileText className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="font-mono text-xl font-bold text-white">{historyCount} Records</div>
          <p className="mt-1 text-xs text-slate-400">
            Locally stored query runs with groundings and PDF export
          </p>
          <button 
            onClick={() => onNavigate('history')} 
            className="mt-3 text-xs text-emerald-400 hover:underline cursor-pointer"
          >
            Review History →
          </button>
        </div>
      </div>
    </div>
  );
};
