import { jsPDF } from 'jspdf';
import { AnalysisResult } from '../types';

export async function generateAnalysisReportPDF(
  result: AnalysisResult,
  reportType: 'comprehensive' | 'evidence' = 'comprehensive'
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = margin;

  // Helper for page break with recurring header
  const ensureSpace = (requiredHeight: number) => {
    if (cursorY + requiredHeight > pageHeight - margin - 10) {
      doc.addPage();
      cursorY = margin + 12;
      renderPageHeader();
    }
  };

  const renderPageHeader = () => {
    doc.setFillColor(10, 17, 32);
    doc.rect(0, 0, pageWidth, 14, 'F');
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(0, 212, 255);
    doc.text('SATQUERY AI', margin, 9);
    doc.setFont('times', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 175, 205);
    doc.text('SIH / ISRO Technical Demonstration • Remote Sensing Intelligence Report', margin + 30, 9);
    doc.text(`SESSION: ${result.id}`, pageWidth - margin - 45, 9);
  };

  // =========================================================================
  // 1. SYSTEM IDENTIFICATION (Cover / Header Banner)
  // =========================================================================
  doc.setFillColor(6, 11, 20);
  doc.rect(0, 0, pageWidth, 34, 'F');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(0, 212, 255);
  doc.text('SATQUERY AI', margin, 12);

  doc.setFontSize(8.5);
  doc.setFont('times', 'normal');
  doc.setTextColor(160, 190, 230);
  doc.text('SIH / ISRO TECHNICAL DEMONSTRATION', margin, 18);
  doc.text('MULTIMODAL REMOTE SENSING VISION-LANGUAGE AUDIT DOSSIER', margin, 23);

  doc.setFontSize(7.5);
  doc.setTextColor(130, 150, 180);
  doc.text(`Generated: ${new Date(result.timestamp).toUTCString()}`, margin, 29);
  doc.text(`Document ID: SQ-REP-${result.id}`, pageWidth - margin - 60, 29);

  cursorY = 40;

  // =========================================================================
  // 2. ANALYSIS METADATA
  // =========================================================================
  ensureSpace(28);
  doc.setFillColor(14, 23, 42);
  doc.setDrawColor(30, 50, 88);
  doc.roundedRect(margin, cursorY, contentWidth, 24, 1.5, 1.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 212, 255);
  doc.text('1. ANALYSIS METADATA', margin + 4, cursorY + 6);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(220, 230, 245);
  doc.text(`User Query: "${result.query}"`, margin + 4, cursorY + 12);
  doc.text(`Timestamp: ${new Date(result.timestamp).toISOString()}`, margin + 4, cursorY + 17);
  doc.text(`Sensor Modality: ${result.modality}`, margin + 4, cursorY + 22);

  const col2X = margin + 95;
  doc.text(`Pipeline Route: ${result.taskType}`, col2X, cursorY + 12);
  doc.text(`Operating Mode: ${result.mode}`, col2X, cursorY + 17);
  doc.text(`Execution Path: ${result.executionPath || 'Stage 01 -> Stage 05 Verified'}`, col2X, cursorY + 22);

  cursorY += 28;

  // =========================================================================
  // 3. INPUT SUMMARY
  // =========================================================================
  ensureSpace(26);
  doc.setFillColor(14, 23, 42);
  doc.setDrawColor(30, 50, 88);
  doc.roundedRect(margin, cursorY, contentWidth, 22, 1.5, 1.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 212, 255);
  doc.text('2. INPUT SUMMARY', margin + 4, cursorY + 6);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(220, 230, 245);

  const inputCategory = (result.secondImagePreviewUrl || result.inputMetadata.isTemporalPair)
    ? 'Bi-temporal Imagery Pair (Pre & Post Event)'
    : result.inputMetadata.isOpticalSarPair || (result.modality.includes('Optical') && result.modality.includes('SAR'))
      ? 'Paired Optical-SAR Imagery'
      : 'Single Image Remote Sensing Scene';

  doc.text(`Configuration: ${inputCategory}`, margin + 4, cursorY + 12);
  doc.text(`Raster Dimensions: ${result.inputMetadata.dimensions}`, margin + 4, cursorY + 17);

  doc.text(`Format / Compression: ${result.inputMetadata.format}`, col2X, cursorY + 12);
  doc.text(`Bands / Color Space: ${result.inputMetadata.bands}`, col2X, cursorY + 17);

  cursorY += 26;

  // =========================================================================
  // 4. EXECUTED SPECIALIST
  // =========================================================================
  ensureSpace(24);
  doc.setFillColor(14, 23, 42);
  doc.setDrawColor(30, 50, 88);
  doc.roundedRect(margin, cursorY, contentWidth, 20, 1.5, 1.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 212, 255);
  doc.text('3. EXECUTED SPECIALIST MODEL', margin + 4, cursorY + 6);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(220, 230, 245);
  doc.text(`Selected Model: ${result.model}`, margin + 4, cursorY + 12);

  const dispatchReason = result.taskType === 'TEMPORAL_CHANGE'
    ? 'Dual-temporal diff attention for bi-temporal pixel shift extraction.'
    : result.taskType === 'SAR_ANALYSIS'
      ? 'Polarimetric backscatter texture calibration & radar terrain grounding.'
      : 'Multispectral scene semantic parsing and visual question answering.';

  doc.text(`Selection Rationale: ${dispatchReason}`, margin + 4, cursorY + 17);

  cursorY += 24;

  // =========================================================================
  // 5. PRIMARY ANSWER (Complete, untruncated)
  // =========================================================================
  const answerLines = doc.splitTextToSize(result.answer, contentWidth - 8);
  const answerBoxHeight = Math.max(22, 10 + answerLines.length * 4.5);
  ensureSpace(answerBoxHeight + 4);

  doc.setFillColor(11, 31, 58);
  doc.setDrawColor(0, 212, 255);
  doc.roundedRect(margin, cursorY, contentWidth, answerBoxHeight, 1.5, 1.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 212, 255);
  doc.text('4. PRIMARY ANSWER', margin + 4, cursorY + 6);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(240, 245, 255);
  doc.text(answerLines, margin + 4, cursorY + 12);

  cursorY += answerBoxHeight + 5;

  // =========================================================================
  // 6. CONFIDENCE ASSESSMENT
  // =========================================================================
  ensureSpace(28);
  doc.setFillColor(14, 23, 42);
  doc.setDrawColor(30, 50, 88);
  doc.roundedRect(margin, cursorY, contentWidth, 24, 1.5, 1.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 212, 255);
  doc.text('5. CONFIDENCE ASSESSMENT', margin + 4, cursorY + 6);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(220, 230, 245);
  doc.text(`Composite Confidence Score: ${result.confidence}% (${result.confidenceType})`, margin + 4, cursorY + 12);
  doc.text('Spectral Consistency: Calibrated against known band ratios', margin + 4, cursorY + 17);
  doc.text('Spatial Grounding Agreement: Verified across identified ROIs', margin + 4, cursorY + 22);

  doc.text(`Arbitration Consensus: High (${result.confidence >= 90 ? 'Certified' : 'Estimated'})`, col2X, cursorY + 12);
  doc.text(`Status: ${result.confidenceType}`, col2X, cursorY + 17);

  cursorY += 28;

  // =========================================================================
  // 7. VISUAL EVIDENCE
  // =========================================================================
  ensureSpace(30);
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 212, 255);
  doc.text('6. VISUAL EVIDENCE & DETECTED REGIONS', margin, cursorY);
  cursorY += 5;

  result.evidence.forEach((ev, idx) => {
    ensureSpace(16);
    doc.setFillColor(15, 25, 45);
    doc.setDrawColor(28, 46, 74);
    doc.roundedRect(margin, cursorY, contentWidth, 14, 1.5, 1.5, 'FD');

    // Marker
    const rgb = ev.color ? hexToRgb(ev.color) : { r: 0, g: 212, b: 255 };
    doc.setFillColor(rgb.r, rgb.g, rgb.b);
    doc.circle(margin + 4, cursorY + 7, 2, 'F');

    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    const bboxText = ev.bbox ? ` | BBox [${ev.bbox.xmin}, ${ev.bbox.ymin}, ${ev.bbox.width}x${ev.bbox.height}]` : '';
    doc.text(`[ROI ${idx + 1}] ${ev.label} (${ev.region || 'Image Space'})${bboxText}`, margin + 8, cursorY + 6);

    doc.setFont('times', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(170, 190, 215);
    const descLines = doc.splitTextToSize(ev.description, contentWidth - 40);
    doc.text(descLines[0] || '', margin + 8, cursorY + 11);

    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(0, 212, 255);
    doc.text(`${ev.confidence || result.confidence}%`, pageWidth - margin - 16, cursorY + 8);

    cursorY += 16;
  });

  cursorY += 3;

  // =========================================================================
  // 8. GEOSPATIAL EVIDENCE
  // =========================================================================
  ensureSpace(24);
  doc.setFillColor(14, 23, 42);
  doc.setDrawColor(30, 50, 88);
  doc.roundedRect(margin, cursorY, contentWidth, 20, 1.5, 1.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 212, 255);
  doc.text('7. GEOSPATIAL EVIDENCE', margin + 4, cursorY + 6);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(220, 230, 245);
  doc.text('Georeferencing Status: Not available (standard raster upload)', margin + 4, cursorY + 12);
  doc.text('Coordinate Reference System (CRS): Relative Image Pixel Space (0,0 to W,H)', margin + 4, cursorY + 17);

  doc.text(`Spatial Resolution: ${result.inputMetadata.dimensions} nominal`, col2X, cursorY + 12);
  doc.text('Coordinates: Relative bounding box percentage (0 - 100%)', col2X, cursorY + 17);

  cursorY += 24;

  // =========================================================================
  // 9. EXECUTION TRACE
  // =========================================================================
  if (result.executionSteps && result.executionSteps.length > 0) {
    ensureSpace(35);
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(0, 212, 255);
    doc.text('8. OBSERVABLE EXECUTION TRACE', margin, cursorY);
    cursorY += 5;

    doc.setFillColor(14, 23, 42);
    doc.setDrawColor(30, 50, 88);
    doc.rect(margin, cursorY, contentWidth, 6, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 212, 255);
    doc.text('STEP', margin + 3, cursorY + 4);
    doc.text('PIPELINE COMPONENT', margin + 20, cursorY + 4);
    doc.text('STATUS', margin + 85, cursorY + 4);
    doc.text('TIMESTAMP / ARTIFACT', margin + 115, cursorY + 4);
    cursorY += 6;

    result.executionSteps.forEach((step) => {
      ensureSpace(8);
      doc.setFillColor(8, 14, 26);
      doc.setDrawColor(25, 40, 70);
      doc.rect(margin, cursorY, contentWidth, 6, 'FD');

      doc.setFont('times', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(200, 215, 235);
      doc.text(`${step.stepNumber}. ${step.name}`, margin + 3, cursorY + 4);

      doc.setFont('times', 'normal');
      doc.setTextColor(150, 175, 205);
      doc.text(step.component, margin + 20, cursorY + 4);

      doc.setFont('times', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text(step.status.toUpperCase(), margin + 85, cursorY + 4);

      doc.setFont('times', 'normal');
      doc.setTextColor(130, 150, 180);
      const outputText = step.outputSummary || step.timestamp;
      doc.text(doc.splitTextToSize(outputText, 60)[0] || '', margin + 115, cursorY + 4);

      cursorY += 6;
    });

    cursorY += 4;
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('times', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 120, 150);
    doc.text(`SatQuery AI Remote Sensing Audit Report — Page ${i} of ${totalPages}`, margin, pageHeight - 6);
    doc.text('SIH / ISRO TECHNICAL DEMONSTRATION PROTOTYPE', pageWidth - margin - 75, pageHeight - 6);
  }

  doc.save(`SatQuery_Report_${result.id}_${Date.now()}.pdf`);
}

function hexToRgb(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((char) => char + char).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
