import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Post } from "@/types";
import { Tag } from "@/components/ui/Tag";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

type Variant = "feature" | "compact";

interface PostCardProps {
  post: Post;
  /** Only used by the `feature` variant to alternate image/text sides. */
  index?: number;
  variant?: Variant;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*`_>\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(post: Post, maxLength = 150): string {
  if (post.frontmatter.summary) return post.frontmatter.summary;
  const text = stripMarkdown(post.content ?? "");
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

/** Roughly 350 CJK characters per minute. */
function getReadingMinutes(post: Post): number {
  const chars = stripMarkdown(post.content ?? "").length;
  return Math.max(1, Math.round(chars / 350));
}

function formatDate(date: string, style: "short" | "long"): string {
  const options: Intl.DateTimeFormatOptions =
    style === "short"
      ? { year: "numeric", month: "short", day: "numeric" }
      : { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("zh-CN", options);
}

export function PostCard({ post, index = 0, variant = "compact" }: PostCardProps) {
  const minutes = getReadingMinutes(post);
  const excerpt = getExcerpt(post);

  if (variant === "feature") {
    const reversed = index % 2 !== 0;

    return (
      <article
        className={`group flex flex-col md:flex-row bg-white dark:bg-[#121212] rounded-xl shadow-[0_3px_8px_6px_rgba(7,17,27,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(7,17,27,0.08)] ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-bg-subtle"
          tabIndex={-1}
          aria-hidden="true"
        >
          {post.frontmatter.coverImage ? (
            <Image
              src={post.frontmatter.coverImage}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/5" />
          )}
        </Link>

        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <CategoryBadge category={post.frontmatter.category || "未分类"} />
            <span className="flex items-center gap-1.5 text-xs text-fg-muted">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date, "short")}</time>
            </span>
          </div>

          <Link href={`/blog/${post.slug}`} className="group-hover:text-accent transition-colors">
            <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4 leading-tight line-clamp-2">
              {post.frontmatter.title}
            </h2>
          </Link>

          <p className="text-fg-subtle line-clamp-3 leading-relaxed mb-6 flex-grow">{excerpt}</p>

          <div className="flex items-center gap-2 text-xs text-fg-muted mt-auto pt-4 border-t border-border/50">
            <Clock className="w-3.5 h-3.5" />
            <span>阅读约 {minutes} 分钟</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="post-card relative py-6 px-6 sm:px-8 bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-2xl mb-6 flex flex-col gap-3 group overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-500 transition-colors" />

      <div className="flex flex-wrap items-center gap-3">
        <CategoryBadge category={post.frontmatter.category || "未分类"} />
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date, "long")}</time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            阅读约 {minutes} 分钟
          </span>
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="block mt-2">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.frontmatter.title}
        </h2>
      </Link>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-2">{excerpt}</p>

      {post.frontmatter.tags?.length ? (
        <div className="flex flex-wrap gap-2 mt-3 pt-4 border-t border-gray-100 dark:border-gray-800/60">
          {post.frontmatter.tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
