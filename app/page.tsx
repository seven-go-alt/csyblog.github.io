import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { HeroGrid } from "@/components/home/HeroGrid";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PostCard } from "@/components/home/PostCard";
import { WideCard } from "@/components/home/WideCard";
import { StripList } from "@/components/home/StripList";

export default function Home() {
  let originalPosts = getAllPosts();
  
  // Create a populated mock array if there are fewer than 10 posts for layout demonstration
  let posts = [...originalPosts];
  if (posts.length > 0 && posts.length < 10) {
    const mockCategories = ["前端", "后端", "随笔", "思考", "随笔"];
    while (posts.length < 12) {
      posts = [...posts, ...originalPosts].map((p, i) => ({
        ...p, 
        slug: i < originalPosts.length ? p.slug : `${p.slug}-copy-${i}`,
        frontmatter: i < originalPosts.length 
          ? p.frontmatter 
          : { ...p.frontmatter, category: mockCategories[i % mockCategories.length] }
      }));
    }
  }

  // Split posts logically for the editorial layout
  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1, 4); 
  const selectedPosts = posts.slice(4, 7); // 3 cards for grid
  const longReadPost = posts[7] || posts[0]; 
  const seriesPosts = posts.slice(0, 3);
  const essayPosts = posts.slice(8, 12);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] xl:px-12 pb-24">
      {/* Editorial Header / Journal Identifier */}
      <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-3 pt-6 md:pt-8 mb-4 animate-entrance bg-transparent">
        <div className="text-[10px] font-mono font-normal tracking-widest uppercase text-gray-500 dark:text-gray-400">
          Vol. {new Date().getMonth() + 1} — {new Date().getFullYear()}
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[10px] font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
          <span className="text-gray-900 dark:text-gray-100 cursor-pointer pb-1 border-b-[1.5px] border-gray-900 dark:border-gray-100">All</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Frontend</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Backend</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Essays</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Thoughts</span>
        </div>
      </div>

      {featuredPost && <HeroGrid featured={featuredPost} secondary={secondaryPosts} />}

      {selectedPosts.length >= 2 && (
        <section className="mb-16">
          <SectionHeader title="Editor's Picks" href="/blog" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200 dark:border-gray-800 animate-entrance delay-150 rounded-none bg-transparent">
            {selectedPosts.slice(0, 3).map((post, idx) => (
              <PostCard key={post.slug} post={post} index={idx} isLast={idx === 2} />
            ))}
          </div>
        </section>
      )}

      {longReadPost && (
        <section className="mb-16">
          <SectionHeader title="Deep Dives" />
          <WideCard post={longReadPost} related={seriesPosts} />
        </section>
      )}

      {essayPosts.length > 0 && (
        <section className="mb-16">
          <SectionHeader title="Random Thoughts" />
          <StripList posts={essayPosts.slice(0, 4)} />
        </section>
      )}

      {/* Newsletter Strip */}
      <section className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 animate-entrance delay-200 bg-transparent mb-12">
        <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 w-full md:w-auto text-center md:text-left">每周一篇，不多不少</h3>
        <div className="w-full md:w-auto flex-1 flex justify-center">
          <input type="email" placeholder="example@email.com" className="w-full max-w-sm px-0 py-2 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-colors rounded-none placeholder:text-gray-400 text-[14px]" />
        </div>
        <button className="w-full md:w-auto px-5 py-2.5 bg-transparent border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 text-[11px] font-normal uppercase tracking-[0.1em] hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-colors duration-200">
          Subscribe
        </button>
      </section>
    </div>
  );
}
