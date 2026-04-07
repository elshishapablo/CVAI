import { Link } from 'react-router-dom';
import type { AnalysisListItem } from '../../types';
import ScoreGauge from './ScoreGauge';
import Button from '../ui/Button';

interface ResultCardProps {
  analysis:  AnalysisListItem;
  onDelete?: (id: number) => void;
}

export default function ResultCard({ analysis, onDelete }: ResultCardProps) {
  const date = new Date(analysis.createdAt).toLocaleDateString('es-ES', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-5 hover:border-blue-200 transition-all">
      {/* Score mini */}
      <div className="shrink-0">
        <ScoreGauge score={analysis.compatibilityScore} size="sm" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 truncate">{analysis.jobTitle}</p>
        {analysis.company && (
          <p className="text-sm text-gray-500 truncate">{analysis.company}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">{date}</p>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 shrink-0">
        <Link to={`/analysis/${analysis.id}`}>
          <Button variant="outline" size="sm">Ver</Button>
        </Link>
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-600 hover:bg-red-50"
            onClick={() => onDelete(analysis.id)}
          >
            Eliminar
          </Button>
        )}
      </div>
    </div>
  );
}
