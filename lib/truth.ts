/**
 * Truth Layer — Epistemic Honesty Engine
 *
 * Before a user can comment on any post, they must demonstrate
 * they understand what the post actually does. This file holds
 * types, scoring helpers, and the Claude API integration for
 * generating summaries and comprehension questions.
 */

import type { Post } from "./posts";

// ─── Types ──────────────────────────────────────────────────

export interface ComprehensionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ComprehensionChallenge {
  summary: string;
  questions: ComprehensionQuestion[];
}

export interface Comment {
  id: string;
  postId: string;
  author: { name: string; avatar: string };
  text: string;
  understandingScore: number; // 0–100
  clarityBadge: boolean; // short + high score
  createdAt: number;
}

// ─── Scoring ────────────────────────────────────────────────

/** Compute understanding score from quiz results */
export function computeUnderstandingScore(
  totalQuestions: number,
  correctAnswers: number,
): number {
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
}

/** Comments under this length earn a clarity badge */
const CLARITY_THRESHOLD = 280; // characters

export function earnsClarityBadge(
  text: string,
  understandingScore: number,
): boolean {
  return text.length <= CLARITY_THRESHOLD && understandingScore >= 80;
}

/** Character limit for comments */
export const COMMENT_MAX_LENGTH = 500;

// ─── Content extraction ─────────────────────────────────────

/** Extract meaningful text from a post for summarisation */
export function extractPostContent(post: Post): string {
  const parts: string[] = [];
  parts.push(`Title: ${post.title}`);
  parts.push(`Description: ${post.description}`);
  if (post.body) parts.push(`Body: ${post.body}`);
  if (post.code) {
    // Send first ~2000 chars of code to keep token cost low
    const snippet = post.code.slice(0, 2000);
    parts.push(`Code:\n${snippet}`);
  }
  return parts.join("\n\n");
}

// ─── Claude API helpers ─────────────────────────────────────

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";

interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

async function callClaude(
  messages: ClaudeMessage[],
  maxTokens: number = 1024,
): Promise<string> {
  const apiKey =
    typeof window !== "undefined"
      ? (window as unknown as Record<string, string>).__ANTHROPIC_KEY
      : undefined;

  // If no key is available, fall back to the local API route
  const res = await fetch(apiKey ? ANTHROPIC_ENDPOINT : "/api/truth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey
        ? {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          }
        : {}),
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      messages,
    }),
  });

  if (!res.ok) {
    throw new Error(`Claude API error: ${res.status}`);
  }

  const data = await res.json();
  // direct API returns { content: [{ text }] }, our route proxies the same shape
  const text =
    data?.content?.[0]?.text ?? data?.text ?? JSON.stringify(data);
  return text;
}

// ─── Public API ─────────────────────────────────────────────

/**
 * Generate a short summary + 2-3 comprehension questions for a post.
 * Falls back to a deterministic offline version when the API is
 * unreachable so the feature always works.
 */
export async function generateComprehensionChallenge(
  post: Post,
): Promise<ComprehensionChallenge> {
  const content = extractPostContent(post);

  const prompt = `You are the Truth Layer of Taksha — a platform that requires understanding before opinion.

Given the following post content, produce:
1. A concise 2-3 sentence summary of what this post does or argues.
2. Exactly 3 multiple-choice comprehension questions (each with 4 options, exactly one correct).

Respond ONLY with valid JSON matching this schema — no markdown, no explanation:

{
  "summary": "...",
  "questions": [
    { "question": "...", "options": ["A","B","C","D"], "correctIndex": 0 },
    { "question": "...", "options": ["A","B","C","D"], "correctIndex": 2 },
    { "question": "...", "options": ["A","B","C","D"], "correctIndex": 1 }
  ]
}

Post content:
${content}`;

  try {
    const raw = await callClaude([{ role: "user", content: prompt }], 1024);
    // Extract JSON from response (handle potential markdown wrapping)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const parsed = JSON.parse(jsonMatch[0]) as ComprehensionChallenge;

    // Validate shape
    if (
      !parsed.summary ||
      !Array.isArray(parsed.questions) ||
      parsed.questions.length === 0
    ) {
      throw new Error("Invalid challenge shape");
    }

    return parsed;
  } catch {
    // Deterministic fallback — still enforces reading
    return buildFallbackChallenge(post);
  }
}

// ─── Offline fallback ───────────────────────────────────────

function buildFallbackChallenge(post: Post): ComprehensionChallenge {
  const isBuild = !post.type || post.type === "build";
  const summary = isBuild
    ? `This is a ${post.tag} build titled "${post.title}". ${post.description}`
    : `This is a ${post.type} post titled "${post.title}". ${post.description}`;

  const questions: ComprehensionQuestion[] = [
    {
      question: `What is the title of this post?`,
      options: [
        post.title,
        "Untitled Post",
        "Quick Demo",
        "Hello World",
      ],
      correctIndex: 0,
    },
    {
      question: `What type of content is this post?`,
      options: [
        "A random meme",
        isBuild ? `A ${post.tag} build` : `A ${post.type} post`,
        "A news article",
        "A video tutorial",
      ],
      correctIndex: 1,
    },
    {
      question: `Who is the author of this post?`,
      options: [
        "Anonymous",
        "Admin",
        post.author.name,
        "System Generated",
      ],
      correctIndex: 2,
    },
  ];

  return { summary, questions };
}
