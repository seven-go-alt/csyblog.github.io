"use client";

import { ArrowUp, Github, Mail, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 pt-10 pb-8 overflow-hidden">
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} CSY. All rights reserved.
        </div>
        
        <div className="flex items-center gap-5">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#333] dark:hover:text-white transition-colors p-2 -m-2">
            <span className="sr-only">GitHub</span>
            <Github className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors p-2 -m-2">
            <span className="sr-only">Twitter</span>
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:contact@example.com" className="text-gray-400 hover:text-red-500 transition-colors p-2 -m-2">
            <span className="sr-only">Email</span>
            <Mail className="w-5 h-5" />
          </a>
          
          <button 
            onClick={scrollToTop}
            className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 duration-300 transform hover:-translate-y-1 hover:shadow-md"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
