import { SEOHead } from "@/components/seo/SEOHead";
import { QRGenerator } from "@/components/qr/QRGenerator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShieldCheck, Zap, Download, Paintbrush } from "lucide-react";
import { qrTypes } from "@/data/qr-types";
import { faqData } from "@/data/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";

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
          "offers": {
            "@type": "Offer",
            "price": "0"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      ]
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-24 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Free QR Code Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create custom QR codes in seconds. No signup required. Free forever. Download in high-quality PNG or SVG formats.
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
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">No Signup Required</h3>
              <p className="text-sm text-muted-foreground">Start creating instantly</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Free Forever</h3>
              <p className="text-sm text-muted-foreground">Codes never expire</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">High Quality</h3>
              <p className="text-sm text-muted-foreground">PNG & SVG exports</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Paintbrush className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Fully Custom</h3>
              <p className="text-sm text-muted-foreground">Colors, logos & shapes</p>
            </div>
          </div>
        </div>
      </section>

      {/* QR Types Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Create Any Type of QR Code</h2>
            <p className="text-muted-foreground">
              Choose from 10 different types of QR codes depending on what you want to share. All included for free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {qrTypes.map((type) => (
              <Link 
                key={type.id} 
                href={`/qr-code-generator/${type.slug}`}
                className="group flex flex-col items-center p-6 text-center rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
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
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-border -z-10"></div>
            
            <div className="flex flex-col items-center text-center relative bg-background/50 p-6 rounded-xl border backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-lg ring-4 ring-background">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose Type</h3>
              <p className="text-muted-foreground">Select what data you want your QR code to hold (URL, WiFi, Email, etc).</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative bg-background/50 p-6 rounded-xl border backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-lg ring-4 ring-background">2</div>
              <h3 className="text-xl font-semibold mb-2">Customize</h3>
              <p className="text-muted-foreground">Add your logo, pick colors that match your brand, and tweak the shapes.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative bg-background/50 p-6 rounded-xl border backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-lg ring-4 ring-background">3</div>
              <h3 className="text-xl font-semibold mb-2">Download</h3>
              <p className="text-muted-foreground">Save as high-res PNG for digital use or SVG for professional printing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl prose prose-slate dark:prose-invert">
          <h2 className="text-center text-3xl font-bold mb-8 no-underline">Why Use Our QR Code Generator?</h2>
          <p>
            QR codes have become an essential bridge between the physical and digital worlds. Whether you're a restaurant owner sharing a digital menu, a professional handing out business cards, or an event organizer streamlining check-ins, a reliable QR code generator is a must-have tool.
          </p>
          <p>
            We built this tool because we were tired of "free" generators that hide your codes behind paywalls, force you to create accounts, or limit your downloads to low-resolution images. Our philosophy is simple: generating a QR code should be fast, completely free, and without friction.
          </p>
          <p>
            <strong>Static vs. Dynamic:</strong> The codes generated here are static. This means the data is encoded directly into the pattern itself. The advantage? They will never expire. As long as the website you link to stays online, your QR code will keep working forever. You don't have to worry about a service shutting down and breaking all your printed marketing materials.
          </p>
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
                <AccordionContent className="text-muted-foreground">
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

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create your QR code?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get started right now. No signup, no credit card, no hassle.
          </p>
          <Button size="lg" variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-bold text-base px-8 h-14">
            Start Generating for Free
          </Button>
        </div>
      </section>
    </div>
  );
}
