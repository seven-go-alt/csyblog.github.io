export function CategoryBadge({ category }: { category: string }) {
  let colorClass = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 ring-gray-500/10";
  if (category.includes("前端") || category.toLowerCase().includes("frontend")) {
    colorClass = "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 ring-blue-700/10 dark:ring-blue-400/20";
  } else if (category.includes("后端") || category.toLowerCase().includes("backend") || category.includes("Node")) {
    colorClass = "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 ring-violet-700/10 dark:ring-violet-400/20";
  } else if (category.includes("随笔") || category.includes("生活")) {
    colorClass = "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 ring-emerald-600/10 dark:ring-emerald-400/20";
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClass} transition-colors`}>
      {category}
    </span>
  );
}
