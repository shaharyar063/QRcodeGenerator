import { useEffect, useState } from "react";
import { useQRCode } from "@/hooks/useQRCode";
import { scaleQrMargin } from "@/lib/qr-preview-utils";
import { cn } from "@/lib/utils";
import type { QRSettings } from "@/data/qr-design-presets";

interface QRCodeDisplayProps {
  data: string;
  settings: QRSettings;
  size?: number;
  className?: string;
  bordered?: boolean;
}

export function QRCodeDisplay({
  data,
  settings,
  size = 240,
  className,
  bordered = true,
}: QRCodeDisplayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const userMargin = settings.margin ?? 10;
  const renderSize = Math.min(size * 2, 512);
  const scaledMargin = scaleQrMargin(userMargin, renderSize);

  const previewOptions = {
    ...settings,
    data,
    width: renderSize,
    height: renderSize,
    margin: scaledMargin,
  };

  const { ref } = useQRCode(previewOptions as Parameters<typeof useQRCode>[0]);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 120);
    return () => clearTimeout(t);
  }, [data, settings, size]);

  return (
    <div
      className={cn(
        "relative bg-white flex items-center justify-center overflow-hidden",
        bordered && "rounded-2xl border border-border/70 shadow-sm",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <div
        ref={ref}
        style={{ width: "88%", height: "88%" }}
        className={cn(
          "[&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!object-contain",
          "[&_svg]:!w-full [&_svg]:!h-full",
          "flex items-center justify-center transition-opacity duration-200",
          isLoading ? "opacity-0" : "opacity-100",
        )}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
