import { cn } from "@/lib/utils";
import type { QRDesignPreset } from "@/data/qr-design-presets";

export function StylePresetThumb({ dotStyle }: { dotStyle: QRDesignPreset["dotStyle"] }) {
  const cells = [
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 1],
  ];

  return (
    <div className="grid grid-cols-4 gap-[3px] w-8 h-8">
      {cells.flat().map((on, i) => (
        <span
          key={i}
          className={cn(
            "block bg-foreground",
            (dotStyle === "dots" || dotStyle === "circles") && "rounded-full scale-75",
            dotStyle === "extra-rounded" && "rounded-full",
            dotStyle === "rounded" && "rounded-sm",
            dotStyle === "thin" && "rounded-full scale-[0.55]",
            dotStyle === "square" && "rounded-[1px]",
            !on && "opacity-0",
          )}
        />
      ))}
    </div>
  );
}

interface StylePresetRowProps {
  presets: QRDesignPreset[];
  activeId: string;
  onSelect: (preset: QRDesignPreset) => void;
}

export function StylePresetRow({ presets, activeId, onSelect }: StylePresetRowProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {presets.map((preset) => {
        const isActive = preset.id === activeId;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-1.5 rounded-xl border px-3 py-2.5 transition-colors min-w-[72px]",
              isActive
                ? "border-foreground bg-muted/60 shadow-sm"
                : "border-border bg-background hover:border-foreground/30 hover:bg-muted/40",
            )}
          >
            <StylePresetThumb dotStyle={preset.dotStyle} />
            <span className="text-[11px] font-medium leading-none text-foreground">
              {preset.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
