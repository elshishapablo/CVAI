import type { ReactNode } from "react";
import { useEffect } from "react";
import { IconClose } from "./icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      <div
        className={[
          "relative w-full bg-paper-50 rounded-[1.6rem] border border-white/60 shadow-lift p-6 animate-scale-in",
          maxWidthClasses[maxWidth],
        ].join(" ")}
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 grid place-items-center rounded-full text-ink-400 hover:text-ink hover:bg-ink/5 transition"
              aria-label="Cerrar"
            >
              <IconClose className="w-4 h-4" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
