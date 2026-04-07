import type { SuggestionItem } from '../../types';

interface SuggestionListProps {
  suggestions: SuggestionItem[];
}

export default function SuggestionList({ suggestions }: SuggestionListProps) {
  if (!suggestions.length) {
    return <p className="text-sm text-gray-400">No hay sugerencias disponibles.</p>;
  }

  return (
    <div className="space-y-4">
      {suggestions.map((s, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Header de la sección */}
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
              {s.section}
            </span>
          </div>

          {/* Original vs Mejorado */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Original */}
            <div className="p-4">
              <p className="text-xs font-semibold text-red-500 mb-2 flex items-center gap-1">
                <span>✗</span> Como tienes ahora
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{s.original}</p>
            </div>

            {/* Mejorado */}
            <div className="p-4 bg-green-50/50">
              <p className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1">
                <span>✓</span> Versión mejorada (lista para copiar)
              </p>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">{s.improved}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
