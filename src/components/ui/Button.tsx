import type { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "./Spinner";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "btn-shine bg-ink text-paper hover:bg-ink-700 shadow-lift",
  secondary:
    "bg-paper-50 text-ink border border-ink/10 hover:border-ink/20 hover:bg-white",
  danger:
    "bg-wine-600 text-white hover:bg-wine-500 shadow-sm",
  ghost: "text-ink-500 hover:text-ink hover:bg-ink/5",
  outline:
    "border border-ink/20 text-ink hover:border-gold-500 hover:text-gold-700 bg-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-xs tracking-wide",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "font-medium rounded-full transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        isDisabled ? "opacity-45 cursor-not-allowed pointer-events-none" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading && <Spinner size="sm" color="current" />}
      {children}
    </button>
  );
}
