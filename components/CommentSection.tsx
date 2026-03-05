"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import type { Post } from "@/lib/posts";
import { timeAgo } from "@/lib/posts";
import type { Comment } from "@/lib/truth";
import { getCommentsForPost, deleteComment } from "@/lib/comments";
import ComprehensionModal from "./ComprehensionModal";

// ─── Understanding badge (inline) ───────────────────────────

function UnderstandingBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-green-700 bg-green-50 border-green-200/50"
      : score >= 50
        ? "text-amber-700 bg-amber-50 border-amber-200/50"
        : "text-stone-500 bg-stone-50 border-stone-200/50";

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wide ${color}`}
      title={`Understanding Score: ${score}%`}
    >
      <ShieldCheck className="h-3 w-3" />
      {score}%
    </span>
  );
}

// ─── Single comment row ─────────────────────────────────────

function CommentRow({
  comment,
  onDelete,
}: {
  comment: Comment;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group flex gap-3 py-3 border-b border-stone-100 last:border-b-0"
    >
      {/* Avatar */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 text-xs font-bold text-amber-700 flex-shrink-0 mt-0.5">
        {comment.author.avatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-stone-800">
            {comment.author.name}
          </span>
          <UnderstandingBadge score={comment.understandingScore} />
          {comment.clarityBadge && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/40 text-[10px] font-bold text-amber-700">
              <Sparkles className="h-2.5 w-2.5" />
              Clarity
            </span>
          )}
          <span className="text-[11px] text-stone-400">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-stone-600 mt-1 leading-relaxed whitespace-pre-wrap">
          {comment.text}
        </p>
      </div>

      {/* Delete (only visible on hover) */}
      <button
        onClick={() => onDelete(comment.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0 mt-0.5"
        title="Delete comment"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────

interface CommentSectionProps {
  post: Post;
}

export default function CommentSection({ post }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Load comments
  const loadComments = useCallback(() => {
    setComments(getCommentsForPost(post.id));
  }, [post.id]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteComment(id);
      loadComments();
    },
    [loadComments],
  );

  return (
    <div className="mt-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-5 w-5 text-stone-400" />
          <h3 className="text-base font-bold text-stone-800">
            Comments
          </h3>
          {comments.length > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-stone-100 text-[11px] font-bold text-stone-500">
              {comments.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-sm font-semibold text-white hover:from-amber-600 hover:to-amber-700 transition-all shadow-warm-sm hover:shadow-warm-md"
        >
          <ShieldCheck className="h-4 w-4" />
          Add Comment
        </button>
      </div>

      {/* Info note */}
      <div className="rounded-xl bg-amber-50/50 border border-amber-200/30 px-4 py-3 mb-4">
        <p className="text-xs text-amber-700 leading-relaxed">
          <span className="font-bold">Truth Layer active.</span> Every
          comment requires a comprehension check — you must demonstrate
          understanding before sharing your perspective.
        </p>
      </div>

      {/* Comment list */}
      {comments.length > 0 ? (
        <div className="glass-card rounded-xl p-4">
          <AnimatePresence mode="popLayout">
            {comments.map((c) => (
              <CommentRow
                key={c.id}
                comment={c}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-10">
          <MessageSquare className="h-8 w-8 text-stone-200 mx-auto mb-3" />
          <p className="text-sm text-stone-400">
            No comments yet — be the first to demonstrate understanding
          </p>
        </div>
      )}

      {/* Comprehension modal */}
      <ComprehensionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        post={post}
        onCommentSubmitted={loadComments}
      />
    </div>
  );
}
