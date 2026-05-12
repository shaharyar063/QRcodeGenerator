import { useState, useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Upload, X } from "lucide-react";

interface QRCustomizerProps {
  settings: any;
  onChange: (settings: any) => void;
}

export function QRCustomizer({ settings, onChange }: QRCustomizerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.image || null);

  const updateSetting = (category: string, key: string, value: any) => {
    if (category) {
      onChange({
        ...settings,
        [category]: {
          ...settings[category],
          [key]: value
        }
      });
    } else {
      onChange({
        ...settings,
        [key]: value
      });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setLogoPreview(dataUrl);
        updateSetting('', 'image', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    updateSetting('', 'image', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full bg-card rounded-md">
      <AccordionItem value="colors">
        <AccordionTrigger className="text-sm font-medium hover:no-underline">Colors</AccordionTrigger>
        <AccordionContent className="pt-4 pb-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fg-color">Foreground Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="fg-color-picker" 
                  type="color" 
                  className="w-10 p-1 h-10"
                  value={settings.dotsOptions?.color || '#000000'}
                  onChange={(e) => {
                    updateSetting('dotsOptions', 'color', e.target.value);
                    updateSetting('cornersSquareOptions', 'color', e.target.value);
                    updateSetting('cornersDotOptions', 'color', e.target.value);
                  }}
                />
                <Input 
                  id="fg-color" 
                  type="text" 
                  className="flex-1 uppercase font-mono"
                  value={settings.dotsOptions?.color || '#000000'}
                  onChange={(e) => {
                    updateSetting('dotsOptions', 'color', e.target.value);
                    updateSetting('cornersSquareOptions', 'color', e.target.value);
                    updateSetting('cornersDotOptions', 'color', e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="bg-color-picker" 
                  type="color" 
                  className="w-10 p-1 h-10"
                  value={settings.backgroundOptions?.color || '#ffffff'}
                  onChange={(e) => updateSetting('backgroundOptions', 'color', e.target.value)}
                />
                <Input 
                  id="bg-color" 
                  type="text" 
                  className="flex-1 uppercase font-mono"
                  value={settings.backgroundOptions?.color || '#ffffff'}
                  onChange={(e) => updateSetting('backgroundOptions', 'color', e.target.value)}
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="design">
        <AccordionTrigger className="text-sm font-medium hover:no-underline">Design & Shapes</AccordionTrigger>
        <AccordionContent className="pt-4 pb-2 space-y-4">
          <div className="space-y-2">
            <Label>Dot Style</Label>
            <Select 
              value={settings.dotsOptions?.type || 'rounded'} 
              onValueChange={(v) => updateSetting('dotsOptions', 'type', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="dots">Dots</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                <SelectItem value="classy">Classy</SelectItem>
                <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Corner Square Style</Label>
              <Select 
                value={settings.cornersSquareOptions?.type || 'extra-rounded'} 
                onValueChange={(v) => updateSetting('cornersSquareOptions', 'type', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="dot">Dot</SelectItem>
                  <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Corner Dot Style</Label>
              <Select 
                value={settings.cornersDotOptions?.type || 'dot'} 
                onValueChange={(v) => updateSetting('cornersDotOptions', 'type', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="dot">Dot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="logo">
        <AccordionTrigger className="text-sm font-medium hover:no-underline">Add Logo</AccordionTrigger>
        <AccordionContent className="pt-4 pb-2">
          <div className="space-y-4">
            {!logoPreview ? (
              <div 
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload logo</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or SVG</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <img src={logoPreview} alt="Logo preview" className="w-10 h-10 object-contain bg-muted rounded" />
                  <span className="text-sm font-medium">Logo applied</span>
                </div>
                <Button variant="ghost" size="icon" onClick={removeLogo}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleLogoUpload}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="advanced">
        <AccordionTrigger className="text-sm font-medium hover:no-underline">Advanced</AccordionTrigger>
        <AccordionContent className="pt-4 pb-2 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Preview Size ({settings.width || 280}px)</Label>
            </div>
            <Slider 
              min={180} 
              max={360} 
              step={10} 
              value={[settings.width || 280]} 
              onValueChange={(v) => {
                updateSetting('', 'width', v[0]);
                updateSetting('', 'height', v[0]);
              }} 
            />
            <p className="text-xs text-muted-foreground">Controls how large the preview appears. Download quality is set separately above the download buttons.</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Margin ({settings.margin || 10}px)</Label>
            </div>
            <Slider 
              min={0} 
              max={20} 
              step={1} 
              value={[settings.margin !== undefined ? settings.margin : 10]} 
              onValueChange={(v) => updateSetting('', 'margin', v[0])} 
            />
          </div>

          <div className="space-y-2">
            <Label>Error Correction Level</Label>
            <Select 
              value={settings.qrOptions?.errorCorrectionLevel || 'Q'} 
              onValueChange={(v) => updateSetting('qrOptions', 'errorCorrectionLevel', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Low (7%) - Best for clean design</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%) - Recommended for logos</SelectItem>
                <SelectItem value="H">High (30%) - Most reliable</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground pt-1">
              Higher error correction allows the QR code to be scanned even if part of it is covered (like with a logo).
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
