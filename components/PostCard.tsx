"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, GitFork, Rocket, Play, Code2, ExternalLink, Maximize2, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import LivePreview from "./LivePreview";
import DeployModal from "./DeployModal";
import { useToast } from "./Toast";
import type { Post } from "@/lib/posts";
import { timeAgo } from "@/lib/posts";
import { getCommentCount } from "@/lib/comments";

interface PostCardProps {
  post: Post;
  index: number;
}

const tagColors: Record<string, string> = {
  HTML: "bg-terracotta-500/10 text-terracotta-500 border-terracotta-500/15",
  JavaScript: "bg-amber-500/10 text-amber-700 border-amber-500/15",
  CSS: "bg-blue-500/10 text-blue-600 border-blue-500/15",
  Python: "bg-green-500/10 text-green-600 border-green-500/15",
};

export default function PostCard({ post, index }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showPreview, setShowPreview] = useState(true);
  const [showDeploy, setShowDeploy] = useState(false);
  const [commentCount] = useState(() => getCommentCount(post.id));
  const router = useRouter();
  const { toast } = useToast();

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
  };

  const handleFork = () => {
    toast(`Forking "${post.title}"...`, "fork");
    const encoded = encodeURIComponent(post.code);
    router.push(`/create?code=${encoded}&title=${encodeURIComponent(post.title)}`);
  };

  const handleDeploy = () => {
    setShowDeploy(true);
    toast("Launched fullscreen preview", "deploy");
  };

  const handleOpenExternal = () => {
    const blob = new Blob([post.code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handlePostClick = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        className="glass-card rounded-2xl overflow-hidden group hover:border-stone-200 transition-all duration-500 hover:shadow-warm-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 text-sm font-bold text-amber-700">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800">
                {post.author.name}
              </p>
              <p className="text-xs text-stone-400">{timeAgo(post.createdAt)}</p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
              tagColors[post.tag] || tagColors.HTML
            }`}
          >
            <Code2 className="h-3 w-3" />
            {post.tag}
          </span>
        </div>

        {/* Title & Description — clickable */}
        <button onClick={handlePostClick} className="block w-full text-left px-5 pb-4 group/title">
          <h3 className="font-display text-xl font-bold text-stone-800 mb-1 group-hover/title:text-amber-700 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed">
            {post.description}
          </p>
        </button>

        {/* Live Preview */}
        <div className="mx-3 mb-3 relative">
          {showPreview ? (
            <div className="relative group/preview">
              <LivePreview code={post.code} className="h-[320px]" />
              {/* Hover overlay with expand */}
              <button
                onClick={handleDeploy}
                className="absolute top-[42px] right-2 opacity-0 group-hover/preview:opacity-100 transition-opacity p-2 rounded-lg bg-white/90 border border-stone-200 text-stone-500 hover:text-amber-600 shadow-sm z-10"
                title="Fullscreen preview"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/60 to-transparent rounded-b-xl pointer-events-none" />
            </div>
          ) : (
            <button
              onClick={() => setShowPreview(true)}
              className="w-full flex items-center justify-center gap-2 py-16 rounded-xl bg-stone-50 border border-stone-200 text-stone-400 hover:text-amber-600 hover:border-amber-300 transition-all duration-300"
            >
              <Play className="h-5 w-5" />
              <span className="text-sm font-medium">Run Preview</span>
            </button>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100">
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                liked
                  ? "text-red-500 bg-red-50"
                  : "text-stone-400 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-200 ${liked ? "fill-current" : ""}`}
              />
              <span className="font-medium">{likeCount}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleFork}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
              title="Fork and edit this code"
            >
              <GitFork className="h-4 w-4" />
              <span className="font-medium">{post.forks}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePostClick}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-stone-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              title="View comments (Truth Layer)"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">{commentCount}</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDeploy}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-stone-400 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
              title="Launch fullscreen preview"
            >
              <Rocket className="h-3.5 w-3.5" />
              <span className="font-medium">Deploy</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenExternal}
              className="flex items-center justify-center h-8 w-8 rounded-lg text-stone-300 hover:text-stone-500 hover:bg-stone-50 transition-all duration-200"
              title="Open in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* Deploy / Fullscreen Modal */}
      <DeployModal
        isOpen={showDeploy}
        onClose={() => setShowDeploy(false)}
        code={post.code}
        title={post.title}
      />
    </>
  );
}
