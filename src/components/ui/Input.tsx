import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:    string;
  error?:    string;
  hint?:     string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?:  string;
}

const baseClasses = [
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900',
  'placeholder:text-gray-400',
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  'transition duration-150',
  'disabled:bg-gray-50 disabled:text-gray-400',
].join(' ');

const errorClasses = 'border-red-400 focus:ring-red-400';

export function Input({ label, error, hint, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <input
        className={`${baseClasses} ${error ? errorClasses : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function Textarea({ label, error, hint, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <textarea
        className={`${baseClasses} resize-none ${error ? errorClasses : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
