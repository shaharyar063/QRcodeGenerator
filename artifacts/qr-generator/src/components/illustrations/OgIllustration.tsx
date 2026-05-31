import { forwardRef, useEffect, useState } from "react";
import { LOGO_ASPECT, LOGO_SRC } from "@/components/brand/Logo";
import { getBrandLogoDataUrl } from "@/lib/brand-logo-data-url";
import { SITE_DOMAIN, SITE_NAME } from "@/lib/site";
import { OG_CARD_HEIGHT, OG_CARD_WIDTH, OG_CARD_X, OG_CARD_Y } from "@/data/og-illustrations";
import { getOgVariantIcon } from "@/lib/og-variant-icons";

export type OgVariant =
  | "home"
  | "faq"
  | "blog"
  | "blog-post"
  | "contact"
  | "privacy"
  | "terms"
  | "not-found"
  | "default"
  | "qr-url"
  | "qr-wifi"
  | "qr-email"
  | "qr-phone"
  | "qr-sms"
  | "qr-vcard"
  | "qr-whatsapp"
  | "qr-text"
  | "qr-location"
  | "qr-event";

interface OgIllustrationProps {
  title: string;
  subtitle: string;
  variant: OgVariant;
  width?: number;
  height?: number;
  className?: string;
  id?: string;
}

const INK = "#171717";
const MUTED = "#737373";
const LINE = "#E5E5E5";
const BG = "#FFFFFF";

const BRAND_NAME_FONT = 43;
const BRAND_DOMAIN_FONT = 17;
const BRAND_LINE_GAP = 6;
const BRAND_TEXT_HEIGHT = BRAND_NAME_FONT + BRAND_LINE_GAP + BRAND_DOMAIN_FONT;
const BRAND_LOGO_HEIGHT = BRAND_TEXT_HEIGHT + 28;
const BRAND_ROW_TOP = 66;
const BRAND_ROW_HEIGHT = Math.max(BRAND_LOGO_HEIGHT, BRAND_TEXT_HEIGHT);
const BRAND_CENTER_Y = BRAND_ROW_TOP + BRAND_ROW_HEIGHT / 2;
const BRAND_LOGO_X = 88;
const BRAND_LOGO_Y = BRAND_CENTER_Y - BRAND_LOGO_HEIGHT / 2;
const BRAND_NAME_X = 1088;
const BRAND_DIVIDER_Y = BRAND_ROW_TOP + BRAND_ROW_HEIGHT + 16;
const CONTENT_OFFSET = 44;
const FOOTER_LEFT_X = 88;
const FOOTER_GRID_X = 360;
const FOOTER_DOMAIN_X = (FOOTER_LEFT_X + FOOTER_GRID_X) / 2;
const QR_GRID_HEIGHT = 90;

function BrandLogoImage({
  x,
  y,
  height,
  href,
}: {
  x: number;
  y: number;
  height: number;
  href: string;
}) {
  const width = height * LOGO_ASPECT;
  return (
    <image
      href={href}
      x={x}
      y={y}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}

function QrGrid({ x, y, w, h, opacity = 0.08 }: { x: number; y: number; w: number; h: number; opacity?: number }) {
  const cols = 14;
  const rows = 7;
  const cellW = w / cols;
  const cellH = h / rows;
  const cells: boolean[] = [
    true, true, true, true, false, true, false, true, true, false, true, true, true, true,
    true, false, true, false, true, false, true, false, true, false, true, false, true, false,
    true, true, true, false, false, true, true, false, false, true, true, true, false, true,
    false, true, false, true, true, false, true, true, false, true, false, true, true, false,
    true, false, true, true, false, true, false, true, true, false, true, false, true, true,
    true, true, false, true, true, false, true, false, true, true, false, true, false, true,
    false, true, true, false, true, true, true, false, true, false, true, true, true, false,
  ];
  return (
    <g opacity={opacity}>
      {cells.map((on, i) => {
        if (!on) return null;
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <rect
            key={i}
            x={x + col * cellW}
            y={y + row * cellH}
            width={cellW * 0.82}
            height={cellH * 0.82}
            rx={2}
            fill={INK}
          />
        );
      })}
    </g>
  );
}

