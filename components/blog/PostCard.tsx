import Link from "next/link";
import { Post } from "@/types";
import { Tag } from "@/components/ui/Tag";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Clock } from "lucide-react";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card relative py-6 px-6 sm:px-8 bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-2xl mb-6 flex flex-col gap-3 group overflow-hidden">
      {/* Accent left border for featured/hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-500 transition-colors" />
      
      <div className="flex flex-wrap items-center gap-3">
        <CategoryBadge category={post.frontmatter.category || "Uncategorized"} />
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("zh-CN", {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {(post.frontmatter.summary?.length || 100) > 100 ? "4 min read" : "2 min read"}
          </span>
        </div>
      </div>
      <Link href={`/blog/${post.slug}`} className="block mt-2">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.frontmatter.title}
        </h2>
      </Link>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-2">
        {post.frontmatter.summary}
      </p>
      <div className="flex flex-wrap gap-2 mt-3 pt-4 border-t border-gray-100 dark:border-gray-800/60">
        {post.frontmatter.tags?.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </article>
  );
}
