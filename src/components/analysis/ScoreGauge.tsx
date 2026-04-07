import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

function getColor(score: number): string {
  if (score >= 71) return '#22c55e';  // verde
  if (score >= 41) return '#f59e0b';  // amarillo
  return '#ef4444';                   // rojo
}

function getLabel(score: number): string {
  if (score >= 71) return 'Alta compatibilidad';
  if (score >= 41) return 'Compatibilidad media';
  return 'Baja compatibilidad';
}

const containerSizes = {
  sm: 'w-28 h-28',
  md: 'w-40 h-40',
  lg: 'w-52 h-52',
};

const scoreSizes = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-5xl',
};

export default function ScoreGauge({ score, size = 'lg' }: ScoreGaugeProps) {
  const color = getColor(score);
  const data  = [{ value: score, fill: color }];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${containerSizes[size]}`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%" cy="50%"
            innerRadius="65%" outerRadius="100%"
            data={data}
            startAngle={90} endAngle={-270}
          >
            <RadialBar
              dataKey="value"
              background={{ fill: '#f3f4f6' }}
              cornerRadius={8}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Score centrado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-extrabold leading-none ${scoreSizes[size]}`} style={{ color }}>
            {score}
          </span>
          <span className="text-xs text-gray-400 font-medium">/100</span>
        </div>
      </div>

      <span className="text-sm font-semibold" style={{ color }}>
        {getLabel(score)}
      </span>
    </div>
  );
}
