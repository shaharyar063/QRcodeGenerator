import { useState, useEffect, useMemo } from 'react';
import { qrTypes } from '@/data/qr-types';
import { TypeSelector } from './TypeSelector';
import { QRForm } from './QRForm';
import { QRCustomizer } from './QRCustomizer';
import { QRPreview } from './QRPreview';
import { formatQRData } from '@/lib/qr-utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface QRGeneratorProps {
  initialType?: string;
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

  // Debounce form data to prevent lag during rapid typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFormData(formData);
    }, 150);
    return () => clearTimeout(timer);
  }, [formData]);

  // Update active type when initialType prop changes (route changes)
  useEffect(() => {
    if (initialType && initialType !== activeType) {
      setActiveType(initialType);
    }
  }, [initialType]);

  // Save selected type
  useEffect(() => {
    setSavedType(activeType);
  }, [activeType, setSavedType]);

  const qrDataString = useMemo(() => {
    return formatQRData(activeType, debouncedFormData);
  }, [activeType, debouncedFormData]);

  const handleSettingsChange = (newSettings: any) => {
    setSavedSettings(newSettings);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-card rounded-xl shadow-lg border overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column: Controls */}
        <div className="flex-1 border-b lg:border-b-0 lg:border-r p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Select Type</h2>
            <TypeSelector activeType={activeType} onSelect={setActiveType} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">2. Enter Content</h2>
            <QRForm type={activeType} data={formData} onChange={setFormData} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">3. Customize Design</h2>
            <QRCustomizer settings={savedSettings} onChange={handleSettingsChange} />
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="w-full lg:w-[400px] xl:w-[450px] p-6 md:p-8 bg-muted/20 flex flex-col items-center sticky top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
          <QRPreview data={qrDataString} settings={savedSettings} />
        </div>
      </div>
    </div>
  );
}
