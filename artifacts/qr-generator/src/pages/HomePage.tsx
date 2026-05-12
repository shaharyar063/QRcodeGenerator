import { QRGenerator } from "@/components/qr/QRGenerator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShieldCheck, Zap, Download, Paintbrush } from "lucide-react";
import { qrTypes } from "@/data/qr-types";
import { faqData } from "@/data/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";
import { LogoMark } from "@/components/brand/Logo";

export default function HomePage() {
  useSEO({
    title: "Free QR Code Generator | No Signup, High Quality",
    description: "Create custom QR codes for URLs, WiFi, VCards, and more. 100% free, no signup required, with high-quality PNG and SVG downloads.",
    canonicalPath: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "QR Generator",
          "url": "https://qrcodegenerator.app",
          "description": "Free online QR code generator with logo support and high-quality vector downloads.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0" }
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
          }))
        }
      ]
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-14 px-4 bg-gradient-to-b from-amber-50/60 to-background">
        <div className="container mx-auto text-center mb-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Free <span className="text-primary">QR Code</span> Generator
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-snug sm:leading-relaxed">
            Create custom QR codes in seconds. No signup required. Free forever.
            Download PNG, SVG, or JPEG instantly.
          </p>
        </div>

        <div className="container mx-auto px-0 md:px-4">
          <QRGenerator />
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-10 border-y bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: ShieldCheck, label: "No Signup Required", sub: "Start creating instantly" },
              { icon: Zap, label: "Free Forever", sub: "Codes never expire" },
              { icon: Download, label: "High Quality", sub: "PNG, SVG & JPEG" },
              { icon: Paintbrush, label: "Fully Custom", sub: "Colors, logos & styles" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm">{label}</h3>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Types Grid */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">10 QR Code Types</h2>
            <p className="text-sm text-muted-foreground">All formats included, completely free.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {qrTypes.map((type) => (
              <Link
                key={type.id}
                href={`/qr-code-generator/${type.slug}`}
                className="group flex flex-col items-center p-4 text-center rounded-xl border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-150"
                data-testid={`link-qr-type-${type.id}`}
              >
                <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center mb-2.5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <type.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm mb-0.5">{type.label}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{type.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-sm text-muted-foreground">Three steps, under a minute.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: 1, title: "Choose Type", desc: "Select what data your QR code should hold — URL, WiFi, email, and more." },
              { n: 2, title: "Customize", desc: "Pick colors, add your logo, and choose a dot style to match your brand." },
              { n: 3, title: "Download", desc: "Save as high-res PNG for digital use or SVG for professional printing." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex flex-col items-center text-center bg-background p-6 rounded-xl border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-sm">
                  {n}
                </div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Use Our QR Code Generator?</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              QR codes bridge the physical and digital worlds. Whether you're a restaurant owner sharing a digital menu, a professional handing out business cards, or an event organizer streamlining check-ins, a reliable QR generator is essential.
            </p>
            <p>
              We built this tool because most "free" generators hide codes behind paywalls, force account creation, or cap you to low-resolution downloads. Our philosophy: generating a QR code should be instant, free, and frictionless.
            </p>
            <p>
              <strong className="text-foreground">Static QR codes never expire.</strong> The data is encoded directly in the pattern — no third-party service dependency. Your printed materials keep working indefinitely.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-card border-t">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">FAQ</h2>
            <p className="text-sm text-muted-foreground">Common questions about QR codes.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqData.slice(0, 6).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/faq">View all FAQs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="flex justify-center mb-4">
            <LogoMark size={44} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to create your QR code?</h2>
          <p className="text-sm opacity-85 mb-6">
            No signup, no credit card, no hassle.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-semibold px-8"
            data-testid="button-cta-scroll-top"
          >
            Start Generating for Free
          </Button>
        </div>
      </section>
    </div>
  );
}
