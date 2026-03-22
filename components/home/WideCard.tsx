import Link from 'next/link';
import { Post } from '@/types';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

export function WideCard({ post, related }: { post: Post, related: Post[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] border border-gray-200 dark:border-gray-800 animate-entrance delay-200 bg-transparent rounded-none">
      {/* Main Long Read */}
      <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 flex flex-col bg-transparent">
        <span className="text-[10px] uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 mb-6 block font-normal">
          IN-DEPTH LONG READ
        </span>
        <Link href={`/blog/${post.slug}`} className="block group mb-6">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-4">
            {post.frontmatter.title}
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
            {post.frontmatter.summary}
          </p>
        </Link>
        
        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
          <CategoryBadge category={post.frontmatter.category || "Long Read"} />
          <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span>•</span>
            <span>15 MIN READ</span>
          </div>
        </div>
      </div>

      {/* Related Series */}
      <div className="p-8 md:p-10 flex flex-col justify-center bg-transparent">
        <h4 className="text-[10px] uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 mb-8 font-normal">
          RELATED SERIES
        </h4>
        <div className="space-y-6">
          {related.slice(0, 3).map((item, idx) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className="flex items-start gap-4 group">
              <span className="font-serif text-[18px] italic text-gray-400 dark:text-gray-600 group-hover:text-blue-500 transition-colors mt-0.5">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] mb-1">
                  {new Date(item.frontmatter.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <span className="text-[14px] font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors leading-relaxed line-clamp-2">
                  {item.frontmatter.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
