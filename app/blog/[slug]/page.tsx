import dynamic from 'next/dynamic';
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12 md:py-20 flex justify-center">
      <div className="flex flex-col lg:flex-row gap-12 relative items-start w-full">
        {/* Content Area bounded to 680px max for optimal reading */}
        <main className="flex-1 w-full min-w-0 flex flex-col items-center">
          <div className="w-full max-w-[680px]">
            <header className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-10">
              <h1 className="text-4xl md:text-[2.75rem] font-serif font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-[1.2]">
                {post.frontmatter.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-6">
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date).toLocaleDateString("zh-CN", {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{post.frontmatter.category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags?.map(t => <Tag key={t} text={t} />)}
              </div>
            </header>

            <article className="prose dark:prose-invert prose-blue max-w-none mdx-content w-full prose-headings:scroll-mt-24 prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800">
              <PostContent />
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
  );
}
