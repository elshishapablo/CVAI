import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAnalysis } from '../hooks/useAnalysis';
import ResultCard from '../components/analysis/ResultCard';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

export default function History() {
  const { history, reloadHistory, deleteAnalysis, loading } = useAnalysis();

  useEffect(() => {
    reloadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/dashboard" className="text-sm text-blue-500 hover:underline mb-2 inline-block">
              ← Volver al dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Historial de análisis</h1>
            <p className="text-gray-500 mt-1">
              {history.length > 0
                ? `${history.length} análisis realizados`
                : 'Aún no tienes análisis'}
            </p>
          </div>
          <Link to="/analysis/new">
            <Button>+ Nuevo análisis</Button>
          </Link>
        </div>

        {/* Lista */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : history.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center bg-white">
            <div className="text-5xl mb-4">📋</div>
            <p className="font-semibold text-gray-600 mb-1">No tienes análisis todavía</p>
            <p className="text-sm text-gray-400 mb-6">Empieza subiendo tu CV</p>
            <Link to="/analysis/new">
              <Button>Hacer mi primer análisis</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((a) => (
              <ResultCard
                key={a.id}
                analysis={a}
                onDelete={deleteAnalysis}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
