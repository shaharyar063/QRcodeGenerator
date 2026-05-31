import { Link } from "wouter";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryNavQrTypeIds, qrTypes } from "@/data/qr-types";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { SITE_NAME } from "@/lib/site";

const navLinkClass =
  "text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground";

const primaryNavTypes = qrTypes.filter((type) =>
  (primaryNavQrTypeIds as readonly string[]).includes(type.id)
);

const moreNavTypes = qrTypes.filter(
  (type) => !(primaryNavQrTypeIds as readonly string[]).includes(type.id)
);

function QrTypeNavLink({
  type,
  className,
}: {
  type: (typeof qrTypes)[number];
  className?: string;
}) {
  return (
    <Link
      href={`/qr-code-generator/${type.slug}`}
      className={className ?? navLinkClass}
    >
      {type.label} QR Code
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center shrink-0 min-w-0 max-w-[min(100%,280px)] sm:max-w-none"
          aria-label={`${SITE_NAME} home`}
        >
          <BrandLockup logoSize={44} />
        </Link>

        <div className="flex items-center gap-6 md:gap-10 shrink-0">
          <nav className="hidden md:flex items-center gap-8">
            {primaryNavTypes.map((type) => (
              <QrTypeNavLink key={type.id} type={type} />
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`${navLinkClass} inline-flex items-center gap-1 outline-none`}
                >
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {moreNavTypes.map((type) => (
                  <DropdownMenuItem key={type.id} asChild>
                    <Link
                      href={`/qr-code-generator/${type.slug}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <type.icon className="h-4 w-4 shrink-0" />
                      <span>{type.label} QR Code</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4">
              <div className="pt-2 pb-4">
                <BrandLockup logoSize={44} />
              </div>
              <div className="flex flex-col gap-4">
                {primaryNavTypes.map((type) => (
                  <Link
                    key={type.id}
                    href={`/qr-code-generator/${type.slug}`}
                    className="text-lg font-medium"
                  >
                    {type.label} QR Code
                  </Link>
                ))}
                <div className="flex flex-col gap-1.5 pt-4 border-t">
                  <span className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    More QR Types
                  </span>
                  {moreNavTypes.map((type) => (
                    <Link
                      key={type.id}
                      href={`/qr-code-generator/${type.slug}`}
                      className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <type.icon className="h-4 w-4" />
                      <span>{type.label} QR Code</span>
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
