import { Link } from "wouter";
import { qrTypes } from "@/data/qr-types";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { SITE_DOMAIN, SITE_NAME } from "@/lib/site";

const footerLinkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col gap-10 pb-10 mb-10 border-b border-border">
          <Link
            href="/"
            aria-label={`${SITE_NAME} home`}
            className="inline-flex w-fit max-w-full"
          >
            <BrandLockup logoSize={48} />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Fast, free QR code generator at {SITE_DOMAIN}. No sign-up, no watermarks.
            PNG, SVG, and JPEG exports.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-12">
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">QR Types</h4>
            <ul className="space-y-2">
              {qrTypes.slice(0, 5).map((type) => (
                <li key={type.id}>
                  <Link href={`/qr-code-generator/${type.slug}`} className={footerLinkClass}>
                    {type.label} QR Code
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">More Types</h4>
            <ul className="space-y-2">
              {qrTypes.slice(5).map((type) => (
                <li key={type.id}>
                  <Link href={`/qr-code-generator/${type.slug}`} className={footerLinkClass}>
                    {type.label} QR Code
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="font-medium text-sm text-foreground">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className={footerLinkClass}>Blog</Link></li>
              <li><Link href="/faq" className={footerLinkClass}>FAQ</Link></li>
              <li><Link href="/contact" className={footerLinkClass}>Contact</Link></li>
              <li><Link href="/privacy-policy" className={footerLinkClass}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={footerLinkClass}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} {SITE_DOMAIN}. All rights reserved.
          </p>
          <div className="text-xs text-muted-foreground flex gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
