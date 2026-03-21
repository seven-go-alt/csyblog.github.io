import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/PostList";

export const metadata = { title: "Blog - CSY Blog" };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedParams = await searchParams;
  const tag = resolvedParams.tag;
  const allPosts = await getAllPosts();
  
  const posts = tag 
    ? allPosts.filter(p => p.frontmatter.tags?.includes(tag))
    : allPosts;

  const allTags = Array.from(new Set(allPosts.flatMap(p => p.frontmatter.tags || [])));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12 md:py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          {tag ? `标签: ${tag}` : "Blog"}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Sharing my thoughts on development, technology, and design.
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-12">
        <main className="flex-1">
          <PostList posts={posts} />
        </main>
        
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Filter by Tag</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(t => (
                <a 
                  key={t}
                  href={`/blog?tag=${t}`}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    t === tag 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {t}
                </a>
              ))}
              {tag && (
                <a href="/blog" className="px-3 py-1 text-sm rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors mt-2">
                  清除过滤
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
