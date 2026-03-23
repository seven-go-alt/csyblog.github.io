import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";
import { Calendar, Clock, FolderOpen } from "lucide-react";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const isEven = index % 2 === 0;

  // Use the actual frontmatter coverImage or fallback softly
  const imageUrl = post.frontmatter.coverImage || "https://images.unsplash.com/photo-1618477247222-accd0fac2af9?q=80&w=800&auto=format&fit=crop";

  return (
    <article className={`group flex flex-col md:flex-row bg-white dark:bg-[#121212] rounded-xl shadow-[0_3px_8px_6px_rgba(7,17,27,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(7,17,27,0.08)] ${!isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Image Half */}
      <Link href={`/blog/${post.slug}`} className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
        <Image 
          src={imageUrl}
          alt={post.frontmatter.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>

      {/* Content Half */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
        {/* Meta Top */}
        <div className="flex items-center gap-4 text-xs text-fg-muted mb-4 uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.frontmatter.date).toLocaleDateString("zh-CN", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          {post.frontmatter.category && (
            <span className="flex items-center gap-1 text-accent">
              <FolderOpen className="w-3.5 h-3.5" />
              {post.frontmatter.category}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="group-hover:text-accent transition-colors">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4 leading-tight line-clamp-2">
            {post.frontmatter.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-fg-subtle line-clamp-3 leading-relaxed mb-6 flex-grow">
          {post.frontmatter.summary || (post.content ? post.content.substring(0, 150).replace(/[#*`_\]\[-]/g, "") + "..." : "")}
        </p>

        {/* Meta Bottom */}
        <div className="flex items-center gap-2 text-xs text-fg-muted mt-auto pt-4 border-t border-border/50">
          <Clock className="w-3.5 h-3.5" />
          <span>阅读约 3 分钟</span>
        </div>
      </div>
    </article>
  );
}
