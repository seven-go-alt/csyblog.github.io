"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl py-24 md:py-32 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-accent uppercase mb-6">
        Error
      </p>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-fg mb-4">
        页面出了点问题
      </h1>
      <p className="text-fg-muted leading-relaxed mb-10">
        渲染这篇文章时发生了意外，可以重试一次，或者回到首页。
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={reset}
          className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          重试
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto rounded-full border border-border px-6 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
        >
          回到首页
        </Link>
      </div>
    </div>
  );
}
