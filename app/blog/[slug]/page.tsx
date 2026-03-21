import dynamic from 'next/dynamic';
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { CommentSection } from "@/components/blog/CommentSection";
import { Tag } from "@/components/ui/Tag";

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
  return { title: `${post.frontmatter.title} - CSY Blog` };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Next.js allows dynamic imports for MDX inside the app router.
  const PostContent = dynamic(() => import(`@/content/posts/${slug}.mdx`).catch(() => notFound()));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12 md:py-20">
      <header className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-tight">
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

      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        <main className="flex-1 w-full min-w-0">
          <article className="prose dark:prose-invert prose-blue max-w-none mdx-content prose-headings:scroll-mt-24 prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800">
            <PostContent />
          </article>
          <CommentSection postSlug={slug} />
        </main>
        
        <aside className="w-full lg:w-64 shrink-0 hidden lg:block">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}
