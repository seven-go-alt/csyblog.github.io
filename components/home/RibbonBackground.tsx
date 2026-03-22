"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function RibbonBackground() {
  const [mounted, setMounted] = useState(false);
  
  // Track the vertical scroll progress of the entire page
  const { scrollYProgress } = useScroll();
  
  // Dramatically amplify the Parallax Effect to make the movement very obvious
  // The element is 150vh tall, shifting from -10% to 50% moves it a massive 90vh
  // downwards over the course of the scroll, breaking any 'fixed' feeling.
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "50%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      <motion.div 
        className="absolute top-[-10vh] left-0 w-full h-[150vh]"
        style={{ y: yParallax }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes nebula-drift {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.6; }
            33% { transform: translate(8vw, -8vh) scale(1.15) rotate(10deg); opacity: 0.8; }
            66% { transform: translate(-6vw, 6vh) scale(0.9) rotate(-10deg); opacity: 0.7; }
            100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.6; }
          }
          .nebula-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            animation: nebula-drift 20s ease-in-out infinite;
            mix-blend-mode: screen;
          }
          .dark .nebula-blob {
            filter: blur(80px);
            opacity: 0.6;
          }
        `}} />

        {/* Nebula Cloud 1: Deep Cosmic Purple */}
        <div 
          className="nebula-blob bg-purple-500/60 dark:bg-purple-600/70"
          style={{ width: '50vw', height: '50vh', top: '5%', left: '5%', animationDelay: '0s' }}
        />
        
        {/* Nebula Cloud 2: Stellar Blue */}
        <div 
          className="nebula-blob bg-blue-400/50 dark:bg-blue-600/60"
          style={{ width: '60vw', height: '60vh', top: '30%', right: '-10%', animationDelay: '-10s', animationDirection: 'reverse' }}
        />
        
        {/* Nebula Cloud 3: Auroral Green/Cyan */}
        <div 
          className="nebula-blob bg-teal-400/40 dark:bg-teal-600/50"
          style={{ width: '40vw', height: '40vh', bottom: '15%', left: '20%', animationDelay: '-15s' }}
        />
        
        {/* Nebula Cloud 4: Distant Pink Stardust */}
        <div 
          className="nebula-blob bg-pink-400/50 dark:bg-rose-600/60"
          style={{ width: '45vw', height: '45vh', bottom: '0%', right: '10%', animationDelay: '-5s' }}
        />
        
        {/* Micro-stardust scattering (more visible) */}
        <div 
          className="absolute inset-0 opacity-40 dark:opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', 
            backgroundSize: '80px 80px', 
            backgroundPosition: '0 0, 40px 40px' 
          }} 
        />
      </motion.div>
      
      {/* 
        Decrease dark mode dampening to make the colors punch completely through.
      */}
      <div className="absolute inset-0 bg-white/40 dark:bg-[#0d0d0d]/60 pointer-events-none z-10" />
    </div>
  );
}
