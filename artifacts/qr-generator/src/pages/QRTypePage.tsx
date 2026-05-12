import { useRoute } from "wouter";
import { QRGenerator } from "@/components/qr/QRGenerator";
import { qrTypes } from "@/data/qr-types";
import { faqData } from "@/data/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import NotFoundPage from "./not-found";

export default function QRTypePage() {
  const [match, params] = useRoute("/qr-code-generator/:type");
  
  if (!match || !params?.type) {
    return <NotFoundPage />;
  }

  const typeConfig = qrTypes.find(t => t.slug === params.type);

  if (!typeConfig) {
    return <NotFoundPage />;
  }

  useSEO({
    title: `Create a ${typeConfig.label} QR Code | Free Generator`,
    description: `Generate a free, custom ${typeConfig.label} QR code. No signup required. Add logos, change colors, and download in high-quality PNG or SVG format.`,
    canonicalPath: `/qr-code-generator/${typeConfig.slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": `${typeConfig.label} QR Generator`,
          "url": `https://qrcodegenerator.app/qr-code-generator/${typeConfig.slug}`,
          "applicationCategory": "UtilitiesApplication"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://qrcodegenerator.app"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "QR Code Generator",
              "item": "https://qrcodegenerator.app"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": typeConfig.label
            }
          ]
        }
      ]
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/" className="hover:text-foreground transition-colors">Generator</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground font-medium">{typeConfig.label}</span>
          </nav>
        </div>
      </div>

      <section className="pt-7 pb-12 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto text-center mb-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {typeConfig.label} QR Code Generator
          </h1>
          <p className="text-base text-muted-foreground">
            Create a custom, high-quality {typeConfig.label} QR code for free.
            Customize colors, add your logo, and download in vector formats.
          </p>
        </div>
        
        <div className="container mx-auto px-0 md:px-4">
          <QRGenerator initialType={typeConfig.id} />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="prose prose-slate dark:prose-invert">
              <h2>How to create a {typeConfig.label} QR code</h2>
              <ol>
                <li>Select the <strong>{typeConfig.label}</strong> tab in the generator above.</li>
                <li>Fill in the required information ({typeConfig.description.toLowerCase()}).</li>
                <li>Customize the design by changing colors, dot styles, and uploading a logo.</li>
                <li>Test the live preview with your smartphone camera.</li>
                <li>Click Download to save your QR code in PNG, JPEG, or SVG format.</li>
              </ol>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Common Use Cases</h2>
              <ul className="space-y-4">
                {typeConfig.id === 'url' && (
                  <>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /><p>Link directly to your company homepage on printed marketing materials.</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /><p>Direct users to an app store download page or promotional landing page.</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /><p>Provide instant access to digital restaurant menus or product catalogs.</p></li>
                  </>
                )}
                {typeConfig.id === 'wifi' && (
                  <>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /><p>Cafes and restaurants offering frictionless guest network access.</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /><p>Offices providing easy internet access for visiting clients or contractors.</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /><p>Airbnb hosts allowing guests to connect instantly without typing complex passwords.</p></li>
                  </>
                )}
                {/* Fallback for others */}
                {['email', 'phone', 'sms', 'vcard', 'whatsapp', 'text', 'location', 'event'].includes(typeConfig.id) && (
                  <>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /><p>Streamlining communication by removing the need to manually type data.</p></li>
                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /><p>Bridging physical print materials with instant digital actions on mobile devices.</p></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.slice(0, 4).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold mb-6">Explore Other QR Types</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {qrTypes.filter(t => t.id !== typeConfig.id).map(type => (
              <Link 
                key={type.id} 
                href={`/qr-code-generator/${type.slug}`}
                className="px-4 py-2 bg-card border rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
