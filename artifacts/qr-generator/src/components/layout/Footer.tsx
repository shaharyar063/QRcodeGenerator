import { Link } from "wouter";
import { qrTypes } from "@/data/qr-types";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/">
              <Logo size={26} showWordmark={true} />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fast, free QR code generator. No sign-up, no watermarks. PNG, SVG, and JPEG exports.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              Free forever — no account needed
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">QR Types</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {qrTypes.slice(0, 5).map((type) => (
                <li key={type.id}>
                  <Link href={`/qr-code-generator/${type.slug}`} className="hover:text-primary transition-colors">
                    {type.label} QR Code
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">More Types</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {qrTypes.slice(5).map((type) => (
                <li key={type.id}>
                  <Link href={`/qr-code-generator/${type.slug}`} className="hover:text-primary transition-colors">
                    {type.label} QR Code
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Resources</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} QR Generator. All rights reserved.
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
