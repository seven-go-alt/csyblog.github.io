import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/PostList";

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 5);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <section className="py-20 md:py-32 flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Hi, I'm <span className="text-blue-600 dark:text-blue-500">CSY</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
          A passionate software developer sharing thoughts on frontend, backend, and everything in between.
        </p>
        <div className="flex gap-4 pt-4">
          <Link 
            href="/blog" 
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            阅读文章
          </Link>
          <Link 
            href="/about" 
            className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            关于我
          </Link>
        </div>
      </section>

      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">近期文章</h2>
          <Link href="/blog" className="text-blue-600 dark:text-blue-500 hover:underline font-medium">
            查看全部 &rarr;
          </Link>
        </div>
        <PostList posts={recentPosts} />
      </section>
    </div>
  );
}
