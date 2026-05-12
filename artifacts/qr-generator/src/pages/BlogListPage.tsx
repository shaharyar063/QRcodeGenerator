import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { useSEO } from "@/hooks/useSEO";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogListPage() {
  useSEO({
    title: "QR Code Blog — How to Scan, Create & Use QR Codes in 2025",
    description: "Guides, tutorials, and tips on QR codes: how to scan on iPhone and Android, create WiFi QR codes, static vs dynamic, business card QR codes, and more.",
    canonicalPath: "/blog",
    keywords: "how to scan qr code, how to make a qr code, qr code blog, qr code guide, qr code tips, wifi qr code, qr code business card",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "QR Code Generator Blog",
      "url": "https://qrcodegenerator.app/blog",
      "description": "Guides, tutorials, and tips on creating and using QR codes for business, marketing, and personal projects.",
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `https://qrcodegenerator.app/blog/${post.slug}`,
        "datePublished": post.date,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author
        }
      }))
    }
  });

  const featuredPost = blogPosts[0];
  const restPosts = blogPosts.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-8 pb-10 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            QR Code Guides & Tutorials
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Learn how to create, scan, and use QR codes for your business, events, and personal projects.
          </p>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Featured post */}
          {featuredPost && (
            <article className="mb-12 group">
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="p-8 bg-card border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-3">
                    <span className="bg-primary/10 px-2.5 py-1 rounded-full">Latest Article</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={featuredPost.date}>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {featuredPost.author}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Rest of posts */}
          <div className="grid md:grid-cols-2 gap-8">
            {restPosts.map((post) => (
              <article key={post.slug} className="group relative flex flex-col items-start justify-between p-6 bg-card border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-x-3 text-xs mb-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                </div>
                <div className="group relative flex-1">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
