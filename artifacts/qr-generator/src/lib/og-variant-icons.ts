import type { LucideIcon } from "lucide-react";
import {
  CircleHelp,
  CircleOff,
  Mail,
  Newspaper,
  QrCode,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import type { OgVariant } from "@/components/illustrations/OgIllustration";
import { qrTypes } from "@/data/qr-types";

const pageIcons: Partial<Record<OgVariant, LucideIcon>> = {
  home: QrCode,
  default: QrCode,
  faq: CircleHelp,
  blog: Newspaper,
  "blog-post": Newspaper,
  contact: Mail,
  privacy: ShieldCheck,
  terms: ScrollText,
  "not-found": CircleOff,
};

export function getOgVariantIcon(variant: OgVariant): LucideIcon {
  if (variant.startsWith("qr-")) {
    const id = variant.slice(3);
    return qrTypes.find((type) => type.id === id)?.icon ?? QrCode;
  }
  return pageIcons[variant] ?? QrCode;
}
