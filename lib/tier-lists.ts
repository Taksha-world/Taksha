export interface ToolEntry {
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  category: string;
  pricing?: string;
}

export interface ToolPage {
  title: string;
  description: string;
  /** SEO meta description — 150-160 chars, keyword-rich */
  metaDescription: string;
  /** Target keywords for this page */
  keywords: string[];
  /** Natural-language intro paragraph for AI extraction */
  intro: string;
  /** FAQ pairs — great for featured snippets + AI answers */
  faqs: Array<{ question: string; answer: string }>;
  /** ISO date string of last update */
  lastUpdated: string;
  tools: ToolEntry[];
}

/**
 * Registry of all tier-list pages.
 * Key = URL slug (e.g. "best-free-pdf-editors" → /tier-lists/best-free-pdf-editors)
 * Each entry defines the page metadata and its list of tools.
 *
 * To add a new page, add a new key/value pair below.
 */
export const toolPages: Record<string, ToolPage> = {
  "best-free-pdf-editors": {
    title: "Best Free PDF Editors in 2026",
    description:
      "A curated list of the best free tools for editing, merging, splitting, and converting PDFs online.",
    metaDescription:
      "Compare the 6 best free PDF editors in 2026. Edit, merge, split, and convert PDFs online with iLovePDF, Smallpdf, PDF24, and more — no downloads required.",
    keywords: ["free pdf editor", "edit pdf online", "best pdf tools", "merge pdf free", "pdf converter", "pdf editor no download"],
    intro:
      "Looking for the best free PDF editor? We've tested dozens of tools and picked the top 6 that let you edit, merge, split, compress, and convert PDFs without paying a cent. Whether you need a quick one-off edit or a full-featured PDF suite, these tools have you covered.",
    faqs: [
      {
        question: "What is the best completely free PDF editor?",
        answer: "PDF24 is 100% free with no limits — you can edit, merge, split, compress, and sign PDFs without any restrictions or watermarks.",
      },
      {
        question: "Can I edit a PDF online without downloading software?",
        answer: "Yes. All tools on this list work directly in your browser. iLovePDF and Sejda PDF are particularly good for quick online edits.",
      },
      {
        question: "Which free PDF editor is best for merging files?",
        answer: "iLovePDF and PDF24 both offer excellent free PDF merging with no file size limits.",
      },
    ],
    lastUpdated: "2026-03-07",
    tools: [
      {
        name: "iLovePDF",
        description:
          "Merge, split, compress, convert, rotate, unlock, and watermark PDFs — all for free.",
        url: "https://www.ilovepdf.com",
        icon: "📄",
        color: "from-red-500 to-red-600",
        category: "All-in-one",
        pricing: "Free / Pro from $4/mo",
      },
      {
        name: "Smallpdf",
        description:
          "Easy-to-use platform with 20+ PDF tools for compressing, converting, and editing PDFs.",
        url: "https://smallpdf.com",
        icon: "📎",
        color: "from-rose-500 to-pink-600",
        category: "All-in-one",
        pricing: "Free tier available",
      },
      {
        name: "PDF24",
        description:
          "Completely free PDF tools with no limits. Edit, merge, split, compress, and sign PDFs.",
        url: "https://tools.pdf24.org",
        icon: "🔧",
        color: "from-orange-500 to-amber-600",
        category: "All-in-one",
        pricing: "100% Free",
      },
      {
        name: "Sejda PDF",
        description:
          "Online PDF editor that lets you edit text, images, links, and forms directly in your browser.",
        url: "https://www.sejda.com",
        icon: "✏️",
        color: "from-blue-500 to-indigo-600",
        category: "Editor",
        pricing: "Free (3 tasks/day)",
      },
      {
        name: "PDF Escape",
        description:
          "Browser-based PDF reader, editor, and form filler. No installation required.",
        url: "https://www.pdfescape.com",
        icon: "🖊️",
        color: "from-green-500 to-emerald-600",
        category: "Editor",
        pricing: "Free online",
      },
      {
        name: "DocHub",
        description:
          "Edit, sign, and share PDFs and documents from Google Drive, Gmail, and Dropbox.",
        url: "https://dochub.com",
        icon: "📝",
        color: "from-sky-500 to-blue-600",
        category: "Collaboration",
        pricing: "Free tier available",
      },
    ],
  },
  "best-prototyping-tools": {
    title: "Best Tools for Prototyping in 2026",
    description:
      "Top prototyping and wireframing tools to quickly design, test, and iterate on your product ideas.",
    metaDescription:
      "Discover the 6 best prototyping tools in 2026. Compare Figma, Framer, Penpot, and more for wireframing, UI design, and interactive prototypes.",
    keywords: ["prototyping tools", "wireframing tools", "ui design tools", "figma alternatives", "free prototyping", "interactive prototype"],
    intro:
      "Building a product? You need a prototyping tool that lets you go from idea to interactive mockup fast. We've compared the best options — from free open-source tools like Penpot to industry standards like Figma — so you can pick the right one for your workflow.",
    faqs: [
      {
        question: "What is the best free prototyping tool?",
        answer: "Figma offers a generous free tier for individuals, and Penpot is 100% free and open-source — both are excellent for prototyping.",
      },
      {
        question: "Which prototyping tool is best for beginners?",
        answer: "Balsamiq is great for beginners with its simple, low-fidelity wireframing approach. Figma is also beginner-friendly with extensive tutorials.",
      },
      {
        question: "Can I create interactive prototypes without coding?",
        answer: "Yes. All tools on this list support interactive prototyping without code. Figma, Marvel, and Framer all let you add click-through interactions visually.",
      },
    ],
    lastUpdated: "2026-03-07",
    tools: [
      {
        name: "Figma",
        description:
          "Collaborative design and prototyping tool with real-time multiplayer editing.",
        url: "https://www.figma.com",
        icon: "🎨",
        color: "from-purple-500 to-violet-600",
        category: "Design",
        pricing: "Free for individuals",
      },
      {
        name: "Framer",
        description:
          "Ship sites with real components, animations, and interactions — code optional.",
        url: "https://www.framer.com",
        icon: "⚡",
        color: "from-blue-600 to-indigo-700",
        category: "Design + Code",
        pricing: "Free tier available",
      },
      {
        name: "Penpot",
        description:
          "Open-source design and prototyping platform for cross-domain teams.",
        url: "https://penpot.app",
        icon: "🖌️",
        color: "from-teal-500 to-cyan-600",
        category: "Open Source",
        pricing: "100% Free",
      },
      {
        name: "Balsamiq",
        description:
          "Low-fidelity wireframing tool that keeps the focus on structure and content.",
        url: "https://balsamiq.com",
        icon: "📐",
        color: "from-red-400 to-rose-500",
        category: "Wireframe",
        pricing: "Free trial / $9/mo",
      },
      {
        name: "Marvel",
        description:
          "Create interactive prototypes and user tests without writing code.",
        url: "https://marvelapp.com",
        icon: "🦸",
        color: "from-yellow-500 to-orange-500",
        category: "Prototype",
        pricing: "Free tier available",
      },
      {
        name: "InVision",
        description:
          "Digital product design platform for prototyping, collaboration, and handoff.",
        url: "https://www.invisionapp.com",
        icon: "💎",
        color: "from-pink-500 to-rose-600",
        category: "Prototype",
        pricing: "Free tier available",
      },
    ],
  },
};

/** Returns all slugs for static generation or listing */
export function getAllTierListSlugs(): string[] {
  return Object.keys(toolPages);
}

/** Returns a flat list of all tier-list pages with their slugs for search/listing */
export function getAllTierListEntries(): Array<{ slug: string } & ToolPage> {
  return Object.entries(toolPages).map(([slug, page]) => ({ slug, ...page }));
}
