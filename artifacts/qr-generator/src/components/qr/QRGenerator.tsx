import { useState, useEffect, useMemo, useCallback } from "react";
import { useRoute } from "wouter";
import { TypeSelector } from "./TypeSelector";
import { QRForm } from "./QRForm";
import { QRCustomizer } from "./QRCustomizer";
import { QRPreview } from "./QRPreview";
import { QRCodeDisplay } from "./QRCodeDisplay";
import { formatQRData } from "@/lib/qr-utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getQrTypeIdFromSlug, qrTypes } from "@/data/qr-types";
import {
  DEFAULT_QR_SETTINGS,
  type QRSettings,
} from "@/data/qr-design-presets";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface QRGeneratorProps {
  initialType?: string;
  variant?: "default" | "hero";
}

const DEFAULT_DOWNLOAD_SIZE = 1024;

export function QRGenerator({ initialType, variant = "hero" }: QRGeneratorProps) {
  const [match, params] = useRoute("/qr-code-generator/:type");
  const routeTypeId = match && params?.type ? getQrTypeIdFromSlug(params.type) : undefined;

  const [savedType, setSavedType] = useLocalStorage("qr-last-type", "url");
  const [savedSettings, setSavedSettings] = useLocalStorage<QRSettings>(
    "qr-settings",
    DEFAULT_QR_SETTINGS,
  );
  const [downloadSize, setDownloadSize] = useState(DEFAULT_DOWNLOAD_SIZE);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const [activeType, setActiveType] = useState(initialType || savedType);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [debouncedFormData, setDebouncedFormData] = useState<Record<string, unknown>>({});

  const resolvedType = routeTypeId ?? activeType;
  const isHero = variant === "hero";

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFormData(formData), 150);
    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    if (initialType && initialType !== activeType) setActiveType(initialType);
  }, [initialType, activeType]);

  useEffect(() => {
    if (routeTypeId) setActiveType(routeTypeId);
  }, [routeTypeId]);

  useEffect(() => {
    if (qrTypes.some((type) => type.id === resolvedType)) {
      setSavedType(resolvedType);
    }
  }, [resolvedType, setSavedType]);

  const qrDataString = useMemo(
    () => formatQRData(resolvedType, debouncedFormData),
    [resolvedType, debouncedFormData],
  );

  const handleSettingsChange = useCallback(
    (next: QRSettings) => {
      setSavedSettings(next);
    },
    [setSavedSettings],
  );

  const customizeSheet = (
    <Sheet open={customizeOpen} onOpenChange={setCustomizeOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-3xl lg:max-w-4xl overflow-y-auto p-0 sm:p-6"
      >
        <SheetHeader className="px-4 pt-6 sm:px-0 sm:pt-0">
          <SheetTitle>Customize design</SheetTitle>
        </SheetHeader>

        <div className="customize_modal_body flex flex-col sm:flex-row gap-0 sm:gap-6 mt-4 pb-8">
          <div className="customize_options flex-1 min-w-0 px-4 sm:px-0 order-2 sm:order-1">
            <QRCustomizer
              settings={savedSettings}
              onChange={handleSettingsChange}
              variant="panel"
            />
          </div>

          <div className="customize_preview shrink-0 flex flex-col items-center px-4 py-5 sm:py-0 sm:px-5 sm:border-l border-border/80 bg-muted/20 sm:bg-transparent order-1 sm:order-2 sm:w-[240px]">
            <p className="text-xs font-medium text-muted-foreground mb-3 self-start sm:self-center">
              Preview
            </p>
            <div
              id="generated-qr-code-img-customize"
              className="preview_wrapper_customize flex items-center justify-center w-full"
            >
              <QRCodeDisplay
                data={qrDataString}
                settings={savedSettings}
                size={200}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  if (isHero) {
    return (
      <>
        <div className="widget_container w-full max-w-4xl mx-auto bg-card rounded-2xl border border-border/80 shadow-lg overflow-hidden">
          <TypeSelector activeType={resolvedType} variant="hero" />

          <div className="flex flex-col-reverse lg:flex-row lg:items-stretch">
            <div className="flex-1 min-w-0 p-4 sm:p-5 lg:p-6">
              <QRForm
                type={resolvedType}
                data={formData}
                onChange={setFormData}
                variant="hero"
              />
            </div>

            <div className="w-full lg:w-[min(100%,320px)] xl:w-[340px] shrink-0 p-4 sm:p-5 lg:p-6 bg-muted/30 border-b lg:border-b-0 lg:border-l border-border/80 flex flex-col items-center justify-center">
              <QRPreview
                data={qrDataString}
                settings={savedSettings}
                variant="hero"
                downloadSize={downloadSize}
                onDownloadSizeChange={setDownloadSize}
                onCustomize={() => setCustomizeOpen(true)}
              />
            </div>
          </div>
        </div>
        {customizeSheet}
      </>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 border-b lg:border-b-0 lg:border-r p-5 md:p-7 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              QR Code Type
            </label>
            <TypeSelector activeType={resolvedType} />
          </div>
          <QRForm type={resolvedType} data={formData} onChange={setFormData} />
          <QRCustomizer settings={savedSettings} onChange={handleSettingsChange} />
        </div>
        <div className="w-full lg:w-[360px] xl:w-[400px] p-5 md:p-7 bg-muted/20 flex flex-col items-center">
          <QRPreview
            data={qrDataString}
            settings={savedSettings}
            downloadSize={downloadSize}
            onDownloadSizeChange={setDownloadSize}
          />
        </div>
      </div>
    </div>
  );
}
