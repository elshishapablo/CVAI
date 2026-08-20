import { Link } from "react-router-dom";
import type { AnalysisListItem } from "../../types";
import ScoreGauge from "./ScoreGauge";
import Button from "../ui/Button";
import { IconTrash } from "../ui/icons";

interface ResultCardProps {
  analysis: AnalysisListItem;
  onDelete?: (id: number) => void;
}

export default function ResultCard({ analysis, onDelete }: ResultCardProps) {
  const date = new Date(analysis.createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card-hover bg-white/75 rounded-[1.35rem] border border-ink/10 p-5 flex items-center gap-5 hairline">
      <div className="shrink-0">
        <ScoreGauge score={analysis.compatibilityScore} size="sm" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-display text-lg text-ink truncate">{analysis.jobTitle}</p>
        {analysis.company && (
          <p className="text-sm text-ink-500 truncate">{analysis.company}</p>
        )}
        <p className="text-[11px] tracking-wide uppercase text-ink-400 mt-1">{date}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link to={`/analysis/${analysis.id}`}>
          <Button variant="outline" size="sm">
            Ver
          </Button>
        </Link>
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="text-ink-400 hover:text-wine-600 hover:bg-wine-50"
            onClick={() => onDelete(analysis.id)}
            aria-label="Eliminar"
          >
            <IconTrash className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
