import type { CSSProperties } from "react";
import { SITE_NAME } from "@/lib/site";

/** Shared brand asset — single source of truth for logo path & aspect ratio */
export const LOGO_SRC = "/logo.png";
export const LOGO_ALT = SITE_NAME;
/** Square app icon (512×512) */
export const LOGO_ASPECT = 1;

export interface LogoMarkProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function LogoMark({ size = 56, className, style }: LogoMarkProps) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className ?? ""}`}
      style={{ width: size, height: size, ...style }}
    >
      <img
        src={LOGO_SRC}
        alt={LOGO_ALT}
        width={size}
        height={size}
        className="block w-full h-full object-contain object-center"
        draggable={false}
      />
    </span>
  );
}

export function Logo({ size = 56, className, style }: LogoMarkProps) {
  return <LogoMark size={size} className={className} style={style} />;
}
