import Link from 'next/link';
import { Post } from '@/types';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

export function PostCard({ post, index }: { post: Post, index?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="editorial-cell block p-8 group h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-500 transition-colors duration-300" />
      <div className="flex items-start justify-between mb-6">
        <CategoryBadge category={post.frontmatter.category || "Article"} />
        {index !== undefined && (
          <span className="font-serif text-[28px] leading-none font-light text-gray-300 dark:text-gray-700 italic">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-4">
        {post.frontmatter.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
        {post.frontmatter.summary}
      </p>
      <div className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/60">
        <time dateTime={post.frontmatter.date}>
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </time>
      </div>
    </Link>
  );
}
