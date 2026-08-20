type IconProps = { className?: string };

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconSpark({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M12 3.2 13.6 9 19.5 10.5 13.6 12l-1.6 5.8L10.4 12 4.5 10.5 10.4 9 12 3.2Z" />
    </svg>
  );
}

export function IconDoc({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M8 3.8h6.2L18.2 8v12.2A1.8 1.8 0 0 1 16.4 22H8a1.8 1.8 0 0 1-1.8-1.8V5.6A1.8 1.8 0 0 1 8 3.8Z" />
      <path d="M14 3.8V8h4.2M9.2 13h6.2M9.2 16.5H13" />
    </svg>
  );
}

export function IconBriefcase({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <rect x="3.2" y="8" width="17.6" height="12.2" rx="2" />
      <path d="M8.2 8V6.4A1.6 1.6 0 0 1 9.8 4.8h4.4A1.6 1.6 0 0 1 15.8 6.4V8M3.2 13.2h17.6" />
    </svg>
  );
}

export function IconChart({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M4 19.5V5.5M4 19.5h16" />
      <path d="M8.2 15.2v-4.4M12 15.2V8.6M15.8 15.2v-7" />
    </svg>
  );
}

export function IconKey({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <circle cx="8.2" cy="12" r="3.4" />
      <path d="M11.4 12H20v2.4M16.4 12v2.4" />
    </svg>
  );
}

export function IconMail({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <rect x="3.4" y="5.5" width="17.2" height="13" rx="2" />
      <path d="m4 7.2 8 6.2 8-6.2" />
    </svg>
  );
}

export function IconCheck({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="m5 12.4 5 5 9-10.2" />
    </svg>
  );
}

export function IconArrow({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconUpload({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M12 16.5V6.2M8 9.4 12 5.5 16 9.4" />
      <path d="M5 16.8v1.8A1.8 1.8 0 0 0 6.8 20.4h10.4a1.8 1.8 0 0 0 1.8-1.8v-1.8" />
    </svg>
  );
}

export function IconMenu({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M4.5 7h15M4.5 12h15M4.5 17h15" />
    </svg>
  );
}

export function IconClose({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconStar({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="m12 3.5 2.4 5.4 5.8.6-4.4 3.9 1.3 5.7L12 16.4 6.9 19.1l1.3-5.7-4.4-3.9 5.8-.6L12 3.5Z" />
    </svg>
  );
}

export function IconTrash({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M5 7.2h14M9.2 7.2V5.4A1.4 1.4 0 0 1 10.6 4h2.8a1.4 1.4 0 0 1 1.4 1.4v1.8M8 7.2 8.7 19a1.6 1.6 0 0 0 1.6 1.4h3.4A1.6 1.6 0 0 0 15.3 19L16 7.2" />
    </svg>
  );
}

export function IconCopy({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <rect x="8.2" y="8.2" width="11.2" height="11.2" rx="1.6" />
      <path d="M6.4 15.6H5.6A1.6 1.6 0 0 1 4 14V5.6A1.6 1.6 0 0 1 5.6 4H14a1.6 1.6 0 0 1 1.6 1.6v.8" />
    </svg>
  );
}

export function IconAlert({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M12 4.2 3.6 19.2h16.8L12 4.2Z" />
      <path d="M12 10v4.2M12 16.8v.2" />
    </svg>
  );
}

export function IconRefresh({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M19.4 12A7.4 7.4 0 1 1 16 6.2l2.2 1.4" />
      <path d="M18.2 4.2v3.6h-3.6" />
    </svg>
  );
}

export function IconLogout({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M10 4.8H6.4A1.6 1.6 0 0 0 4.8 6.4v11.2A1.6 1.6 0 0 0 6.4 19.2H10M10 12h9.2M15.4 8.2 19.2 12l-3.8 3.8" />
    </svg>
  );
}

export function IconPlus({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  );
}
