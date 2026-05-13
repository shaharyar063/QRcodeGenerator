import { useState, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { TypeSelector } from './TypeSelector';
import { QRForm } from './QRForm';
import { QRCustomizer } from './QRCustomizer';
import { QRPreview } from './QRPreview';
import { formatQRData } from '@/lib/qr-utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface QRGeneratorProps {
  initialType?: string;
}

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between text-sm font-semibold text-foreground mb-2 group"
    >
      <span>{title}</span>
      <ChevronDown
        className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

export function QRGenerator({ initialType }: QRGeneratorProps) {
  const [savedType, setSavedType] = useLocalStorage('qr-last-type', 'url');
  const [savedSettings, setSavedSettings] = useLocalStorage('qr-settings', {
    dotsOptions: { color: "#000000", type: "rounded" },
    backgroundOptions: { color: "#ffffff" },
    cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
    cornersDotOptions: { type: "dot", color: "#000000" },
    imageOptions: { margin: 10, imageSize: 0.4 },
    qrOptions: { errorCorrectionLevel: 'Q' },
    width: 256,
    height: 256,
    margin: 10
  });

  const [activeType, setActiveType] = useState(initialType || savedType);
  const [formData, setFormData] = useState<any>({});
  const [debouncedFormData, setDebouncedFormData] = useState<any>({});

  // Content open by default, Customize Design closed by default
  const [contentOpen, setContentOpen] = useState(true);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFormData(formData), 150);
    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    if (initialType && initialType !== activeType) setActiveType(initialType);
  }, [initialType]);

  useEffect(() => {
    setSavedType(activeType);
  }, [activeType, setSavedType]);

  const qrDataString = useMemo(
    () => formatQRData(activeType, debouncedFormData),
    [activeType, debouncedFormData]
  );

  return (
    <div className="w-full max-w-5xl mx-auto bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left: controls */}
        <div className="flex-1 border-b lg:border-b-0 lg:border-r p-5 md:p-7 space-y-5">

          {/* QR Type — always visible, no toggle */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              QR Code Type
            </label>
            <TypeSelector activeType={activeType} onSelect={setActiveType} />
          </div>

          {/* Content — collapsible, open by default */}
          <div>
            <SectionHeader
              title="Content"
              open={contentOpen}
              onToggle={() => setContentOpen((v) => !v)}
            />
            {contentOpen && (
              <div className="mt-1">
                <QRForm type={activeType} data={formData} onChange={setFormData} />
              </div>
            )}
          </div>

          {/* Customize Design — collapsible, closed by default */}
          <div>
            <SectionHeader
              title="Customize Design"
              open={customizeOpen}
              onToggle={() => setCustomizeOpen((v) => !v)}
            />
            {customizeOpen && (
              <div className="mt-1">
                <QRCustomizer settings={savedSettings} onChange={setSavedSettings} />
              </div>
            )}
          </div>

        </div>

        {/* Right: preview */}
        <div className="w-full lg:w-[360px] xl:w-[400px] p-5 md:p-7 bg-muted/20 flex flex-col items-center lg:sticky lg:top-16 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <QRPreview data={qrDataString} settings={savedSettings} />
        </div>
      </div>
    </div>
  );
}
