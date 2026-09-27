import { AnalysisResult } from '../types';

const STORAGE_KEY = 'satquery_analysis_history_v1';

export function loadAnalysisHistory(): AnalysisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load analysis history from localStorage:', e);
    return [];
  }
}

export const getAnalysisHistory = loadAnalysisHistory;

export function saveAnalysisToHistory(result: AnalysisResult): void {
  try {
    const existing = loadAnalysisHistory();
    // Prepend new result, limit to 50 entries
    const updated = [result, ...existing.filter((item) => item.id !== result.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save analysis to history:', e);
  }
}

export const saveAnalysisResult = saveAnalysisToHistory;

export function deleteAnalysisFromHistory(id: string): AnalysisResult[] {
  try {
    const existing = loadAnalysisHistory();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete analysis from history:', e);
    return [];
  }
}

export const deleteAnalysisResult = deleteAnalysisFromHistory;

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

export const clearAnalysisHistory = clearAllHistory;
