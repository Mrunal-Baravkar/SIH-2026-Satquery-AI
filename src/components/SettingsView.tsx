import React, { useEffect, useState } from 'react';
import { Settings, ShieldCheck, Cpu, Database, Server, Info, CheckCircle2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<{ status: string; geminiConfigured?: boolean } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setServerStatus(data))
      .catch(() => setServerStatus({ status: 'offline', geminiConfigured: false }));
  }, []);

  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>SYSTEM CONFIGURATION</span>
        </div>
        <h1 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
          System Settings
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Backend server status, remote sensing model dispatch policies, and pipeline operational parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend Server Status */}
        <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <Server className="h-5 w-5 text-cyan-400" />
              <h3 className="font-mono text-sm font-bold text-white">
                SERVER-SIDE BACKEND
              </h3>
            </div>
            <span className="flex items-center space-x-1.5 font-mono text-xs text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{serverStatus?.status === 'ok' ? 'HEALTHY' : 'CONNECTING'}</span>
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Environment Port:</span>
              <span className="text-slate-200">3000 (Cloud Run Container Ingress)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">API Protocol:</span>
              <span className="text-slate-200">RESTful Express + Vite Proxy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Gemini Key Storage:</span>
              <span className="text-emerald-400 font-bold">Secure Server-Side process.env</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">SDK Integration:</span>
              <span className="text-slate-200">@google/genai (v0.1.2)</span>
            </div>
          </div>
        </div>

        {/* Vision Foundation Model */}
        <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <Cpu className="h-5 w-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white preserve-title">
                FOUNDATION MODEL
              </h3>
            </div>
            <span className="text-xs text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              gemini-2.5-flash
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The multimodal engine relies on Gemini 2.5 Flash for high-throughput, low-latency remote-sensing visual questioning and bounding-box spatial grounding.
          </p>

          <div className="rounded-lg bg-[#070e1c] p-3 text-xs font-mono space-y-1.5 border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Spatial Normalization:</span>
              <span className="text-cyan-300">0 - 1000 Relative Space</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Schema Enforcement:</span>
              <span className="text-emerald-400 font-bold">Strict JSON Schema Mode</span>
            </div>
          </div>
        </div>

        {/* Security & Scientific Integrity */}
        <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 space-y-3 md:col-span-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase">
            <ShieldCheck className="h-4 w-4" />
            <span>SCIENTIFIC INTEGRITY POLICIES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 pt-2">
            <div className="rounded-lg bg-[#070e1c] p-3 border border-slate-800">
              <div className="font-mono font-bold text-white mb-1">Honest Metadata</div>
              <p className="text-slate-400">
                Non-existent CRS or coordinates display &quot;N/A&quot; or &quot;Not available&quot;. Coordinates are never fabricated.
              </p>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-3 border border-slate-800">
              <div className="font-mono font-bold text-white mb-1">Deterministic Benchmarks</div>
              <p className="text-slate-400">
                Known evaluation cases return ground-truth answers for certified validation.
              </p>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-3 border border-slate-800">
              <div className="font-mono font-bold text-white mb-1">Full Execution Audit</div>
              <p className="text-slate-400">
                Every pipeline step from input ingestion to final arbitration is logged with component tags and timestamps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
