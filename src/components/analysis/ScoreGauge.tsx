import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

function getColor(score: number): string {
  if (score >= 71) return "#216660";
  if (score >= 41) return "#b07f38";
  return "#b54a4a";
}

function getLabel(score: number): string {
  if (score >= 71) return "Alta compatibilidad";
  if (score >= 41) return "Compatibilidad media";
  return "Baja compatibilidad";
}

const containerSizes = {
  sm: "w-24 h-24",
  md: "w-40 h-40",
  lg: "w-52 h-52",
};

const scoreSizes = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
};

export default function ScoreGauge({ score, size = "lg" }: ScoreGaugeProps) {
  const color = getColor(score);
  const data = [{ value: score, fill: color }];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${containerSizes[size]}`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="68%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              dataKey="value"
              background={{ fill: "#ece8e2" }}
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-display font-semibold leading-none ${scoreSizes[size]}`}
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-[10px] tracking-wide uppercase text-ink-400">/100</span>
        </div>
      </div>

      {size !== "sm" && (
        <span className="text-sm font-medium" style={{ color }}>
          {getLabel(score)}
        </span>
      )}
    </div>
  );
}
