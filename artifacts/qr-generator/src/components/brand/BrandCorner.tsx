import type { CSSProperties } from 'react';

interface BrandCornerProps {
  size?: number;
  className?: string;
  opacity?: number;
  style?: CSSProperties;
}

export function BrandCorner({ size = 14, className, opacity = 0.35, style }: BrandCornerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="40" height="40" rx="6" fill="#1E293B" />
      <rect x="5" y="5" width="30" height="30" rx="3" fill="#FFFFFF" />
      <rect x="12" y="12" width="16" height="16" rx="3" fill="#2563EB" />
    </svg>
  );
}
