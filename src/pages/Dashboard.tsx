import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useAnalysis } from "../hooks/useAnalysis";
import ResultCard from "../components/analysis/ResultCard";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { IconArrow, IconDoc, IconPlus, IconRefresh, IconStar } from "../components/ui/icons";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { history, loadHistory, reloadHistory, deleteAnalysis, loading } = useAnalysis();

  useEffect(() => {
    loadHistory();
  }, []);

  if (!user) return null;

  const isFreePlan = user.plan === "free";
  const usedCount = user.analysisUsedThisMonth;
  const limitReached = isFreePlan && usedCount >= 3;
  const recentAnalyses = history.slice(0, 5);

  return (
    <div className="relative px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold-700 mb-2">
              Panel
            </p>
            <h1 className="font-display text-4xl text-ink">
              Hola, {user.name.split(" ")[0]}.
            </h1>
            <p className="text-ink-500 mt-1">Tu taller de CVs, listo para la siguiente oferta.</p>
          </div>
          <Link to="/analysis/new">
            <Button size="lg">
              <IconPlus className="w-4 h-4" />
              Nuevo análisis
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <p className="text-[11px] tracking-[0.16em] uppercase text-ink-400 mb-2">Plan</p>
            <p className="font-display text-2xl text-ink flex items-center gap-2">
              {isFreePlan ? (
                "Gratuito"
              ) : (
                <>
                  <IconStar className="w-5 h-5 text-gold-500" /> Pro
                </>
              )}
            </p>
          </Card>

          <Card>
            <p className="text-[11px] tracking-[0.16em] uppercase text-ink-400 mb-2">
              Este mes
            </p>
            <p className="font-display text-2xl text-ink">
              {usedCount}
              {isFreePlan ? (
                <span className="text-ink-400 text-lg"> / 3</span>
              ) : (
                <span className="text-sage-600 text-lg"> · ∞</span>
              )}
            </p>
            {isFreePlan && (
              <div className="mt-3 h-1.5 bg-ink/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sage-700 to-gold-400 transition-all duration-700"
                  style={{ width: `${Math.min((usedCount / 3) * 100, 100)}%` }}
                />
              </div>
            )}
          </Card>

          <Card>
            <p className="text-[11px] tracking-[0.16em] uppercase text-ink-400 mb-2">Total</p>
            <p className="font-display text-2xl text-ink">{history.length}</p>
          </Card>
        </div>

        {isFreePlan && (
          <div className="relative overflow-hidden rounded-[1.5rem] bg-ink text-paper p-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="orb w-48 h-48 bg-gold-400/20 -right-8 -top-10" />
            <div className="relative">
              <p className="font-display text-xl mb-1">
                {limitReached ? "Has llegado al límite mensual" : "Pasa a Pro — $7/mes"}
              </p>
              <p className="text-paper/55 text-sm">
                {limitReached
                  ? "Actualiza a Pro para seguir analizando CVs sin techo."
                  : "Análisis ilimitados, historial completo y carta con IA."}
              </p>
            </div>
            <Link to="/pricing" className="relative shrink-0">
              <Button variant="secondary">
                Ver planes
                <IconArrow className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl text-ink">Recientes</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={reloadHistory}
                className="inline-flex items-center gap-1.5 text-[13px] text-ink-400 hover:text-ink transition-colors"
              >
                <IconRefresh className="w-4 h-4" />
                Actualizar
              </button>
              {history.length > 5 && (
                <Link
                  to="/history"
                  className="text-[13px] text-gold-700 hover:underline font-medium"
                >
                  Ver todo
                </Link>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : recentAnalyses.length === 0 ? (
            <div className="border border-dashed border-ink/15 rounded-[1.6rem] p-16 text-center bg-white/40">
              <span className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-ink text-gold-300 grid place-items-center">
                <IconDoc className="w-5 h-5" />
              </span>
              <p className="font-display text-xl text-ink mb-1">Aún no hay análisis</p>
              <p className="text-sm text-ink-400 mb-6">
                Sube tu CV y confrontalo con una oferta.
              </p>
              <Link to="/analysis/new">
                <Button>Hacer mi primer análisis</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAnalyses.map((a) => (
                <ResultCard key={a.id} analysis={a} onDelete={deleteAnalysis} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
