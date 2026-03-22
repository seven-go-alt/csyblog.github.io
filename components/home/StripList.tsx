import Link from 'next/link';
import { Post } from '@/types';

export function StripList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="editorial-grid sm:grid-cols-2 border border-gray-200 dark:border-gray-800 animate-entrance delay-200">
      {posts.map((post, idx) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className={`editorial-cell block p-8 group relative overflow-hidden ${(idx === 0 || idx === 1) && 'border-b'} border-gray-200 dark:border-gray-800`}>
          {/* Large decorative number */}
          <span className="absolute -bottom-6 -right-2 text-[10rem] leading-none font-serif font-bold text-gray-50 dark:text-[#111] pointer-events-none select-none transition-transform duration-700 group-hover:-translate-y-4 group-hover:scale-110">
            {idx + 1}
          </span>
          
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[160px]">
             <div>
               <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 mb-4 block">
                 {post.frontmatter.category || "Essays"}
               </span>
               <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-4 max-w-[90%]">
                 {post.frontmatter.title}
               </h3>
             </div>
             <time dateTime={post.frontmatter.date} className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">
               {new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
             </time>
          </div>
        </Link>
      ))}
    </div>
  );
}
