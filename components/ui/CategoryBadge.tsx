export function CategoryBadge({ category }: { category: string }) {
  let bgVar = "var(--gray-200, #e5e7eb)";
  let textVar = "var(--gray-800, #1f2937)";

  if (category.includes("前端") || category.toLowerCase().includes("frontend")) {
    bgVar = "var(--cat-frontend-bg)";
    textVar = "var(--cat-frontend-text)";
  } else if (category.includes("后端") || category.toLowerCase().includes("backend") || category.includes("Node")) {
    bgVar = "var(--cat-backend-bg)";
    textVar = "var(--cat-backend-text)";
  } else if (category.includes("随笔") || category.includes("生活")) {
    bgVar = "var(--cat-essay-bg)";
    textVar = "var(--cat-essay-text)";
  } else if (category.includes("思考") || category.includes("思想")) {
    bgVar = "var(--cat-thought-bg)";
    textVar = "var(--cat-thought-text)";
  }

  return (
    <span 
      className="inline-flex items-center px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors"
      style={{ backgroundColor: bgVar, color: textVar }}
    >
      {category}
    </span>
  );
}
