import { getQrTypePath, qrTypes } from "@/data/qr-types";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypeSelectorProps {
  activeType: string;
  onSelect?: (type: string) => void;
  variant?: "default" | "hero";
}

function tabClassName(isActive: boolean, variant: "default" | "hero"): string {
  if (variant === "hero") {
    return cn(
      "flex shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 min-w-[64px] transition-all duration-150",
      isActive
        ? "bg-foreground text-background shadow-sm"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );
  }

  return cn(
    "flex flex-col items-center justify-center gap-1 p-2.5 rounded-lg border text-xs font-medium transition-all duration-150",
    isActive
      ? "bg-foreground text-background border-foreground"
      : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:border-foreground/20",
  );
}

export function TypeSelector({ activeType, onSelect, variant = "default" }: TypeSelectorProps) {
  const [, setLocation] = useLocation();

  const handleSelect = (typeId: string) => {
    const type = qrTypes.find((item) => item.id === typeId);
    if (!type) return;
    setLocation(getQrTypePath(type.slug));
    onSelect?.(typeId);
  };

  if (variant === "hero") {
    return (
      <div
        className="flex gap-1 overflow-x-auto px-4 py-3 border-b border-border/80 scrollbar-none"
        data-testid="type-tab-row"
        role="tablist"
        aria-label="QR code type"
      >
        {qrTypes.map((type) => {
          const isActive = activeType === type.id;
          const Icon = type.icon;

          return (
            <Link
              key={type.id}
              href={getQrTypePath(type.slug)}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              data-testid={`button-qr-type-${type.id}`}
              className={tabClassName(isActive, "hero")}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2.25 : 2} />
              <span className="text-[11px] font-medium leading-none whitespace-nowrap">
                {type.label}
              </span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="lg:hidden">
        <Select value={activeType} onValueChange={handleSelect}>
          <SelectTrigger className="w-full h-10 text-sm" data-testid="select-qr-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[320px]">
            {qrTypes.map((type) => (
              <SelectItem
                key={type.id}
                value={type.id}
                className="py-1.5 text-sm cursor-pointer"
                data-testid={`option-qr-type-${type.id}`}
              >
                <div className="flex items-center gap-2">
                  <type.icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{type.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden lg:grid lg:grid-cols-5 gap-1.5" data-testid="type-button-grid">
        {qrTypes.map((type) => {
          const isActive = activeType === type.id;
          const Icon = type.icon;

          return (
            <Link
              key={type.id}
              href={getQrTypePath(type.slug)}
              aria-current={isActive ? "page" : undefined}
              data-testid={`button-qr-type-${type.id}`}
              className={tabClassName(isActive, "default")}
            >
              <Icon className="w-4 h-4" />
              <span className="leading-none">{type.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
