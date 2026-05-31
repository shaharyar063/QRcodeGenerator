import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  useSEO({
    title: `Page Not Found | ${SITE_NAME}`,
    description: "This page does not exist. Return to the free QR code generator to create URL, WiFi, vCard, and other QR codes.",
    canonicalPath: "/404",
    ogImage: "og-404",
  });

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-4">
        <p className="text-6xl font-bold tracking-tight">404</p>
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground text-sm">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Button asChild>
          <Link href="/">Back to {SITE_NAME}</Link>
        </Button>
      </div>
    </div>
  );
}
