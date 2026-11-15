"use client";

import "./globals.css";

/**
 * Replaces the root layout when the layout itself throws, so it has to render
 * its own <html>/<body>. Colours are hard-coded to stay readable in any theme.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#0d0d0d] text-[#f1f1f1]">
        <p className="font-mono text-sm tracking-[0.3em] text-[#60a5fa] uppercase mb-6">
          Error
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          站点暂时无法访问
        </h1>
        <p className="text-[#9ca3af] leading-relaxed mb-2 max-w-md">
          页面在加载时发生了严重错误，请稍后重试。
        </p>
        {error.digest ? (
          <p className="font-mono text-xs text-[#6b7280] mb-10">错误编号 {error.digest}</p>
        ) : (
          <div className="mb-8" />
        )}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={reset}
            className="w-full sm:w-auto rounded-full bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            重试
          </button>
          {/* Plain anchor on purpose: this boundary must not depend on the router. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="w-full sm:w-auto rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/50"
          >
            回到首页
          </a>
        </div>
      </body>
    </html>
  );
}
