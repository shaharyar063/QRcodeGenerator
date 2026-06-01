import { useRoute } from "wouter";
import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { useSEO } from "@/hooks/useSEO";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import { ChevronRight, Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import NotFoundPage from "./not-found";
import { Button } from "@/components/ui/button";

function renderMarkdown(content: string): string {
  return content
    .trim()
    .replace(/### (.*?)(\n|$)/g, '<h2 class="text-xl font-bold mt-8 mb-3 text-foreground">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/^(\d+)\. (.*?)(\n|$)/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/^- (.*?)(\n|$)/gm, '<li class="ml-4 list-disc text-muted-foreground">$1</li>')
    .replace(/(<li.*<\/li>)\n(<li)/g, '$1$2')
    .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">')
    .replace(/^/, '<p class="text-muted-foreground leading-relaxed mb-4">')
    .concat('</p>');
}

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:slug");
  
  if (!match || !params?.slug) {
    return <NotFoundPage />;
  }

  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  useSEO({
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    ogImage: `og-blog-${post.slug}`,
    keywords: `qr code, ${post.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').slice(0, 6).join(', ')}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "dateModified": post.date,
      "description": post.excerpt,
      "url": `${SITE_ORIGIN}/blog/${post.slug}`,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME,
        "url": SITE_ORIGIN
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/blog/${post.slug}`
      }
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all articles
          </Link>
          
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{readingTime} min read</span>
            </div>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed border-l-4 border-foreground pl-4 italic">
              {post.excerpt}
            </p>
          </header>

          <div
            className="prose prose-slate prose-base dark:prose-invert max-w-none [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-muted-foreground [&_li]:leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold [&_ol]:space-y-2 [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{ 
              __html: renderMarkdown(post.content)
            }}
          />

          {/* Post navigation */}
          {(prevPost || nextPost) && (
            <div className="mt-14 pt-8 border-t grid sm:grid-cols-2 gap-4">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col p-4 bg-card border rounded-xl hover:border-foreground/20 transition-all">
                  <span className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous article
                  </span>
                  <span className="text-sm font-semibold group-hover:text-foreground transition-colors line-clamp-2">{prevPost.title}</span>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col p-4 bg-card border rounded-xl hover:border-foreground/20 transition-all sm:text-right sm:items-end">
                  <span className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1 sm:flex-row-reverse">
                    Next article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-sm font-semibold group-hover:text-foreground transition-colors line-clamp-2">{nextPost.title}</span>
                </Link>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-muted/40 rounded-lg p-8 text-center border border-border">
            <h2 className="text-2xl font-bold mb-3">Create your free QR code</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              No signup required. All 10 QR code types. Codes never expire.
            </p>
            <Button asChild size="lg">
              <Link href="/">Generate a Free QR Code</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
