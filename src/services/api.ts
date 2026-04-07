import axios from 'axios';
import { useAuthStore } from '../store/authStore';

/**
 * Instancia base de Axios configurada para la API de CVMatch.
 * Lee la URL base del archivo .env (VITE_API_URL).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Interceptor de REQUEST: adjunta el JWT en cada petición ───────
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Interceptor de RESPONSE: manejo global de 401 ─────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el servidor responde 401, cerrar sesión y redirigir al login
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
