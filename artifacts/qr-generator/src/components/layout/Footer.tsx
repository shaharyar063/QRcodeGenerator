import { Link } from "wouter";
import { QrCode } from "lucide-react";
import { qrTypes } from "@/data/qr-types";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <QrCode className="h-6 w-6 text-primary" />
              <span>QR Generator</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Fast, free, and secure QR code generator. No sign-up required, no watermarks, and high-quality exports.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">QR Code Types</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {qrTypes.slice(0, 5).map((type) => (
                <li key={type.id}>
                  <Link href={`/qr-code-generator/${type.slug}`} className="hover:text-foreground transition-colors">
                    {type.label} QR Code
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">More Types</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {qrTypes.slice(5).map((type) => (
                <li key={type.id}>
                  <Link href={`/qr-code-generator/${type.slug}`} className="hover:text-foreground transition-colors">
                    {type.label} QR Code
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} QR Generator. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground flex gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
