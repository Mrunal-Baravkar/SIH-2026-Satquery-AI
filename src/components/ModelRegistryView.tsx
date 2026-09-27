import React from 'react';
import { Cpu, CheckCircle2, Shield, Layers, Clock, Zap, Sparkles } from 'lucide-react';
import { MODEL_REGISTRY } from '../data/demoCases';

export const ModelRegistryView: React.FC = () => {
  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>INTELLIGENCE &amp; ARCHITECTURE</span>
        </div>
        <h1 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Model Registry
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Specialist adapters, geospatial vision-language architectures, and multimodal routing nodes registered in the SatQuery pipeline.
        </p>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-4">
          <span className="text-xs text-slate-400 block">TOTAL ARCHITECTURES</span>
          <span className="text-2xl font-bold text-white mt-1 block">5 Specialists</span>
          <span className="text-[10px] text-cyan-400">100% Configured</span>
        </div>

        <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-4">
          <span className="text-xs text-slate-400 block">ACTIVE SPECIALISTS</span>
          <span className="text-2xl font-bold text-cyan-400 mt-1 block">3 Adapters</span>
          <span className="text-[10px] text-slate-400">VisTA, Change, RS-VLM</span>
        </div>

        <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-4">
          <span className="text-xs text-slate-400 block">STAGE 0 ADAPTATION</span>
          <span className="text-2xl font-bold text-purple-400 mt-1 block">BigEarthNet</span>
          <span className="text-[10px] text-slate-400">S2 Spectral Weights</span>
        </div>

        <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-4">
          <span className="text-xs text-slate-400 block">ROUTER LATENCY</span>
          <span className="text-2xl font-bold text-emerald-400 mt-1 block">&lt; 15 ms</span>
          <span className="text-[10px] text-slate-400">Deterministic Dispatch</span>
        </div>
      </div>

      {/* Model Cards Grid: Specialists (Row 1) & Router / Validator (Row 2) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 preserve-title">
            SPECIALIST REMOTE-SENSING ADAPTERS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODEL_REGISTRY.slice(0, 3).map((model) => (
              <div
                key={model.name}
                className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 shadow-sm hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        {model.role}
                      </span>
                      <h3 className="text-base font-bold text-white preserve-title">
                        {model.name}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${model.badgeColor}`}
                    >
                      {model.status}
                    </span>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Tasks:</span>
                      <span className="text-slate-200">{model.tasks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Input Modality:</span>
                      <span className="text-cyan-300">{model.input}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Inference Backend:</span>
                      <span className="text-purple-300">{model.backend}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Adapter Slots: PEFT / LoRA Ready</span>
                  <span className="text-cyan-400">Verified Node</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 preserve-title">
            WORKFLOW ROUTING &amp; EVIDENCE ARBITRATION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODEL_REGISTRY.slice(3, 5).map((model) => (
              <div
                key={model.name}
                className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 shadow-sm hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        {model.role}
                      </span>
                      <h3 className="text-base font-bold text-white preserve-title">
                        {model.name}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${model.badgeColor}`}
                    >
                      {model.status}
                    </span>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Tasks:</span>
                      <span className="text-slate-200">{model.tasks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Input Modality:</span>
                      <span className="text-cyan-300">{model.input}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Inference Backend:</span>
                      <span className="text-purple-300">{model.backend}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Arbitration Layer</span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
