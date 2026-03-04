"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import ThumbnailCard from "@/components/ThumbnailCard";
import FeedPrompt from "@/components/FeedPrompt";
import { samplePosts, type Post, type PostType } from "@/lib/posts";
import { getAllPosts } from "@/lib/store";

function getSpanClass(type: PostType): string {
  switch (type) {
    case "build":
      return "sm:col-span-3 sm:row-span-3";
    case "image":
    case "video":
    case "meme":
      return "sm:col-span-2 sm:row-span-2";
    case "text":
    default:
      return "sm:col-span-1 sm:row-span-2";
  }
}

const typeFilters: { label: string; value: PostType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Builds", value: "build" },
  { label: "Images", value: "image" },
  { label: "Videos", value: "video" },
  { label: "Text", value: "text" },
  { label: "Memes", value: "meme" },
];

function FeedContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as PostType | null;
  const tabParam = searchParams.get("tab");

  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [activeFilter, setActiveFilter] = useState<PostType | "all">(
    typeParam || "all"
  );

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  // Sync filter from URL
  useEffect(() => {
    if (typeParam) setActiveFilter(typeParam);
    else setActiveFilter("all");
  }, [typeParam]);

  const filteredPosts = useMemo(() => {
    let result =
      activeFilter === "all"
        ? posts
        : posts.filter((p) => p.type === activeFilter);

    // Tab sorting
    if (tabParam === "trending") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    } else if (tabParam === "liked") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    }

    return result;
  }, [posts, activeFilter, tabParam]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar — desktop only */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-[224px] transition-all duration-200">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-6 pb-24">
          {/* Build prompt */}
          <FeedPrompt />

          {/* Filter pills */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
            {typeFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeFilter === filter.value
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Thumbnail grid — variable spans per post type */}
          {filteredPosts.length > 0 ? (
            <div className="feed-grid grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className={getSpanClass(post.type || "build")}>
                  <ThumbnailCard post={post} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-stone-400 text-sm">
                No posts matching this filter yet.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                <Hammer className="h-4 w-4" />
                Be the first to create one
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
        </div>
      }
    >
      <FeedContent />
    </Suspense>
  );
}
