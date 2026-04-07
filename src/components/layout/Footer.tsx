import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">CV</span>
            </div>
            <span className="font-bold text-gray-700 text-sm">
              CVMatch <span className="text-blue-500">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/"       className="hover:text-blue-500 transition-colors">Inicio</Link>
            <Link to="/pricing" className="hover:text-blue-500 transition-colors">Precios</Link>
            <Link to="/login"  className="hover:text-blue-500 transition-colors">Iniciar sesión</Link>
          </div>

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CVMatch AI
          </p>
        </div>
      </div>
    </footer>
  );
}
