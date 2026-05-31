#!/usr/bin/env tsx
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  ogIllustrationSpecs,
  OG_CARD_HEIGHT,
  OG_CARD_WIDTH,
  OG_CARD_X,
  OG_CARD_Y,
} from "../src/data/og-illustrations";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OG_DIR = path.join(ROOT, "public", "og");
const BASE_URL = process.env.OG_GEN_URL ?? "http://localhost:5173";

async function exportSvgPng(page: import("playwright").Page, svgId: string): Promise<Buffer> {
  const base64 = await page.evaluate(
    async ({ svgId, width, height, cardX, cardY, cardW, cardH }) => {
      const svg = document.getElementById(svgId) as SVGSVGElement | null;
      if (!svg) throw new Error(`SVG #${svgId} not found`);

      const clone = svg.cloneNode(true) as SVGSVGElement;
      const images = clone.querySelectorAll("image");
      for (const element of Array.from(images)) {
        const href =
          element.getAttribute("href") ??
          element.getAttributeNS("http://www.w3.org/1999/xlink", "href");
        if (!href || href.startsWith("data:")) continue;
        const response = await fetch(href);
        const blob = await response.blob();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        element.setAttribute("href", dataUrl);
      }

      clone.setAttribute("viewBox", `${cardX} ${cardY} ${cardW} ${cardH}`);
      clone.setAttribute("width", String(width));
      clone.setAttribute("height", String(height));

      const source = new XMLSerializer().serializeToString(clone);
      const url = URL.createObjectURL(
        new Blob([source], { type: "image/svg+xml;charset=utf-8" }),
      );

      try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = url;
        });
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported");
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL("image/png").split(",")[1]!;
      } finally {
        URL.revokeObjectURL(url);
      }
    },
    {
      svgId,
      width: OG_CARD_WIDTH,
      height: OG_CARD_HEIGHT,
      cardX: OG_CARD_X,
      cardY: OG_CARD_Y,
      cardW: OG_CARD_WIDTH,
      cardH: OG_CARD_HEIGHT,
    },
  );

  return Buffer.from(base64, "base64");
}

async function main() {
  await fs.mkdir(OG_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log(`Loading ${BASE_URL}/dev/illustrations …`);
  await page.goto(`${BASE_URL}/dev/illustrations`, { waitUntil: "networkidle" });

  const ids = ogIllustrationSpecs.map((spec) => spec.filename);
  await page.waitForFunction(
    (filenames) =>
      filenames.every((id: string) => {
        const svg = document.getElementById(id);
        const img = svg?.querySelector("image");
        return Boolean(img?.getAttribute("href")?.startsWith("data:"));
      }),
    ids,
    { timeout: 60_000 },
  );

  for (const spec of ogIllustrationSpecs) {
    process.stdout.write(`  ${spec.filename}.webp … `);
    const pngBuffer = await exportSvgPng(page, spec.filename);
    const webpPath = path.join(OG_DIR, `${spec.filename}.webp`);
    await sharp(pngBuffer).webp({ quality: 88 }).toFile(webpPath);
    console.log("done");
  }

  await browser.close();
  console.log(`\nGenerated ${ogIllustrationSpecs.length} WebP files in public/og/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
