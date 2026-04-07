import { Link } from 'react-router-dom';
import UploadForm from '../components/analysis/UploadForm';

export default function NewAnalysis() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/dashboard" className="text-sm text-blue-500 hover:underline">
            ← Volver al dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nuevo análisis</h1>
          <p className="text-gray-500 mt-1">
            Sube tu CV en PDF y pega la oferta de trabajo para obtener tu análisis de compatibilidad.
          </p>
        </div>

        <UploadForm />
      </div>
    </div>
  );
}
