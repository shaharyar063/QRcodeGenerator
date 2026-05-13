import { useEffect, useState } from 'react';
import { useQRCode } from '@/hooks/useQRCode';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Download } from 'lucide-react';

interface QRPreviewProps {
  data: string;
  settings: any;
}

const MIN_SIZE = 512;
const MAX_SIZE = 2000;
const DEFAULT_SIZE = Math.round((MIN_SIZE + MAX_SIZE) / 2); // 1256

function resolutionLabel(size: number): string {
  if (size < 800)  return 'Web';
  if (size < 1500) return 'HD';
  if (size < 2500) return 'Print Quality';
  return 'Ultra High Resolution';
}

function scaleMargin(userMargin: number, targetSize: number) {
  return Math.round(userMargin * (targetSize / 300));
}

export function QRPreview({ data, settings }: QRPreviewProps) {
  const [downloadSize, setDownloadSize] = useState(DEFAULT_SIZE);
  const [isLoading, setIsLoading]       = useState(true);

  // Size slider (Advanced) controls how big the preview box appears on screen
  const displaySize = Math.min(Math.max(settings.width ?? 280, 180), 360);

  // Cap internal canvas render at 1024 px for DOM performance — sharper than
  // the raw 280 px display, but avoids a multi-MB canvas in the browser.
  const canvasRenderSize  = Math.min(downloadSize, 1024);
  const userMargin: number = settings.margin ?? 10;
  const scaledPreviewMargin = scaleMargin(userMargin, canvasRenderSize);

  const previewOptions = {
    ...settings,
    data,
    width:  canvasRenderSize,
    height: canvasRenderSize,
    margin: scaledPreviewMargin,
  };

  const { ref, download } = useQRCode(previewOptions);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = (ext: 'png' | 'svg' | 'jpeg') => {
    if (ext === 'svg') {
      download('svg', undefined, { margin: scaleMargin(userMargin, 512) });
    } else {
      download(ext, downloadSize, { margin: scaleMargin(userMargin, downloadSize) });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 w-full text-center">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Live Preview
        </h3>
      </div>

      {/* Preview box */}
      <div
        className="relative bg-white rounded-xl border flex items-center justify-center mb-5 transition-all duration-200 overflow-hidden"
        style={{ width: displaySize, height: displaySize }}
      >
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

      {/* Continuous download quality slider */}
      <div className="w-full mb-5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Download Quality</span>
          <span className="text-xs font-semibold text-primary">{downloadSize} px</span>
        </div>
        <Slider
          min={MIN_SIZE}
          max={MAX_SIZE}
          step={8}
          value={[downloadSize]}
          onValueChange={(v) => setDownloadSize(v[0])}
        />
        <p className="text-[11px] text-muted-foreground text-center">
          {resolutionLabel(downloadSize)}
        </p>
      </div>

      {/* Download buttons */}
      <div className="w-full flex flex-col gap-2.5">
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
          <Button variant="outline" size="sm" className="w-full" onClick={() => handleDownload('svg')} data-testid="button-download-svg">
            SVG
          </Button>
          <Button variant="outline" size="sm" className="w-full" onClick={() => handleDownload('jpeg')} data-testid="button-download-jpeg">
            JPEG
          </Button>
        </div>
      </div>
    </div>
  );
}
