import { getAllPosts } from "@/lib/posts";
import { WangHero } from "@/components/home/WangHero";
import { PostCard } from "@/components/home/PostCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { RibbonBackground } from "@/components/home/RibbonBackground";

export default function Home() {
  let originalPosts = getAllPosts();
  
  // Create a populated mock array to demonstrate the layout if few posts exist
  let posts = [...originalPosts];
  if (posts.length > 0 && posts.length < 5) {
    const mockCategories = ["前端", "后端", "随笔", "思考", "生活"];
    while (posts.length < 8) {
      posts = [...posts, ...originalPosts].map((p, i) => ({
        ...p, 
        slug: i < originalPosts.length ? p.slug : `${p.slug}-copy-${i}`,
        frontmatter: i < originalPosts.length 
          ? p.frontmatter 
          : { ...p.frontmatter, title: `${p.frontmatter.title} (${i})`, category: mockCategories[i % mockCategories.length] }
      }));
    }
  }

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

            {/* Pagination Placeholder (WangwangIT style) */}
            <div className="pt-8 pb-12 flex justify-center">
              <button className="px-6 py-2.5 rounded-full bg-white dark:bg-[#121212] shadow-sm hover:shadow-md text-fg-muted hover:text-accent transition-all">
                加载更多文章
              </button>
            </div>
          </main>

          {/* Right Column: Sticky Sidebar */}
          <Sidebar postsCount={posts.length} />
        </div>
      </div>
    </div>
  );
}
