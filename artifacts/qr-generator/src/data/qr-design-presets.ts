export type QRSettings = {
  dotsOptions?: { color?: string; type?: string };
  backgroundOptions?: { color?: string };
  cornersSquareOptions?: { type?: string; color?: string };
  cornersDotOptions?: { type?: string; color?: string };
  imageOptions?: { margin?: number; imageSize?: number };
  qrOptions?: { errorCorrectionLevel?: string };
  width?: number;
  height?: number;
  margin?: number;
  image?: string;
};

export const DEFAULT_QR_SETTINGS: QRSettings = {
  dotsOptions: { color: "#000000", type: "rounded" },
  backgroundOptions: { color: "#ffffff" },
  cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
  cornersDotOptions: { type: "dot", color: "#000000" },
  imageOptions: { margin: 10, imageSize: 0.4 },
  qrOptions: { errorCorrectionLevel: "Q" },
  width: 280,
  height: 280,
  margin: 10,
};

export interface QRDesignPreset {
  id: string;
  label: string;
  dotStyle: "square" | "rounded" | "thin" | "extra-rounded" | "dots" | "circles";
  settings: QRSettings;
}

/** TQRCG-style style presets: Classic, Rounded, Thin, Smooth, Circles */
export const qrDesignPresets: QRDesignPreset[] = [
  {
    id: "classic",
    label: "Classic",
    dotStyle: "square",
    settings: {
      dotsOptions: { type: "square" },
      cornersSquareOptions: { type: "square" },
      cornersDotOptions: { type: "square" },
    },
  },
  {
    id: "rounded",
    label: "Rounded",
    dotStyle: "rounded",
    settings: {
      dotsOptions: { type: "rounded" },
      cornersSquareOptions: { type: "extra-rounded" },
      cornersDotOptions: { type: "dot" },
    },
  },
  {
    id: "thin",
    label: "Thin",
    dotStyle: "thin",
    settings: {
      dotsOptions: { type: "dots" },
      cornersSquareOptions: { type: "dot" },
      cornersDotOptions: { type: "dot" },
    },
  },
  {
    id: "smooth",
    label: "Smooth",
    dotStyle: "extra-rounded",
    settings: {
      dotsOptions: { type: "extra-rounded" },
      cornersSquareOptions: { type: "extra-rounded" },
      cornersDotOptions: { type: "dot" },
    },
  },
  {
    id: "circles",
    label: "Circles",
    dotStyle: "circles",
    settings: {
      dotsOptions: { type: "dots" },
      cornersSquareOptions: { type: "dot" },
      cornersDotOptions: { type: "dot" },
    },
  },
];

export function applyStylePreset(current: QRSettings, preset: QRDesignPreset): QRSettings {
  const fg = current.dotsOptions?.color ?? "#000000";
  const sq = current.cornersSquareOptions?.color ?? fg;
  const dot = current.cornersDotOptions?.color ?? fg;

  return {
    ...current,
    dotsOptions: {
      ...current.dotsOptions,
      ...preset.settings.dotsOptions,
      color: current.dotsOptions?.color ?? fg,
    },
    cornersSquareOptions: {
      ...current.cornersSquareOptions,
      ...preset.settings.cornersSquareOptions,
      color: current.cornersSquareOptions?.color ?? sq,
    },
    cornersDotOptions: {
      ...current.cornersDotOptions,
      ...preset.settings.cornersDotOptions,
      color: current.cornersDotOptions?.color ?? dot,
    },
  };
}

export function detectActivePreset(settings: QRSettings): string {
  const match = qrDesignPresets.find((preset) => {
    const applied = applyStylePreset(
      {
        ...DEFAULT_QR_SETTINGS,
        dotsOptions: { color: "#000", type: "square" },
        cornersSquareOptions: { color: "#000", type: "square" },
        cornersDotOptions: { color: "#000", type: "square" },
      },
      preset,
    );
    return (
      settings.dotsOptions?.type === applied.dotsOptions?.type &&
      settings.cornersSquareOptions?.type === applied.cornersSquareOptions?.type &&
      settings.cornersDotOptions?.type === applied.cornersDotOptions?.type
    );
  });
  return match?.id ?? "custom";
}
