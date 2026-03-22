import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function SectionHeader({ title, href }: { title: string, href?: string }) {
  return (
    <div className="thick-divider pb-4 mb-8 flex items-end justify-between animate-entrance delay-150">
      <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">
        {title}
      </h2>
      {href && (
        <Link href={href} className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 uppercase tracking-wider">
          View All <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
