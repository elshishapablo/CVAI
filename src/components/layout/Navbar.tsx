import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Badge from '../ui/Badge';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) =>
    location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CV</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">
            CVMatch <span className="text-blue-500">AI</span>
          </span>
        </Link>

        {/* Links centrales */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard"     className={`text-sm transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>
            <Link to="/analysis/new"  className={`text-sm transition-colors ${isActive('/analysis/new')}`}>Nuevo análisis</Link>
            <Link to="/history"       className={`text-sm transition-colors ${isActive('/history')}`}>Historial</Link>
            <Link to="/pricing"       className={`text-sm transition-colors ${isActive('/pricing')}`}>Precios</Link>
          </div>
        )}

        {/* Derecha */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              {/* Plan badge */}
              {user.plan === 'pro' ? (
                <Badge variant="purple">⭐ Pro</Badge>
              ) : (
                <Badge variant="gray">{user.analysisUsedThisMonth}/3 análisis</Badge>
              )}

              {/* Nombre + logout */}
              <span className="hidden sm:block text-sm text-gray-600">
                {user.name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-blue-500 font-medium transition-colors">
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
