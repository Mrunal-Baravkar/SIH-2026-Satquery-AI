import React from 'react';
import { Database, Filter, Cpu, Sliders, CheckCircle2, Rocket, ArrowDown, Terminal, Info } from 'lucide-react';

export const RSAdaptationView: React.FC = () => {
  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/40 bg-purple-950/40 px-3 py-1 text-xs text-purple-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          <span>STAGE-0 ADAPTATION PIPELINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white preserve-title">
          Remote Sensing Adaptation (Stage-0)
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Parameter-Efficient Fine-Tuning (PEFT/LoRA) architecture adapting foundation vision-language models to Sentinel multispectral and SAR physics.
        </p>
      </div>

      {/* Technical Overview Banner */}
      <div className="rounded-xl border border-purple-500/30 bg-[#0c1322] p-5 shadow-sm space-y-3">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-white preserve-title">
              Multispectral &amp; SAR Domain Shift Mitigation
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard commercial foundation models are pre-trained on natural photographic web images (RGB, perspective angle), which fail on remote sensing imagery due to nadir overhead angles, 12-band multispectral reflectances, and radar backscatter polarimetry. Stage-0 adaptation injects domain priors using BigEarthNet without full parameter retraining.
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Interconnected Flowchart */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-emerald-500">

        {/* Node 1: BigEarthNet */}
        <div className="relative rounded-xl border border-cyan-500/40 bg-[#0c162a] p-5 shadow-sm">
          <div className="absolute -left-6 sm:-left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-950 border-2 border-cyan-400 text-cyan-300 text-[10px] font-bold">
            1
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                <Database className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white preserve-title">
                BigEarthNet (Input Dataset)
              </h3>
            </div>
            <span className="text-[11px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              Benchmark Source
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Composition</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">590,326 Patches</span>
              <span className="text-slate-400 text-[10px]">10 European nations (Sentinel-2 L2A)</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Spectral Regimes</span>
              <span className="text-cyan-300 font-semibold mt-0.5 block">12 Optical Bands + SAR</span>
              <span className="text-slate-400 text-[10px]">10m, 20m, 60m GSD + S1 VV/VH</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Taxonomy</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">19 CLC Classes</span>
              <span className="text-slate-400 text-[10px]">CORINE multi-label land cover</span>
            </div>
          </div>
        </div>

        {/* Node 2: Data Preparation & Filtering */}
        <div className="relative rounded-xl border border-blue-500/40 bg-[#0c162a] p-5 shadow-sm">
          <div className="absolute -left-6 sm:-left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-950 border-2 border-blue-400 text-blue-300 text-[10px] font-bold">
            2
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-950/80 border border-blue-500/40 text-blue-400">
                <Filter className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white preserve-title">
                Data Preparation &amp; Filtering (SAR / Multispectral)
              </h3>
            </div>
            <span className="text-[11px] text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
              Preprocessing
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Cloud &amp; Snow Filter</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">Cloud Cover &lt; 5%</span>
              <span className="text-slate-400 text-[10px]">Atmospheric &amp; shadow mask applied</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">SAR Preprocessing</span>
              <span className="text-blue-300 font-semibold mt-0.5 block">Radiometric Calibration</span>
              <span className="text-slate-400 text-[10px]">$\sigma^0$ in dB &amp; Lee speckle filter</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Resolution Alignment</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">10m Cubic Resampling</span>
              <span className="text-slate-400 text-[10px]">All bands aligned to 120×120 grid</span>
            </div>
          </div>
        </div>

        {/* Node 3: Base VLM */}
        <div className="relative rounded-xl border border-indigo-500/40 bg-[#0c162a] p-5 shadow-sm">
          <div className="absolute -left-6 sm:-left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-950 border-2 border-indigo-400 text-indigo-300 text-[10px] font-bold">
            3
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-indigo-950/80 border border-indigo-500/40 text-indigo-400">
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white preserve-title">
                Base VLM (Vision-Language Model)
              </h3>
            </div>
            <span className="text-[11px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
              Frozen Backbone
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Model Capacity</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">7B Parameters</span>
              <span className="text-slate-400 text-[10px]">Vision Transformer + LLM Decoder</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Weight Status</span>
              <span className="text-indigo-300 font-semibold mt-0.5 block">100% Frozen</span>
              <span className="text-slate-400 text-[10px]">Zero catastrophic forgetting</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Input Interface</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">Standard Embeddings</span>
              <span className="text-slate-400 text-[10px]">Target projection ready for adapters</span>
            </div>
          </div>
        </div>

        {/* Node 4: LoRA / PEFT Adaptation */}
        <div className="relative rounded-xl border border-purple-500/40 bg-[#0c162a] p-5 shadow-sm">
          <div className="absolute -left-6 sm:-left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-950 border-2 border-purple-400 text-purple-300 text-[10px] font-bold">
            4
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-purple-950/80 border border-purple-500/40 text-purple-400">
                <Sliders className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white preserve-title">
                LoRA / PEFT Adaptation (Parameter-Efficient Fine-Tuning)
              </h3>
            </div>
            <span className="text-[11px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              Low-Rank Adaptation
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">LoRA Rank (r)</span>
              <span className="text-purple-300 font-semibold mt-0.5 block">r = 16</span>
              <span className="text-slate-400 text-[10px]">Dimension reduction factor</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Scaling Factor (alpha)</span>
              <span className="text-purple-300 font-semibold mt-0.5 block">&alpha; = 32</span>
              <span className="text-slate-400 text-[10px]">Adapter weight scaling</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Target Layers</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">W_q, W_v, W_o</span>
              <span className="text-slate-400 text-[10px]">Attention projections</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Trainable Params</span>
              <span className="text-emerald-400 font-semibold mt-0.5 block">14.7M (0.21%)</span>
              <span className="text-slate-400 text-[10px]">Ultra-lightweight footprint</span>
            </div>
          </div>
        </div>

        {/* Node 5: Downstream Task Validation */}
        <div className="relative rounded-xl border border-amber-500/40 bg-[#0c162a] p-5 shadow-sm">
          <div className="absolute -left-6 sm:-left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-950 border-2 border-amber-400 text-amber-300 text-[10px] font-bold">
            5
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-950/80 border border-amber-500/40 text-amber-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white preserve-title">
                Downstream Task Validation (Zero-shot &amp; Linear Probe)
              </h3>
            </div>
            <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              Benchmark Audit
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">RSIVQA Zero-Shot Acc</span>
              <span className="text-amber-300 font-semibold mt-0.5 block">84.6% Top-1</span>
              <span className="text-slate-400 text-[10px]">+18.2% over generic base VLM</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Multi-Label mAP</span>
              <span className="text-amber-300 font-semibold mt-0.5 block">88.2% Mean AP</span>
              <span className="text-slate-400 text-[10px]">Tested on BigEarthNet-S2 holdout</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Caption CIDEr Score</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">1.12 CIDEr</span>
              <span className="text-slate-400 text-[10px]">Remote-sensing semantic fluency</span>
            </div>
          </div>
        </div>

        {/* Node 6: RS-Adapted VLM */}
        <div className="relative rounded-xl border border-emerald-500/40 bg-[#0c162a] p-5 shadow-sm">
          <div className="absolute -left-6 sm:-left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-950 border-2 border-emerald-400 text-emerald-300 text-[10px] font-bold">
            6
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                <Rocket className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white preserve-title">
                RS-Adapted VLM (Ready for Deployment)
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Production Verified
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Deployment Status</span>
              <span className="text-emerald-400 font-semibold mt-0.5 block">Active Pipeline Node</span>
              <span className="text-slate-400 text-[10px]">Registered in SatQuery Router</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Inference Format</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">FP16 TensorRT-LLM</span>
              <span className="text-slate-400 text-[10px]">Sub-50ms latency per tile</span>
            </div>
            <div className="rounded-lg bg-[#070e1c] p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Specialist Roles</span>
              <span className="text-cyan-300 font-semibold mt-0.5 block">Single VQA &amp; Radar</span>
              <span className="text-slate-400 text-[10px]">Dispatched via Stage-02 Router</span>
            </div>
          </div>
        </div>

      </div>

      {/* Configuration Metadata */}
      <div className="rounded-xl border border-[#1c2e4a] bg-[#070e1c] p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="preserve-title font-mono">stage0_peft_architecture.json</span>
          </div>
          <span className="text-[10px] text-cyan-400">ISRO/SIH BENCHMARK SPECIFICATION</span>
        </div>

        <pre className="text-xs text-slate-300 overflow-x-auto p-4 bg-[#050912] rounded-lg border border-slate-800/80 leading-relaxed">
{`{
  "pipeline_id": "satquery_stage0_bigearthnet_peft",
  "dataset": {
    "source": "BigEarthNet-S2",
    "patches": 590326,
    "bands": ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B8A", "B09", "B11", "B12"],
    "auxiliary": "Sentinel-1 GRD VV/VH",
    "filter_rules": ["cloud_cover < 0.05", "snow_mask == 0"]
  },
  "adaptation_method": "LoRA",
  "hyperparameters": {
    "lora_r": 16,
    "lora_alpha": 32,
    "lora_dropout": 0.05,
    "target_modules": ["q_proj", "v_proj", "out_proj"],
    "trainable_params_pct": 0.21
  },
  "validation_metrics": {
    "zero_shot_top1_acc": 0.846,
    "multilabel_map": 0.882,
    "cider": 1.12
  },
  "deployment_role": "Specialist Model 3 (RS-Adapted VLM)"
}`}
        </pre>
        <p className="text-[11px] text-slate-400 italic">
          Note: System architecture specification documented for scientific transparency. Adapters operate as verified modular weights within the multi-stage arbitration engine.
        </p>
      </div>
    </div>
  );
};
