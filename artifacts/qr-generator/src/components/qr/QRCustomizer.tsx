import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Upload, X } from "lucide-react";
import {
  applyStylePreset,
  detectActivePreset,
  qrDesignPresets,
  type QRDesignPreset,
  type QRSettings,
} from "@/data/qr-design-presets";
import { StylePresetRow } from "./StylePresetRow";

interface QRCustomizerProps {
  settings: QRSettings;
  onChange: (settings: QRSettings) => void;
  variant?: "default" | "panel";
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex gap-2 items-center">
        <Input
          type="color"
          className="w-10 h-10 p-1 shrink-0 cursor-pointer"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          type="text"
          className="flex-1 h-10 uppercase font-mono text-xs"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export function QRCustomizer({
  settings,
  onChange,
}: QRCustomizerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.image || null);
  const activeStyleId = detectActivePreset(settings);

  const handleStyleSelect = (preset: QRDesignPreset) => {
    onChange(applyStylePreset(settings, preset));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLogoPreview(dataUrl);
      onChange({ ...settings, image: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    onChange({ ...settings, image: undefined });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const margin = settings.margin ?? 10;

  return (
    <Accordion
      type="multiple"
      defaultValue={["style", "color", "margin"]}
      className="w-full"
    >
      <AccordionItem value="style" className="border-b border-border/80">
        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
          Style
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-1">
          <StylePresetRow
            presets={qrDesignPresets}
            activeId={activeStyleId}
            onSelect={handleStyleSelect}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="color" className="border-b border-border/80">
        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
          Color
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-1 space-y-4">
          <ColorField
            label="Background"
            value={settings.backgroundOptions?.color || "#ffffff"}
            onChange={(color) =>
              onChange({
                ...settings,
                backgroundOptions: { ...settings.backgroundOptions, color },
              })
            }
          />
          <ColorField
            label="Squares"
            value={settings.cornersSquareOptions?.color || "#000000"}
            onChange={(color) =>
              onChange({
                ...settings,
                cornersSquareOptions: { ...settings.cornersSquareOptions, color },
                cornersDotOptions: { ...settings.cornersDotOptions, color },
              })
            }
          />
          <ColorField
            label="Pixels"
            value={settings.dotsOptions?.color || "#000000"}
            onChange={(color) =>
              onChange({
                ...settings,
                dotsOptions: { ...settings.dotsOptions, color },
              })
            }
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="margin" className="border-b border-border/80">
        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
          Outer margin
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-1 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Quiet zone around the QR code</span>
            <span className="font-medium text-foreground tabular-nums">{margin}px</span>
          </div>
          <Slider
            min={0}
            max={40}
            step={1}
            value={[margin]}
            onValueChange={(v) => onChange({ ...settings, margin: v[0] })}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="logo" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
            Logo
          </AccordionTrigger>
          <AccordionContent className="pb-2 pt-1">
            {!logoPreview ? (
              <div
                className="border-2 border-dashed rounded-xl p-5 flex flex-col items-center gap-2 bg-muted/30 hover:bg-muted/50 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
                <p className="text-xs font-medium">Upload logo (PNG, JPG, SVG)</p>
              </div>
            ) : (
              <div className="flex items-center justify-between border rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={logoPreview}
                    alt="Logo"
                    className="w-10 h-10 object-contain bg-muted rounded"
                  />
                  <span className="text-sm font-medium">Logo applied</span>
                </div>
                <Button variant="ghost" size="icon" onClick={removeLogo}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/svg+xml"
              onChange={handleLogoUpload}
            />
          </AccordionContent>
        </AccordionItem>
    </Accordion>
  );
}
