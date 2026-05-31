import { blogPosts } from "@/data/blog-posts";
import { qrTypes } from "@/data/qr-types";
import { SITE_NAME } from "@/lib/site";
import type { OgVariant } from "@/components/illustrations/OgIllustration";

export interface OgIllustrationSpec {
  id: string;
  filename: string;
  title: string;
  subtitle: string;
  variant: OgVariant;
  /** Where this image is intended to be used on the site */
  forPage: string;
}

const staticPages: OgIllustrationSpec[] = [
  {
    id: "home",
    filename: "og-home",
    title: "Free QR Code Generator",
    subtitle: "Create & download instantly — no signup required",
    variant: "home",
    forPage: "/",
  },
  {
    id: "faq",
    filename: "og-faq",
    title: "QR Code FAQ",
    subtitle: "Answers to common questions about QR codes",
    variant: "faq",
    forPage: "/faq",
  },
  {
    id: "blog",
    filename: "og-blog",
    title: "QR Code Blog",
    subtitle: "Guides, tips & best practices",
    variant: "blog",
    forPage: "/blog",
  },
  {
    id: "contact",
    filename: "og-contact",
    title: "Contact Us",
    subtitle: "Questions & feedback welcome",
    variant: "contact",
    forPage: "/contact",
  },
  {
    id: "privacy",
    filename: "og-privacy",
    title: "Privacy Policy",
    subtitle: "No data collected — client-side only",
    variant: "privacy",
    forPage: "/privacy-policy",
  },
  {
    id: "terms",
    filename: "og-terms",
    title: "Terms of Service",
    subtitle: "Free static QR code generator",
    variant: "terms",
    forPage: "/terms",
  },
  {
    id: "404",
    filename: "og-404",
    title: "Page Not Found",
    subtitle: "This QR code leads nowhere",
    variant: "not-found",
    forPage: "404 pages",
  },
  {
    id: "default",
    filename: "og-default",
    title: SITE_NAME,
    subtitle: "Free QR codes for URL, WiFi, vCard & more",
    variant: "default",
    forPage: "Site-wide fallback OG image",
  },
];

const qrTypePages: OgIllustrationSpec[] = qrTypes.map((type) => ({
  id: `qr-${type.id}`,
  filename: `og-qr-${type.slug}`,
  title: `${type.label} QR Code Generator`,
  subtitle: type.description,
  variant: `qr-${type.id}` as OgVariant,
  forPage: `/qr-code-generator/${type.slug}`,
}));

const blogPages: OgIllustrationSpec[] = blogPosts.map((post) => ({
  id: `blog-${post.slug}`,
  filename: `og-blog-${post.slug}`,
  title: post.title.length > 52 ? `${post.title.slice(0, 49)}…` : post.title,
  subtitle: `${SITE_NAME} Blog`,
  variant: "blog-post" as OgVariant,
  forPage: `/blog/${post.slug}`,
}));

export const ogIllustrationSpecs: OgIllustrationSpec[] = [
  ...staticPages,
  ...qrTypePages,
  ...blogPages,
];

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Inner white card bounds — preview and downloads use this region only */
export const OG_CARD_INSET = 48;
export const OG_CARD_X = OG_CARD_INSET;
export const OG_CARD_Y = OG_CARD_INSET;
export const OG_CARD_WIDTH = OG_WIDTH - OG_CARD_INSET * 2;
export const OG_CARD_HEIGHT = OG_HEIGHT - OG_CARD_INSET * 2;
