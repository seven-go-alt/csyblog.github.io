import { Post } from "@/types";
import { SITE, getSiteUrl } from "@/lib/site";

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/** JSON-LD for a blog post. Serialised with `<` escaped to avoid breaking out of the script tag. */
export function postJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.summary,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    ...(post.frontmatter.coverImage
      ? { image: [post.frontmatter.coverImage] }
      : {}),
    articleSection: post.frontmatter.category,
    keywords: post.frontmatter.tags?.join(", "),
    inLanguage: "zh-CN",
    author: { "@type": "Person", name: SITE.author, url: absoluteUrl("/about") },
    publisher: { "@type": "Organization", name: SITE.name },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
