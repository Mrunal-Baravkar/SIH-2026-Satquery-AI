import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  GitBranch, 
  ArrowLeft, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Sparkles,
  Download,
  Sliders,
  Check,
  SplitSquareVertical,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { AnalysisResult, EvidenceRegion } from '../types';
import { generateAnalysisReportPDF } from '../utils/pdfGenerator';
import { GeospatialEvidenceMap } from './GeospatialEvidenceMap';
import { extractImageCrop } from '../utils/imageCrop';
import { useLanguage } from '../i18n/LanguageContext';

const CropItem: React.FC<{
  evidence: EvidenceRegion;
  imageSrc: string;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ evidence, imageSrc, isSelected, onSelect }) => {
  const [cropSrc, setCropSrc] = useState<string>(evidence.cropUrl || '');

  useEffect(() => {
    if (evidence.cropUrl) {
      setCropSrc(evidence.cropUrl);
      return;
    }
    if (evidence.bbox && imageSrc) {
      let isMounted = true;
      extractImageCrop(imageSrc, evidence.bbox).then((url) => {
        if (isMounted && url) {
          setCropSrc(url);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [evidence.cropUrl, evidence.bbox, imageSrc]);

  return (
    <div
      onClick={onSelect}
      className={`rounded-lg border overflow-hidden flex flex-col justify-between cursor-pointer transition-all ${
        isSelected
          ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.3)]'
          : 'border-[#1c2e4a] bg-[#0c162a] hover:border-slate-600'
      }`}
    >
      {/* Crop Viewport */}
      <div className="relative w-full flex-1 overflow-hidden min-h-[75px] bg-slate-950 flex items-center justify-center">
        {cropSrc ? (
          <img
            src={cropSrc}
            alt={evidence.label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-[10px] text-slate-500 font-mono">Extracting crop...</div>
        )}
      </div>

      {/* Crop Label Bar */}
      <div className="bg-[#070d19] border-t border-[#1c2e4a] px-2 py-1 flex items-center justify-between">
        <span className="font-mono text-[10px] text-cyan-300 font-semibold truncate">
          {evidence.label}
        </span>
        {evidence.confidence !== undefined && (
          <span className="font-mono text-[9px] text-slate-400 shrink-0 ml-1">
            {evidence.confidence}%
          </span>
        )}
      </div>
    </div>
  );
};

interface ResultViewProps {
  result: AnalysisResult;
  onNavigateToTrace: () => void;
  onNewAnalysis: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onNavigateToTrace,
  onNewAnalysis,
}) => {
  const { t } = useLanguage();
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [reportType, setReportType] = useState<'comprehensive' | 'evidence'>('comprehensive');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Temporal view mode: 'overlay' | 'side-by-side' | 'slider'
  const [temporalViewMode, setTemporalViewMode] = useState<'overlay' | 'side-by-side' | 'slider'>('side-by-side');
  const [sliderPos, setSliderPos] = useState<number>(50);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateAnalysisReportPDF(result, reportType);
      setShowReportModal(false);
    } catch (e) {
      console.error('PDF generation error:', e);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const isTemporal = result.modality === 'Bi-temporal' || Boolean(result.secondImagePreviewUrl);

  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onNewAnalysis}
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('result.newQuery', 'NEW QUERY / UPLOAD')}</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateToTrace}
            className="flex items-center space-x-2 rounded-lg border border-[#1c2e4a] bg-[#0c162a] px-3.5 py-2 text-xs font-mono text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all cursor-pointer"
            id="result-btn-view-trace"
          >
            <GitBranch className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t('result.executionTrace', 'Execution Trace')}</span>
          </button>

          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center space-x-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:bg-cyan-400 transition-all cursor-pointer"
            id="result-btn-generate-report"
          >
            <Download className="h-3.5 w-3.5 text-slate-950" />
            <span>{t('result.downloadPdf', 'Download PDF Report')}</span>
          </button>
        </div>
      </div>

      {/* 1. ANSWER CARD */}
      <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-br from-[#0a1529] via-[#081120] to-[#060b14] p-6 lg:p-8 shadow-[0_0_25px_rgba(0,212,255,0.15)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
          <div className="flex items-center space-x-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              {t('result.answer', 'ANSWER')}
            </span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-xs text-slate-300">
              {t('result.query', 'Query')}: &quot;{result.query}&quot;
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Badge */}
            <span className="rounded border border-cyan-500/40 bg-cyan-950/50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
              Mode: {result.mode}
            </span>

            {/* Model Badge */}
            <span className="rounded border border-purple-500/40 bg-purple-950/50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-purple-300">
              Model: {result.model}
            </span>

            {/* Confidence Badge */}
            <span className="rounded border border-emerald-500/40 bg-emerald-950/50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
              {t('result.confidence', 'Confidence')} {result.confidence}% ({result.confidenceType})
            </span>
          </div>
        </div>

        {/* Answer Text */}
        <div className="p-4 rounded-lg bg-[#070e1c] border border-cyan-500/30">
          <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
            {result.answer}
          </p>
        </div>

        {/* Honest Evaluation Notice if Known Image */}
        {result.mode === 'Known Image Evaluation' && (
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 bg-purple-950/30 p-2.5 rounded border border-purple-500/30">
            <ShieldCheck className="h-4 w-4 shrink-0 text-purple-400" />
            <span>
              Expected answer matched from registered evaluation case. Deterministic ground-truth standard.
            </span>
          </div>
        )}
      </div>

      {/* 2. VISUAL EVIDENCE SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Layers className="h-5 w-5 text-cyan-400" />
            <h3 className="font-mono text-base font-bold uppercase tracking-wider text-white">
              {t('evidence.title', 'VISUAL EVIDENCE')}
            </h3>
          </div>
          {isTemporal && (
            <div className="flex items-center space-x-2 bg-[#0a1222] px-2.5 py-1 rounded-lg border border-[#1c2e4a]">
              <span className="font-mono text-[11px] text-slate-400">Temporal Mode:</span>
              <button
                onClick={() => setTemporalViewMode('side-by-side')}
                className={`px-2 py-0.5 rounded font-mono text-[11px] cursor-pointer ${
                  temporalViewMode === 'side-by-side' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Side-by-Side
              </button>
              <button
                onClick={() => setTemporalViewMode('slider')}
                className={`px-2 py-0.5 rounded font-mono text-[11px] cursor-pointer ${
                  temporalViewMode === 'slider' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Slider
              </button>
            </div>
          )}
        </div>

        {/* 3 Balanced Panels: Original Image, Detected / Grounded Regions, Relevant Crops */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {/* PART 1 — ORIGINAL IMAGE */}
          <div className="flex flex-col space-y-2">
            <div className="font-mono text-xs text-slate-400 font-semibold tracking-wider uppercase">
              {t('evidence.originalImage', 'ORIGINAL IMAGE')}
            </div>
            <div className="relative rounded-xl border border-[#1c2e4a] bg-[#070d19] aspect-square w-full overflow-hidden flex items-center justify-center select-none shadow-sm p-1">
              {/* Zoom / Pan Controls Overlay */}
              <div className="absolute top-2 right-2 z-20 flex items-center space-x-1 bg-black/70 backdrop-blur-sm p-1 rounded-lg border border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                  className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Full Image with aspect ratio preserved */}
              <div className="w-full h-full overflow-hidden flex items-center justify-center">
                <img
                  src={result.imagePreviewUrl}
                  alt="Original remote-sensing imagery"
                  className="max-w-full max-h-full object-contain transition-transform duration-200 select-none"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
              </div>

              {/* Bottom Resolution / Channel Badge */}
              <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded font-mono text-[10px] text-slate-400 pointer-events-none">
                {result.inputMetadata.format || 'Remote Sensing Raster'}
              </div>
            </div>
          </div>

          {/* PART 2 — DETECTED / GROUNDED REGIONS */}
          <div className="flex flex-col space-y-2">
            <div className="font-mono text-xs text-slate-400 font-semibold tracking-wider uppercase">
              {t('evidence.detectedGrounded', 'DETECTED / GROUNDED REGIONS')}
            </div>
            <div className="relative rounded-xl border border-[#1c2e4a] bg-[#070d19] aspect-square w-full overflow-hidden flex items-center justify-center select-none shadow-sm p-1">
              {/* Underlying Image with aligned bounding boxes */}
              <div className="relative max-w-full max-h-full flex items-center justify-center">
                <img
                  src={result.imagePreviewUrl}
                  alt="Detected grounded regions"
                  className="max-w-full max-h-full object-contain block select-none"
                />

                {/* Overlaid Bounding Boxes layer fitted exactly on top of image */}
                {result.evidence && result.evidence.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {result.evidence.map((ev) => {
                      if (!ev.bbox) return null;
                      const isNormalized = ev.bbox.width <= 1 && ev.bbox.height <= 1;
                      const leftPct = isNormalized ? ev.bbox.xmin * 100 : (ev.bbox.xmin / 1000) * 100;
                      const topPct = isNormalized ? ev.bbox.ymin * 100 : (ev.bbox.ymin / 1000) * 100;
                      const widthPct = isNormalized ? ev.bbox.width * 100 : (ev.bbox.width / 1000) * 100;
                      const heightPct = isNormalized ? ev.bbox.height * 100 : (ev.bbox.height / 1000) * 100;
                      const isSelected = selectedRegionId === ev.id;

                      return (
                        <div
                          key={ev.id}
                          onClick={() => setSelectedRegionId(isSelected ? null : ev.id)}
                          className={`absolute rounded cursor-pointer pointer-events-auto transition-all ${
                            isSelected
                              ? 'border-2 border-cyan-300 bg-cyan-400/25 shadow-[0_0_15px_rgba(0,212,255,0.7)] z-30'
                              : 'border-2 border-sky-400/90 bg-sky-400/10 hover:border-cyan-300 hover:bg-sky-400/20 z-20'
                          }`}
                          style={{
                            left: `${leftPct}%`,
                            top: `${topPct}%`,
                            width: `${widthPct}%`,
                            height: `${heightPct}%`,
                          }}
                          title={`${ev.label} - Click to focus`}
                        >
                          {/* Attached Label Pill */}
                          <div
                            className={`absolute -top-3 left-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-md pointer-events-none transition-all ${
                              isSelected
                                ? 'bg-cyan-300 text-slate-950 ring-2 ring-cyan-400'
                                : 'bg-sky-400 text-slate-950'
                            }`}
                          >
                            {ev.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {(!result.evidence || result.evidence.length === 0) && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center font-mono text-xs text-slate-400 bg-black/60">
                  {t('evidence.noGroundedRegions', 'No grounded regions returned for this query.')}
                </div>
              )}
            </div>
          </div>

          {/* PART 3 — RELEVANT CROPS */}
          <div className="flex flex-col space-y-2">
            <div className="font-mono text-xs text-slate-400 font-semibold tracking-wider uppercase">
              {t('evidence.relevantCrops', 'RELEVANT CROPS')}
            </div>
            <div className="relative rounded-xl border border-[#1c2e4a] bg-[#070d19] aspect-square w-full p-2.5 overflow-hidden flex flex-col justify-between shadow-sm">
              {(!result.evidence || result.evidence.length === 0) ? (
                <div className="h-full flex items-center justify-center p-4 text-center font-mono text-xs text-slate-400">
                  {t('evidence.noRelevantCrops', 'No relevant crops available.')}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 h-full w-full overflow-y-auto pr-0.5">
                  {result.evidence.map((ev) => (
                    <CropItem
                      key={ev.id}
                      evidence={ev}
                      imageSrc={result.imagePreviewUrl}
                      isSelected={selectedRegionId === ev.id}
                      onSelect={() => setSelectedRegionId(selectedRegionId === ev.id ? null : ev.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* EVIDENCE LIST (Full Width Below the 3 Panels) */}
        <div className="rounded-xl border border-[#1c2e4a] bg-[#070d19] p-3 space-y-2 mt-4">
          {(!result.evidence || result.evidence.length === 0) ? (
            <div className="p-4 text-center font-mono text-xs text-slate-500">
              No evidence items registered for this analysis.
            </div>
          ) : (
            result.evidence.map((ev) => {
              const isSelected = selectedRegionId === ev.id;
              const modelName =
                ev.model || (result.model.includes('GeoChat') ? 'GeoChat' : 'RS-VLM');

              return (
                <div
                  key={ev.id}
                  onClick={() => setSelectedRegionId(isSelected ? null : ev.id)}
                  className={`rounded-lg border px-4 py-3 flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_12px_rgba(0,212,255,0.25)]'
                      : 'border-[#1c2e4a] bg-[#0a1426] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span className="font-mono text-xs font-bold text-white">
                      {ev.label}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      · {modelName}
                    </span>
                  </div>

                  {ev.confidence !== undefined && (
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {ev.confidence}%
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. GEOSPATIAL EVIDENCE SECTION */}
      <GeospatialEvidenceMap
        result={result}
        selectedRegionId={selectedRegionId}
        onSelectRegion={setSelectedRegionId}
      />

      {/* PDF Report Download Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-cyan-500/40 bg-[#0c162a] p-6 shadow-[0_0_30px_rgba(0,212,255,0.2)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <h3 className="font-mono text-sm font-bold text-white">
                  GENERATE PDF ANALYSIS REPORT
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Select the desired remote-sensing verification report format for export:
            </p>

            <div className="space-y-3 font-mono text-xs">
              <label
                onClick={() => setReportType('comprehensive')}
                className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer ${
                  reportType === 'comprehensive'
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                    : 'border-[#1c2e4a] bg-[#070e1c] text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="reportType"
                  checked={reportType === 'comprehensive'}
                  onChange={() => setReportType('comprehensive')}
                  className="mt-0.5"
                />
                <div>
                  <div className="font-bold text-white">Comprehensive Analysis Report</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Includes full mission metadata, verified answers, complete detected ROIs, execution trace audit log, and limitations.
                  </div>
                </div>
              </label>

              <label
                onClick={() => setReportType('evidence')}
                className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer ${
                  reportType === 'evidence'
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                    : 'border-[#1c2e4a] bg-[#070e1c] text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="reportType"
                  checked={reportType === 'evidence'}
                  onChange={() => setReportType('evidence')}
                  className="mt-0.5"
                />
                <div>
                  <div className="font-bold text-white">Statistical / Evidence Report</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Concise executive summary centering detected ROI metrics, land-cover classes, and confidence measures.
                  </div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isGeneratingPDF}
                onClick={handleDownloadPDF}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-50"
              >
                {isGeneratingPDF ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
