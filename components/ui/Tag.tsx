import Link from "next/link";

export function Tag({ text }: { text: string }) {
  return (
    <Link 
      href={`/blog?tag=${text}`} 
      className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-blue-600 hover:text-white transition-colors"
    >
      {text}
    </Link>
  );
}
