import { LOGO_SRC } from "@/components/brand/Logo";

let cached: Promise<string> | null = null;

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/** Resolves logo.png as a base64 data URL for embedding in exported SVGs. */
export function getBrandLogoDataUrl(): Promise<string> {
  if (!cached) {
    cached = fetch(LOGO_SRC)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load logo: ${response.status}`);
        return response.blob();
      })
      .then(blobToDataUrl);
  }
  return cached;
}

export async function embedSvgImages(svg: SVGSVGElement): Promise<void> {
  const images = svg.querySelectorAll("image");
  await Promise.all(
    Array.from(images).map(async (element) => {
      const href =
        element.getAttribute("href") ??
        element.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      if (!href || href.startsWith("data:")) return;

      const absoluteUrl = new URL(href, window.location.origin).href;
      const response = await fetch(absoluteUrl);
      if (!response.ok) throw new Error(`Failed to embed image: ${href}`);
      const dataUrl = await blobToDataUrl(await response.blob());

      element.setAttribute("href", dataUrl);
      element.removeAttributeNS("http://www.w3.org/1999/xlink", "href");
    }),
  );
}

export async function prepareSvgForExport(svg: SVGSVGElement): Promise<SVGSVGElement> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  await embedSvgImages(clone);
  return clone;
}
