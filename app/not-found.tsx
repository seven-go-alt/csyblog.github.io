import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl py-24 md:py-32 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-accent uppercase mb-6">
        404
      </p>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-fg mb-4">
        页面走丢了
      </h1>
      <p className="text-fg-muted leading-relaxed mb-10">
        你要找的页面不存在，可能已经被移动或删除。
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          回到首页
        </Link>
        <Link
          href="/blog"
          className="w-full sm:w-auto rounded-full border border-border px-6 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
        >
          浏览文章
        </Link>
      </div>
    </div>
  );
}
