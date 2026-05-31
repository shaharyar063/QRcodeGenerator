import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { SITE_DOMAIN, SITE_EMAIL, SITE_NAME } from "@/lib/site";

export default function TermsPage() {
  useSEO({
    title: `Terms of Service | ${SITE_NAME} — Free Static QR Code Tool`,
    description:
      `Terms of Service for ${SITE_NAME}. Free static QR codes generated in your browser. No account required. Read our disclaimers and acceptable use rules.`,
    canonicalPath: "/terms",
    ogImage: "og-terms",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-8 pb-10 px-4 bg-muted/30 border-b">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Last updated: May 30, 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-li:text-muted-foreground">
          <p className="text-foreground font-medium text-base leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of {SITE_NAME} at{" "}
            {SITE_DOMAIN} (the &quot;Service&quot;). By using the Service, you agree to these Terms. If you do
            not agree, please do not use the Service.
          </p>

          <h2>1. What we provide</h2>
          <p>
            {SITE_NAME} is a free online tool that lets you create <strong>static</strong> QR codes in your
            browser. The Service runs client-side on your device. We do not store the content you enter or the
            QR codes you generate on our servers. No account or payment is required.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            You must be able to form a binding agreement under applicable law to use the Service. If you use the
            Service on behalf of an organization, you represent that you have authority to bind that organization
            to these Terms.
          </p>

          <h2>3. Your content and responsibility</h2>
          <p>
            You are solely responsible for the information you encode into QR codes and for how you use, print,
            publish, or distribute them. You agree that you will not use the Service to create QR codes that:
          </p>
          <ul>
            <li>Link to malware, phishing pages, scams, or other harmful or deceptive content</li>
            <li>Promote illegal activity or violate applicable laws or regulations</li>
            <li>Infringe intellectual property, privacy, or other rights of any person or entity</li>
            <li>Harass, defame, or threaten others</li>
          </ul>
          <p>
            We do not review, monitor, or control the content you enter. Because processing happens in your
            browser, we generally have no knowledge of what your QR codes contain.
          </p>

          <h2>4. Static QR codes</h2>
          <p>
            QR codes created with this Service are static: the destination or data is embedded in the code itself.
            We do not provide redirect services, scan analytics, or the ability to edit a code after creation.
            You are responsible for verifying that encoded URLs, contact details, WiFi credentials, and other
            data are correct before downloading or sharing a QR code.
          </p>
          <p>
            We are not responsible if a destination URL stops working, if a WiFi password changes, if contact
            details become outdated, or if a third-party service linked by your QR code becomes unavailable.
          </p>

          <h2>5. No professional advice</h2>
          <p>
            The Service is provided for general informational and utility purposes only. It does not constitute
            legal, security, marketing, or technical advice. You should test QR codes before relying on them for
            business, safety-critical, or high-stakes uses.
          </p>

          <h2>6. Intellectual property</h2>
          <p>
            We own or license the website design, branding, code, and content we create for the Service, except
            for content you supply. You retain ownership of the data you enter and the QR code images you
            generate. We grant you a personal, non-exclusive, royalty-free license to use the Service to create
            and download QR codes for personal or commercial use, subject to these Terms.
          </p>
          <p>
            You may not copy, reverse engineer, scrape, or resell the Service itself, attempt to overload our
            infrastructure, or use automated means to access the site in a way that interferes with its operation.
          </p>

          <h2>7. Disclaimer of warranties</h2>
          <p>
            THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND,
            WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, error-free, secure, or free of viruses or
            other harmful components, or that generated QR codes will scan correctly in every environment, device,
            or printing condition.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {SITE_NAME.toUpperCase()} AND ITS OWNERS, OPERATORS, AFFILIATES,
            AND SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED
            TO YOUR USE OF — OR INABILITY TO USE — THE SERVICE OR ANY QR CODES YOU CREATE, DOWNLOAD, OR DISTRIBUTE.
          </p>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR
            RELATING TO THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US TO USE THE SERVICE
            IN THE TWELVE MONTHS BEFORE THE CLAIM (WHICH IS ZERO FOR FREE USE) OR (B) ONE U.S. DOLLAR (US $1.00).
          </p>
          <p>
            Some jurisdictions do not allow certain limitations of liability. In those jurisdictions, our liability
            will be limited to the greatest extent permitted by law.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless {SITE_NAME} and its owners, operators, affiliates,
            and suppliers from and against any claims, damages, losses, liabilities, costs, and expenses (including
            reasonable attorneys&apos; fees) arising out of or related to your use of the Service, your QR code content,
            or your violation of these Terms or applicable law.
          </p>

          <h2>10. Privacy</h2>
          <p>
            Our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle information. By using the
            Service, you also agree to the Privacy Policy.
          </p>

          <h2>11. Changes to the Service and Terms</h2>
          <p>
            We may modify, suspend, or discontinue any part of the Service at any time without notice. We may
            also update these Terms from time to time. When we do, we will update the &quot;Last updated&quot; date at
            the top of this page. Your continued use of the Service after changes become effective constitutes
            acceptance of the revised Terms.
          </p>

          <h2>12. Termination</h2>
          <p>
            You may stop using the Service at any time. We may restrict access to the Service if we reasonably
            believe you have violated these Terms or are using the Service in a way that could harm us or others.
          </p>

          <h2>13. General</h2>
          <p>
            These Terms constitute the entire agreement between you and us regarding the Service and supersede
            prior agreements on that subject. If any provision is found unenforceable, the remaining provisions
            will remain in effect. Our failure to enforce a provision is not a waiver of our right to do so later.
          </p>

          <h2>14. Contact</h2>
          <p>
            Questions about these Terms? Contact us at{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> or through our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
