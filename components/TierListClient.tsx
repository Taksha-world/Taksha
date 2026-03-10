"use client";

import { motion } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { useState, useMemo } from "react";
import type { ToolPage, ToolEntry } from "@/lib/tier-lists";

export default function TierListClient({ page }: { page: ToolPage }) {
  const [query, setQuery] = useState("");

  const filtered: ToolEntry[] = useMemo(() => {
    if (!query.trim()) return page.tools;
    const q = query.toLowerCase();
    return page.tools.filter(
      (t: ToolEntry) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [page, query]);

  // Tier colors for category badges
  const tierColor = (cat: string) => {
    if (cat.startsWith("S")) return "bg-amber-100 text-amber-800";
    if (cat.startsWith("A")) return "bg-emerald-100 text-emerald-800";
    if (cat.startsWith("B")) return "bg-sky-100 text-sky-800";
    return "bg-stone-100 text-stone-500";
  };

  return (
    <>
      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-10 pr-4 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all"
        />
      </div>

      {/* Visual cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tool: ToolEntry, i: number) => {
          const Wrapper = tool.url ? motion.a : motion.div;
          const linkProps = tool.url
            ? { href: tool.url, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <Wrapper
              key={tool.name}
              {...linkProps}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-xl border border-stone-200/60 bg-white overflow-hidden hover:border-stone-300 hover:shadow-warm-md transition-all duration-300 flex flex-col"
            >
              {/* Scene visual — poster header */}
              <div
                className={`relative h-32 bg-gradient-to-br ${tool.color} overflow-hidden flex items-center justify-center`}
              >
                <div className="absolute inset-0 opacity-[0.06] dot-pattern" />
                {/* Scene emojis arranged as a composition */}
                <div className="relative flex items-center gap-1 select-none">
                  {tool.scene.slice(0, 4).map((emoji, j) => (
                    <span
                      key={j}
                      className={`drop-shadow-md ${
                        j === 0
                          ? "text-4xl -rotate-6"
                          : j === 1
                          ? "text-3xl rotate-3 -mt-4"
                          : j === 2
                          ? "text-3xl -rotate-3 mt-2"
                          : "text-4xl rotate-6 -mt-3"
                      }`}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
                {/* Tier badge on poster */}
                <span
                  className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md ${tierColor(
                    tool.category
                  )}`}
                >
                  {tool.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{tool.icon}</span>
                  <h3 className="text-sm font-semibold text-stone-800 truncate">
                    {tool.name}
                  </h3>
                  {tool.url && (
                    <ExternalLink className="h-3 w-3 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-auto" />
                  )}
                </div>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2">
                  {tool.bestFor && (
                    <span className="inline-block text-[10px] font-medium text-amber-700 bg-amber-50 rounded-md px-2 py-0.5">
                      {tool.bestFor}
                    </span>
                  )}
                  {tool.pricing && (
                    <span className="inline-block text-[10px] font-medium text-emerald-700 bg-emerald-50 rounded-md px-2 py-0.5">
                      {tool.pricing}
                    </span>
                  )}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-stone-400 mt-12">
          No items match your search.
        </p>
      )}
    </>
  );
}
