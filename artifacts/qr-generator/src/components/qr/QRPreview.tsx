import { useEffect, useState } from 'react';
import { useQRCode } from '@/hooks/useQRCode';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface QRPreviewProps {
  data: string;
  settings: any;
}

export function QRPreview({ data, settings }: QRPreviewProps) {
  const { ref, download } = useQRCode({ ...settings, data });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 w-full text-center">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Live Preview</h3>
      </div>

      <div className="relative bg-white rounded-xl border p-4 mb-6 w-full max-w-[280px]">
        <div
          ref={ref}
          className={`flex justify-center transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
            <div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-2.5 max-w-[280px]">
        <Button
          size="default"
          className="w-full gap-2 font-semibold"
          onClick={() => download("png")}
          data-testid="button-download-png"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </Button>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="outline" size="sm" onClick={() => download("svg")} data-testid="button-download-svg">
            SVG
          </Button>
          <Button variant="outline" size="sm" onClick={() => download("jpeg")} data-testid="button-download-jpeg">
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
