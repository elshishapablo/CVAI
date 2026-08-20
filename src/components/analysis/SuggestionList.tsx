import type { SuggestionItem } from "../../types";

interface SuggestionListProps {
  suggestions: SuggestionItem[];
}

export default function SuggestionList({ suggestions }: SuggestionListProps) {
  if (!suggestions.length) {
    return <p className="text-sm text-ink-400">No hay sugerencias disponibles.</p>;
  }

  return (
    <div className="space-y-4">
      {suggestions.map((s, i) => (
        <div
          key={i}
          className="rounded-[1.2rem] border border-ink/10 overflow-hidden bg-white/50"
        >
          <div className="bg-ink px-4 py-2.5">
            <span className="text-[11px] tracking-[0.16em] uppercase text-gold-300">
              {s.section}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink/10">
            <div className="p-4 bg-wine-50/40">
              <p className="text-[11px] tracking-[0.14em] uppercase text-wine-600 mb-2">
                Ahora
              </p>
              <p className="text-sm text-ink-600 leading-relaxed">{s.original}</p>
            </div>

            <div className="p-4 bg-sage-50/60">
              <p className="text-[11px] tracking-[0.14em] uppercase text-sage-700 mb-2">
                Versión mejorada
              </p>
              <p className="text-sm text-ink leading-relaxed">{s.improved}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
