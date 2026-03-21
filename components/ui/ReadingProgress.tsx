"use client";
import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setReadingProgress(Number((currentScroll / scrollHeight).toFixed(4)) * 100);
      }
    };
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-150 ease-out" 
      style={{ width: `${readingProgress}%` }} 
    />
  );
}
