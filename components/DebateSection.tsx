"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Send,
  Flame,
} from "lucide-react";

interface Reply {
  id: string;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  side: "for" | "against";
  timeAgo: string;
}

interface Debate {
  id: string;
  topic: string;
  context: string;
  relatedTo: string;
  forCount: number;
  againstCount: number;
  replies: Reply[];
}

const debates: Debate[] = [
  {
    id: "d1",
    topic: "Are PDF tools like iLovePDF replacing desktop software entirely?",
    context:
      "With browser-based tools getting faster and more capable, is there still a reason to install heavy desktop apps for document editing?",
    relatedTo: "Tools & Websites",
    forCount: 84,
    againstCount: 56,
    replies: [
      {
        id: "r1",
        author: "Priya Sharma",
        avatar: "PS",
        text: "Absolutely. iLovePDF handles 90% of what I used to do in Acrobat. It's free, fast, and requires zero installation. Web tools are the future.",
        likes: 23,
        side: "for",
        timeAgo: "2h ago",
      },
      {
        id: "r2",
        author: "Marcus Chen",
        avatar: "MC",
        text: "Hard disagree. Try batch processing 500 PDFs with OCR in a browser tool. Desktop apps like Acrobat Pro still crush web tools for professional workloads.",
        likes: 19,
        side: "against",
        timeAgo: "1h ago",
      },
      {
        id: "r3",
        author: "Aisha Okafor",
        avatar: "AO",
        text: "For everyday tasks — merge, compress, convert — web tools win on convenience. But privacy is a real concern when uploading sensitive docs to third-party servers.",
        likes: 31,
        side: "for",
        timeAgo: "45m ago",
      },
      {
        id: "r4",
        author: "Raj Malhotra",
        avatar: "RM",
        text: "The offline capability matters. What happens when your internet is down and you need to sign a contract? Desktop software is reliable.",
        likes: 12,
        side: "against",
        timeAgo: "30m ago",
      },
    ],
  },
  {
    id: "d2",
    topic: "Is 'Thinking, Fast and Slow' still the best intro to behavioral psychology?",
    context:
      "Kahneman's classic remains widely recommended, but critics argue some findings haven't replicated. Is it still the gold standard?",
    relatedTo: "Book Discussions at Google",
    forCount: 112,
    againstCount: 67,
    replies: [
      {
        id: "r5",
        author: "David Park",
        avatar: "DP",
        text: "Yes. Even with replication concerns on a few studies, the framework of System 1 vs System 2 is foundational. No other book explains cognitive biases as clearly.",
        likes: 45,
        side: "for",
        timeAgo: "3h ago",
      },
      {
        id: "r6",
        author: "Lena Schmidt",
        avatar: "LS",
        text: "I'd now recommend 'Noise' (also by Kahneman) or 'Predictably Irrational' by Ariely instead. They're more up-to-date and practical for modern readers.",
        likes: 28,
        side: "against",
        timeAgo: "2h ago",
      },
      {
        id: "r7",
        author: "Ankit Desai",
        avatar: "AD",
        text: "The Google Talk by Kahneman is what sold me on the book. His ability to distill decades of research into stories is unmatched. Still the best starting point.",
        likes: 37,
        side: "for",
        timeAgo: "1h ago",
      },
    ],
  },
  {
    id: "d3",
    topic: "Should 'Atomic Habits' be required reading in every school?",
    context:
      "James Clear's talk at Google about habit formation was one of the most-watched. Should these ideas be part of formal education?",
    relatedTo: "Book Discussions at Google",
    forCount: 156,
    againstCount: 43,
    replies: [
      {
        id: "r8",
        author: "Sofia Rodriguez",
        avatar: "SR",
        text: "100%. The 1% improvement concept and habit stacking would transform how students approach learning. This should be taught in middle school.",
        likes: 52,
        side: "for",
        timeAgo: "4h ago",
      },
      {
        id: "r9",
        author: "Tom Williams",
        avatar: "TW",
        text: "Self-help books shouldn't be curricularized. Let students discover them naturally. Schools should focus on critical thinking, not productivity hacks.",
        likes: 18,
        side: "against",
        timeAgo: "3h ago",
      },
      {
        id: "r10",
        author: "Neha Gupta",
        avatar: "NG",
        text: "Even if not 'required reading', the core ideas about systems vs. goals should be part of life skills education. It's not just a productivity book.",
        likes: 41,
        side: "for",
        timeAgo: "2h ago",
      },
    ],
  },
];

