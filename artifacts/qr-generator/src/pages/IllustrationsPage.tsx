import { useEffect, useRef, useState } from "react";
import { Download, ImageIcon } from "lucide-react";
import { OgIllustration } from "@/components/illustrations/OgIllustration";
import {
  OG_CARD_HEIGHT,
  OG_CARD_WIDTH,
  ogIllustrationSpecs,
  type OgIllustrationSpec,
} from "@/data/og-illustrations";
import { downloadPngFromSvg, downloadSvgElement } from "@/lib/download-image";
import { Button } from "@/components/ui/button";

const PREVIEW_WIDTH = 600;
const PREVIEW_HEIGHT = Math.round(PREVIEW_WIDTH * (OG_CARD_HEIGHT / OG_CARD_WIDTH));

function IllustrationCard({ spec }: { spec: OgIllustrationSpec }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [downloading, setDownloading] = useState<"png" | "svg" | null>(null);

  const handleDownload = async (format: "png" | "svg") => {
    const svg = svgRef.current;
    if (!svg) return;
    setDownloading(format);
    try {
      if (format === "svg") {
        await downloadSvgElement(svg, `${spec.filename}.svg`);
      } else {
        await downloadPngFromSvg(svg, `${spec.filename}.png`, OG_CARD_WIDTH, OG_CARD_HEIGHT);
      }
    } finally {
      setDownloading(null);
    }
  };

  return (
    <article className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="bg-muted/30 p-3 border-b border-border">
        <div className="rounded-lg overflow-hidden border border-border bg-background shadow-sm">
          <OgIllustration
            ref={svgRef}
            id={spec.filename}
            title={spec.title}
            subtitle={spec.subtitle}
            variant={spec.variant}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            className="w-full h-auto block"
          />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-1">{spec.filename}</p>
          <h2 className="font-semibold text-sm leading-snug">{spec.title}</h2>
          <p className="text-xs text-muted-foreground mt-1">For: {spec.forPage}</p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 gap-1.5"
            disabled={!!downloading}
            onClick={() => handleDownload("png")}
          >
            <Download className="w-3.5 h-3.5" />
            {downloading === "png" ? "Saving…" : `PNG ${OG_CARD_WIDTH}×${OG_CARD_HEIGHT}`}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-1.5"
            disabled={!!downloading}
            onClick={() => handleDownload("svg")}
          >
            <Download className="w-3.5 h-3.5" />
            {downloading === "svg" ? "Saving…" : "SVG"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function IllustrationsPage() {
  useEffect(() => {
    document.title = "OG Illustrations (Internal) — QR Code Generator";
    let el = document.querySelector('meta[name="robots"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "robots");
      document.head.appendChild(el);
    }
    el.setAttribute("content", "noindex, nofollow");
  }, []);

  const mainPages = ogIllustrationSpecs.filter(
    (s) => !s.id.startsWith("qr-") && !s.id.startsWith("blog-"),
  );
  const qrPages = ogIllustrationSpecs.filter((s) => s.id.startsWith("qr-"));
  const blogPages = ogIllustrationSpecs.filter((s) => s.id.startsWith("blog-"));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-muted/30">
        <div className="container py-8 max-w-6xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">OG Illustration Generator</h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                Internal only — not linked on the public site. Download PNG ({OG_CARD_WIDTH}×
                {OG_CARD_HEIGHT}) or SVG for each page. Place files in{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">public/og/</code> when ready.
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-mono">
                /dev/illustrations · {ogIllustrationSpecs.length} images
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-10 max-w-6xl space-y-12">
        <section>
          <h2 className="text-lg font-semibold mb-4">Main pages</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainPages.map((spec) => (
              <IllustrationCard key={spec.id} spec={spec} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">QR type pages</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {qrPages.map((spec) => (
              <IllustrationCard key={spec.id} spec={spec} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Blog posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPages.map((spec) => (
              <IllustrationCard key={spec.id} spec={spec} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
