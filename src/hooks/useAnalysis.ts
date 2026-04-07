import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '../store/analysisStore';
import { useAuthStore } from '../store/authStore';
import analysisService from '../services/analysisService';
import authService from '../services/authService';

/**
 * Hook que encapsula toda la lógica de análisis de CVs.
 */
export function useAnalysis() {
  const {
    history, historyLoaded,
    setHistory, addToHistory, removeFromHistory,
    setCurrentAnalysis, currentAnalysis,
    isAnalyzing, setIsAnalyzing,
  } = useAnalysisStore();

  const { updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Crea un nuevo análisis, actualiza el historial y navega al resultado
   */
  const createAnalysis = async (
    pdfFile: File,
    jobTitle: string,
    jobDescription: string,
    company: string = ''
  ) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analysisService.create(pdfFile, jobTitle, jobDescription, company);

      // Agregar al historial en el store
      addToHistory({
        id:                 analysis.id,
        jobTitle:           analysis.jobTitle,
        company:            analysis.company,
        compatibilityScore: analysis.compatibilityScore,
        createdAt:          analysis.createdAt,
      });

      setCurrentAnalysis(analysis);

      // Actualizar contador de uso del usuario
      const updatedUser = await authService.getMe();
      updateUser(updatedUser);

      navigate(`/analysis/${analysis.id}`);
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, 'Error al analizar el CV. Inténtalo de nuevo.');
      setError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Carga el historial si aún no se ha cargado
   */
  const loadHistory = async () => {
    if (historyLoaded) return;
    setLoading(true);
    try {
      const data = await analysisService.getHistory();
      setHistory(data);
    } catch {
      setError('No se pudo cargar el historial.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fuerza la recarga del historial (ignora caché)
   */
  const reloadHistory = async () => {
    setLoading(true);
    try {
      const data = await analysisService.getHistory();
      setHistory(data);
    } catch {
      setError('No se pudo cargar el historial.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene el detalle de un análisis por ID
   */
  const loadAnalysis = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const analysis = await analysisService.getById(id);
      setCurrentAnalysis(analysis);
    } catch {
      setError('Análisis no encontrado.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Elimina un análisis del historial
   */
  const deleteAnalysis = async (id: number) => {
    try {
      await analysisService.delete(id);
      removeFromHistory(id);
    } catch {
      setError('No se pudo eliminar el análisis.');
    }
  };

  return {
    history,
    currentAnalysis,
    isAnalyzing,
    loading,
    error,
    createAnalysis,
    loadHistory,
    reloadHistory,
    loadAnalysis,
    deleteAnalysis,
    clearError: () => setError(null),
  };
}

function extractErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const response = (err as { response?: { data?: { message?: string } } }).response;
    return response?.data?.message ?? fallback;
  }
  return fallback;
}
