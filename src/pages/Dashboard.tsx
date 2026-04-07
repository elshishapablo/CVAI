import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAnalysis } from '../hooks/useAnalysis';
import ResultCard from '../components/analysis/ResultCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

export default function Dashboard() {
  const { user }           = useAuthStore();
  const { history, loadHistory, reloadHistory, deleteAnalysis, loading } = useAnalysis();

  useEffect(() => {
    loadHistory();
  }, []);

  if (!user) return null;

  const isFreePlan   = user.plan === 'free';
  const usedCount    = user.analysisUsedThisMonth;
  const limitReached = isFreePlan && usedCount >= 3;

  // Mostrar solo los últimos 5 en el dashboard
  const recentAnalyses = history.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hola, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-500 mt-1">Tu panel de control de CVMatch AI</p>
          </div>
          <Link to="/analysis/new">
            <Button size="lg" className="shadow-md shadow-blue-200">
              + Nuevo análisis
            </Button>
          </Link>
        </div>

        {/* ── STATS ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Plan actual</p>
            <p className="text-2xl font-bold text-gray-900">
              {isFreePlan ? '🆓 Gratuito' : '⭐ Pro'}
            </p>
          </Card>

          <Card>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Análisis este mes</p>
            <p className="text-2xl font-bold text-gray-900">
              {usedCount}
              {isFreePlan
                ? <span className="text-gray-400 text-lg">/3</span>
                : <span className="text-blue-400 text-lg"> ∞</span>
              }
            </p>
            {isFreePlan && (
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${(usedCount / 3) * 100}%` }}
                />
              </div>
            )}
          </Card>

          <Card>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total de análisis</p>
            <p className="text-2xl font-bold text-gray-900">{history.length}</p>
          </Card>
        </div>

        {/* ── BANNER UPGRADE ──────────────────────────────────────── */}
        {isFreePlan && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-lg mb-1">
                {limitReached ? '⚠️ Has llegado a tu límite mensual' : '🚀 Actualiza a Pro por $7/mes'}
              </p>
              <p className="text-blue-100 text-sm">
                {limitReached
                  ? 'Actualiza a Pro para seguir analizando CVs sin límite.'
                  : 'Análisis ilimitados, historial completo y carta de presentación con IA.'}
              </p>
            </div>
            <Link to="/pricing">
              <Button variant="secondary" className="whitespace-nowrap">
                Ver planes →
              </Button>
            </Link>
          </div>
        )}

        {/* ── ANÁLISIS RECIENTES ──────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Análisis recientes</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={reloadHistory}
                className="text-sm text-gray-400 hover:text-blue-500 transition-colors"
              >
                ↺ Actualizar
              </button>
              {history.length > 5 && (
                <Link to="/history" className="text-sm text-blue-500 hover:underline font-medium">
                  Ver historial completo →
                </Link>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : recentAnalyses.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center">
              <div className="text-5xl mb-4">📄</div>
              <p className="font-semibold text-gray-600 mb-1">Aún no tienes análisis</p>
              <p className="text-sm text-gray-400 mb-6">Sube tu CV y compáralo con una oferta de trabajo</p>
              <Link to="/analysis/new">
                <Button>Hacer mi primer análisis</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAnalyses.map((a) => (
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
    </div>
  );
}
