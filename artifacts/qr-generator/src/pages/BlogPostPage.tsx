import { useRoute } from "wouter";
import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { useSEO } from "@/hooks/useSEO";
import { ChevronRight, Calendar, User, ArrowLeft } from "lucide-react";
import NotFoundPage from "./not-found";
import { Button } from "@/components/ui/button";

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:slug");
  
  if (!match || !params?.slug) {
    return <NotFoundPage />;
  }

  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return <NotFoundPage />;
  }

  useSEO({
    title: `${post.title} | QR Generator Blog`,
    description: post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "description": post.excerpt
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Link>
          
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
            <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </header>

          <div 
            className="prose prose-slate prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/\n\n/g, '<br/><br/>').replace(/### (.*?)\n/g, '<h3>$1</h3>') 
            }}
          />

          <div className="mt-16 pt-8 border-t">
            <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
              <h2 className="text-2xl font-bold mb-4">Ready to create your own QR code?</h2>
              <p className="text-muted-foreground mb-6">Our tool is completely free, with no signup required.</p>
              <Button asChild size="lg">
                <Link href="/">Create QR Code Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
