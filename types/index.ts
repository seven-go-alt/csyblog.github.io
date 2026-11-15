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

/** Flattened post data used by the client-side search modal. */
export interface SearchItem {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  date: string;
}
