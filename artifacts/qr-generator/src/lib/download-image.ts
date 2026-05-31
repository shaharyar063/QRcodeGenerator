import { prepareSvgForExport } from "@/lib/brand-logo-data-url";
import {
  OG_CARD_HEIGHT,
  OG_CARD_WIDTH,
  OG_CARD_X,
  OG_CARD_Y,
  OG_HEIGHT,
  OG_WIDTH,
} from "@/data/og-illustrations";

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function cropSvgToCard(svg: SVGSVGElement) {
  const outerBg = svg.querySelector(`rect[width="${OG_WIDTH}"][height="${OG_HEIGHT}"]`);
  outerBg?.remove();

  svg.setAttribute("viewBox", `${OG_CARD_X} ${OG_CARD_Y} ${OG_CARD_WIDTH} ${OG_CARD_HEIGHT}`);
  svg.setAttribute("width", String(OG_CARD_WIDTH));
  svg.setAttribute("height", String(OG_CARD_HEIGHT));
}

export async function downloadSvgElement(svg: SVGSVGElement, filename: string) {
  const prepared = await prepareSvgForExport(svg);
  cropSvgToCard(prepared);
  prepared.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const source = new XMLSerializer().serializeToString(prepared);
  downloadBlob(new Blob([source], { type: "image/svg+xml;charset=utf-8" }), filename);
}

export async function downloadPngFromSvg(
  svg: SVGSVGElement,
  filename: string,
  width: number,
  height: number,
) {
  const clone = await prepareSvgForExport(svg);
  cropSvgToCard(clone);
  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));

  const source = new XMLSerializer().serializeToString(clone);
  const url = URL.createObjectURL(
    new Blob([source], { type: "image/svg+xml;charset=utf-8" }),
  );

  try {
    const img = await loadImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    if (!blob) throw new Error("PNG export failed");
    downloadBlob(blob, filename);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