function IconArt({ variant, cy }: { variant: OgVariant; cy: number }) {
  const Icon = getOgVariantIcon(variant);
  const cx = 200;
  const box = 120;
  const iconSize = 56;

  return (
    <g>
      <rect
        x={cx - box / 2}
        y={cy - box / 2}
        width={box}
        height={box}
        rx={24}
        fill="#FFFFFF"
        stroke={LINE}
        strokeWidth={2}
      />
      <g transform={`translate(${cx - iconSize / 2}, ${cy - iconSize / 2})`}>
        <Icon
          size={iconSize}
          color={INK}
          strokeWidth={2}
          absoluteStrokeWidth
          aria-hidden
        />
      </g>
    </g>
  );
}

function wrapTitle(title: string, maxChars = 34): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

export const OgIllustration = forwardRef<SVGSVGElement, OgIllustrationProps>(
  function OgIllustration(
    { title, subtitle, variant, width, height, className, id },
    ref,
  ) {
  const [logoHref, setLogoHref] = useState(LOGO_SRC);

  useEffect(() => {
    getBrandLogoDataUrl().then(setLogoHref).catch(() => {
      /* keep relative path as fallback for on-screen preview */
    });
  }, []);

  const titleLines = wrapTitle(title);
  const titleY = (titleLines.length > 1 ? 268 : 288) + CONTENT_OFFSET;
  const iconCy = 315 + CONTENT_OFFSET;
  const qrGridY = 480 + CONTENT_OFFSET;
  const footerDomainY = qrGridY + QR_GRID_HEIGHT / 2 - 12;
  const displayWidth = width ?? OG_CARD_WIDTH;
  const displayHeight = height ?? OG_CARD_HEIGHT;

  return (
    <svg
      ref={ref}
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${OG_CARD_X} ${OG_CARD_Y} ${OG_CARD_WIDTH} ${OG_CARD_HEIGHT}`}
      width={displayWidth}
      height={displayHeight}
      className={className}
      role="img"
      aria-label={title}
    >
      <rect
        x={OG_CARD_X}
        y={OG_CARD_Y}
        width={OG_CARD_WIDTH}
        height={OG_CARD_HEIGHT}
        rx={32}
        fill={BG}
        stroke={LINE}
        strokeWidth={2}
      />

      <BrandLogoImage
        x={BRAND_LOGO_X}
        y={BRAND_LOGO_Y}
        height={BRAND_LOGO_HEIGHT}
        href={logoHref}
      />
      <g
        transform={`translate(${BRAND_NAME_X}, ${BRAND_CENTER_Y})`}
        textAnchor="end"
        fontFamily="Inter, system-ui, sans-serif"
      >
        <text
          y={-(BRAND_DOMAIN_FONT + BRAND_LINE_GAP) / 2}
          dominantBaseline="middle"
          fill={INK}
          fontSize={BRAND_NAME_FONT}
          fontWeight="600"
        >
          {SITE_NAME}
        </text>
        <text
          y={(BRAND_NAME_FONT + BRAND_LINE_GAP) / 2}
          dominantBaseline="middle"
          fill={MUTED}
          fontSize={BRAND_DOMAIN_FONT}
          fontWeight="500"
        >
          {SITE_DOMAIN}
        </text>
      </g>

      <line x1={88} y1={BRAND_DIVIDER_Y} x2={1112} y2={BRAND_DIVIDER_Y} stroke={LINE} strokeWidth={2} />

      <IconArt variant={variant} cy={iconCy} />

      <g fontFamily="Inter, system-ui, sans-serif">
        {titleLines.map((line, i) => (
          <text
            key={i}
            x={360}
            y={titleY + i * 52}
            fill={INK}
            fontSize={titleLines.length > 1 || line.length > 28 ? 44 : 52}
            fontWeight="700"
          >
            {line}
          </text>
        ))}
        <text x={360} y={titleY + titleLines.length * 52 + 16} fill={MUTED} fontSize={24} fontWeight="400">
          {subtitle.length > 58 ? `${subtitle.slice(0, 55)}…` : subtitle}
        </text>
      </g>

      <QrGrid x={360} y={qrGridY} w={720} h={QR_GRID_HEIGHT} />

      <text
        x={FOOTER_DOMAIN_X}
        y={footerDomainY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={MUTED}
        fontSize={18}
        fontWeight="500"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {SITE_DOMAIN}
      </text>

      <circle cx={1040} cy={540 + CONTENT_OFFSET} r={36} fill={INK} opacity={0.06} />
      <circle cx={1080} cy={500 + CONTENT_OFFSET} r={20} fill={INK} opacity={0.08} />
    </svg>
  );
  },
);
