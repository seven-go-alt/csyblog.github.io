import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostFrontmatter } from "@/types";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.frontmatter.tags?.includes(tag));
}
