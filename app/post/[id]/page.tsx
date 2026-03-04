"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  GitFork,
  Rocket,
  ExternalLink,
  Code2,
  Eye,
  Copy,
  Check,
  Share2,
} from "lucide-react";
import LivePreview from "@/components/LivePreview";
import DeployModal from "@/components/DeployModal";
import { useToast } from "@/components/Toast";
import { getPostById } from "@/lib/store";
import { type Post, timeAgo } from "@/lib/posts";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showDeploy, setShowDeploy] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const found = getPostById(id);
    if (found) {
      setPost(found);
      setLikeCount(found.likes);
    } else {
      setNotFound(true);
    }
  }, [params.id]);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
  };

  const handleFork = () => {
    if (!post) return;
    toast(`Forking "${post.title}"...`, "fork");
    router.push(`/create?code=${encodeURIComponent(post.code)}&title=${encodeURIComponent(post.title)}`);
  };

  const handleCopyCode = useCallback(() => {
    if (!post) return;
    navigator.clipboard.writeText(post.code);
    setCopied(true);
    toast("Code copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  }, [post, toast]);

  const handleShare = useCallback(() => {
    if (!post) return;
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied!", "share");
  }, [post, toast]);

  const handleOpenExternal = () => {
    if (!post) return;
    const blob = new Blob([post.code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="font-display text-2xl font-bold text-stone-800 mb-2">Post not found</h2>
          <p className="text-stone-500 text-sm mb-6">This creation might have been removed or the link is incorrect.</p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-amber-600 hover:to-amber-700 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-2 border-amber-400/30 border-t-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-stone-400 text-sm">Loading post...</p>
        </div>
      </div>
    );
  }

  const tagColors: Record<string, string> = {
    HTML: "bg-terracotta-500/10 text-terracotta-500 border-terracotta-500/15",
    JavaScript: "bg-amber-500/10 text-amber-700 border-amber-500/15",
    CSS: "bg-blue-500/10 text-blue-600 border-blue-500/15",
    Python: "bg-green-500/10 text-green-600 border-green-500/15",
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-200/60"
        >
          <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <div className="h-5 w-px bg-stone-200" />
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 text-xs font-bold text-amber-700">
                  {post.author.avatar}
                </div>
                <span className="text-sm font-medium text-stone-700">{post.author.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-500 hover:border-amber-400 hover:text-amber-700 transition-all"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
              <button
                onClick={handleFork}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-semibold text-white hover:from-amber-600 hover:to-amber-700 transition-all"
              >
                <GitFork className="h-3.5 w-3.5" />
                Fork & Edit
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="mx-auto max-w-6xl px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Post Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                    tagColors[post.tag] || tagColors.HTML
                  }`}
                >
                  <Code2 className="h-3 w-3" />
                  {post.tag}
                </span>
                <span className="text-xs text-stone-400">{timeAgo(post.createdAt)}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-stone-800 mb-2">
                {post.title}
              </h1>
              <p className="text-stone-500 max-w-2xl">{post.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 border ${
                  liked
                    ? "text-red-500 bg-red-50 border-red-200"
                    : "text-stone-500 bg-white border-stone-200 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
                }`}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                {likeCount}
              </motion.button>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-stone-500 bg-white border border-stone-200 hover:border-amber-400 hover:text-amber-700 transition-all"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>

              <button
                onClick={() => { setShowDeploy(true); toast("Launched fullscreen preview", "deploy"); }}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-stone-500 bg-white border border-stone-200 hover:border-green-400 hover:text-green-600 transition-all"
              >
                <Rocket className="h-4 w-4" />
                Deploy
              </button>

              <button
                onClick={handleOpenExternal}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-stone-500 bg-white border border-stone-200 hover:border-stone-300 hover:text-stone-700 transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                New Tab
              </button>
            </div>

            {/* Toggle Preview / Code */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-stone-100 w-fit mb-4">
              <button
                onClick={() => setShowCode(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  !showCode ? "bg-white shadow-sm text-stone-800" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button
                onClick={() => setShowCode(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  showCode ? "bg-white shadow-sm text-stone-800" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                <Code2 className="h-4 w-4" />
                Source Code
              </button>
            </div>

            {/* Preview / Code panel */}
            <div className="glass-card rounded-2xl overflow-hidden">
              {showCode ? (
                <div className="relative">
                  <pre className="p-6 overflow-auto text-sm text-stone-700 font-mono leading-relaxed max-h-[70vh] bg-stone-50">
                    <code>{post.code}</code>
                  </pre>
                </div>
              ) : (
                <LivePreview code={post.code} className="h-[70vh]" />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <DeployModal
        isOpen={showDeploy}
        onClose={() => setShowDeploy(false)}
        code={post.code}
        title={post.title}
      />
    </>
  );
}
