import { useSEO } from "@/hooks/useSEO";

export default function PrivacyPage() {
  useSEO({
    title: "Privacy Policy | QR Generator — No Data Stored, No Tracking",
    description: "QR Generator processes everything in your browser. We never store your QR code data on our servers. Read our full privacy policy.",
    canonicalPath: "/privacy-policy"
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-8 pb-10 px-4 bg-muted/30 border-b">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: May 2024</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate dark:prose-invert">
          <p>
            At QR Generator, your privacy is our priority. This Privacy Policy outlines the types of information we do and do not collect, and how we protect your data.
          </p>

          <h2>1. Data Collection</h2>
          <p>
            Our core QR code generation tool operates entirely in your browser. We do not store the data you enter into the QR code generator on our servers. The processing happens locally on your device.
          </p>

          <h2>2. Local Storage</h2>
          <p>
            We use your browser's local storage to save your visual preferences (like colors, styles, and your last selected QR type) so that the tool is ready for you the next time you visit. This data never leaves your device.
          </p>

          <h2>3. Third-Party Services</h2>
          <p>
            We may use standard analytics tools (like Google Analytics) to understand how visitors interact with our website. These tools may use cookies to collect standard internet log information and visitor behavior information in an anonymous form.
          </p>

          <h2>4. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our Contact page.
          </p>
        </div>
      </section>
    </div>
  );
}
