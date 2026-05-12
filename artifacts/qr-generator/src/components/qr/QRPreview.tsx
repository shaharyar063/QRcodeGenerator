import { useEffect, useState } from 'react';
import { useQRCode } from '@/hooks/useQRCode';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Download } from 'lucide-react';

interface QRPreviewProps {
  data: string;
  settings: any;
}

const QUALITY_STEPS = [512, 1024, 2048, 3000];

function qualityLabel(size: number) {
  if (size <= 512) return "Web — 512 px";
  if (size <= 1024) return "HD — 1024 px";
  if (size <= 2048) return "Print — 2048 px";
  return "Ultra — 3000 px";
}

function qualityHint(size: number) {
  if (size <= 512) return "Good for websites & messaging";
  if (size <= 1024) return "Sharp on screens & small prints";
  if (size <= 2048) return "Crisp on posters & packaging";
  return "Maximum — billboards & large format";
}

export function QRPreview({ data, settings }: QRPreviewProps) {
  // Clamp display size: size slider drives how big the preview box is (180–360px)
  const displaySize = Math.min(Math.max(settings.width ?? 280, 180), 360);
  const previewOptions = { ...settings, data, width: displaySize, height: displaySize };
  const { ref, download } = useQRCode(previewOptions);
  const [isLoading, setIsLoading] = useState(true);
  const [qualityIndex, setQualityIndex] = useState(1); // default = HD 1024

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  const downloadSize = QUALITY_STEPS[qualityIndex];

  const handleDownload = (ext: "png" | "svg" | "jpeg") => {
    // SVG is resolution-independent — no need to upscale
    download(ext, ext === "svg" ? undefined : downloadSize);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 w-full text-center">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Live Preview</h3>
      </div>

      {/* Preview box — size follows the settings.width slider */}
      <div
        className="relative bg-white rounded-xl border flex items-center justify-center mb-5 transition-all duration-200 overflow-hidden"
        style={{ width: displaySize, height: displaySize, padding: 12 }}
      >
        <div
          ref={ref}
          className={`[&_canvas]:!w-full [&_canvas]:!h-full [&_svg]:!w-full [&_svg]:!h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} w-full h-full flex items-center justify-center`}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
            <div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Download Quality slider */}
      <div className="w-full max-w-[300px] mb-5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Download Quality</span>
          <span className="text-xs font-semibold text-primary">{qualityLabel(downloadSize)}</span>
        </div>
        <Slider
          min={0}
          max={QUALITY_STEPS.length - 1}
          step={1}
          value={[qualityIndex]}
          onValueChange={(v) => setQualityIndex(v[0])}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground px-0.5">
          <span>Web</span>
          <span>HD</span>
          <span>Print</span>
          <span>Ultra</span>
        </div>
        <p className="text-[11px] text-muted-foreground text-center">{qualityHint(downloadSize)}</p>
      </div>

      {/* Download buttons */}
      <div className="w-full flex flex-col gap-2.5 max-w-[300px]">
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
          <Button variant="outline" size="sm" onClick={() => handleDownload("svg")} data-testid="button-download-svg">
            SVG
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDownload("jpeg")} data-testid="button-download-jpeg">
            JPEG
          </Button>
        </div>
      </div>

      <p className="mt-4 text-xs text-center text-muted-foreground">
        Static QR codes — never expire.
      </p>
    </div>
  );
}
