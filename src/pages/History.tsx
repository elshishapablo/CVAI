import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAnalysis } from "../hooks/useAnalysis";
import ResultCard from "../components/analysis/ResultCard";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { IconArrow, IconDoc, IconPlus } from "../components/ui/icons";

export default function History() {
  const { history, reloadHistory, deleteAnalysis, loading } = useAnalysis();

  useEffect(() => {
    reloadHistory();
  }, []);

  return (
    <div className="relative px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-ink mb-4 transition-colors"
            >
              <span className="rotate-180 inline-flex">
                <IconArrow className="w-4 h-4" />
              </span>
              Dashboard
            </Link>
            <h1 className="font-display text-4xl text-ink">Historial</h1>
            <p className="text-ink-500 mt-1">
              {history.length > 0
                ? `${history.length} análisis realizados`
                : "Aún no tienes análisis"}
            </p>
          </div>
          <Link to="/analysis/new">
            <Button>
              <IconPlus className="w-4 h-4" />
              Nuevo análisis
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : history.length === 0 ? (
          <div className="border border-dashed border-ink/15 rounded-[1.6rem] p-16 text-center bg-white/40">
            <span className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-ink text-gold-300 grid place-items-center">
              <IconDoc className="w-5 h-5" />
            </span>
            <p className="font-display text-xl text-ink mb-1">Vacío, por ahora</p>
            <p className="text-sm text-ink-400 mb-6">Empieza subiendo tu CV</p>
            <Link to="/analysis/new">
              <Button>Hacer mi primer análisis</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((a) => (
              <ResultCard key={a.id} analysis={a} onDelete={deleteAnalysis} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
