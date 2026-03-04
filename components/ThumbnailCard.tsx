"use client";

import { motion } from "framer-motion";
import { Heart, Play, Code2, Image as ImageIcon, Film, FileText, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Post, PostType } from "@/lib/posts";
import { timeAgo } from "@/lib/posts";

const typeConfig: Record<
  PostType,
  { icon: React.ReactNode; color: string; label: string }
> = {
  build: {
    icon: <Code2 className="h-3 w-3" />,
    color: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    label: "Build",
  },
  image: {
    icon: <ImageIcon className="h-3 w-3" />,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    label: "Image",
  },
  video: {
    icon: <Film className="h-3 w-3" />,
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    label: "Video",
  },
  text: {
    icon: <FileText className="h-3 w-3" />,
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    label: "Text",
  },
  meme: {
    icon: <Smile className="h-3 w-3" />,
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    label: "Meme",
  },
};

export default function ThumbnailCard({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  const router = useRouter();
  const config = typeConfig[post.type || "build"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      onClick={() => router.push(`/post/${post.id}`)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-stone-200/60 hover:border-stone-300 hover:shadow-warm-md transition-all duration-300 h-full flex flex-col"
    >
      {/* Thumbnail — stretches to fill grid area */}
      <div className="relative flex-1 min-h-0 bg-stone-100 overflow-hidden">
        <ThumbnailContent post={post} />

        {/* Type badge */}
        <span
          className={`absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${config.color} backdrop-blur-sm bg-white/80`}
        >
          {config.icon}
          {config.label}
        </span>

        {/* Video duration overlay */}
        {post.type === "video" && (
          <span className="absolute bottom-2 right-2 z-10 bg-black/75 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
            5:00
          </span>
        )}

        {/* Hover play button for video/build */}
        {(post.type === "build" || post.type === "video") && (
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/90 shadow-md">
              <Play className="h-4 w-4 text-stone-700 ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Compact info bar */}
      <div className="px-2.5 py-2 bg-white">
        <div className="flex gap-2">
          <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 flex items-center justify-center text-[9px] font-bold text-amber-700">
            {post.author.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-stone-800 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-stone-400">
              <span>{post.author.name}</span>
              <span>·</span>
              <span className="flex items-center gap-0.5">
                <Heart className="h-2.5 w-2.5" />
                {post.likes}
              </span>
              <span>·</span>
              <span>{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Thumbnail content per type ---------- */

function ThumbnailContent({ post }: { post: Post }) {
  if (post.type === "build") {
    if (post.code) {
      // Prepend overflow-hidden style so the iframe has no scrollbar
      const noScrollCode = `<style>html,body{overflow:hidden!important;margin:0;scrollbar-width:none}::-webkit-scrollbar{display:none}</style>${post.code}`;
      return (
        <iframe
          srcDoc={noScrollCode}
          sandbox="allow-scripts"
          scrolling="no"
          className="thumb-iframe absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "hidden" }}
          title={post.title}
          loading="lazy"
        />
      );
    }
    return <BuildPlaceholder />;
  }

  if (post.type === "image" || post.type === "meme") {
    const src = post.thumbnailUrl || post.mediaUrl;
    return (
      <img
        src={src}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    );
  }

  if (post.type === "video") {
    if (post.thumbnailUrl) {
      return (
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      );
    }
    return <VideoPlaceholder />;
  }

  if (post.type === "text") {
    return (
      <div className="absolute inset-0 flex flex-col justify-center p-4 bg-gradient-to-br from-green-50 via-stone-50 to-amber-50">
        <p className="text-[11px] leading-relaxed text-stone-600 line-clamp-5">
          {post.body || post.description}
        </p>
      </div>
    );
  }

  return <BuildPlaceholder />;
}

function BuildPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-50">
      <Code2 className="h-8 w-8 text-amber-300" />
    </div>
  );
}

function VideoPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-stone-50">
      <Film className="h-8 w-8 text-red-300" />
    </div>
  );
}
