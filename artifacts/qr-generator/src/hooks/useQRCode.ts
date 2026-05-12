import { useRef, useEffect, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';

export function useQRCode(options: Partial<Options>) {
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: "https://qrcodegenerator.app",
      imageOptions: { crossOrigin: "anonymous", margin: 10 },
      ...options,
    });

    setQrCode(qr);

    if (ref.current) {
      ref.current.innerHTML = "";
      qr.append(ref.current);
    }
  }, []);

  useEffect(() => {
    if (qrCode) {
      qrCode.update(options);
    }
  }, [qrCode, options]);

  const download = (extension: "png" | "svg" | "jpeg", downloadSize?: number) => {
    if (!qrCode) return;

    if (downloadSize && downloadSize !== (options.width ?? 300)) {
      // Create a separate high-res instance just for downloading
      const highResQR = new QRCodeStyling({
        ...options,
        width: downloadSize,
        height: downloadSize,
      });
      highResQR.download({ name: "qr-code", extension });
    } else {
      qrCode.download({ name: "qr-code", extension });
    }
  };

  return { ref, qrCode, download };
}
