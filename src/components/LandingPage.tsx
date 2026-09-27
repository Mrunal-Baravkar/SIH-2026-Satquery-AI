import React from 'react';
import { 
  Shield, 
  Cpu, 
  GitBranch, 
  ArrowRight, 
  Layers, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  Zap, 
  Search, 
  Scale, 
  CheckCircle2, 
  Satellite, 
  FileCheck,
  Eye,
  Sliders
} from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: () => void;
  onSelectDemo: (demoId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAnalysis,
  onSelectDemo,
}) => {
  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#1c2e4a]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#101a2e_1px,transparent_1px),linear-gradient(to_bottom,#101a2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                SATQUERY <span className="text-cyan-400">AI</span>
              </h1>

              <h2 className="text-lg sm:text-xl font-medium text-slate-200 leading-snug">
                An Interactive Vision-Language Assistant for Multimodal Remote-Sensing Image Analysis through Text Queries.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Upload satellite imagery, ask questions in natural language, and let an intelligent AI workflow select, analyze and combine the appropriate remote-sensing analysis tools.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onStartAnalysis}
                  className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] cursor-pointer"
                  id="hero-btn-start-analysis"
                >
                  <span>Start Analysis</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href="#capabilities-section"
                  className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-500 hover:text-white cursor-pointer"
                  id="hero-btn-explore-capabilities"
                >
                  <span>Explore Capabilities</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Subtle blue/cyan highlight and edge glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 opacity-70 blur-xl"></div>
                
                <div className="relative rounded-xl border border-cyan-500/40 bg-[#0a1224] p-2 shadow-[0_0_35px_rgba(0,212,255,0.25)] overflow-hidden">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-950">
                    <img
                      src="/demo/hero_earth.jpg"
                      alt="Earth Observation Satellite Imagery"
                      className="h-full w-full object-cover contrast-110 filter"
                    />
                    
                    {/* Overlay telemetry badges */}
                    <div className="absolute top-3 left-3 rounded border border-cyan-500/40 bg-[#060b14]/85 px-2.5 py-1 backdrop-blur-sm">
                      <div className="flex items-center space-x-1.5 text-[10px] text-cyan-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>ORBITAL STREAM • SENTINEL S2 / S1</span>
                      </div>
                    </div>

                    <div className="absolute bottom-3 right-3 rounded border border-slate-700 bg-[#060b14]/85 px-2.5 py-1 backdrop-blur-sm">
                      <span className="text-[10px] text-slate-300">
                        BAND MATRIX: OPTICAL • SAR • TEMPORAL
                      </span>
                    </div>
                  </div>

                  {/* Scientific metadata strip */}
                  <div className="mt-2.5 flex items-center justify-between px-2 text-[10px] text-slate-300">
                    <span>SENSOR: MULTISPECTRAL VQA</span>
                    <span className="text-cyan-400">RESOLUTION: 10M SPATIAL</span>
                    <span>ADAPTER: ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities-section" className="py-20 border-b border-[#1c2e4a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              SYSTEM CAPABILITIES
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              A multimodal reasoning pipeline for Earth observation
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Specialized geospatial reasoning architecture handling diverse sensor platforms, spectral regimes, and temporal dimensions.
            </p>
          </div>

          {/* 6 Cards with ICON ON THE LEFT OF THE HEADING */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Multimodal Analysis */}
            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 shadow-sm hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950/40 text-cyan-400">
                  <Layers className="h-5 w-5" />
                </div>
                <h4 className="font-mono text-base font-semibold text-white">
                  Multimodal Analysis
                </h4>
              </div>
              <p className="text-xs font-mono text-cyan-400/90 mb-2">
                Optical • Multispectral • SAR
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ingest diverse remote-sensing data sources including true-color RGB optical, multispectral band stacks, and Synthetic Aperture Radar (SAR) backscatter.
              </p>
            </div>

            {/* Card 2: Natural Language Queries */}
            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 shadow-sm hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-500/40 bg-blue-950/40 text-blue-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h4 className="font-mono text-base font-semibold text-white">
                  Natural Language Queries
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ask questions using natural language. Query land-use categories, identify infrastructure, trace water bodies, or request high-level environmental overviews.
              </p>
            </div>

            {/* Card 3: Intelligent Routing */}
            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 shadow-sm hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-500/40 bg-purple-950/40 text-purple-400">
                  <GitBranch className="h-5 w-5" />
                </div>
                <h4 className="font-mono text-base font-semibold text-white">
                  Intelligent Routing
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automatically selects the appropriate analysis workflow based on query intent, sensor modality, and single vs. multi-temporal input configurations.
              </p>
            </div>

            {/* Card 4: Temporal Intelligence */}
            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 shadow-sm hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-950/40 text-emerald-400">
                  <Clock className="h-5 w-5" />
                </div>
                <h4 className="font-mono text-base font-semibold text-white">
                  Temporal Intelligence
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compare imagery across time. Detect floods, agricultural harvests, urban development, and deforestation with automated before-and-after change reasoning.
              </p>
            </div>

            {/* Card 5: Optical + SAR Fusion */}
            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 shadow-sm hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-950/40 text-amber-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h4 className="font-mono text-base font-semibold text-white">
                  Optical + SAR Fusion
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combine complementary sensor evidence: optical spectral reflectance for surface classification paired with all-weather radar penetration for structure detection.
              </p>
            </div>

            {/* Card 6: Evidence-Grounded Results */}
            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6 shadow-sm hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950/40 text-cyan-400">
                  <FileCheck className="h-5 w-5" />
                </div>
                <h4 className="font-mono text-base font-semibold text-white">
                  Evidence-Grounded Results
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Visual evidence + confidence + execution trace. Every answer provides visual bounding boxes, image crops, confidence metrics, and an audit trail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline / Architecture Section — Single Screen View */}
      <section id="pipeline-section" className="py-8 lg:py-12 border-b border-[#1c2e4a] bg-[#070d19]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1 preserve-title">
              ARCHITECTURE &amp; FLOW
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white preserve-title">
              From image and query to verified answer
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              Observable multi-stage pipeline designed for scientific transparency, zero hallucinated models, and verifiable evidence fusion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Compact Pipeline Blocks */}
            <div className="lg:col-span-6 space-y-1.5">
              {/* Block 1 */}
              <div className="flex items-center justify-between rounded-lg border border-cyan-500/40 bg-[#0e192f] px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
                    <Satellite className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-wider preserve-title">IMAGE + QUERY</h5>
                    <p className="text-[11px] text-slate-400">Input validation &amp; sensor modality analysis</p>
                  </div>
                </div>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">STAGE 01</span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-cyan-500/60 leading-none">
                <span className="text-xs font-bold">↓</span>
              </div>

              {/* Block 2 */}
              <div className="flex items-center justify-between rounded-lg border border-blue-500/40 bg-[#0e192f] px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-950/60 border border-blue-500/40 text-blue-400">
                    <GitBranch className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-wider preserve-title">INTELLIGENT ROUTER</h5>
                    <p className="text-[11px] text-slate-400">Workflow planner &amp; specialist adapter dispatch</p>
                  </div>
                </div>
                <span className="text-[10px] text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/30">STAGE 02</span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-cyan-500/60 leading-none">
                <span className="text-xs font-bold">↓</span>
              </div>

              {/* Block 3 */}
              <div className="flex items-center justify-between rounded-lg border border-purple-500/40 bg-[#0e192f] px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-purple-950/60 border border-purple-500/40 text-purple-400">
                    <Cpu className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-wider preserve-title">SPECIALIST AI</h5>
                    <p className="text-[11px] text-slate-400">Task-specific vision-language remote-sensing model</p>
                  </div>
                </div>
                <span className="text-[10px] text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/30">STAGE 03</span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-cyan-500/60 leading-none">
                <span className="text-xs font-bold">↓</span>
              </div>

              {/* Block 4 */}
              <div className="flex items-center justify-between rounded-lg border border-emerald-500/40 bg-[#0e192f] px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                    <Search className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-wider preserve-title">EVIDENCE</h5>
                    <p className="text-[11px] text-slate-400">ROI extraction &amp; spatial bounding-box grounding</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">STAGE 04</span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-cyan-500/60 leading-none">
                <span className="text-xs font-bold">↓</span>
              </div>

              {/* Block 5 */}
              <div className="flex items-center justify-between rounded-lg border border-amber-500/40 bg-[#0e192f] px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-950/60 border border-amber-500/40 text-amber-400">
                    <Scale className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-wider preserve-title">ARBITRATION</h5>
                    <p className="text-[11px] text-slate-400">Output validation &amp; evidence consistency fusion</p>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">STAGE 05</span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-cyan-500/60 leading-none">
                <span className="text-xs font-bold">↓</span>
              </div>

              {/* Block 6: FINAL ANSWER */}
              <div className="flex items-center justify-between rounded-lg border border-cyan-400 bg-[#0c223d] px-4 py-2 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                <div className="flex items-center space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-cyan-900 border border-cyan-400 text-cyan-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-wider preserve-title">FINAL ANSWER</h5>
                    <p className="text-[11px] text-slate-300">Verified answer + visual ROIs + PDF audit report</p>
                  </div>
                </div>
                <span className="text-[10px] text-white bg-cyan-600 px-2 py-0.5 rounded font-bold">COMPLETED</span>
              </div>
            </div>

            {/* Right: 3 Supporting Descriptions */}
            <div className="lg:col-span-6 space-y-3">
              {/* Card 01 */}
              <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-4 shadow-sm hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-cyan-400 preserve-title">
                    Intelligent Router
                  </h4>
                  <span className="text-[10px] text-slate-500">DISPATCH CONTROL</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Interprets the user&apos;s query and input configuration and selects the appropriate specialist workflow.
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Routing latency: &lt;15ms</span>
                  <span>Modality: Auto-inferred</span>
                </div>
              </div>

              {/* Card 02 */}
              <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-4 shadow-sm hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-purple-400 preserve-title">
                    Specialist Models
                  </h4>
                  <span className="text-[10px] text-slate-500">ADAPTER REGISTRY</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Different specialist adapters handle single-image VQA, temporal change analysis and optical-SAR reasoning.
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Adapters: VisTA, Change-Agent, RS-VLM</span>
                  <span>Inference: Active</span>
                </div>
              </div>

              {/* Card 03 */}
              <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-4 shadow-sm hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-emerald-400 preserve-title">
                    Evidence &amp; Arbitration
                  </h4>
                  <span className="text-[10px] text-slate-500">GROUNDING FUSION</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Outputs are validated, grounded in image regions and combined into an evidence-based answer.
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Visual Grounding: Bounding Boxes</span>
                  <span>Verification: Spatial Grounding Verifier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology-section" className="py-20 bg-[#060b14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              TECHNOLOGY STACK
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Grounded AI for remote sensing intelligence
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Built on strict scientific principles: transparent execution traces, exact evaluation benchmarks, and honest capability reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6">
              <div className="text-xs text-cyan-400 mb-2 preserve-title font-semibold">RS VISION-LANGUAGE BACKBONE</div>
              <h4 className="text-lg font-bold text-white mb-2 preserve-title">Remote Sensing VLM Engine</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provides dynamic multimodal understanding across high-resolution satellite rasters, multi-temporal image sequences, and natural-language queries.
              </p>
            </div>

            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6">
              <div className="font-mono text-xs text-purple-400 mb-2">STAGE 0 PIPELINE</div>
              <h4 className="text-lg font-bold text-white mb-2">BigEarthNet Specialization</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Architecture designed for parameter-efficient fine-tuning (LoRA / PEFT) on remote sensing datasets like BigEarthNet-S2 for domain adaptation.
              </p>
            </div>

            <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-6">
              <div className="font-mono text-xs text-emerald-400 mb-2">AUDITABILITY</div>
              <h4 className="text-lg font-bold text-white mb-2">Deterministic Evaluation</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Registered test cases provide reproducible, ground-truth benchmark answers for scientific validation without stochastic variations.
              </p>
            </div>
          </div>

          {/* Bottom CTA Card */}
          <div className="mt-16 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-[#0d1c33] to-blue-950/40 p-8 sm:p-10 text-center shadow-[0_0_30px_rgba(0,212,255,0.15)]">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to analyze remote-sensing imagery?
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
              Launch the interactive analysis workspace with SAR, optical, or temporal pairs.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={onStartAnalysis}
                className="flex items-center space-x-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition-all hover:bg-cyan-400 cursor-pointer"
                id="landing-cta-start-btn"
              >
                <span>Launch Analysis Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
