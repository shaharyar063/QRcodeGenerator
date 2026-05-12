import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: object;
  keywords?: string;
}

export function useSEO({ title, description, canonicalPath, jsonLd, keywords }: SEOProps) {
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

    const canonicalUrl = canonicalPath ? `https://qrcodegenerator.app${canonicalPath}` : 'https://qrcodegenerator.app/';

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
      { property: 'og:site_name', content: 'QR Generator' },
      { property: 'og:locale', content: 'en_US' },
    ];

    ogTags.forEach(({ property, content }) => {
      setMeta(`meta[property="${property}"]`, 'content', content);
    });

    const twitterTags: { name: string; content: string }[] = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:site', content: '@qrgenerator' },
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
  }, [title, description, canonicalPath, jsonLd, keywords]);
}
