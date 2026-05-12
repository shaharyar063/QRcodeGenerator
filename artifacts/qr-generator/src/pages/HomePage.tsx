import { QRGenerator } from "@/components/qr/QRGenerator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShieldCheck, Zap, Download, Paintbrush } from "lucide-react";
import { qrTypes } from "@/data/qr-types";
import { faqData } from "@/data/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";
import { LogoMark } from "@/components/brand/Logo";
import { BrandCorner } from "@/components/brand/BrandCorner";

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
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-24 px-4 overflow-hidden">
        {/* Subtle brand-amber gradient wash */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(160deg, hsl(38 100% 97%) 0%, hsl(0 0% 100%) 55%)",
          }}
        />
        {/* Decorative large brand corners in hero background */}
        <div className="absolute top-8 left-8 -z-10 hidden lg:block">
          <BrandCorner size={48} opacity={0.08} />
        </div>
        <div className="absolute top-8 right-8 -z-10 hidden lg:block">
          <BrandCorner size={48} opacity={0.08} className="rotate-90" />
        </div>
        <div className="absolute bottom-12 left-12 -z-10 hidden lg:block">
          <BrandCorner size={32} opacity={0.06} className="-rotate-90" />
        </div>
        <div className="absolute bottom-12 right-12 -z-10 hidden lg:block">
          <BrandCorner size={32} opacity={0.06} className="rotate-180" />
        </div>

        <div className="container mx-auto text-center mb-12">
          {/* Brand mark badge */}
          <div className="inline-flex items-center gap-2.5 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <LogoMark size={18} />
            <span>Free Forever — No Account Required</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-tight">
            Free{" "}
            <span className="text-primary">QR Code</span>{" "}
            Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create custom QR codes in seconds. No signup required. Free forever.
            Download in high-quality PNG, SVG, or JPEG.
          </p>
        </div>

        <div className="container mx-auto px-0 md:px-4">
          <QRGenerator />
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 border-y bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: ShieldCheck, label: "No Signup Required", sub: "Start creating instantly" },
              { icon: Zap, label: "Free Forever", sub: "Codes never expire" },
              { icon: Download, label: "High Quality", sub: "PNG, SVG & JPEG exports" },
              { icon: Paintbrush, label: "Fully Custom", sub: "Colors, logos & shapes" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">{label}</h3>
                <p className="text-sm text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Types Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Create Any Type of QR Code</h2>
            <p className="text-muted-foreground">
              Choose from 10 different types depending on what you want to share. All included for free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {qrTypes.map((type) => (
              <Link
                key={type.id}
                href={`/qr-code-generator/${type.slug}`}
                className="group flex flex-col items-center p-6 text-center rounded-2xl border-2 bg-card hover:border-primary/60 hover:shadow-md transition-all duration-200"
                data-testid={`link-qr-type-${type.id}`}
              >
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">{type.label}</h3>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Generating a custom QR code is simple and takes less than a minute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-border -z-10" />
            {[
              { n: 1, title: "Choose Type", desc: "Select what data you want your QR code to hold — URL, WiFi, email, and more." },
              { n: 2, title: "Customize", desc: "Add your logo, pick brand colors, and tweak dot styles to make it your own." },
              { n: 3, title: "Download", desc: "Save as high-res PNG for digital use or SVG for professional print work." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex flex-col items-center text-center relative bg-background/60 p-6 rounded-2xl border-2 backdrop-blur-sm">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-extrabold mb-6 mx-auto shadow-lg ring-4 ring-background">
                  {n}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center text-3xl font-bold mb-8">Why Use Our QR Code Generator?</h2>
          <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
            <p>
              QR codes have become an essential bridge between the physical and digital worlds. Whether you're a restaurant owner sharing a digital menu, a professional handing out business cards, or an event organizer streamlining check-ins, a reliable QR code generator is a must-have tool.
            </p>
            <p>
              We built this tool because we were tired of "free" generators that hide codes behind paywalls, force you to create accounts, or limit downloads to low-resolution images. Our philosophy is simple: generating a QR code should be fast, completely free, and without friction.
            </p>
            <p>
              <strong className="text-foreground">Static vs. Dynamic:</strong> The codes generated here are static — the data is encoded directly into the pattern itself. They will never expire. As long as the destination URL stays live, your QR code works forever, with no dependence on a third-party service.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about creating and using QR codes.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqData.slice(0, 6).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/faq">View all FAQs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA — branded with logo mark */}
      <section className="relative py-24 bg-primary text-primary-foreground text-center overflow-hidden">
        {/* Decorative brand corners */}
        <div className="absolute top-6 left-6 opacity-20">
          <BrandCorner size={40} opacity={1} className="" style={{ filter: "brightness(10)" }} />
        </div>
        <div className="absolute top-6 right-6 opacity-20">
          <BrandCorner size={40} opacity={1} className="rotate-90" style={{ filter: "brightness(10)" }} />
        </div>
        <div className="absolute bottom-6 left-6 opacity-20">
          <BrandCorner size={40} opacity={1} className="-rotate-90" style={{ filter: "brightness(10)" }} />
        </div>
        <div className="absolute bottom-6 right-6 opacity-20">
          <BrandCorner size={40} opacity={1} className="rotate-180" style={{ filter: "brightness(10)" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <LogoMark size={52} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">Ready to create your QR code?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get started right now. No signup, no credit card, no hassle.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold text-base px-8 h-14 shadow-xl"
            data-testid="button-cta-scroll-top"
          >
            Start Generating for Free
          </Button>
        </div>
      </section>
    </div>
  );
}
