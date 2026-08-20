import type { ReactNode } from "react";

type BadgeVariant = "green" | "red" | "yellow" | "blue" | "gray" | "purple";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: "bg-sage-50 text-sage-800 border-sage-200",
  red: "bg-wine-50 text-wine-600 border-wine-100",
  yellow: "bg-gold-50 text-gold-700 border-gold-200",
  blue: "bg-sage-50 text-sage-800 border-sage-200",
  gray: "bg-ink/5 text-ink-600 border-ink/10",
  purple: "bg-gold-50 text-gold-700 border-gold-200",
};

export default function Badge({ children, variant = "gray", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide border",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
