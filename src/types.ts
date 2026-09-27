export type Modality = 'Optical' | 'SAR' | 'Multispectral' | 'Bi-temporal' | 'Optical+SAR';

export type TaskType = 
  | 'Single-image scene description'
  | 'Land-cover analysis'
  | 'Change detection / change description'
  | 'Multimodal optical-SAR fusion'
  | 'Object grounding & extraction'
  | 'General VQA';

export type AnalysisMode = 
  | 'Known Image Evaluation'
  | 'Gemini Vision Analysis'
  | 'Optical-SAR Prototype Fusion'
  | 'Specialist Adapter (Offline)';

export interface EvidenceRegion {
  id: string;
  label: string;
  description: string;
  region?: string;
  confidence?: number;
  model?: string;
  bbox?: {
    xmin: number; // 0 - 1000 scale
    ymin: number;
    width: number;
    height: number;
  };
  color?: string;
  cropUrl?: string;
}

export interface ExecutionStep {
  id: string;
  stepNumber: number;
  name: string;
  component: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  timestamp: string;
  durationMs?: number;
  duration?: string;
  outputSummary?: string;
  details?: string;
}

export interface InputMetadata {
  filename: string;
  filesize: string;
  format: string;
  dimensions: string;
  bands: string;
  crs: string; // "N/A" or real if geotiff
  resolution: string; // "Not available" or real
  detectedModality: Modality;
  modalityConfidence: number;
  isTemporalPair?: boolean;
  isOpticalSarPair?: boolean;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  query: string;
  modality: Modality;
  taskType: TaskType | string;
  mode: AnalysisMode;
  model: string;
  answer: string;
  confidence: number;
  confidenceType: 'Demo confidence' | 'Estimated confidence';
  evidence: EvidenceRegion[];
  executionSteps: ExecutionStep[];
  limitations: string[];
  inputMetadata: InputMetadata;
  imagePreviewUrl: string;
  secondImagePreviewUrl?: string;
  changeOverlayUrl?: string;
  isRegisteredDemo?: boolean;
  registeredDemoId?: string;
  executionPath?: string;
}

export interface DemoCase {
  id: string;
  imageName: string;
  imagePath: string;
  secondImagePath?: string;
  imageFingerprint: string;
  modality: Modality;
  taskType: TaskType;
  supportedQuestions: string[];
  expectedAnswers: Record<string, string>;
  visualEvidence: EvidenceRegion[];
  confidence: number;
  confidenceType: 'Demo confidence' | 'Estimated confidence';
  metadata: {
    format: string;
    dimensions: string;
    bands: string;
    crs: string;
    resolution: string;
    description: string;
  };
}

export interface ModelRegistryItem {
  name: string;
  role: string;
  input: string;
  tasks: string;
  status: 'Registered' | 'Adapter' | 'Candidate' | 'Fallback';
  backend: string;
  badgeColor: string;
}
