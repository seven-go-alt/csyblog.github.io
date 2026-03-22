import Link from 'next/link';

export function SectionHeader({ title, href }: { title: string, href?: string }) {
  return (
    <div className="flex items-center justify-between mb-8 animate-entrance delay-150 bg-transparent">
      <h2 className="text-[10px] text-gray-500 dark:text-gray-400 font-normal uppercase tracking-[0.12em] flex items-center">
        <span className="w-[2px] h-[12px] bg-blue-500 mr-4 block"></span>
        {title}
      </h2>
      {href && (
        <Link href={href} className="text-[10px] text-gray-400 dark:text-gray-500 font-normal uppercase tracking-[0.12em] relative group hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          View All
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-500 dark:bg-gray-400 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300"></span>
        </Link>
      )}
    </div>
  );
}
