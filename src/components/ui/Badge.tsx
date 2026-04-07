import type { ReactNode } from 'react';

type BadgeVariant = 'green' | 'red' | 'yellow' | 'blue' | 'gray' | 'purple';

interface BadgeProps {
  children:  ReactNode;
  variant?:  BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green:  'bg-green-100 text-green-700 border border-green-200',
  red:    'bg-red-100 text-red-700 border border-red-200',
  yellow: 'bg-amber-100 text-amber-700 border border-amber-200',
  blue:   'bg-blue-100 text-blue-700 border border-blue-200',
  gray:   'bg-gray-100 text-gray-600 border border-gray-200',
  purple: 'bg-purple-100 text-purple-700 border border-purple-200',
};

export default function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
