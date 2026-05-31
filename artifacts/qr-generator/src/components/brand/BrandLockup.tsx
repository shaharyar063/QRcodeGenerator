import { LogoMark } from "@/components/brand/Logo";
import { SITE_DOMAIN, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  logoSize?: number;
  className?: string;
  /** Hide domain line (e.g. very tight spaces) */
  hideDomain?: boolean;
}

export function BrandLockup({
  logoSize = 40,
  className,
  hideDomain = false,
}: BrandLockupProps) {
  return (
    <div className={cn("flex items-center gap-2.5 min-w-0", className)}>
      <LogoMark size={logoSize} />
      <div className="flex flex-col min-w-0 leading-none">
        <span className="font-semibold text-[15px] sm:text-base text-foreground tracking-tight truncate">
          {SITE_NAME}
        </span>
        {!hideDomain && (
          <span className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground truncate">
            {SITE_DOMAIN}
          </span>
        )}
      </div>
    </div>
  );
}
