import Link from 'next/link';
import { Post } from '@/types';
import { ArrowRight } from 'lucide-react';

export function WideCard({ post, related }: { post: Post, related: Post[] }) {
  if (!post) return null;
  return (
    <div className="editorial-grid md:grid-cols-2 border border-gray-200 dark:border-gray-800 mb-16 animate-entrance delay-200">
      <div className="editorial-cell p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-[#0f0f0f]">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-5 block">
          In-Depth Long Read
        </span>
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 leading-[1.15] mb-5">
          {post.frontmatter.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
          {post.frontmatter.summary}
        </p>
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors w-fit group text-sm uppercase tracking-widest">
          <span className="border-b border-transparent group-hover:border-current pb-0.5 transition-colors">Read Full Article</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="editorial-cell bg-gray-50 dark:bg-[#0a0a0a] p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800 relative">
        <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100 mb-8 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Related Series
        </h4>
        <ul className="space-y-8 relative z-10">
          {related.map((rel, idx) => (
            <li key={rel.slug} className="group cursor-pointer">
              <Link href={`/blog/${rel.slug}`} className="block">
                <div className="flex items-start gap-5">
                  <span className="font-serif text-gray-300 dark:text-gray-700 text-2xl font-light italic">{(idx + 1).toString().padStart(2, '0')}</span>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg mb-2 leading-snug">
                      {rel.frontmatter.title}
                    </h5>
                    <time dateTime={rel.frontmatter.date} className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                       {new Date(rel.frontmatter.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </time>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
