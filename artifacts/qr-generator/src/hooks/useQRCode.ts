import { useRef, useEffect, useState, useCallback } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';

export function useQRCode(options: Partial<Options>) {
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Always keep a ref to the latest options so the download closure never goes stale
  const latestOptions = useRef(options);
  latestOptions.current = options;

  // Serialize options to detect real changes and avoid update loops
  const prevSerialized = useRef('');

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      imageOptions: { crossOrigin: 'anonymous', margin: 10 },
      ...options,
    });

    setQrCode(qr);

    if (ref.current) {
      ref.current.innerHTML = '';
      qr.append(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the live preview whenever options change (skip large image data in comparison)
  useEffect(() => {
    if (!qrCode) return;
    const { image: _img, ...rest } = options as any;
    const serialized = JSON.stringify(rest);
    if (serialized !== prevSerialized.current) {
      prevSerialized.current = serialized;
      qrCode.update(options);
    }
  });

  /**
   * Download the QR code.
   * @param extension  File format
   * @param downloadSize  Pixel size for the exported file (creates a fresh high-res instance)
   * @param extraOpts  Additional option overrides applied to the download instance only
   *                   (e.g. a margin scaled to the download resolution)
   */
  const download = useCallback(
    (
      extension: 'png' | 'svg' | 'jpeg',
      downloadSize?: number,
      extraOpts?: Partial<Options>
    ) => {
      if (!qrCode) return;

      if (downloadSize) {
        // Attach a high-res instance to a hidden off-screen container so that
        // qr-code-styling fully renders the canvas before we call download().
        const container = document.createElement('div');
        container.style.cssText =
          'position:fixed;top:-99999px;left:-99999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none';
        document.body.appendChild(container);

        const highRes = new QRCodeStyling({
          ...latestOptions.current,
          width: downloadSize,
          height: downloadSize,
          ...extraOpts,
        });
        highRes.append(container);

        // Give the canvas time to fully render, then trigger the browser download
        setTimeout(() => {
          const result = highRes.download({ name: 'qr-code', extension });
          const cleanup = () => {
            setTimeout(() => {
              if (document.body.contains(container)) {
                document.body.removeChild(container);
              }
            }, 3000);
          };
          if (result && typeof (result as any).finally === 'function') {
            (result as any).finally(cleanup);
          } else {
            cleanup();
          }
        }, 250);
      } else {
        qrCode.download({ name: 'qr-code', extension });
      }
    },
    [qrCode]
  );

  return { ref, qrCode, download };
}
