import type { ReactNode } from 'react';

interface CardProps {
  children:  ReactNode;
  className?: string;
  padding?:  'sm' | 'md' | 'lg' | 'none';
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
};

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-2xl border border-gray-200 shadow-sm',
        paddingClasses[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
