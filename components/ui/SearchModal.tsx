"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchItem } from "@/types";

const MAX_RESULTS = 8;

export function SearchModal({ items }: { items: SearchItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, MAX_RESULTS);

    return items
      .filter((item) =>
        [item.title, item.summary, item.category, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, MAX_RESULTS);
  }, [items, query]);

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  };

  // Global shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Keyboard navigation while open + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const target = results[active];
        if (target) {
          e.preventDefault();
          close();
          router.push(`/blog/${target.slug}`);
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, results, active, router]);

  const hasQuery = query.trim().length > 0;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="搜索文章"
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">搜索文章...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 font-sans text-xs bg-white dark:bg-gray-900 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="搜索文章"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[16vh] px-4 pointer-events-none"
            >
              <div className="w-full max-w-2xl bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden pointer-events-auto flex flex-col max-h-[75vh]">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                  <Search className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActive(0);
                    }}
                    aria-label="搜索关键词"
                    placeholder="搜索标题、摘要、分类或标签"
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                  />
                  <button
                    onClick={close}
                    aria-label="关闭搜索"
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                  {results.length === 0 ? (
                    <div className="px-4 py-14 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        没找到和「{query.trim()}」相关的文章
                      </p>
                      <Link
                        href="/blog"
                        onClick={close}
                        className="mt-3 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        浏览全部文章
                      </Link>
                    </div>
                  ) : (
                    <ul>
                      {!hasQuery && (
                        <li className="px-3 pt-2 pb-1 text-xs text-gray-400 dark:text-gray-500">
                          最近文章
                        </li>
                      )}
                      {results.map((item, index) => (
                        <li key={item.slug}>
                          <Link
                            href={`/blog/${item.slug}`}
                            onClick={close}
                            onMouseEnter={() => setActive(index)}
                            className={`block rounded-xl px-3 py-3 transition-colors ${
                              index === active
                                ? "bg-gray-100 dark:bg-gray-800"
                                : "hover:bg-gray-50 dark:hover:bg-gray-900"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {item.title}
                                </p>
                                <p className="mt-1 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                                  {item.summary}
                                </p>
                              </div>
                              <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                                {item.category}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-800 px-4 py-2 text-[11px] text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    <ArrowDown className="w-3 h-3" />
                    选择
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="w-3 h-3" />
                    打开
                  </span>
                  <span>Esc 关闭</span>
                  <span className="ml-auto">{results.length} 篇</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
