import { useEffect, useState } from 'react';
import { useQRCode } from '@/hooks/useQRCode';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { BrandCorner } from '@/components/brand/BrandCorner';

interface QRPreviewProps {
  data: string;
  settings: any;
}

export function QRPreview({ data, settings }: QRPreviewProps) {
  const { ref, download } = useQRCode({
    ...settings,
    data,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = (format: "png" | "svg" | "jpeg") => {
    download(format);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-6 w-full text-center">
        <h3 className="font-semibold text-lg">Live Preview</h3>
        <p className="text-sm text-muted-foreground">Updates automatically as you type</p>
      </div>

      {/* Branded preview card with signature corner decorations */}
      <div className="relative bg-white rounded-2xl shadow-md border-2 border-border p-5 mb-8 w-full max-w-[320px]">
        {/* Signature brand corners — the finder pattern visual language */}
        <BrandCorner size={16} opacity={0.45} className="absolute top-2.5 left-2.5 pointer-events-none" />
        <BrandCorner size={16} opacity={0.45} className="absolute top-2.5 right-2.5 pointer-events-none rotate-90" />
        <BrandCorner size={16} opacity={0.45} className="absolute bottom-2.5 left-2.5 pointer-events-none -rotate-90" />
        <BrandCorner size={16} opacity={0.45} className="absolute bottom-2.5 right-2.5 pointer-events-none rotate-180" />

        <div
          ref={ref}
          className={`flex justify-center transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Download buttons */}
      <div className="w-full flex flex-col gap-3 max-w-[300px]">
        <Button
          size="lg"
          className="w-full gap-2 font-semibold shadow-sm"
          onClick={() => handleDownload("png")}
          data-testid="button-download-png"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="font-medium"
            onClick={() => handleDownload("svg")}
            data-testid="button-download-svg"
          >
            SVG Vector
          </Button>
          <Button
            variant="outline"
            className="font-medium"
            onClick={() => handleDownload("jpeg")}
            data-testid="button-download-jpeg"
          >
            JPEG Image
          </Button>
        </div>
      </div>

      <p className="mt-6 text-xs text-center text-muted-foreground">
        Generated codes are static and never expire.
      </p>
    </div>
  );
}
