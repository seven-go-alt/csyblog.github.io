"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SearchModal } from "@/components/ui/SearchModal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Pages with dark hero backgrounds need light navbar text
  const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";
  const isHomepage = pathname === "/";
  const hasDarkHero = isBlogPost || isHomepage;
  const useLightText = hasDarkHero && !isScrolled;

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "navbar-scrolled py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-5xl">
          <Link href="/" className={`font-serif font-bold text-2xl tracking-tight transition-colors hover:opacity-80 ${
            useLightText ? "text-white" : "text-gray-900 dark:text-gray-100"
          }`}>
            CSY<span className="text-blue-400 dark:text-blue-500">.</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <nav className={`hidden sm:flex items-center gap-6 text-sm font-medium transition-colors ${
              useLightText ? "text-white/70" : "text-gray-600 dark:text-gray-400"
            }`}>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={`relative py-1 transition-colors ${
                      isActive 
                        ? (useLightText ? "text-white" : "text-gray-900 dark:text-gray-100")
                        : (useLightText ? "hover:text-white" : "hover:text-blue-600 dark:hover:text-blue-500")
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${useLightText ? "bg-white" : "bg-blue-600 dark:bg-blue-500"}`}
                        transition={{ type: "spring", bounce: 0.25, stiffness: 130, damping: 15 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
            
            <div className={`flex items-center gap-2 border-l border-transparent sm:pl-6 transition-colors ${
              useLightText ? "sm:border-white/20" : "sm:border-gray-200 dark:sm:border-gray-800"
            }`}>
              <ThemeToggle />
              <SearchModal />
              <button 
                className={`p-1.5 sm:hidden rounded-md transition-colors ${
                  useLightText ? "text-white/70 hover:bg-white/10" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white dark:bg-[#0a0a0a] flex flex-col p-6 h-[100dvh]"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif font-bold text-2xl tracking-tight text-gray-900 dark:text-gray-100">
                CSY<span className="text-blue-600 dark:text-blue-500">.</span>
              </span>
              <button 
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-2xl font-serif">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      className={`block py-2 ${isActive ? "text-blue-600 dark:text-blue-500 font-bold" : "text-gray-600 dark:text-gray-400"}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
