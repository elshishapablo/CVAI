import api from './api';
import type { AuthResponse, User } from '../types';

/**
 * Servicio de autenticación — encapsula todas las llamadas
 * al backend relacionadas con usuarios y sesión.
 */
const authService = {
  /**
   * Registra un nuevo usuario y devuelve token + perfil
   */
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    });
    return data;
  },

  /**
   * Inicia sesión y devuelve token + perfil
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  /**
   * Obtiene los datos actualizados del usuario autenticado
   */
  getMe: async (): Promise<User> => {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },

  /**
   * Actualiza el plan del usuario (free ↔ pro)
   */
  updatePlan: async (plan: 'free' | 'pro'): Promise<User> => {
    const { data } = await api.put<User>('/user/plan', { plan });
    return data;
  },
};

export default authService;
