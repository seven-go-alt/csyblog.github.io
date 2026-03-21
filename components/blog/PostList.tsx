import { Post } from "@/types";
import { PostCard } from "@/components/blog/PostCard";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-12">暂无文章。</p>;
  }

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
