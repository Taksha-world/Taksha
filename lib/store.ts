import { Post, samplePosts } from "./posts";

const STORAGE_KEY = "taksha-user-posts";
const PINNED_KEY = "taksha-pinned-posts";

export function getUserPosts(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveUserPost(post: Omit<Post, "id" | "likes" | "forks">): Post {
  const newPost: Post = {
    ...post,
    id: "user-" + Date.now().toString(36),
    likes: 0,
    forks: 0,
    createdAt: Date.now(),
  };

  const existing = getUserPosts();
  const updated = [newPost, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newPost;
}

export function getAllPosts(): Post[] {
  const userPosts = getUserPosts();
  return [...userPosts, ...samplePosts];
}

export function getPostById(id: string): Post | undefined {
  return getAllPosts().find((p) => p.id === id);
}

// --- Pinned / saved-for-later posts ---

export interface PinnedEntry {
  id: string;
  title: string;
  avatar: string;
  type: string;
  pinnedAt: number;
}

export function getPinnedPosts(): PinnedEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(PINNED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function pinPost(post: Post): PinnedEntry[] {
  const existing = getPinnedPosts();
  if (existing.some((p) => p.id === post.id)) return existing; // already pinned
  const entry: PinnedEntry = {
    id: post.id,
    title: post.title,
    avatar: post.author.avatar,
    type: post.type || "build",
    pinnedAt: Date.now(),
  };
  const updated = [entry, ...existing];
  localStorage.setItem(PINNED_KEY, JSON.stringify(updated));
  return updated;
}

export function unpinPost(id: string): PinnedEntry[] {
  const existing = getPinnedPosts();
  const updated = existing.filter((p) => p.id !== id);
  localStorage.setItem(PINNED_KEY, JSON.stringify(updated));
  return updated;
}
