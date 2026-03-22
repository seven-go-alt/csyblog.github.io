import Link from 'next/link';
import { Post } from '@/types';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

export function HeroGrid({ featured, secondary }: { featured: Post; secondary: Post[] }) {
  return (
    <div className="editorial-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-y border-gray-200 dark:border-gray-800 mb-16 animate-entrance delay-100">
      {/* Featured Post (Spans 2 columns on lg) */}
      <div className="editorial-cell md:col-span-1 lg:col-span-2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="mb-6 w-fit">
          <CategoryBadge category={featured?.frontmatter?.category || "Featured"} />
        </div>
        <Link href={`/blog/${featured?.slug}`} className="block mb-6 group">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-gray-100 leading-[1.1] tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {featured?.frontmatter?.title}
          </h1>
        </Link>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          {featured?.frontmatter?.summary}
        </p>
        <div className="mt-8 flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-widest">
          <span>By CSY</span>
          <span>•</span>
          <time dateTime={featured?.frontmatter?.date}>
            {featured ? new Date(featured.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
          </time>
        </div>
      </div>

      {/* Secondary Posts */}
      <div className="editorial-cell flex flex-col border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800 editorial-grid grid-rows-[1fr_1fr_auto]">
        {secondary.slice(0, 2).map((post, idx) => (
          <div key={post.slug} className={`editorial-cell p-8 ${idx === 0 ? 'border-b border-gray-200 dark:border-gray-800' : ''}`}>
             <Link href={`/blog/${post.slug}`} className="block group">
               <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 block">
                 {post.frontmatter.category}
               </span>
               <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-3">
                 {post.frontmatter.title}
               </h3>
               <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                 {post.frontmatter.summary}
               </p>
             </Link>
          </div>
        ))}
        {/* Ticker / Update Strip */}
        <div className="editorial-cell p-5 bg-gray-50 dark:bg-[#0a0a0a]/50 flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-widest border-t border-gray-200 dark:border-gray-800">
          <span>Latest Updates</span>
          <span className="animate-pulse flex h-2 w-2 rounded-full bg-blue-500"></span>
        </div>
      </div>
    </div>
  );
}
