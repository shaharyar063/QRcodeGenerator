import { QRGenerator } from "@/components/qr/QRGenerator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShieldCheck, Zap, Download, Paintbrush, Users, Globe, Lock } from "lucide-react";
import { qrTypes } from "@/data/qr-types";
import { faqData } from "@/data/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";
import { LogoMark } from "@/components/brand/Logo";

export default function HomePage() {
  useSEO({
    title: "Free QR Code Generator — Create QR Codes Instantly, No Signup",
    description: "Create free, custom QR codes for URLs, WiFi, vCards, WhatsApp, email & more. No signup required. Download high-quality PNG, SVG or JPEG. Codes never expire.",
    canonicalPath: "/",
    keywords: "qr code generator, free qr code generator, qr code maker, create qr code, qr code generator free, custom qr code, qr code no signup",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "Free QR Code Generator",
          "url": "https://qrcodegenerator.app",
          "description": "Create free QR codes for URLs, WiFi, vCards, WhatsApp, email, SMS, phone, location and events. No signup, no watermark, codes never expire.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": [
            "URL QR Codes", "WiFi QR Codes", "vCard QR Codes", "WhatsApp QR Codes",
            "Email QR Codes", "SMS QR Codes", "Custom logo and colors",
            "PNG SVG JPEG download", "No signup required", "Codes never expire"
          ]
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
      <section className="pt-6 pb-12 md:pt-8 md:pb-14 px-4 bg-gradient-to-b from-blue-50/60 to-background">
        <div className="container mx-auto text-center mb-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Free <span className="text-primary">QR Code</span> Generator
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-snug sm:leading-relaxed">
            Create custom QR codes for URLs, WiFi, vCards, WhatsApp, email and more.
            No account needed. Download PNG, SVG, or JPEG instantly.
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
              { icon: Download, label: "High Quality Exports", sub: "PNG, SVG & JPEG" },
              { icon: Paintbrush, label: "Fully Customizable", sub: "Colors, logos & styles" },
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
            <h2 className="text-2xl md:text-3xl font-bold mb-2">10 QR Code Types — All Free</h2>
            <p className="text-sm text-muted-foreground">URL, WiFi, vCard, WhatsApp, Email, SMS, Phone, Location, Event, and Text.</p>
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
                <h3 className="font-semibold text-sm mb-0.5">{type.label} QR Code</h3>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-2">How to Create a QR Code</h2>
            <p className="text-sm text-muted-foreground">Three steps. Under 60 seconds. Completely free.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: 1, title: "Choose Your Type", desc: "Select what your QR code should do — link to a URL, share WiFi, save contact info, open WhatsApp, and more." },
              { n: 2, title: "Customize the Design", desc: "Change colors, pick a dot style, and add your brand logo. The preview updates live as you make changes." },
              { n: 3, title: "Download & Use", desc: "Save as high-res PNG for digital use or crisp SVG for professional print. No signup, no watermark, no expiry." },
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

      {/* Why Us — SEO content block targeting competitor weaknesses */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">Why Use Our QR Code Generator?</h2>
          <p className="text-center text-sm text-muted-foreground mb-10 max-w-2xl mx-auto">
            Most "free" generators push paywalls, force account creation, or watermark your downloads. We don't.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Lock,
                title: "Truly Free — No Upsells",
                desc: "Every feature is free. No \"Pro\" badge blocking SVG downloads. No subscription. No credit card. We mean it."
              },
              {
                icon: ShieldCheck,
                title: "Privacy-First, No Tracking",
                desc: "Static QR codes encode data directly — no redirect server, no scan tracking, no third-party dependency. Your data stays yours."
              },
              {
                icon: Zap,
                title: "Static Codes Last Forever",
                desc: "Our codes are static: the destination is baked into the pattern. They work indefinitely — not until you cancel a subscription."
              },
              {
                icon: Globe,
                title: "Works on Every Device",
                desc: "iPhone, Android, tablets, and desktop browsers. No app download required. Scan natively with the built-in camera app."
              },
              {
                icon: Paintbrush,
                title: "Professional Quality",
                desc: "Download in SVG vector format — infinitely scalable for any print size from business cards to large-format banners."
              },
              {
                icon: Users,
                title: "10 QR Code Types",
                desc: "URL, WiFi, vCard, WhatsApp, Email, SMS, Phone, Location, Event, and Text — all supported for free in one tool."
              }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content — targeting "qr code generator" informational intent */}
      <section className="py-14 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">About QR Codes</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              A QR (Quick Response) code is a two-dimensional barcode that stores information in a grid of black and white squares. Smartphones read them instantly with the built-in camera — no separate app required on iPhone (iOS 11+) or most Android devices. They can encode URLs, WiFi credentials, contact details, calendar events, plain text, and much more.
            </p>
            <p>
              QR codes bridge the physical and digital worlds. Whether you are a restaurant owner sharing a digital menu, a professional handing out business cards, or an event organizer streamlining check-ins, a reliable QR code generator is essential. Our tool supports all 10 major QR code types — and every one of them is free.
            </p>
            <p>
              <strong className="text-foreground">Static QR codes never expire.</strong> Unlike dynamic QR codes that rely on a redirect server (and stop working if you cancel a subscription), static codes encode data directly into the pattern. The code printed on your business cards today will still work in ten years.
            </p>
            <p>
              We built this tool because most "free" generators hide features behind paywalls, force account creation, cap you to low-resolution downloads, or add watermarks. Our philosophy: generating a high-quality QR code should be instant, completely free, and frictionless — with no strings attached.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-card border-t">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground">Common questions about QR codes and our free generator.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqData.slice(0, 7).map((faq, index) => (
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
              <Link href="/faq">View All FAQs</Link>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to create your free QR code?</h2>
          <p className="text-sm opacity-85 mb-6">
            No signup. No credit card. No watermark. No expiry.
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
