import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnalysis } from '../hooks/useAnalysis';
import ScoreGauge from '../components/analysis/ScoreGauge';
import KeywordBadges from '../components/analysis/KeywordBadges';
import SuggestionList from '../components/analysis/SuggestionList';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

type TabId = 'fortalezas' | 'debilidades' | 'keywords' | 'sugerencias' | 'carta';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'fortalezas',  label: 'Fortalezas',   icon: '💪' },
  { id: 'debilidades', label: 'Áreas mejora',  icon: '⚠️' },
  { id: 'keywords',    label: 'Keywords',      icon: '🔑' },
  { id: 'sugerencias', label: 'Sugerencias',   icon: '💡' },
  { id: 'carta',       label: 'Carta',         icon: '✉️' },
];

export default function AnalysisResult() {
  const { id }                              = useParams<{ id: string }>();
  const { currentAnalysis, loadAnalysis, loading, error } = useAnalysis();
  const [activeTab, setActiveTab]           = useState<TabId>('fortalezas');
  const [copied, setCopied]                 = useState(false);

  useEffect(() => {
    if (id) loadAnalysis(Number(id));
  }, [id]);

  const handleCopy = async () => {
    if (!currentAnalysis?.result.coverLetterIntro) return;
    await navigator.clipboard.writeText(currentAnalysis.result.coverLetterIntro);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-gray-500 mt-4">Cargando análisis...</p>
      </div>
    </div>
  );

  if (error || !currentAnalysis) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-red-600 mb-4">{error ?? 'Análisis no encontrado'}</p>
        <Link to="/dashboard"><Button variant="outline">Volver al dashboard</Button></Link>
      </div>
    </div>
  );

  const { result } = currentAnalysis;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <Link to="/dashboard" className="text-sm text-blue-500 hover:underline mb-2 inline-block">
              ← Volver al dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{currentAnalysis.jobTitle}</h1>
            {currentAnalysis.company && (
              <p className="text-gray-500 text-sm mt-0.5">{currentAnalysis.company}</p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              {new Date(currentAnalysis.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          </div>
          <Link to="/analysis/new">
            <Button size="sm">+ Nuevo análisis</Button>
          </Link>
        </div>

        {/* ── SCORE + RESUMEN ─────────────────────────────────────── */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <ScoreGauge score={result.compatibilityScore} size="lg" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Resumen ejecutivo</h2>
              <p className="text-gray-600 leading-relaxed">{result.summary}</p>
            </div>
          </div>
        </Card>

        {/* ── TABS ────────────────────────────────────────────────── */}
        <Card padding="none">
          {/* Tab headers */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium whitespace-nowrap',
                  'border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700',
                ].join(' ')}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">

            {/* FORTALEZAS */}
            {activeTab === 'fortalezas' && (
              <ul className="space-y-3">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-green-500 font-bold shrink-0">✓</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
                {result.strengths.length === 0 && (
                  <p className="text-gray-400 text-sm">No se identificaron fortalezas.</p>
                )}
              </ul>
            )}

            {/* DEBILIDADES */}
            {activeTab === 'debilidades' && (
              <ul className="space-y-3">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-amber-500 font-bold shrink-0">⚠</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{w}</span>
                  </li>
                ))}
                {result.weaknesses.length === 0 && (
                  <p className="text-gray-400 text-sm">No se identificaron debilidades.</p>
                )}
              </ul>
            )}

            {/* KEYWORDS */}
            {activeTab === 'keywords' && (
              <KeywordBadges
                presentKeywords={result.presentKeywords}
                missingKeywords={result.missingKeywords}
              />
            )}

            {/* SUGERENCIAS */}
            {activeTab === 'sugerencias' && (
              <SuggestionList suggestions={result.suggestions} />
            )}

            {/* CARTA DE PRESENTACIÓN */}
            {activeTab === 'carta' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Primer párrafo de carta de presentación
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopy}
                  >
                    {copied ? '✓ Copiado' : '📋 Copiar'}
                  </Button>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed italic">
                    "{result.coverLetterIntro}"
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Este párrafo está personalizado para el cargo de{' '}
                  <strong>{currentAnalysis.jobTitle}</strong>.
                  Cópialo y úsalo como base de tu carta de presentación.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
