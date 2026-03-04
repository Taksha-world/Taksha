"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Don't show footer on fullscreen pages
  if (pathname === "/create") return null;
  return (
    <footer className="border-t border-stone-200/60 bg-stone-50/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-terracotta-400">
                <span className="font-devanagari text-sm font-bold text-white leading-none">त</span>
              </div>
              <span className="font-devanagari text-xl font-bold text-stone-800">तक्षा</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Where posts are living software. Build, share, and fork running
              applications in your feed.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">Product</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">Feed</Link>
                <Link href="/create" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">Create</Link>
                <Link href="/about" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">About</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">Community</h4>
              <nav className="flex flex-col gap-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">GitHub</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">Twitter</a>
                <a href="mailto:hello@taksha.app" className="text-sm text-stone-500 hover:text-amber-600 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-stone-200/60 flex items-center justify-between">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Taksha. Crafted with care.
          </p>
          <p className="text-xs text-stone-400">
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
