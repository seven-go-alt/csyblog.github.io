import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0a0a0a]/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between max-w-5xl">
        <Link href="/" className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
          CSY Blog
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
}
