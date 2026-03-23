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

export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}
