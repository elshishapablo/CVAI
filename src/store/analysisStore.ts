import { create } from 'zustand';
import type { Analysis, AnalysisListItem } from '../types';

interface AnalysisState {
  // Lista del historial
  history: AnalysisListItem[];
  historyLoaded: boolean;

  // Análisis actual que se está viendo
  currentAnalysis: Analysis | null;
  isAnalyzing: boolean;

  // Acciones
  setHistory: (history: AnalysisListItem[]) => void;
  addToHistory: (item: AnalysisListItem) => void;
  removeFromHistory: (id: number) => void;
  setCurrentAnalysis: (analysis: Analysis | null) => void;
  setIsAnalyzing: (value: boolean) => void;
  clearAnalysis: () => void;
}

/**
 * Store global para el estado de los análisis.
 * Evita recargar el historial innecesariamente.
 */
export const useAnalysisStore = create<AnalysisState>((set) => ({
  history:         [],
  historyLoaded:   false,
  currentAnalysis: null,
  isAnalyzing:     false,

  setHistory: (history) =>
    set({ history, historyLoaded: true }),

  addToHistory: (item) =>
    set((state) => ({
      history: [item, ...state.history],
    })),

  removeFromHistory: (id) =>
    set((state) => ({
      history: state.history.filter((a) => a.id !== id),
    })),

  setCurrentAnalysis: (analysis) =>
    set({ currentAnalysis: analysis }),

  setIsAnalyzing: (value) =>
    set({ isAnalyzing: value }),

  clearAnalysis: () =>
    set({ currentAnalysis: null, isAnalyzing: false }),
}));
