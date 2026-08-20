import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAnalysis } from "../hooks/useAnalysis";
import ScoreGauge from "../components/analysis/ScoreGauge";
import KeywordBadges from "../components/analysis/KeywordBadges";
import SuggestionList from "../components/analysis/SuggestionList";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import {
  IconAlert,
  IconArrow,
  IconChart,
  IconCheck,
  IconCopy,
  IconKey,
  IconMail,
  IconPlus,
  IconSpark,
} from "../components/ui/icons";

type TabId = "fortalezas" | "debilidades" | "keywords" | "sugerencias" | "carta";

const tabs: { id: TabId; label: string; icon: typeof IconCheck }[] = [
  { id: "fortalezas", label: "Fortalezas", icon: IconCheck },
  { id: "debilidades", label: "Áreas de mejora", icon: IconAlert },
  { id: "keywords", label: "Keywords", icon: IconKey },
  { id: "sugerencias", label: "Sugerencias", icon: IconSpark },
  { id: "carta", label: "Carta", icon: IconMail },
];

export default function AnalysisResult() {
  const { id } = useParams<{ id: string }>();
  const { currentAnalysis, loadAnalysis, loading, error } = useAnalysis();
  const [activeTab, setActiveTab] = useState<TabId>("fortalezas");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) loadAnalysis(Number(id));
  }, [id]);

  const handleCopy = async () => {
    if (!currentAnalysis?.result.coverLetterIntro) return;
    await navigator.clipboard.writeText(currentAnalysis.result.coverLetterIntro);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="text-ink-400 mt-4 text-sm">Cargando análisis...</p>
        </div>
      </div>
    );

  if (error || !currentAnalysis)
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <span className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-wine-50 text-wine-600 grid place-items-center">
            <IconAlert className="w-5 h-5" />
          </span>
          <p className="text-wine-600 mb-4">{error ?? "Análisis no encontrado"}</p>
          <Link to="/dashboard">
            <Button variant="outline">Volver al dashboard</Button>
          </Link>
        </div>
      </div>
    );

  const { result } = currentAnalysis;

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
            <h1 className="font-display text-3xl text-ink">{currentAnalysis.jobTitle}</h1>
            {currentAnalysis.company && (
              <p className="text-ink-500 text-sm mt-0.5">{currentAnalysis.company}</p>
            )}
            <p className="text-ink-400 text-xs mt-2 tracking-wide">
              {new Date(currentAnalysis.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Link to="/analysis/new">
            <Button size="sm">
              <IconPlus className="w-3.5 h-3.5" />
              Nuevo
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <ScoreGauge score={result.compatibilityScore} size="lg" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] tracking-[0.18em] uppercase text-gold-700 mb-2 inline-flex items-center gap-1.5">
                <IconChart className="w-3.5 h-3.5" />
                Resumen
              </p>
              <p className="text-ink-600 leading-relaxed">{result.summary}</p>
            </div>
          </div>
        </Card>

        <Card padding="none">
          <div className="flex overflow-x-auto gap-1 p-2 border-b border-ink/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "flex items-center gap-1.5 px-3.5 py-2 text-[13px] whitespace-nowrap rounded-full transition-all",
                    active
                      ? "bg-ink text-paper shadow-lift"
                      : "text-ink-500 hover:text-ink hover:bg-ink/5",
                  ].join(" ")}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === "fortalezas" && (
              <ul className="space-y-3">
                {result.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl bg-sage-50/70 border border-sage-100 px-4 py-3"
                  >
                    <IconCheck className="mt-0.5 w-4 h-4 text-sage-700 shrink-0" />
                    <span className="text-ink-700 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
                {result.strengths.length === 0 && (
                  <p className="text-ink-400 text-sm">No se identificaron fortalezas.</p>
                )}
              </ul>
            )}

            {activeTab === "debilidades" && (
              <ul className="space-y-3">
                {result.weaknesses.map((w, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl bg-gold-50/80 border border-gold-100 px-4 py-3"
                  >
                    <IconAlert className="mt-0.5 w-4 h-4 text-gold-700 shrink-0" />
                    <span className="text-ink-700 text-sm leading-relaxed">{w}</span>
                  </li>
                ))}
                {result.weaknesses.length === 0 && (
                  <p className="text-ink-400 text-sm">No se identificaron debilidades.</p>
                )}
              </ul>
            )}

            {activeTab === "keywords" && (
              <KeywordBadges
                presentKeywords={result.presentKeywords}
                missingKeywords={result.missingKeywords}
              />
            )}

            {activeTab === "sugerencias" && (
              <SuggestionList suggestions={result.suggestions} />
            )}

            {activeTab === "carta" && (
              <div>
                <div className="flex items-center justify-between mb-4 gap-3">
                  <h3 className="font-display text-lg text-ink">Primer párrafo</h3>
                  <Button variant="secondary" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <IconCheck className="w-3.5 h-3.5" />
                    ) : (
                      <IconCopy className="w-3.5 h-3.5" />
                    )}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                </div>
                <div className="bg-ink text-paper rounded-[1.3rem] p-6 relative overflow-hidden">
                  <div className="orb w-40 h-40 bg-gold-400/20 -top-10 -right-6" />
                  <p className="relative font-display text-lg leading-relaxed italic text-paper/90">
                    “{result.coverLetterIntro}”
                  </p>
                </div>
                <p className="text-xs text-ink-400 mt-3">
                  Personalizado para el cargo de{" "}
                  <strong className="text-ink-600">{currentAnalysis.jobTitle}</strong>.
                  Cópialo y úsalo como base de tu carta.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
