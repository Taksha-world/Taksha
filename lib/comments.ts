/**
 * Comment persistence layer (localStorage for now, Supabase later).
 *
 * Each comment carries an understanding score and optional clarity badge
 * computed by the Truth Layer before it can be submitted.
 */

import type { Comment } from "./truth";
import { earnsClarityBadge } from "./truth";

const COMMENTS_KEY = "taksha-comments";

// ─── Read ───────────────────────────────────────────────────

export function getCommentsForPost(postId: string): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const all: Comment[] = JSON.parse(
      localStorage.getItem(COMMENTS_KEY) || "[]",
    );
    return all
      .filter((c) => c.postId === postId)
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function getCommentCount(postId: string): number {
  return getCommentsForPost(postId).length;
}

// ─── Write ──────────────────────────────────────────────────

export function saveComment(
  postId: string,
  text: string,
  author: { name: string; avatar: string },
  understandingScore: number,
): Comment {
  const comment: Comment = {
    id: `cmt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    postId,
    author,
    text: text.trim(),
    understandingScore,
    clarityBadge: earnsClarityBadge(text, understandingScore),
    createdAt: Date.now(),
  };

  const all: Comment[] = JSON.parse(
    localStorage.getItem(COMMENTS_KEY) || "[]",
  );
  all.push(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));

  return comment;
}

// ─── Delete ─────────────────────────────────────────────────

export function deleteComment(commentId: string): void {
  const all: Comment[] = JSON.parse(
    localStorage.getItem(COMMENTS_KEY) || "[]",
  );
  localStorage.setItem(
    COMMENTS_KEY,
    JSON.stringify(all.filter((c) => c.id !== commentId)),
  );
}
