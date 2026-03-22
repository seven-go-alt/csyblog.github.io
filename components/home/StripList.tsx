import Link from 'next/link';
import { Post } from '@/types';

export function StripList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gray-200 dark:border-gray-800 animate-entrance delay-300 rounded-none bg-transparent">
      {posts.map((post, idx) => (
        <Link 
          key={post.slug} 
          href={`/blog/${post.slug}`} 
          className={`group relative p-6 md:p-8 flex flex-col justify-between min-h-[160px] overflow-hidden bg-transparent rounded-none border-b md:border-b-0 ${idx < posts.length - 1 ? 'md:border-r border-gray-200 dark:border-gray-800' : ''}`}
        >
          {/* Faint Background Number */}
          <span className="absolute right-[16px] bottom-[8px] text-[80px] font-serif italic font-light text-gray-100 dark:text-gray-800/50 leading-none z-0 pointer-events-none select-none">
            {idx + 1}
          </span>
          
          <div className="relative z-10 flex flex-col h-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 block">
              {post.frontmatter.category || "Thought"}
            </span>
            <h3 className="text-[16px] font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-[1.4] mb-4">
              {post.frontmatter.title}
            </h3>
            
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] mt-auto">
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </time>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
