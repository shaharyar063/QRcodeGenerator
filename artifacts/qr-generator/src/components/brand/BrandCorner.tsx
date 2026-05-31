import type { CSSProperties } from "react";
import { LogoMark } from "@/components/brand/Logo";

interface BrandCornerProps {
  size?: number;
  className?: string;
  opacity?: number;
  style?: CSSProperties;
}

export function BrandCorner({ size = 14, className, opacity = 0.35, style }: BrandCornerProps) {
  return (
    <LogoMark
      size={size}
      className={className}
      style={{ opacity, ...style }}
    />
  );
}
