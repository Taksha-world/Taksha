"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, Image as ImageIcon, Code2, Scissors, Globe, Shield, Zap, Layers } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  category: string;
}

const tools: Tool[] = [
  {
    name: "iLovePDF",
    description: "Merge, split, compress, and convert PDFs online for free.",
    url: "https://www.ilovepdf.com",
    icon: <FileText className="h-6 w-6" />,
    color: "from-red-500 to-red-600",
    category: "PDF",
  },
  {
    name: "Canva",
    description: "Design presentations, social media graphics, and more with drag & drop.",
    url: "https://www.canva.com",
    icon: <Layers className="h-6 w-6" />,
    color: "from-violet-500 to-purple-600",
    category: "Design",
  },
  {
    name: "Remove.bg",
    description: "Remove image backgrounds automatically in seconds.",
    url: "https://www.remove.bg",
    icon: <Scissors className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    category: "Image",
  },
  {
    name: "TinyPNG",
    description: "Smart lossy compression for PNG and JPEG images.",
    url: "https://tinypng.com",
    icon: <ImageIcon className="h-6 w-6" />,
    color: "from-green-500 to-emerald-600",
    category: "Image",
  },
  {
    name: "CodePen",
    description: "Build, test, and discover front-end code in the browser.",
    url: "https://codepen.io",
    icon: <Code2 className="h-6 w-6" />,
    color: "from-stone-700 to-stone-900",
    category: "Code",
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, docs, wikis & project management.",
    url: "https://www.notion.so",
    icon: <Globe className="h-6 w-6" />,
    color: "from-stone-800 to-stone-950",
    category: "Productivity",
  },
  {
    name: "Vercel",
    description: "Deploy web projects with zero configuration and instant previews.",
    url: "https://vercel.com",
    icon: <Zap className="h-6 w-6" />,
    color: "from-stone-900 to-black",
    category: "Deploy",
  },
  {
    name: "1Password",
    description: "Secure password manager for teams and individuals.",
    url: "https://1password.com",
    icon: <Shield className="h-6 w-6" />,
    color: "from-blue-600 to-indigo-700",
    category: "Security",
  },
];

export default function ToolsSection() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-stone-800 tracking-tight">
            Tools & Websites
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Curated tools the community loves
          </p>
        </div>
        <span className="text-xs text-stone-400 font-medium bg-stone-100 rounded-full px-3 py-1">
          {tools.length} tools
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tools.map((tool, i) => (
          <motion.a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group relative rounded-xl border border-stone-200/60 bg-white p-4 hover:border-stone-300 hover:shadow-warm-md transition-all duration-300 flex flex-col gap-3"
          >
            {/* Icon */}
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-white shadow-sm`}
            >
              {tool.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-stone-800 truncate">
                  {tool.name}
                </h3>
                <ExternalLink className="h-3 w-3 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Category pill */}
            <span className="self-start inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-500">
              {tool.category}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
