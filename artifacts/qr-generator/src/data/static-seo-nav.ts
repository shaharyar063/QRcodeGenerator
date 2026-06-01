import { blogPosts } from "@/data/blog-posts";
import { getQrTypePath, qrTypes } from "@/data/qr-types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function linkList(items: { href: string; label: string }[]): string {
  return items
    .map(
      ({ href, label }) =>
        `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`,
    )
    .join("\n          ");
}

/** Crawler-visible internal links injected into prerendered HTML shells. */
export function buildStaticSeoNavHtml(): string {
  const qrLinks = qrTypes.map((type) => ({
    href: getQrTypePath(type.slug),
    label: `${type.label} QR Code`,
  }));

  const resourceLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  const blogLinks = blogPosts.map((post) => ({
    href: `/blog/${post.slug}`,
    label: post.title,
  }));

  return `
    <nav id="static-seo-nav" aria-label="Site navigation">
      <p><a href="/">Home</a></p>
      <h2>QR Code Types</h2>
      <ul>
          ${linkList(qrLinks)}
      </ul>
      <h2>Resources</h2>
      <ul>
          ${linkList(resourceLinks)}
      </ul>
      <h2>Blog Articles</h2>
      <ul>
          ${linkList(blogLinks)}
      </ul>
    </nav>`;
}
