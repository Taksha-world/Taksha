"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Brain,
  CheckCircle2,
  XCircle,
  Loader2,
  MessageSquare,
  Sparkles,
  Send,
  ShieldCheck,
} from "lucide-react";
import type { Post } from "@/lib/posts";
import {
  generateComprehensionChallenge,
  computeUnderstandingScore,
  COMMENT_MAX_LENGTH,
  type ComprehensionChallenge,
} from "@/lib/truth";
import { saveComment } from "@/lib/comments";
import { useAuth } from "./AuthProvider";

// ─── Props ──────────────────────────────────────────────────

interface ComprehensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onCommentSubmitted?: () => void;
}

// ─── Component ──────────────────────────────────────────────

export default function ComprehensionModal({
  isOpen,
  onClose,
  post,
  onCommentSubmitted,
}: ComprehensionModalProps) {
  // Auth
  const { user } = useAuth();

  // Step machine: loading → quiz → comment → done
  type Step = "loading" | "quiz" | "comment" | "done";

  const [step, setStep] = useState<Step>("loading");
  const [challenge, setChallenge] = useState<ComprehensionChallenge | null>(
    null,
  );
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [retryMessage, setRetryMessage] = useState("");

  // ── Load challenge on open ────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    setStep("loading");
    setChallenge(null);
    setAnswers([]);
    setRevealed(false);
    setScore(0);
    setCommentText("");
    setRetryMessage("");

    let cancelled = false;

    generateComprehensionChallenge(post).then((c) => {
      if (cancelled) return;
      setChallenge(c);
      setAnswers(new Array(c.questions.length).fill(null));
      setStep("quiz");
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, post]);

  // ── Quiz handlers ─────────────────────────────────────────

  const selectAnswer = useCallback(
    (questionIdx: number, optionIdx: number) => {
      if (revealed) return;
      setAnswers((prev) => {
        const next = [...prev];
        next[questionIdx] = optionIdx;
        return next;
      });
    },
    [revealed],
  );

  const handleSubmitQuiz = useCallback(() => {
    if (!challenge) return;
    const allAnswered = answers.every((a) => a !== null);
    if (!allAnswered) return;

    setRevealed(true);

    const correct = challenge.questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
      0,
    );
    const s = computeUnderstandingScore(challenge.questions.length, correct);
    setScore(s);

    if (s >= 67) {
      // At least 2/3 correct — unlock commenting
      setTimeout(() => setStep("comment"), 1200);
    } else {
      setRetryMessage(
        "Try again — understanding comes before opinion.",
      );
    }
  }, [answers, challenge]);

  const handleRetry = useCallback(() => {
    if (!challenge) return;
    setAnswers(new Array(challenge.questions.length).fill(null));
    setRevealed(false);
    setRetryMessage("");
  }, [challenge]);

  // ── Comment handler ───────────────────────────────────────

  const handlePostComment = useCallback(() => {
    if (commentText.trim().length === 0) return;
    setSubmitting(true);

    const authorName =
      user?.email?.split("@")[0] ?? "Anonymous Builder";
    const authorAvatar = authorName.slice(0, 2).toUpperCase();

    saveComment(
      post.id,
      commentText,
      { name: authorName, avatar: authorAvatar },
      score,
    );

    setTimeout(() => {
      setSubmitting(false);
      setStep("done");
      onCommentSubmitted?.();
    }, 400);
  }, [commentText, post.id, score, user, onCommentSubmitted]);

  // ── Render ────────────────────────────────────────────────

  const charsLeft = COMMENT_MAX_LENGTH - commentText.length;
  const charsPercent = (commentText.length / COMMENT_MAX_LENGTH) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-stone-200 shadow-2xl"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-white/95 backdrop-blur-sm rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 border border-amber-200/50">
                  <Brain className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-800">
                    Truth Layer
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Understand before you comment
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* ── Loading ─────────────────────────────── */}
              {step === "loading" && (
                <div className="flex flex-col items-center py-12 gap-4 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="h-8 w-8 text-amber-500" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-stone-700">
                      Generating comprehension check…
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      The Truth Layer is analysing this post
                    </p>
                  </div>
                </div>
              )}

              {/* ── Quiz ───────────────────────────────── */}
              {step === "quiz" && challenge && (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="rounded-xl bg-amber-50/60 border border-amber-200/40 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                        Post Summary
                      </span>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {challenge.summary}
                    </p>
                  </div>

                  {/* Questions */}
                  {challenge.questions.map((q, qi) => (
                    <motion.div
                      key={qi}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: qi * 0.1 }}
                      className="space-y-2.5"
                    >
                      <p className="text-sm font-semibold text-stone-800">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-stone-100 text-[11px] font-bold text-stone-500 mr-2">
                          {qi + 1}
                        </span>
                        {q.question}
                      </p>
                      <div className="grid gap-2">
                        {q.options.map((opt, oi) => {
                          const selected = answers[qi] === oi;
                          const isCorrect = q.correctIndex === oi;
                          let optionStyle =
                            "border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-amber-50/40";
                          if (revealed && selected && isCorrect) {
                            optionStyle =
                              "border-green-400 bg-green-50 text-green-800";
                          } else if (revealed && selected && !isCorrect) {
                            optionStyle =
                              "border-red-300 bg-red-50 text-red-700";
                          } else if (revealed && isCorrect) {
                            optionStyle =
                              "border-green-300 bg-green-50/50 text-green-700";
                          } else if (selected) {
                            optionStyle =
                              "border-amber-400 bg-amber-50 text-amber-800 ring-1 ring-amber-300";
                          }

                          return (
                            <button
                              key={oi}
                              onClick={() => selectAnswer(qi, oi)}
                              disabled={revealed}
                              className={`flex items-center gap-3 w-full text-left rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 ${optionStyle}`}
                            >
                              {revealed && selected && isCorrect && (
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                              )}
                              {revealed && selected && !isCorrect && (
                                <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                              )}
                              {revealed && !selected && isCorrect && (
                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                              )}
                              {!revealed && (
                                <span
                                  className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold flex-shrink-0 ${
                                    selected
                                      ? "bg-amber-500 border-amber-500 text-white"
                                      : "border-stone-300 text-stone-400"
                                  }`}
                                >
                                  {String.fromCharCode(65 + oi)}
                                </span>
                              )}
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}

                  {/* Retry message */}
                  {retryMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-red-50 border border-red-200/60 p-4 text-center"
                    >
                      <p className="text-sm font-medium text-red-700">
                        {retryMessage}
                      </p>
                      <button
                        onClick={handleRetry}
                        className="mt-3 px-4 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 transition-colors"
                      >
                        Try Again
                      </button>
                    </motion.div>
                  )}

                  {/* Submit quiz */}
                  {!revealed && !retryMessage && (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={answers.some((a) => a === null)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-sm font-bold text-white hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-warm-sm hover:shadow-warm-md"
                    >
                      Check Understanding
                    </button>
                  )}

                  {/* Score after reveal — success */}
                  {revealed && score >= 67 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-xl bg-green-50 border border-green-200/60 p-4 text-center"
                    >
                      <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-green-800">
                        Understanding Score: {score}%
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Comment unlocked — share your perspective
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── Comment ────────────────────────────── */}
              {step === "comment" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-stone-700">
                      Understanding verified —{" "}
                      <span className="text-green-700">{score}%</span>
                    </span>
                  </div>

                  <div className="relative">
                    <textarea
                      value={commentText}
                      onChange={(e) =>
                        setCommentText(
                          e.target.value.slice(0, COMMENT_MAX_LENGTH),
                        )
                      }
                      placeholder="Share your perspective — brevity is valued here…"
                      rows={4}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 resize-none transition-all"
                      autoFocus
                    />

                    {/* Character counter */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        {/* Clarity badge preview */}
                        {commentText.length > 0 &&
                          commentText.length <= 280 &&
                          score >= 80 && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/50 text-[10px] font-bold text-amber-700"
                            >
                              <Sparkles className="h-3 w-3" />
                              Clarity Badge
                            </motion.span>
                          )}
                      </div>
                      <span
                        className={`text-xs font-mono ${
                          charsLeft < 0
                            ? "text-red-500"
                            : charsLeft < 50
                              ? "text-amber-600"
                              : "text-stone-400"
                        }`}
                      >
                        {charsLeft}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-0.5 rounded-full bg-stone-100 mt-1 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          charsPercent > 100
                            ? "bg-red-400"
                            : charsPercent > 75
                              ? "bg-amber-400"
                              : "bg-green-400"
                        }`}
                        animate={{ width: `${Math.min(charsPercent, 100)}%` }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePostComment}
                    disabled={
                      commentText.trim().length === 0 || submitting
                    }
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-sm font-bold text-white hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-warm-sm hover:shadow-warm-md"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {submitting ? "Posting…" : "Post Comment"}
                  </button>
                </motion.div>
              )}

              {/* ── Done ───────────────────────────────── */}
              {step === "done" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 border border-green-200"
                  >
                    <MessageSquare className="h-7 w-7 text-green-600" />
                  </motion.div>
                  <div className="text-center">
                    <h4 className="text-base font-bold text-stone-800">
                      Comment posted
                    </h4>
                    <p className="text-sm text-stone-500 mt-1">
                      Your understanding-verified perspective is live.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
