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

  return (
    <>
      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-10 pr-4 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all"
        />
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool: ToolEntry, i: number) => (
          <motion.a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="group relative rounded-xl border border-stone-200/60 bg-white p-5 hover:border-stone-300 hover:shadow-warm-md transition-all duration-300 flex flex-col gap-3"
          >
            {/* Icon */}
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-white shadow-sm text-lg`}
            >
              {tool.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-stone-800 truncate">
                  {tool.name}
                </h3>
                <ExternalLink className="h-3 w-3 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
              {tool.pricing && (
                <span className="inline-block mt-2 text-[10px] font-medium text-emerald-700 bg-emerald-50 rounded-md px-2 py-0.5">
                  {tool.pricing}
                </span>
              )}
            </div>

            {/* Category pill */}
            <span className="self-start inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-500">
              {tool.category}
            </span>
          </motion.a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-stone-400 mt-12">
          No tools match your search.
        </p>
      )}
    </>
  );
}
