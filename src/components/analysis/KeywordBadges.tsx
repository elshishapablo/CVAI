interface KeywordBadgesProps {
  presentKeywords: string[];
  missingKeywords: string[];
}

export default function KeywordBadges({
  presentKeywords,
  missingKeywords,
}: KeywordBadgesProps) {
  return (
    <div className="space-y-8">
      {presentKeywords.length > 0 && (
        <div>
          <h4 className="text-[11px] tracking-[0.16em] uppercase text-sage-700 mb-3">
            En tu CV · {presentKeywords.length}
          </h4>
          <div className="flex flex-wrap gap-2">
            {presentKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-50 text-sage-800 border border-sage-100"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {missingKeywords.length > 0 && (
        <div>
          <h4 className="text-[11px] tracking-[0.16em] uppercase text-wine-600 mb-3">
            Deberías incluir · {missingKeywords.length}
          </h4>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-wine-50 text-wine-600 border border-wine-100"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {presentKeywords.length === 0 && missingKeywords.length === 0 && (
        <p className="text-sm text-ink-400">
          No se identificaron keywords en este análisis.
        </p>
      )}
    </div>
  );
}
