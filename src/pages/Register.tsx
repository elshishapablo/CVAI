import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">CV</span>
            </div>
            <span className="font-bold text-gray-900 text-xl">
              CVMatch <span className="text-blue-500">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Crea tu cuenta gratis</h1>
          <p className="text-gray-500 mt-1 text-sm">3 análisis gratuitos cada mes · Sin tarjeta</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
