import { Link } from "react-router-dom";

interface LogoProps {
  to?: string;
  size?: "sm" | "md";
  inverted?: boolean;
}

export default function Logo({ to = "/", size = "md", inverted = false }: LogoProps) {
  const mark = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const type = size === "sm" ? "text-[15px]" : "text-lg";
  const ink = inverted ? "text-paper" : "text-ink";
  const gold = inverted ? "text-gold-300" : "text-gold-600";

  const inner = (
    <span className="inline-flex items-center gap-2.5 group">
      <span
        className={`${mark} relative grid place-items-center rounded-xl overflow-hidden ${
          inverted
            ? "bg-white/10 ring-1 ring-gold-400/40"
            : "bg-ink shadow-lift"
        }`}
      >
        <span className="absolute inset-0 bg-gradient-to-br from-gold-400/30 to-transparent" />
        <span className="relative font-display text-[11px] font-semibold tracking-wide text-gold-300">
          CV
        </span>
      </span>
      <span className={`font-display font-semibold ${type} ${ink} tracking-tight`}>
        CVMatch{" "}
        <em className={`${gold} italic font-medium`}>AI</em>
      </span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-xl">
        {inner}
      </Link>
    );
  }

  return inner;
}
