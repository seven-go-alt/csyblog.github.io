"use client";
import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/toc";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".mdx-content h2, .mdx-content h3"),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0% 0% -60% 0%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 hidden lg:block">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">目录</h3>
      <ul className="space-y-3 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}>
            <a
              href={`#${heading.id}`}
              className={`block py-1 pl-3 border-l-2 transition-all duration-200 ${
                activeId === heading.id
                  ? "border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
