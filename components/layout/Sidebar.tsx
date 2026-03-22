import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export function Sidebar({ postsCount }: { postsCount: number }) {
  const siteConfig = {
    author: {
      name: "爱发呆的菜菜",
      avatar: "https://avatars.githubusercontent.com/caisiying",
      email: "hello@example.com"
    },
    description: "Web Developer & Open Source Enthusiast",
    links: {
      github: "https://github.com/caisiying",
      twitter: "https://twitter.com/csyblog"
    }
  };

  return (
    <aside className="hidden lg:block w-full lg:w-[320px] shrink-0 space-y-6">
      {/* Profile Card */}
      <div className="bg-white dark:bg-[#121212] rounded-xl shadow-[0_3px_8px_6px_rgba(7,17,27,0.05)] p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-accent/20">
          <Image
            src={siteConfig.author.avatar}
            alt={siteConfig.author.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-fg mb-1">{siteConfig.author.name}</h3>
        <p className="text-sm text-fg-muted mb-4">{siteConfig.description}</p>
        
        <div className="flex gap-6 w-full justify-center text-sm mb-6">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-fg">文章</span>
            <span className="text-fg-muted">{postsCount}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-fg">标签</span>
            <span className="text-fg-muted">4</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-fg-muted">
          <Link href={siteConfig.links.github} target="_blank" className="p-2 bg-bg-subtle rounded-full hover:bg-accent hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href={siteConfig.links.twitter} target="_blank" className="p-2 bg-bg-subtle rounded-full hover:bg-accent hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </Link>
          <a href={`mailto:${siteConfig.author.email}`} className="p-2 bg-bg-subtle rounded-full hover:bg-accent hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Announcements / Quick Links */}
      <div className="bg-white dark:bg-[#121212] rounded-xl shadow-[0_3px_8px_6px_rgba(7,17,27,0.05)] p-6 sticky top-24 transition-transform hover:-translate-y-1">
        <h4 className="font-bold text-fg mb-4 flex items-center gap-2">
          <span>📢</span> 公告
        </h4>
        <p className="text-sm text-fg-muted leading-relaxed">
          欢迎来到我的博客！这里记录了我在技术探索道路上的点点滴滴。目前正在重构基于 WangwangIT 风格的全新视觉。
        </p>
      </div>
    </aside>
  );
}
