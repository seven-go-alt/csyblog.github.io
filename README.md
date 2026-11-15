# CSY Blog

个人博客，记录关于 AI、硬件与工程实践的思考。

线上地址：<https://csyblog.vercel.app>

## 技术栈

- Next.js 16（App Router / Turbopack）+ React 19
- Tailwind CSS v4 + `@tailwindcss/typography`
- MDX 内容（`remark-frontmatter` + `rehype-slug`），代码块用 Shiki 高亮
- `next-themes` 深色模式，`framer-motion` 动效

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
```

其他命令：

```bash
npm run build    # 生产构建
npm run lint     # ESLint
```

> 本机若缺少 `@next/swc-darwin-arm64` 原生包，Turbopack 会拒绝构建，可临时用 `npx next build --webpack`；重装依赖（`rm -rf node_modules && npm ci`）通常能补上。

## 写文章

在 `content/posts/` 下新建 `<slug>.mdx`，文件名即 URL（`/blog/<slug>`）。Frontmatter 约定：

```yaml
---
title: "文章标题"
date: "2026-11-15"
summary: "一两句话摘要，用于列表、SEO 描述与搜索索引。"
category: "AI 资讯"
tags: ["OpenAI", "AI Agent"]
coverImage: "https://images.unsplash.com/photo-xxx?auto=format&fit=crop&q=80&w=1200"
---
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题，同时用于 `<title>` 与 OG |
| `date` | 是 | `YYYY-MM-DD`，决定列表排序与 `lastModified` |
| `summary` | 是 | 摘要，缺失时列表会截断正文 |
| `category` | 是 | 分类，决定卡片配色（未知分类自动取色） |
| `tags` | 否 | 标签，用于 `/blog?tag=` 筛选 |
| `coverImage` | 否 | 封面与分享图；缺失时用渐变占位 |

正文里的 `##` / `###` 会自动进右侧目录，并生成与 `rehype-slug` 一致的锚点。

## 目录

```
app/            路由（首页 / blog / about / feed.xml / sitemap / robots）
components/     layout、blog、home、ui、mdx 组件
content/posts/  MDX 文章
lib/            posts（读取 MDX）、seo（JSON-LD）、toc、site（站点 URL）、image-loader
```

## 环境变量

只有一个可选变量：

```bash
NEXT_PUBLIC_BASE_URL=https://your-domain.com   # 自定义域名时设置
```

未设置时，Vercel 构建会自动使用 `VERCEL_PROJECT_PRODUCTION_URL`，本地回退到 `http://localhost:3000`。

## 部署

推送到 `main` 即由 Vercel 自动构建部署，无需额外配置。

## 功能清单

- 文章列表 / 标签筛选 / 目录 / 阅读进度
- `⌘K` 搜索（构建期索引，客户端过滤）
- RSS（`/feed.xml`）、sitemap、robots、JSON-LD、OG 图
- 深色模式、响应式图片
