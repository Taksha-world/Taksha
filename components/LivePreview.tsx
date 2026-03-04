"use client";

import { useRef, useEffect, useState } from "react";

interface LivePreviewProps {
  code: string;
  className?: string;
}

export default function LivePreview({ code, className = "" }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className={`relative overflow-hidden rounded-xl iframe-frame ${className}`}>
      {/* Top bar decoration */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-50 border-b border-stone-200/60">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-stone-100 flex items-center px-2">
          <span className="text-[10px] text-stone-400 font-mono truncate">taksha://live-preview</span>
        </div>
      </div>

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        srcDoc={code}
        sandbox="allow-scripts"
        className={`w-full bg-white transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "100%", minHeight: "280px", border: "none" }}
        title="Live Preview"
      />

      {/* Loading shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 top-[33px] flex items-center justify-center bg-stone-50/50">
          <div className="h-8 w-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
        </div>
      )}
    </div>
  );
}
