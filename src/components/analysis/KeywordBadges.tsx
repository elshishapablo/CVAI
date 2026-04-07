interface KeywordBadgesProps {
  presentKeywords: string[];
  missingKeywords: string[];
}

export default function KeywordBadges({ presentKeywords, missingKeywords }: KeywordBadgesProps) {
  return (
    <div className="space-y-6">
      {/* Keywords encontradas */}
      {presentKeywords.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Keywords encontradas en tu CV ({presentKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {presentKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200"
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Keywords faltantes */}
      {missingKeywords.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-red-500">✗</span>
            Keywords que deberías incluir ({missingKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 border border-red-200"
              >
                ✗ {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {presentKeywords.length === 0 && missingKeywords.length === 0 && (
        <p className="text-sm text-gray-400">No se identificaron keywords en este análisis.</p>
      )}
    </div>
  );
}
