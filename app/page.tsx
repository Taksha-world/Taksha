"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Hammer, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { samplePosts, type Post } from "@/lib/posts";
import { getAllPosts } from "@/lib/store";

const filters = ["All", "HTML", "JavaScript", "CSS"] as const;
type Filter = (typeof filters)[number];

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [posts, setPosts] = useState<Post[]>(samplePosts);

  // Load user posts from localStorage on mount
  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.tag === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-amber-500/[0.04] via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/15 bg-amber-500/[0.06] px-4 py-1.5 text-xs font-medium text-amber-700 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Posts that run. Code that lives.
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-800 mb-4 leading-[1.1]">
              Software that lives{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-terracotta-400 bg-clip-text text-transparent">
                in the feed
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-stone-500 leading-relaxed mb-8">
              Taksha is where every post is a running program. Build, share, and fork
              live applications — no deploy step, no friction. Think GitHub meets Twitter for code.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                href="/create"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-warm-lg"
              >
                <Hammer className="h-4 w-4" />
                Start Building
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#feed"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-6 py-3 text-sm font-medium text-stone-600 transition-all duration-300 hover:border-amber-500/30 hover:text-amber-700 hover:bg-amber-500/5"
              >
                Explore Feed
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="flex items-center gap-2 text-stone-400">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">{posts.length} live apps</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <Users className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Growing community</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feed */}
      <section id="feed" className="mx-auto max-w-3xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="font-display text-2xl font-bold text-stone-800">
              Live Feed
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Running software from the community
            </p>
          </div>
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-amber-500/10 text-amber-700 border border-amber-500/20"
                    : "text-stone-400 hover:text-stone-600 hover:bg-stone-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-400 text-sm">No posts matching this filter yet.</p>
              <Link href="/create" className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-amber-600 hover:text-amber-700">
                <Hammer className="h-4 w-4" />
                Be the first to create one
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
