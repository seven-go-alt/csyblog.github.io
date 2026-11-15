import { getAllPosts } from "@/lib/posts";
import { WangHero } from "@/components/home/WangHero";
import { PostCard } from "@/components/home/PostCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { RibbonBackground } from "@/components/home/RibbonBackground";

export default function Home() {
  const posts = getAllPosts();
  const tagsCount = new Set(posts.flatMap((post) => post.frontmatter.tags ?? [])).size;

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Full Screen Gradient Hero */}
      <WangHero />

      {/* Main Content Area Wrap with Floating Squares Background */}
      <div className="relative w-full bg-bg dark:bg-bg transition-colors duration-300">
        <RibbonBackground />
        
        {/* Actual Content Container */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Post Feed */}
          <main className="flex-1 space-y-8 min-w-0">
            {posts.map((post, idx) => (
              <PostCard key={post.slug} post={post} index={idx} />
            ))}

          </main>

          {/* Right Column: Sticky Sidebar */}
          <Sidebar postsCount={posts.length} tagsCount={tagsCount} />
        </div>
      </div>
    </div>
  );
}
