import { qrTypes } from '@/data/qr-types';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypeSelectorProps {
  activeType: string;
  onSelect: (type: string) => void;
}

export function TypeSelector({ activeType, onSelect }: TypeSelectorProps) {
  const active = qrTypes.find((t) => t.id === activeType);

  return (
    <>
      {/* Mobile / Tablet — compact dropdown */}
      <div className="lg:hidden">
        <Select value={activeType} onValueChange={onSelect}>
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
                  <type.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{type.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop — compact button grid */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-1.5" data-testid="type-button-grid">
        {qrTypes.map((type) => {
          const isActive = activeType === type.id;
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              type="button"
              data-testid={`button-qr-type-${type.id}`}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2.5 rounded-lg border text-xs font-medium transition-all duration-150",
                isActive
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:border-muted-foreground/30"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "")} />
              <span className="leading-none">{type.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