function DebateCard({ debate }: { debate: Debate }) {
  const [expanded, setExpanded] = useState(false);
  const [userVote, setUserVote] = useState<"for" | "against" | null>(null);
  const [replyText, setReplyText] = useState("");
  const [localReplies, setLocalReplies] = useState<Reply[]>(debate.replies);
  const [forCount, setForCount] = useState(debate.forCount);
  const [againstCount, setAgainstCount] = useState(debate.againstCount);

  const totalVotes = forCount + againstCount;
  const forPercent = totalVotes > 0 ? Math.round((forCount / totalVotes) * 100) : 50;

  const handleVote = (side: "for" | "against") => {
    if (userVote === side) {
      // Undo vote
      setUserVote(null);
      if (side === "for") setForCount((c) => c - 1);
      else setAgainstCount((c) => c - 1);
    } else {
      // Switch or set vote
      if (userVote === "for") setForCount((c) => c - 1);
      if (userVote === "against") setAgainstCount((c) => c - 1);
      setUserVote(side);
      if (side === "for") setForCount((c) => c + 1);
      else setAgainstCount((c) => c + 1);
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    const newReply: Reply = {
      id: `r-new-${Date.now()}`,
      author: "You",
      avatar: "YO",
      text: replyText.trim(),
      likes: 0,
      side: userVote || "for",
      timeAgo: "just now",
    };
    setLocalReplies((prev) => [...prev, newReply]);
    setReplyText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-stone-200/60 bg-white overflow-hidden hover:border-stone-300 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <Flame className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
              {debate.relatedTo}
            </span>
            <h3 className="text-sm font-bold text-stone-800 mt-1.5 leading-snug">
              {debate.topic}
            </h3>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              {debate.context}
            </p>
          </div>
        </div>

        {/* Vote bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-semibold mb-1.5">
            <span className="text-green-600">For · {forPercent}%</span>
            <span className="text-red-500">Against · {100 - forPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-stone-100 overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
              style={{ width: `${forPercent}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
              style={{ width: `${100 - forPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => handleVote("for")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                userVote === "for"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-stone-100 text-stone-500 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              <ThumbsUp className="h-3 w-3" />
              For ({forCount})
            </button>
            <button
              onClick={() => handleVote("against")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                userVote === "against"
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-stone-100 text-stone-500 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <ThumbsDown className="h-3 w-3" />
              Against ({againstCount})
            </button>
          </div>
        </div>

        {/* Toggle replies */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-4 text-xs text-stone-400 hover:text-stone-600 font-medium transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          {localReplies.length} replies
          {expanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>
      </div>

      {/* Replies */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-stone-100 overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {localReplies.map((reply) => (
                <div
                  key={reply.id}
                  className={`flex gap-3 p-3 rounded-lg ${
                    reply.side === "for"
                      ? "bg-green-50/50 border border-green-100"
                      : "bg-red-50/50 border border-red-100"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      reply.side === "for"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {reply.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-700">
                        {reply.author}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {reply.timeAgo}
                      </span>
                      <span
                        className={`text-[10px] font-semibold ${
                          reply.side === "for" ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {reply.side === "for" ? "FOR" : "AGAINST"}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {reply.text}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <ThumbsUp className="h-2.5 w-2.5 text-stone-400" />
                      <span className="text-[10px] text-stone-400">
                        {reply.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Reply input */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleReply();
                  }}
                  placeholder="Share your take..."
                  className="flex-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-700 placeholder:text-stone-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                />
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  title="Send reply"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DebateSection() {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {debates.map((debate) => (
          <DebateCard key={debate.id} debate={debate} />
        ))}
      </div>
    </section>
  );
}
