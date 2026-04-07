import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import authService from './services/authService';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Páginas
import Home           from './pages/Home';
import Login          from './pages/Login';
import Register       from './pages/Register';
import Dashboard      from './pages/Dashboard';
import NewAnalysis    from './pages/NewAnalysis';
import AnalysisResult from './pages/AnalysisResult';
import History        from './pages/History';
import Pricing        from './pages/Pricing';

// ─── Ruta protegida: redirige al login si no está autenticado ──────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// ─── Ruta pública: redirige al dashboard si ya está autenticado ────
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function AppContent() {
  const { token, setAuth, logout } = useAuthStore();
  const location = useLocation();

  // Al cargar la app, verificar que el token guardado sigue siendo válido
  useEffect(() => {
    if (!token) return;
    authService.getMe()
      .then((user) => setAuth(token, user))
      .catch(() => logout());
  }, []);

  // En login/register no mostramos navbar ni footer
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Públicas */}
          <Route path="/"        element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Solo para no autenticados */}
          <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Protegidas */}
          <Route path="/dashboard"      element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analysis/new"   element={<ProtectedRoute><NewAnalysis /></ProtectedRoute>} />
          <Route path="/analysis/:id"   element={<ProtectedRoute><AnalysisResult /></ProtectedRoute>} />
          <Route path="/history"        element={<ProtectedRoute><History /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
