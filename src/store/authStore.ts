import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  // Acciones
  setAuth: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

/**
 * Store global de autenticación.
 * Se persiste en localStorage para mantener la sesión entre recargas.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token:           null,
      user:            null,
      isAuthenticated: false,

      setAuth: (token, user) =>
        set({ token, user, isAuthenticated: true }),

      updateUser: (user) =>
        set({ user }),

      logout: () =>
        set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'cvmatch-auth', // clave en localStorage
      // Solo persistir el token (el perfil se recarga en cada visita)
      partialize: (state) => ({ token: state.token }),
    }
  )
);
