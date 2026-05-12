import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: object;
}

export function useSEO({ title, description, canonicalPath, jsonLd }: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update canonical link
    if (canonicalPath) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', `https://qrcodegenerator.app${canonicalPath}`);
    }

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      ...(canonicalPath ? [{ property: 'og:url', content: `https://qrcodegenerator.app${canonicalPath}` }] : [])
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Update JSON-LD
    if (jsonLd) {
      let scriptJsonLd = document.querySelector('script[type="application/ld+json"]');
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      // Cleanup JSON-LD on unmount
      const scriptJsonLd = document.querySelector('script[type="application/ld+json"]');
      if (scriptJsonLd) {
        scriptJsonLd.remove();
      }
    };
  }, [title, description, canonicalPath, jsonLd]);
}
