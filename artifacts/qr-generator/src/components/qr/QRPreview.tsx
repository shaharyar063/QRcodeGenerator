import { useEffect, useState } from 'react';
import { useQRCode } from '@/hooks/useQRCode';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QRPreviewProps {
  data: string;
  settings: any;
}

export function QRPreview({ data, settings }: QRPreviewProps) {
  const { ref, qrCode, download } = useQRCode({
    ...settings,
    data,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small timeout to allow qr-code-styling to initialize
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

      <div className="relative bg-white rounded-xl shadow-sm border p-4 mb-8">
        <div 
          ref={ref} 
          className={`flex justify-center transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-3 max-w-[300px]">
        <Button size="lg" className="w-full gap-2 font-medium" onClick={() => handleDownload("png")}>
          <Download className="w-4 h-4" /> Download PNG
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => handleDownload("svg")}>
            SVG Vector
          </Button>
          <Button variant="outline" onClick={() => handleDownload("jpeg")}>
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
