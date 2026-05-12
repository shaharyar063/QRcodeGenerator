import { Link } from "wouter";
import { qrTypes } from "@/data/qr-types";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="space-y-4">
            <Link href="/">
              <Logo size={26} showWordmark={true} />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Fast, free, and secure QR code generator. No sign-up required, no watermarks, and high-quality exports in PNG, SVG, and JPEG.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              Free forever — no account needed
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">QR Code Types</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {qrTypes.slice(0, 5).map((type) => (
                <li key={type.id}>
                  <Link
                    href={`/qr-code-generator/${type.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {type.label} QR Code
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">More Types</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {qrTypes.slice(5).map((type) => (
                <li key={type.id}>
                  <Link
                    href={`/qr-code-generator/${type.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {type.label} QR Code
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} QR Generator. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground flex gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
