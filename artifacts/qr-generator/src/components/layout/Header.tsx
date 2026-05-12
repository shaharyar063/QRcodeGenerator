import { Link } from "wouter";
import { QrCode, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { qrTypes } from "@/data/qr-types";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <QrCode className="h-6 w-6 text-primary" />
          <span>QR Generator</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Generator</Link>
          <div className="relative group">
            <span className="cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60">QR Types</span>
            <div className="absolute left-0 top-full hidden w-[400px] pt-2 group-hover:block">
              <div className="grid grid-cols-2 gap-2 rounded-md border bg-popover p-4 shadow-md">
                {qrTypes.map((type) => (
                  <Link
                    key={type.id}
                    href={`/qr-code-generator/${type.slug}`}
                    className="flex items-center gap-2 rounded-sm p-2 hover:bg-muted"
                  >
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">Blog</Link>
          <Link href="/faq" className="transition-colors hover:text-foreground/80 text-foreground/60">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/">Create QR Code</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 pt-4">
                <Link href="/" className="text-lg font-medium">Generator</Link>
                <Link href="/blog" className="text-lg font-medium">Blog</Link>
                <Link href="/faq" className="text-lg font-medium">FAQ</Link>
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <span className="font-semibold text-sm text-muted-foreground">QR Types</span>
                  {qrTypes.map((type) => (
                    <Link
                      key={type.id}
                      href={`/qr-code-generator/${type.slug}`}
                      className="flex items-center gap-2 py-1 text-sm"
                    >
                      <type.icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
