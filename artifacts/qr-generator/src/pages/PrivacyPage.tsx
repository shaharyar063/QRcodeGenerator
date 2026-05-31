import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { SITE_DOMAIN, SITE_EMAIL, SITE_NAME } from "@/lib/site";

export default function PrivacyPage() {
  useSEO({
    title: `Privacy Policy | ${SITE_NAME} — No Data Collected, No Tracking`,
    description:
      `${SITE_NAME} runs entirely in your browser. We do not collect, store, or sell your personal data. Your QR code content never leaves your device.`,
    canonicalPath: "/privacy-policy",
    ogImage: "og-privacy",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-8 pb-10 px-4 bg-muted/30 border-b">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: May 30, 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-li:text-muted-foreground">
          <p className="text-foreground font-medium text-base leading-relaxed">
            {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates {SITE_DOMAIN}. This Privacy Policy
            explains what we do — and do not do — with information when you use our website.
          </p>

          <h2>The short version</h2>
          <ul>
            <li>We do <strong>not</strong> collect, store, or sell your personal data on our servers.</li>
            <li>QR codes are generated <strong>entirely in your browser</strong>. The text, URLs, WiFi details, contact info, or other content you enter is <strong>never sent to us</strong>.</li>
            <li>We do <strong>not</strong> use analytics, tracking pixels, or advertising networks on this site.</li>
            <li>We do <strong>not</strong> require an account, email address, or sign-up to use the generator.</li>
          </ul>

          <h2>1. How our service works</h2>
          <p>
            {SITE_NAME} is a static, client-side web application. When you create a QR code, all processing
            happens locally on your device using JavaScript in your browser. The resulting QR code is built from
            the information you provide and is not uploaded to our servers because we do not operate a backend
            that receives or stores your QR content.
          </p>
          <p>
            Because our QR codes are <strong>static</strong>, the data is encoded directly into the image. We do
            not host redirect links, scan logs, or editable destinations for the codes you create here.
          </p>

          <h2>2. Information we do not collect</h2>
          <p>We do not intentionally collect or maintain on our servers:</p>
          <ul>
            <li>Names, email addresses, phone numbers, or other contact details (unless you choose to email us directly)</li>
            <li>The content you enter into the QR code generator (URLs, WiFi passwords, vCard data, messages, etc.)</li>
            <li>Generated QR code images or download history</li>
            <li>Payment information (the service is free; we do not process payments)</li>
            <li>Account credentials (no accounts are offered)</li>
            <li>Analytics or behavioral profiles about how you use the site</li>
          </ul>

          <h2>3. Information stored on your device only</h2>
          <p>
            To improve your experience on repeat visits, we may save certain <strong>non-personal preferences</strong> in
            your browser&apos;s local storage on your device, such as:
          </p>
          <ul>
            <li>Your last selected QR code type</li>
            <li>Visual customization settings (colors, styles, and similar design options)</li>
          </ul>
          <p>
            This information stays on your device. We do not receive it, and it is not transmitted to our servers.
            You can clear it at any time through your browser settings (for example, by clearing site data or local storage
            for this website).
          </p>

          <h2>4. Cookies</h2>
          <p>
            We do not set cookies to identify you, track you, or build advertising profiles. If your browser stores
            any technical data related to this site, it is limited to standard local storage as described above.
          </p>

          <h2>5. Third-party services</h2>
          <p>
            We load web fonts from Google Fonts to display the site. When you visit our website, your browser may
            request font files from Google&apos;s servers. That request is made directly between your browser and Google;
            we do not control Google&apos;s practices. For more information, see{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google&apos;s Privacy Policy
            </a>.
          </p>
          <p>
            Our website is hosted on static hosting infrastructure. Like most websites, basic technical information
            (such as IP address, browser type, and requested page) may be processed by our hosting provider in
            server or CDN logs for security and delivery purposes. We do not use those logs to identify users or
            link them to QR code content, because we never receive that content.
          </p>

          <h2>6. Contact form and email</h2>
          <p>
            If you contact us through our Contact page or by email, we will receive whatever information you choose
            to send (such as your name, email address, and message). We use that information only to respond to
            your inquiry. We do not sell contact messages to third parties.
          </p>

          <h2>7. Children&apos;s privacy</h2>
          <p>
            Our service is intended for general use and is not directed at children under 13. We do not knowingly
            collect personal information from children. If you believe a child has contacted us with personal
            information, please reach out and we will delete it.
          </p>

          <h2>8. Your choices</h2>
          <p>
            Because we do not maintain personal data profiles about generator users, there is typically nothing
            for us to access, correct, or delete on our servers regarding your QR code activity. You remain in
            control of the data on your device and can clear browser storage at any time.
          </p>

          <h2>9. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot;
            date at the top of this page. Continued use of the website after changes are posted means you accept
            the updated policy. If we ever introduce practices that materially change how we handle data, we will
            update this page accordingly before or when those practices take effect.
          </p>

          <h2>10. Contact us</h2>
          <p>
            Questions about this Privacy Policy? Contact us at{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> or through our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
