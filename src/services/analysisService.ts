import api from './api';
import type { Analysis, AnalysisListItem } from '../types';

/**
 * Servicio de análisis — encapsula todas las llamadas
 * al backend relacionadas con el análisis de CVs.
 */
const analysisService = {
  /**
   * Crea un nuevo análisis enviando el PDF y los datos del trabajo.
   * Usa FormData porque incluye un archivo binario (PDF).
   */
  create: async (
    pdfFile: File,
    jobTitle: string,
    jobDescription: string,
    company: string = ''
  ): Promise<Analysis> => {
    const form = new FormData();
    form.append('pdfFile', pdfFile);
    form.append('jobTitle', jobTitle);
    form.append('jobDescription', jobDescription);
    form.append('company', company);

    const { data } = await api.post<Analysis>('/analysis', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  /**
   * Obtiene el historial completo del usuario autenticado
   */
  getHistory: async (): Promise<AnalysisListItem[]> => {
    const { data } = await api.get<AnalysisListItem[]>('/analysis');
    return data;
  },

  /**
   * Obtiene el detalle completo de un análisis por su ID
   */
  getById: async (id: number): Promise<Analysis> => {
    const { data } = await api.get<Analysis>(`/analysis/${id}`);
    return data;
  },

  /**
   * Elimina un análisis del historial
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/analysis/${id}`);
  },
};

export default analysisService;
