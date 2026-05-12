import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { useSEO } from "@/hooks/useSEO";
import { Calendar, Clock, User } from "lucide-react";

export default function BlogListPage() {
  useSEO({
    title: "QR Code Generator Blog | Tips, Guides & Use Cases",
    description: "Read our latest articles about how to use QR codes effectively for your business, marketing, and personal projects.",
    canonicalPath: "/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "QR Code Generator Blog",
      "url": "https://qrcodegenerator.app/blog",
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `https://qrcodegenerator.app/blog/${post.slug}`,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": post.author
        }
      }))
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-8 pb-10 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            The QR Code Blog
          </h1>
          <p className="text-base text-muted-foreground">
            Tips, guides, and inspiration for making the most of your QR codes.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group relative flex flex-col items-start justify-between p-6 bg-card border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-x-4 text-xs mb-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-xl font-bold group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
