import { useEffect, useState } from "react";
import { useQRCode } from "@/hooks/useQRCode";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import { scaleQrMargin } from "@/lib/qr-preview-utils";
import { QRCodeDisplay } from "./QRCodeDisplay";
import type { QRSettings } from "@/data/qr-design-presets";

interface QRPreviewProps {
  data: string;
  settings: QRSettings;
  variant?: "default" | "hero";
  downloadSize: number;
  onDownloadSizeChange: (size: number) => void;
  onCustomize?: () => void;
}

const SIZE_PRESETS = [512, 1024, 1500, 2000] as const;

export function QRPreview({
  data,
  settings,
  variant = "default",
  downloadSize,
  onDownloadSizeChange,
  onCustomize,
}: QRPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const isHero = variant === "hero";

  const displaySize = isHero ? 260 : Math.min(Math.max(settings.width ?? 280, 180), 360);
  const userMargin = settings.margin ?? 10;
  const canvasRenderSize = Math.min(downloadSize, 1024);
  const scaledPreviewMargin = scaleQrMargin(userMargin, canvasRenderSize);

  const previewOptions = {
    ...settings,
    data,
    width: canvasRenderSize,
    height: canvasRenderSize,
    margin: scaledPreviewMargin,
  };

  const { ref, download } = useQRCode(previewOptions as Parameters<typeof useQRCode>[0]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = (ext: "png" | "svg" | "jpeg") => {
    if (ext === "svg") {
      download("svg", undefined, { margin: scaleQrMargin(userMargin, 512) });
    } else {
      download(ext, downloadSize, { margin: scaleQrMargin(userMargin, downloadSize) });
    }
  };

  if (isHero) {
    return (
      <div className="widget_output w-full flex flex-col items-center gap-3">
        <QRCodeDisplay data={data} settings={settings} size={displaySize} />

        <div className="w-full max-w-[280px] space-y-2">
          <div className="flex flex-wrap justify-center gap-1.5">
            {SIZE_PRESETS.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onDownloadSizeChange(size)}
                className={cn(
                  "rounded-md border px-2 py-0.5 text-[10px] font-medium transition-colors",
                  downloadSize === size
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40",
                )}
              >
                {size}px
              </button>
            ))}
          </div>
        </div>

        <div
          id="widget_output_utility_btn"
          className="w-full max-w-[280px] flex gap-2"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="flex-1 h-12 gap-2 font-semibold rounded-xl"
                data-testid="button-download-png"
              >
                <Download className="w-4 h-4 shrink-0" />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-40">
              <DropdownMenuItem onClick={() => handleDownload("png")}>PNG</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("svg")}>SVG</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("jpeg")}>JPEG</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {onCustomize && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-12 gap-2 font-semibold rounded-xl border-border"
              onClick={onCustomize}
            >
              <Paintbrush className="w-4 h-4 shrink-0" />
              Customize
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 w-full text-center">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Live Preview
        </h3>
      </div>

      <div
        className="relative bg-white rounded-xl border flex items-center justify-center mb-5 overflow-hidden"
        style={{ width: displaySize, height: displaySize }}
      >
        <div
          ref={ref}
          className={cn(
            "w-full h-full [&_canvas]:!w-full [&_canvas]:!h-full",
            "transition-opacity duration-300 flex items-center justify-center",
            isLoading ? "opacity-0" : "opacity-100",
          )}
        />
      </div>

      <div className="w-full mb-5 flex flex-wrap gap-1.5 justify-center">
        {SIZE_PRESETS.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onDownloadSizeChange(size)}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[11px] font-medium",
              downloadSize === size
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground",
            )}
          >
            {size}px
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-2.5">
        <Button
          size="default"
          className="w-full gap-2 font-semibold"
          onClick={() => handleDownload("png")}
          data-testid="button-download-png"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </Button>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="outline" size="sm" onClick={() => handleDownload("svg")}>
            SVG
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDownload("jpeg")}>
            JPEG
          </Button>
        </div>
      </div>
    </div>
  );
}
