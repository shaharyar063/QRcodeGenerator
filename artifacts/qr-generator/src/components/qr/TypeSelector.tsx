import { qrTypes } from '@/data/qr-types';
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
  return (
    <Select value={activeType} onValueChange={onSelect}>
      <SelectTrigger className="w-full h-11" data-testid="select-qr-type">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {qrTypes.map((type) => (
          <SelectItem key={type.id} value={type.id} data-testid={`option-qr-type-${type.id}`}>
            <div className="flex items-center gap-2.5 py-0.5">
              <type.icon className="w-4 h-4 text-primary shrink-0" />
              <span className="font-medium">{type.label}</span>
              <span className="text-muted-foreground text-xs hidden sm:inline">{type.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
