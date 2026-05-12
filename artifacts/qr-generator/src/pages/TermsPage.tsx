import { useSEO } from "@/hooks/useSEO";

export default function TermsPage() {
  useSEO({
    title: "Terms of Service | QR Code Generator",
    description: "Read our terms of service for using the QR Code Generator app.",
    canonicalPath: "/terms"
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-8 pb-10 px-4 bg-muted/30 border-b">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Last updated: May 2024</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate dark:prose-invert">
          <p>
            Welcome to QR Generator. By accessing or using our website, you agree to be bound by these Terms of Service.
          </p>

          <h2>1. Use of Service</h2>
          <p>
            QR Generator provides a free tool for generating static QR codes. You may use this service for both personal and commercial purposes. There are no limits on the number of QR codes you can generate.
          </p>

          <h2>2. User Content</h2>
          <p>
            You are solely responsible for the data you encode into your QR codes. You agree not to generate QR codes that link to malicious software, illegal content, or material that violates the rights of third parties.
          </p>

          <h2>3. Disclaimers</h2>
          <p>
            The service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, completely secure, or error-free. We are not responsible for broken links if the destination URL you provided becomes inactive.
          </p>

          <h2>4. Liability</h2>
          <p>
            In no event shall QR Generator or its operators be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the service or the generated QR codes.
          </p>

          <h2>5. Modifications</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. Your continued use of the service following the posting of any changes constitutes acceptance of those changes.
          </p>
        </div>
      </section>
    </div>
  );
}
