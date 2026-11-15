const CATEGORY_STYLES: Record<string, string> = {
  "AI 资讯": "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  职业发展: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  硬件前沿: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  行业观察: "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
  工程实践: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  前端: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  后端: "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
  随笔: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  思考: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

const FALLBACK_STYLES = [
  "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
  "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
];

/** Stable colour for categories that are not in the map, so new ones don't all look the same. */
function hashCategory(category: string): number {
  let hash = 0;
  for (const char of category) {
    hash = (hash * 31 + (char.codePointAt(0) ?? 0)) >>> 0;
  }
  return hash % FALLBACK_STYLES.length;
}

export function CategoryBadge({ category }: { category: string }) {
  const style =
    CATEGORY_STYLES[category] ??
    FALLBACK_STYLES[hashCategory(category)];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${style}`}
    >
      {category}
    </span>
  );
}
