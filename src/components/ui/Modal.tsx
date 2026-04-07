import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen:    boolean;
  onClose:   () => void;
  title?:    string;
  children:  ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}: ModalProps) {
  // Cerrar con ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Contenido */}
      <div
        className={[
          'relative w-full bg-white rounded-2xl shadow-xl p-6',
          maxWidthClasses[maxWidth],
        ].join(' ')}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
