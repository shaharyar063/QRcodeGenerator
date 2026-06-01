import { blogPosts } from "@/data/blog-posts";
import { qrTypes } from "@/data/qr-types";
import { typeContent } from "@/pages/QRTypePage";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export interface RouteSeoMeta {
  path: string;
  title: string;
  description: string;
  ogImage: string;
  keywords?: string;
}

const staticRoutes: RouteSeoMeta[] = [
  {
    path: "/",
    title: `Free ${SITE_NAME} — Create QR Codes Instantly, No Signup`,
    description:
      "Create free, custom QR codes for URLs, WiFi, vCards, WhatsApp, email & more. No signup required. Download high-quality PNG, SVG or JPEG. Codes never expire.",
    ogImage: "og-home",
    keywords:
      "qr code generator, free qr code generator, qr code maker, create qr code, qr code generator free, custom qr code, qr code no signup",
  },
  {
    path: "/faq",
    title: "QR Code FAQ — Do QR Codes Expire? Are They Safe? How to Scan?",
    description:
      "Answers to the most common QR code questions: do QR codes expire, are they safe to scan, static vs dynamic, how to scan on iPhone and Android, and more.",
    ogImage: "og-faq",
    keywords:
      "do qr codes expire, are qr codes safe, how to scan qr code, qr code faq, qr code questions, static vs dynamic qr code",
  },
  {
    path: "/contact",
    title: `Contact | ${SITE_NAME} — Free QR Code Generator Support`,
    description: "Questions about our free QR code generator? Send us a message. We typically respond within 24 hours.",
    ogImage: "og-contact",
  },
  {
    path: "/privacy-policy",
    title: `Privacy Policy | ${SITE_NAME} — No Data Collected, No Tracking`,
    description: `${SITE_NAME} runs entirely in your browser. We do not collect, store, or sell your personal data. Your QR code content never leaves your device.`,
    ogImage: "og-privacy",
  },
  {
    path: "/terms",
    title: `Terms of Service | ${SITE_NAME} — Free Static QR Code Tool`,
    description: `Terms of Service for ${SITE_NAME}. Free static QR codes generated in your browser. No account required. Read our disclaimers and acceptable use rules.`,
    ogImage: "og-terms",
  },
  {
    path: "/blog",
    title: "QR Code Blog — How to Scan, Create & Use QR Codes in 2025",
    description:
      "Guides, tutorials, and tips on QR codes: how to scan on iPhone and Android, create WiFi QR codes, static vs dynamic, business card QR codes, and more.",
    ogImage: "og-blog",
    keywords:
      "how to scan qr code, how to make a qr code, qr code blog, qr code guide, qr code tips, wifi qr code, qr code business card",
  },
];

export function getAllRouteSeoMeta(): RouteSeoMeta[] {
  const qrTypeRoutes: RouteSeoMeta[] = qrTypes.flatMap((type) => {
    const content = typeContent[type.id];
    if (!content) return [];
    return [
      {
        path: `/qr-code-generator/${type.slug}`,
        title: content.metaTitle,
        description: content.metaDescription,
        ogImage: `og-qr-${type.slug}`,
        keywords: content.keywords,
      },
    ];
  });

  const blogRoutes: RouteSeoMeta[] = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.excerpt,
    ogImage: `og-blog-${post.slug}`,
    keywords: `qr code, ${post.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .slice(0, 6)
      .join(", ")}`,
  }));

  return [...staticRoutes, ...qrTypeRoutes, ...blogRoutes];
}

export function canonicalUrlForPath(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function ogImageUrlForMeta(ogImage: string): string {
  return `${SITE_ORIGIN}/og/${ogImage}.webp`;
}
