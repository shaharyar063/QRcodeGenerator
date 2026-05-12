import { qrTypes } from '@/data/qr-types';
import { cn } from '@/lib/utils';

interface TypeSelectorProps {
  activeType: string;
  onSelect: (type: string) => void;
}

export function TypeSelector({ activeType, onSelect }: TypeSelectorProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {qrTypes.map((type) => {
        const isActive = activeType === type.id;
        const Icon = type.icon;
        
        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border text-sm transition-all duration-200",
              isActive 
                ? "bg-primary/10 border-primary text-primary font-medium" 
                : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
            type="button"
          >
            <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "")} />
            <span>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}
