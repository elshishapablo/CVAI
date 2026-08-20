import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import authService from '../services/authService';

/**
 * Hook que encapsula toda la lógica de autenticación.
 * Las páginas lo usan en lugar de llamar directamente al servicio.
 */
export function useAuth() {
  const { setAuth, updateUser, logout: storeLogout, user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  /**
   * Registra un usuario y redirige al dashboard
   */
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(name, email, password);
      setAuth(response.token, response.user);
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, 'Error al registrarse. Intenta de nuevo.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia sesión y redirige al dashboard
   */
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      setAuth(response.token, response.user);
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, 'Credenciales incorrectas.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cierra la sesión y redirige al home
   */
  const logout = () => {
    storeLogout();
    navigate('/');
  };

  /**
   * Recarga el perfil del usuario (para actualizar contadores)
   */
  const refreshUser = async () => {
    try {
      const updatedUser = await authService.getMe();
      updateUser(updatedUser);
    } catch {
      // Si falla, no hacemos nada (el token puede estar expirado)
    }
  };

  /**
   * Actualiza el plan del usuario
   */
  const upgradePlan = async (plan: 'free' | 'pro') => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updatePlan(plan);
      updateUser(updatedUser);
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, 'Error al actualizar el plan.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    refreshUser,
    upgradePlan,
    clearError: () => setError(null),
  };
}

// ─── Utilidad para extraer mensajes de error de Axios ─────────────
function extractErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const response = (err as { response?: { data?: { message?: string } } }).response;
    return response?.data?.message ?? fallback;
  }
  return fallback;
}
