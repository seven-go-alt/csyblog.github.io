import Link from 'next/link';
import { Post } from '@/types';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

export function PostCard({ post, index, isLast }: { post: Post, index?: number, isLast?: boolean }) {
  const summaryText = post.frontmatter.summary || (post.content ? post.content.replace(/(<([^>]+)>)|[#*`_\[\]()]/gi, '').slice(0, 80) + '...' : '');

  return (
    <Link href={`/blog/${post.slug}`} className={`block p-8 md:p-10 group flex flex-col relative overflow-hidden bg-transparent rounded-none min-h-[200px] border-b md:border-b-0 ${!isLast ? 'md:border-r border-gray-200 dark:border-gray-800' : ''}`}>
      {/* Animated Left Border */}
      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-blue-500 scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-200 ease-out" />
      
      <div className="flex items-start justify-between mb-8">
        <CategoryBadge category={post.frontmatter.category || "Article"} />
        {index !== undefined && (
          <span className="font-serif text-[28px] leading-none font-light text-gray-300 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white transition-colors italic">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>
      <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-[1.35] mb-4">
        {post.frontmatter.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed mb-8 flex-1">
        {summaryText}
      </p>
      <div className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-auto border-t border-gray-100 dark:border-gray-800/60 pt-5">
        <time dateTime={post.frontmatter.date}>
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </time>
        <span className="mx-3 text-gray-300 dark:text-gray-700">•</span>
        <span>{summaryText.length > 80 ? "4 MIN READ" : "2 MIN READ"}</span>
      </div>
    </Link>
  );
}
