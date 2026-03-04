import { Post, samplePosts } from "./posts";

const STORAGE_KEY = "taksha-user-posts";

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
