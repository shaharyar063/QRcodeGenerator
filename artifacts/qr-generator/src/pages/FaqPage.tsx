import { faqData } from "@/data/faq";
import { useSEO } from "@/hooks/useSEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FaqPage() {
  useSEO({
    title: "QR Code FAQ — Do QR Codes Expire? Are They Safe? How to Scan?",
    description: "Answers to the most common QR code questions: do QR codes expire, are they safe to scan, static vs dynamic, how to scan on iPhone and Android, and more.",
    canonicalPath: "/faq",
    keywords: "do qr codes expire, are qr codes safe, how to scan qr code, qr code faq, qr code questions, static vs dynamic qr code",
    jsonLd: {
      "@context": "https://schema.org",
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
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-8 pb-10 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            QR Code Frequently Asked Questions
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about QR codes — how they work, whether they expire, how to scan them, and how to create one for free.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
            <h2 className="text-2xl font-bold mb-4">Ready to create a free QR code?</h2>
            <p className="text-muted-foreground mb-6">
              No signup, no watermark, no expiry. All 10 QR code types are free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/">Create a QR Code — Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
