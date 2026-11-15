export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  featured?: boolean;
  coverImage?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}
