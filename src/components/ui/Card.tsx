import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({ children, className = "", padding = "md" }: CardProps) {
  return (
    <div
      className={[
        "bg-white/75 backdrop-blur-sm rounded-[1.4rem] border border-ink/10",
        "shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_18px_40px_-28px_rgba(22,19,16,0.28)]",
        paddingClasses[padding],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
