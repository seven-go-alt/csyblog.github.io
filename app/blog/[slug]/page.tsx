import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Tag } from "@/components/ui/Tag";

const CommentSection = dynamic(() => import("@/components/blog/CommentSection"));

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  
  return { 
    title: post.frontmatter.title,
    description: post.frontmatter.summary || `Read ${post.frontmatter.title} on CSY Blog.`,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary || `Read ${post.frontmatter.title} on CSY Blog.`,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      authors: ["CSY"],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getAllPosts();
  const currentIndex = posts.findIndex(p => p.slug === slug);
  const post = posts[currentIndex];
  
  if (!post) {
    notFound();
  }

  // Next.js allows dynamic imports for MDX inside the app router.
  const PostContent = dynamic(() => import(`@/content/posts/${slug}.mdx`).catch(() => notFound()));

  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return (
    <div className="w-full flex flex-col min-h-screen bg-bg">
      {/* Full Width Top Background Board */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-12 overflow-hidden bg-gray-900 -mt-[64px]">
        {post.frontmatter.coverImage && (
          <Image 
            src={post.frontmatter.coverImage}
            alt={post.frontmatter.title}
            fill
            className="object-cover opacity-70 select-none"
            priority
          />
        )}
        {/* Darken overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50 pointer-events-none" />
        
        {/* Title and Meta Information positioned over the image */}
        <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center pt-24">
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {post.frontmatter.tags?.map(t => <Tag key={t} text={t} />)}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-[1.2] drop-shadow-lg">
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/70 font-medium text-sm md:text-base">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString("zh-CN", {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
            <span className="opacity-50">•</span>
            <span className="text-white/90 tracking-wide uppercase">{post.frontmatter.category}</span>
          </div>
        </div>
      </div>

      {/* Standard Content Boundary */}
      <div className="container mx-auto px-4 max-w-5xl py-12 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-12 relative items-start w-full">
          {/* Main Reading Flow */}
          <main className="flex-1 w-full min-w-0 flex flex-col items-center">
            <div className="w-full max-w-[720px]">
              <article className="prose dark:prose-invert prose-blue max-w-none mdx-content w-full prose-headings:scroll-mt-24">
                {/* Hide YAML frontmatter that MDX renders as hr + heading due to Turbopack not supporting remark-frontmatter */}
                <div className="[&>hr:first-child]:hidden [&>hr:first-child+h1]:hidden [&>hr:first-child+h2]:hidden [&>hr:first-child+p]:hidden">
                  <PostContent />
                </div>
              </article>
              
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all bg-white dark:bg-[#111] flex flex-col items-start text-left">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider font-medium">上一篇</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {prevPost.frontmatter.title}
                    </span>
                  </Link>
                ) : <div />}
                
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all bg-white dark:bg-[#111] flex flex-col items-end text-right">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider font-medium">下一篇</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {nextPost.frontmatter.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>

              <CommentSection slug={slug} />
            </div>
          </main>
          
          <aside className="w-full lg:w-64 shrink-0 hidden lg:block sticky top-24">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  );
}
