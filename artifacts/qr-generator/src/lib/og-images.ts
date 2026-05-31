import { OG_CARD_HEIGHT, OG_CARD_WIDTH } from "@/data/og-illustrations";
import { SITE_ORIGIN } from "@/lib/site";

export { SITE_ORIGIN };

export const DEFAULT_OG_IMAGE = "og-default";

export const OG_IMAGE_WIDTH = OG_CARD_WIDTH;
export const OG_IMAGE_HEIGHT = OG_CARD_HEIGHT;

export function ogImagePath(filename: string): string {
  return `/og/${filename}.webp`;
}

export function ogImageUrl(filename: string): string {
  return `${SITE_ORIGIN}${ogImagePath(filename)}`;
}
