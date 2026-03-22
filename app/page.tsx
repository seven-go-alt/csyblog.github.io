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
    while (posts.length < 10) {
      posts = [...posts, ...originalPosts].map((p, i) => ({...p, slug: i < originalPosts.length ? p.slug : `${p.slug}-copy-${i}` }));
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
      <div className="flex justify-between items-end border-b-[2px] border-gray-900 dark:border-gray-100 pb-5 pt-12 md:pt-16 mb-8 animate-entrance">
        <div className="text-sm font-mono font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100">
          Vol. {new Date().getMonth() + 1} — {new Date().getFullYear()}
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          <span className="text-gray-900 dark:text-gray-100 cursor-pointer pb-1 border-b-[2px] border-gray-900 dark:border-gray-100">All</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Frontend</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Backend</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Essays</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Thoughts</span>
        </div>
      </div>

      {featuredPost && <HeroGrid featured={featuredPost} secondary={secondaryPosts} />}

      {selectedPosts.length >= 2 && (
        <section className="mb-20">
          <SectionHeader title="Editor's Picks" href="/blog" />
          <div className="editorial-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200 dark:border-gray-800 animate-entrance delay-150">
            {selectedPosts.slice(0, 3).map((post, idx) => (
              <PostCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        </section>
      )}

      {longReadPost && (
        <section className="mb-20">
          <SectionHeader title="Deep Dives" />
          <WideCard post={longReadPost} related={seriesPosts} />
        </section>
      )}

      {essayPosts.length > 0 && (
        <section className="mb-20">
          <SectionHeader title="Random Thoughts" />
          <StripList posts={essayPosts.slice(0, 4)} />
        </section>
      )}
    </div>
  );
}
