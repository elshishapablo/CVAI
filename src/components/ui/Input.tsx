import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const baseClasses = [
  "w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink",
  "placeholder:text-ink-400/70",
  "shadow-inset backdrop-blur-sm",
  "focus:outline-none focus:ring-2 focus:ring-gold-400/70 focus:border-gold-400/40",
  "transition duration-300",
  "disabled:bg-paper-100 disabled:text-ink-400",
].join(" ");

const errorClasses = "border-wine-500/50 focus:ring-wine-500/40";

export function Input({ label, error, hint, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[13px] font-medium text-ink-600 tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${error ? errorClasses : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-wine-600">{error}</p>}
      {hint && !error && <p className="text-xs text-ink-400">{hint}</p>}
    </div>
  );
}

export function Textarea({ label, error, hint, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[13px] font-medium text-ink-600 tracking-wide">
          {label}
        </label>
      )}
      <textarea
        className={`${baseClasses} resize-none ${error ? errorClasses : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-wine-600">{error}</p>}
      {hint && !error && <p className="text-xs text-ink-400">{hint}</p>}
    </div>
  );
}
