import type { Metadata } from "next";

const description = "关于 CSY：前端开发者，关注 AI、硬件与工程实践。";

export const metadata: Metadata = {
  title: "关于",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "关于",
    description,
    url: "/about",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CSY Blog" }],
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12 md:py-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-8">
        关于我
      </h1>
      <div className="prose dark:prose-invert prose-blue max-w-none prose-lg">
        <p>你好，我是 CSY。欢迎来到我的个人博客。</p>
        <p>我是一名前端开发者，喜欢研究前沿技术，如 React, Next.js, 和 Tailwind CSS。</p>
        <p>在这里我会分享我的学习笔记、项目经验以及一些生活感悟。希望对你有所启发。</p>
      </div>
    </div>
  );
}
