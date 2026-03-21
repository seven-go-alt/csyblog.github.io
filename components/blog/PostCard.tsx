import Link from "next/link";
import { Post } from "@/types";
import { Tag } from "@/components/ui/Tag";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="py-8 border-b border-gray-200 dark:border-gray-800 last:border-none group">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("zh-CN", {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </time>
          <span>•</span>
          <span className="font-medium">{post.frontmatter.category}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="block">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
            {post.frontmatter.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {post.frontmatter.summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.frontmatter.tags?.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
