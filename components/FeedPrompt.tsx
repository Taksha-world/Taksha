"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, BarChart3, Gamepad2, Palette } from "lucide-react";

const quickChips = [
  { label: "HTML App", icon: <Zap className="h-3 w-3" />, prompt: "a minimal web app" },
  { label: "Dashboard", icon: <BarChart3 className="h-3 w-3" />, prompt: "a data dashboard with charts" },
  { label: "Game", icon: <Gamepad2 className="h-3 w-3" />, prompt: "a simple browser game" },
  { label: "Animation", icon: <Palette className="h-3 w-3" />, prompt: "a CSS animation showcase" },
];

export default function FeedPrompt() {
  const [prompt, setPrompt] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (text?: string) => {
    const query = text || prompt;
    if (!query.trim()) return;
    router.push(`/create?prompt=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full mb-6"
    >
      {/* Prompt input */}
      <div
        className={`relative rounded-xl border transition-all duration-300 ${
          focused
            ? "border-amber-400 shadow-warm-md bg-white"
            : "border-stone-200 bg-white hover:border-stone-300"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <Sparkles
            className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${
              focused ? "text-amber-500" : "text-stone-300"
            }`}
          />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to build..."
            className="flex-1 bg-transparent text-sm text-stone-700 placeholder:text-stone-400 outline-none"
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!prompt.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Build
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Quick chips */}
      <div className="flex items-center gap-2 mt-2.5 flex-wrap">
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => handleSubmit(chip.prompt)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-200"
          >
            {chip.icon}
            {chip.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
