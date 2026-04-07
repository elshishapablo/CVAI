import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from './Spinner';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  children:  ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-blue-500 hover:bg-blue-600 text-white shadow-sm',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
  ghost:     'hover:bg-gray-100 text-gray-700',
  outline:   'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'font-semibold rounded-xl transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50 cursor-not-allowed' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {loading && <Spinner size="sm" color="current" />}
      {children}
    </button>
  );
}
