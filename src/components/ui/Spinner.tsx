interface SpinnerProps {
  size?:  'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'gray' | 'current';
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const colors = {
  blue:    'text-blue-500',
  white:   'text-white',
  gray:    'text-gray-400',
  current: 'text-current',
};

export default function Spinner({ size = 'md', color = 'blue' }: SpinnerProps) {
  return (
    <svg
      className={`animate-spin ${sizes[size]} ${colors[color]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Cargando..."
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
