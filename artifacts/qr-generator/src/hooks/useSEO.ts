import { useEffect } from 'react';
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  ogImageUrl,
  SITE_ORIGIN,
} from '@/lib/og-images';
import { SITE_NAME } from '@/lib/site';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: object;
  keywords?: string;
  /** OG image filename without extension, e.g. "og-home" */
  ogImage?: string;
}

export function useSEO({ title, description, canonicalPath, jsonLd, keywords, ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const parts = selector.match(/\[([^=]+)="([^"]+)"\]/);
        if (parts) el.setAttribute(parts[1], parts[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    if (keywords) setMeta('meta[name="keywords"]', 'content', keywords);

    const canonicalUrl = canonicalPath ? `${SITE_ORIGIN}${canonicalPath}` : `${SITE_ORIGIN}/`;
    const imageFilename = ogImage ?? DEFAULT_OG_IMAGE;
    const imageUrl = ogImageUrl(imageFilename);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    const ogTags: { property: string; content: string }[] = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
      { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
      { property: 'og:image:alt', content: title },
    ];

    ogTags.forEach(({ property, content }) => {
      setMeta(`meta[property="${property}"]`, 'content', content);
    });

    const twitterTags: { name: string; content: string }[] = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:site', content: '@qrgenerator' },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: title },
    ];
    twitterTags.forEach(({ name, content }) => {
      setMeta(`meta[name="${name}"]`, 'content', content);
    });

    if (jsonLd) {
      const existing = document.querySelectorAll('script[type="application/ld+json"][data-page]');
      existing.forEach(s => s.remove());

      const scriptJsonLd = document.createElement('script');
      scriptJsonLd.setAttribute('type', 'application/ld+json');
      scriptJsonLd.setAttribute('data-page', 'true');
      scriptJsonLd.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptJsonLd);
    }

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"][data-page]');
      scripts.forEach(s => s.remove());
    };
  }, [title, description, canonicalPath, jsonLd, keywords, ogImage]);
}
