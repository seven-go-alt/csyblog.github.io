"use client";
import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="absolute top-3 right-3 p-2 rounded-md bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-100 ring-1 ring-white/10 z-10"
      aria-label="Copy code to clipboard"
    >
      {isCopied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}
