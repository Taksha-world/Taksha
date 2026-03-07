"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, ThumbsUp, Eye } from "lucide-react";

interface Video {
  id: string;
  title: string;
  speaker: string;
  description: string;
  youtubeId: string;
  duration: string;
  views: string;
  topic: string;
}

const videos: Video[] = [
  {
    id: "v1",
    title: "Thinking, Fast and Slow",
    speaker: "Daniel Kahneman",
    description:
      "Nobel laureate Daniel Kahneman discusses the two systems that drive the way we think — intuitive and deliberate.",
    youtubeId: "CjVQJdIrDJ0",
    duration: "59:26",
    views: "2.1M",
    topic: "Psychology",
  },
  {
    id: "v2",
    title: "Sapiens: A Brief History of Humankind",
    speaker: "Yuval Noah Harari",
    description:
      "Historian Yuval Noah Harari explores how Homo sapiens came to dominate the Earth and what it means for our future.",
    youtubeId: "1GnBamMRJCo",
    duration: "55:41",
    views: "1.8M",
    topic: "History",
  },
  {
    id: "v3",
    title: "Atomic Habits",
    speaker: "James Clear",
    description:
      "James Clear reveals practical strategies for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to results.",
    youtubeId: "PZ7lDrwYdZc",
    duration: "44:38",
    views: "3.5M",
    topic: "Self-improvement",
  },
  {
    id: "v4",
    title: "The Lean Startup",
    speaker: "Eric Ries",
    description:
      "Eric Ries explains how continuous innovation is at the heart of startup success and how validated learning drives progress.",
    youtubeId: "fEvKo90qBns",
    duration: "58:12",
    views: "1.2M",
    topic: "Business",
  },
  {
    id: "v5",
    title: "Deep Work",
    speaker: "Cal Newport",
    description:
      "Cal Newport argues that the ability to concentrate without distraction is becoming increasingly rare and increasingly valuable.",
    youtubeId: "gTaJhjQHcf8",
    duration: "51:33",
    views: "980K",
    topic: "Productivity",
  },
  {
    id: "v6",
    title: "Educated: A Memoir",
    speaker: "Tara Westover",
    description:
      "Tara Westover tells her story of growing up in a survivalist family and her journey to education and self-invention.",
    youtubeId: "wOnSaGMRBRg",
    duration: "42:15",
    views: "750K",
    topic: "Memoir",
  },
];

export default function VideosSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-stone-800 tracking-tight">
            Book Discussions at Google
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Authors share ideas from their books — Talks at Google
          </p>
        </div>
        <a
          href="https://www.youtube.com/@talksatgoogle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="group rounded-xl border border-stone-200/60 bg-white overflow-hidden hover:border-stone-300 hover:shadow-warm-md transition-all duration-300"
          >
            {/* Video thumbnail / embed area */}
            <div className="relative aspect-video bg-stone-900 overflow-hidden">
              {playingId === video.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                  title={video.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play overlay */}
                  <button
                    onClick={() => setPlayingId(video.id)}
                    title={`Play ${video.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-5 w-5 text-stone-800 ml-0.5" />
                    </div>
                  </button>
                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                    <Clock className="h-2.5 w-2.5 inline mr-1" />
                    {video.duration}
                  </span>
                </>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Google avatar */}
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 flex items-center justify-center text-[10px] font-bold text-white">
                  G
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {video.speaker} · Talks at Google
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] text-stone-400">
                      <Eye className="h-2.5 w-2.5" />
                      {video.views}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-stone-400">
                      <ThumbsUp className="h-2.5 w-2.5" />
                      {video.topic}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
