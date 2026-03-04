"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Share2,
  Send,
  Play,
  FileCode,
  Copy,
  Check,
  ChevronDown,
  Code2,
  Eye,
} from "lucide-react";
import dynamic from "next/dynamic";
import LivePreview from "@/components/LivePreview";
import PromptBar from "@/components/PromptBar";
import { useToast } from "@/components/Toast";
import { saveUserPost } from "@/lib/store";

const CodeEditor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-white">
      <div className="h-8 w-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
    </div>
  ),
});

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: #ffffff;
    color: #1a1a1e;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 24px;
  }
  .container { text-align: center; max-width: 400px; }
  .logo { font-size: 48px; margin-bottom: 16px; }
  h1 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #d4a017, #c75b39);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p { color: #9a9590; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 24px;
    background: linear-gradient(135deg, #d4a017, #b8860b);
    color: white; border: none; border-radius: 10px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: all 0.2s;
  }
  .btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(212,160,23,0.3); }
  .counter { margin-top: 20px; font-size: 48px; font-weight: 700; color: #d4a017; }
  .hint { margin-top: 16px; font-size: 12px; color: #c4bfb8; }
</style>
</head>
<body>
  <div class="container">
    <div class="logo">✦</div>
    <h1>Your creation starts here</h1>
    <p>This is a live sandbox. Edit the code on the left and watch it update instantly.</p>
    <button class="btn" onclick="count++; document.getElementById('c').textContent=count">
      Click me: <span id="c">0</span>
    </button>
    <div class="hint">← Try changing the button text or color in the code</div>
  </div>
  <script>let count = 0;</script>
</body>
</html>`;

const languages = ["HTML", "JavaScript", "CSS"] as const;

function CreatePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const [code, setCode] = useState(DEFAULT_CODE);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState<(typeof languages)[number]>("HTML");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [copied, setCopied] = useState(false);
  const [posted, setPosted] = useState(false);

  const handlePromptGenerate = useCallback((generatedCode: string) => {
    setCode(generatedCode);
    setLanguage("HTML");
    toast("Code generated!", "success");
  }, [toast]);

  // Load forked code or prompt from URL
  useEffect(() => {
    const urlCode = searchParams.get("code");
    const urlTitle = searchParams.get("title");
    const urlPrompt = searchParams.get("prompt");
    if (urlCode) {
      setCode(decodeURIComponent(urlCode));
    }
    if (urlTitle) {
      setTitle(decodeURIComponent(urlTitle));
    }
    if (urlPrompt) {
      setTitle(decodeURIComponent(urlPrompt));
    }
  }, [searchParams]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S / Cmd+S → Post to Feed
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handlePost();
      }
      // Escape → close language menu
      if (e.key === "Escape") {
        setShowLangMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/create?code=${encodeURIComponent(code)}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast("Share link copied!", "share");
    setTimeout(() => setCopied(false), 2000);
  };

  // Wrap code for JS and CSS languages
  const previewCode =
    language === "JavaScript"
      ? `<!DOCTYPE html><html><head></head><body><script>${code}<\/script></body></html>`
      : language === "CSS"
      ? `<!DOCTYPE html><html><head><style>${code}</style></head><body><div class="preview">CSS Preview</div></body></html>`
      : code;

  const handlePost = () => {
    // Extract title from code if not set
    let postTitle = title;
    if (!postTitle) {
      // Try to extract from <h1> or <title>
      const titleMatch = code.match(/<title>(.*?)<\/title>/i) || code.match(/<h1[^>]*>(.*?)<\/h1>/i);
      postTitle = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "").trim() : "Untitled Creation";
    }

    // Save to localStorage
    saveUserPost({
      type: "build",
      title: postTitle,
      description: "A live app created on Taksha",
      author: { name: "You", avatar: "Y" },
      tag: language === "JavaScript" ? "JavaScript" : language === "CSS" ? "CSS" : "HTML",
      code: language === "HTML" ? code : previewCode,
    });

    setPosted(true);
    toast("Posted to feed! 🎉", "success");
    setTimeout(() => {
      setPosted(false);
      router.push("/");
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col">
      {/* AI Prompt Bar */}
      <PromptBar onGenerate={handlePromptGenerate} />

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-4 py-2.5 border-b border-stone-200/60 bg-white/80 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-600 transition-all hover:border-amber-400 hover:text-amber-700"
            >
              <FileCode className="h-3.5 w-3.5 text-amber-600/60" />
              {language}
              <ChevronDown className="h-3.5 w-3.5 text-stone-400" />
            </button>
            {showLangMenu && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-1 z-50 rounded-lg border border-stone-200 bg-white shadow-lg overflow-hidden"
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left transition-colors ${
                      language === lang
                        ? "bg-amber-50 text-amber-700"
                        : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <div className="h-5 w-px bg-stone-200" />

          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Play className="h-3 w-3 text-green-500" />
            <span>Live preview active</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Share */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-500 transition-all hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                Share
              </>
            )}
          </motion.button>

          {/* Copy Code */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigator.clipboard.writeText(code);
              toast("Code copied to clipboard", "success");
            }}
            className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-500 transition-all hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </motion.button>

          {/* Post to Feed */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePost}
            disabled={posted}
            className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-300 ${
              posted
                ? "bg-green-600/80 text-white"
                : "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 hover:shadow-warm-md"
            }`}
          >
            {posted ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Posted!
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Post to Feed
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile View Toggle */}
      <div className="md:hidden flex items-center gap-1 p-1.5 mx-3 mt-2 rounded-lg bg-stone-100 w-fit">
        <button
          onClick={() => setMobileView("editor")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            mobileView === "editor" ? "bg-white shadow-sm text-stone-800" : "text-stone-500"
          }`}
        >
          <Code2 className="h-3.5 w-3.5" />
          Code
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            mobileView === "preview" ? "bg-white shadow-sm text-stone-800" : "text-stone-500"
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
      </div>

      {/* Split Editor / Preview — Desktop */}
      <div className="flex-1 hidden md:flex overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-1/2 border-r border-stone-200/60 bg-[#1e1e1e]"
        >
          <CodeEditor
            code={code}
            onChange={handleCodeChange}
            language={language}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-1/2 bg-stone-50 flex flex-col"
        >
          <div className="flex-1 p-3">
            <LivePreview code={previewCode} className="h-full" />
          </div>
        </motion.div>
      </div>

      {/* Mobile Editor / Preview — stacked with toggle */}
      <div className="flex-1 md:hidden overflow-hidden">
        {mobileView === "editor" ? (
          <div className="h-full bg-[#1e1e1e]">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              language={language}
            />
          </div>
        ) : (
          <div className="h-full bg-stone-50 p-3">
            <LivePreview code={previewCode} className="h-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-white">
          <div className="h-8 w-8 rounded-full border-2 border-amber-400/30 border-t-amber-500 animate-spin" />
        </div>
      }
    >
      <CreatePageInner />
    </Suspense>
  );
}
