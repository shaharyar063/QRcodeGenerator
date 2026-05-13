interface LogoMarkProps {
  size?: number;
  className?: string;
}

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  wordmarkClass?: string;
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top-left finder square */}
      <rect x="0" y="0" width="40" height="40" rx="6" fill="#1E293B" />
      <rect x="5" y="5" width="30" height="30" rx="3" fill="#FFFFFF" />
      <rect x="12" y="12" width="16" height="16" rx="3" fill="#2563EB" />

      {/* Top-right finder square */}
      <rect x="60" y="0" width="40" height="40" rx="6" fill="#1E293B" />
      <rect x="65" y="5" width="30" height="30" rx="3" fill="#FFFFFF" />
      <rect x="72" y="12" width="16" height="16" rx="3" fill="#2563EB" />

      {/* Bottom-center finder square */}
      <rect x="30" y="60" width="40" height="40" rx="6" fill="#1E293B" />
      <rect x="35" y="65" width="30" height="30" rx="3" fill="#FFFFFF" />
      <rect x="42" y="72" width="16" height="16" rx="3" fill="#2563EB" />
    </svg>
  );
}

export function Logo({
  size = 32,
  showWordmark = true,
  className,
  wordmarkClass,
}: LogoProps) {
  const fontSize = Math.round(size * 0.55);
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className={`font-extrabold tracking-tight leading-none select-none ${wordmarkClass ?? ""}`}
          style={{ fontSize }}
        >
          <span className="text-primary">QR</span>
          <span className="text-foreground">Generator</span>
        </span>
      )}
    </div>
  );
}
