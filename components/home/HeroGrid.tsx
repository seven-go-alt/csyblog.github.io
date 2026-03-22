import Link from 'next/link';
import { Post } from '@/types';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

export function HeroGrid({ featured, secondary }: { featured: Post; secondary: Post[] }) {
  if (!featured) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] border border-gray-200 dark:border-gray-800 mb-16 animate-entrance delay-100 rounded-none bg-transparent">
      {/* Featured Post (Left Column) */}
      <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-transparent">
        <div className="mb-6 w-fit">
          <CategoryBadge category={featured.frontmatter.category || "Featured"} />
        </div>
        <Link href={`/blog/${featured.slug}`} className="block mb-6 group">
          <h1 className="text-[clamp(2rem,3.5vw,2.75rem)] font-serif font-bold text-gray-900 dark:text-gray-100 leading-[1.2] tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {featured.frontmatter.title}
          </h1>
        </Link>
        
        {/* Deep Density Divider */}
        <span className="border-l-2 border-blue-500 h-8 block my-2 -ml-0.5"></span>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mt-4 mb-6">
          {featured.frontmatter.summary}
        </p>

        {/* Pullquote Generation */}
        <p className="italic text-[16px] text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
          "{featured.frontmatter.summary?.slice(0, 60)}..."
        </p>
        
        <div className="max-w-xs md:max-w-sm mt-auto mt-4">
          <div className="flex items-center gap-3 text-[11px] font-normal text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">
            <span>By CSY</span>
            <span>•</span>
            <time dateTime={featured.frontmatter.date}>
              {new Date(featured.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
          </div>
          {/* Aesthetic Reading Progress Line */}
          <div className="w-full h-px bg-gray-200 dark:bg-gray-800 overflow-hidden mt-1">
             <div className="h-full bg-gradient-to-r from-gray-900 to-transparent dark:from-white dark:to-transparent w-full origin-left shrink-0 opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Secondary Posts & Latest List (Right Column, 3x flex split) */}
      <div className="flex flex-col bg-transparent">
        
        {/* Sub article 1 (~35%) */}
        {secondary[0] && (
          <div className="flex-1 p-8 md:p-10 border-b border-gray-200 dark:border-gray-800 flex flex-col justify-center bg-transparent group relative overflow-hidden">
             <Link href={`/blog/${secondary[0].slug}`} className="block z-10 relative">
               <span className="text-[10px] font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500 mb-3 block">
                 {secondary[0].frontmatter.category || "Article"}
               </span>
               <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-[1.3] mb-3">
                 {secondary[0].frontmatter.title}
               </h3>
               <p className="text-gray-500 dark:text-gray-400 text-[13px] line-clamp-1 leading-relaxed">
                 {secondary[0].frontmatter.summary}
               </p>
             </Link>
          </div>
        )}

        {/* Sub article 2 (~35%) */}
        {secondary[1] && (
          <div className="flex-1 p-8 md:p-10 border-b border-gray-200 dark:border-gray-800 flex flex-col justify-center bg-transparent group relative overflow-hidden">
             <Link href={`/blog/${secondary[1].slug}`} className="block z-10 relative">
               <span className="text-[10px] font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500 mb-3 block">
                 {secondary[1].frontmatter.category || "Article"}
               </span>
               <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-[1.3] mb-3">
                 {secondary[1].frontmatter.title}
               </h3>
               <p className="text-gray-500 dark:text-gray-400 text-[13px] line-clamp-1 leading-relaxed">
                 {secondary[1].frontmatter.summary}
               </p>
             </Link>
          </div>
        )}

        {/* Latest List (~30%) */}
        <div className="flex-[0.8] p-8 md:p-10 flex flex-col justify-center bg-transparent">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-normal uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">LATEST</span>
          </div>
          <ul className="space-y-5">
             {secondary.map((post, idx) => (
                <li key={`latest-${post.slug}`} className="flex items-start gap-4 group">
                  <span className="font-serif text-[15px] italic text-gray-400 dark:text-gray-600 transition-colors pt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                  <Link href={`/blog/${post.slug}`} className="text-[14px] font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-relaxed">
                    {post.frontmatter.title}
                  </Link>
                </li>
             ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
