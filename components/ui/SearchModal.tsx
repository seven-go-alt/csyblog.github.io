"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
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
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4 pointer-events-none"
            >
              <div className="w-full max-w-2xl bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]">
                <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                  <Search className="w-5 h-5 text-gray-400 shrink-0" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search docs, posts, tags... (Coming Soon)"
                    className="flex-1 bg-transparent border-none outline-none px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                  />
                  <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 mx-auto flex items-center justify-center mb-4">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Algolia 搜索模块预留</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
                      这里预留了 Algolia 搜索界面的位置，日后对接 algoliasearch 时可直接接入 Hits 和 Pagination 渲染。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
