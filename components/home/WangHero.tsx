"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// List of poetic phrases for the typewriter effect
const HERO_PHRASES = [
  "杨柳迷离晓雾中，杏花零落五更钟",
  "星空迷上了山野，有雾有灯也有归人",
  "一蓑烟雨任平生，也无风雨也无晴",
  "吹灭读书灯，一身都是月",
  "落霞与孤鹜齐飞，秋水共长天一色",
  "满船清梦压星河",
];

function TypewriterEffect() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = HERO_PHRASES[phraseIndex];

    if (!isDeleting && text === fullText) {
      // Pause at the end of typing before starting to delete
      timer = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && text === "") {
      // Pause when fully deleted before starting the next phrase
      timer = setTimeout(() => {
        setIsDeleting(false);
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * HERO_PHRASES.length);
        } while (nextIndex === phraseIndex && HERO_PHRASES.length > 1);
        setPhraseIndex(nextIndex);
      }, 800);
    } else {
      // Type or Delete characters
      const speed = isDeleting ? 40 : 100 + Math.random() * 100;
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className="inline-block relative min-h-[1.5em]">
      {text}
      {/* Blinking Cursor */}
      <span className="inline-block w-[3px] h-[1em] bg-white ml-[2px] align-middle animate-[pulse_1s_infinite_ease-in-out]" />
    </span>
  );
}

// Generates the massive box-shadow string for stars
const generateStars = (count: number) => {
  let val = "";
  for (let i = 0; i < count; i++) {
    val += `${Math.floor(Math.random() * 2500)}px ${Math.floor(Math.random() * 2500)}px #FFF`;
    if (i < count - 1) val += ", ";
  }
  return val;
};

function StarryBackground() {
  const [stars, setStars] = useState({ small: "", medium: "", large: "" });

  useEffect(() => {
    setStars({
      small: generateStars(300),
      medium: generateStars(150),
      large: generateStars(50),
    });
  }, []);

  if (!stars.small) return null; // Wait for client render

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2500px); }
        }
        .stars-small { 
          width: 1px; height: 1px; background: transparent; 
          box-shadow: ${stars.small}; 
          animation: animStar 50s linear infinite; 
        }
        .stars-small:after { 
          content: " "; position: absolute; top: 2500px; 
          width: 1px; height: 1px; background: transparent; 
          box-shadow: ${stars.small}; 
        }
        .stars-medium { 
          width: 2px; height: 2px; background: transparent; 
          box-shadow: ${stars.medium}; 
          animation: animStar 100s linear infinite; 
          border-radius: 50%; opacity: 0.8;
        }
        .stars-medium:after { 
          content: " "; position: absolute; top: 2500px; 
          width: 2px; height: 2px; background: transparent; 
          box-shadow: ${stars.medium}; border-radius: 50%; 
        }
        .stars-large { 
          width: 3px; height: 3px; background: transparent; 
          box-shadow: ${stars.large}; 
          animation: animStar 150s linear infinite; 
          border-radius: 50%; opacity: 0.6;
        }
        .stars-large:after { 
          content: " "; position: absolute; top: 2500px; 
          width: 3px; height: 3px; background: transparent; 
          box-shadow: ${stars.large}; border-radius: 50%; 
        }
      `}} />
      <div className="stars-small" />
      <div className="stars-medium" />
      <div className="stars-large" />
    </div>
  );
}

function Meteors() {
  const meteors = [
    { id: 1, top: '10%', left: '80%', delay: '0s', duration: '5s' },
    { id: 2, top: '-10%', left: '50%', delay: '2s', duration: '4.5s' },
    { id: 3, top: '20%', left: '95%', delay: '4s', duration: '6s' },
    { id: 4, top: '5%', left: '30%', delay: '7s', duration: '5.5s' },
    { id: 5, top: '40%', left: '90%', delay: '10s', duration: '5s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes meteor-shower {
          0% { transform: rotate(215deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-1500px); opacity: 0; }
        }
        .meteor-tail {
          position: absolute;
          width: 150px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
          border-radius: 999px;
        }
        .meteor-tail::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.4);
        }
      `}} />
      {meteors.map((m) => (
        <div 
          key={m.id}
          className="meteor-tail"
          style={{ 
            top: m.top, 
            left: m.left, 
            animation: `meteor-shower ${m.duration} linear infinite`,
            animationDelay: m.delay
          }} 
        />
      ))}
    </div>
  );
}

function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-50">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes aurora-spin {
          0% { transform: rotate(0deg) scale(1.5); }
          50% { transform: rotate(180deg) scale(2); }
          100% { transform: rotate(360deg) scale(1.5); }
        }
        @keyframes aurora-spin-reverse {
          0% { transform: rotate(360deg) scale(1.5); }
          50% { transform: rotate(180deg) scale(2); }
          100% { transform: rotate(0deg) scale(1.5); }
        }
      `}} />
      {/* Greenish Aurora */}
      <div 
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] origin-center rounded-full"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 40%)',
          animation: 'aurora-spin 40s linear infinite',
          filter: 'blur(60px)'
        }} 
      />
      {/* Purplish/Blueish Aurora */}
      <div 
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] origin-center rounded-full"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, rgba(56, 189, 248, 0) 50%)',
          animation: 'aurora-spin-reverse 50s linear infinite',
          filter: 'blur(60px)'
        }} 
      />
    </div>
  );
}

export function WangHero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Inject custom flowing gradient keyframes directly for modularity */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes flow-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bg-flow {
          background-size: 400% 400%;
          animation: flow-gradient 15s ease infinite;
        }
      `}} />

      {/* Deep Space Gradient Background */}
      <div className="relative w-full h-screen flex items-center justify-center -mt-[64px] bg-[linear-gradient(-45deg,#020111,#1a0b2e,#00001a)] animate-bg-flow text-white overflow-hidden">
        
        {/* Cosmos FX Layers */}
        <StarryBackground />
        <Aurora />
        <Meteors />

        {/* Foreground Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            爱发呆的菜菜
          </motion.h1>
          <motion.div
            className="text-lg md:text-2xl text-white/95 font-medium tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TypewriterEffect />
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors cursor-pointer p-4"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          aria-label="向下滚动"
        >
          <ChevronDown className="w-10 h-10" />
        </motion.button>
      </div>
    </>
  );
}
