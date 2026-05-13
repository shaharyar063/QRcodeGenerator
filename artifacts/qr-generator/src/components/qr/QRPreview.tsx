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

const QUALITY_META = [
  { label: 'Web',   desc: '512 px — good for screens & messaging' },
  { label: 'HD',    desc: '1024 px — sharp for small prints' },
  { label: 'Print', desc: '2048 px — crisp on posters & packaging' },
  { label: 'Ultra', desc: '3000 px — billboards & large format' },
];

export function QRPreview({ data, settings }: QRPreviewProps) {
  const [qualityIndex, setQualityIndex] = useState(1); // default = HD
  const [isLoading, setIsLoading] = useState(true);

  // Size slider controls the display box size (180–360 px)
  const displaySize = Math.min(Math.max(settings.width ?? 280, 180), 360);

  // Quality slider controls the CANVAS pixel count — more pixels = sharper preview.
  // Cap internal render at 1024 px for performance (3000 px in a DOM canvas is ~36 MB).
  const downloadSize = QUALITY_STEPS[qualityIndex];
  const canvasRenderSize = Math.min(downloadSize, 1024);

  // The preview renders at canvasRenderSize internally, displayed at displaySize via CSS.
  // This is exactly how retina screens work — more pixels, same physical size = sharper.
  const previewOptions = {
    ...settings,
    data,
    width: canvasRenderSize,
    height: canvasRenderSize,
  };

  const { ref, download } = useQRCode(previewOptions);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = (ext: 'png' | 'svg' | 'jpeg') => {
    // SVG is infinitely scalable — no need to upscale
    download(ext, ext === 'svg' ? undefined : downloadSize);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 w-full text-center">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Live Preview
        </h3>
      </div>

      {/* Preview box — displaySize sets the box; canvasRenderSize sets internal pixel count */}
      <div
        className="relative bg-white rounded-xl border flex items-center justify-center mb-5 transition-all duration-200 overflow-hidden"
        style={{ width: displaySize, height: displaySize, padding: 10 }}
      >
        {/*
          The canvas/SVG inside is larger than the box (canvasRenderSize > displaySize).
          width:100%/height:100% scales it DOWN to fit — giving sharper rendering.
        */}
        <div
          ref={ref}
          style={{ width: '100%', height: '100%' }}
          className={`[&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!object-contain
            [&_svg]:!w-full [&_svg]:!h-full
            transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}
            flex items-center justify-center`}
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
          <span className="text-xs font-semibold text-primary">
            {QUALITY_META[qualityIndex].label} — {downloadSize} px
          </span>
        </div>
        <Slider
          min={0}
          max={QUALITY_STEPS.length - 1}
          step={1}
          value={[qualityIndex]}
          onValueChange={(v) => setQualityIndex(v[0])}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground px-0.5">
          {QUALITY_META.map((q) => (
            <span key={q.label}>{q.label}</span>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground text-center">
          {QUALITY_META[qualityIndex].desc}
        </p>
      </div>

      {/* Download buttons */}
      <div className="w-full flex flex-col gap-2.5 max-w-[300px]">
        <Button
          size="default"
          className="w-full gap-2 font-semibold"
          onClick={() => handleDownload('png')}
          data-testid="button-download-png"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </Button>
        <div className="grid grid-cols-2 gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload('svg')}
            data-testid="button-download-svg"
          >
            SVG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload('jpeg')}
            data-testid="button-download-jpeg"
          >
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
