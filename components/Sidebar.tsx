"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Heart,
  Code2,
  Image as ImageIcon,
  Film,
  FileText,
  Smile,
  Info,
  ChevronLeft,
  ChevronRight,
  Compass,
  Flame,
  Pin,
  X,
  ListOrdered,
} from "lucide-react";
import {
  getPinnedPosts,
  pinPost,
  unpinPost,
  type PinnedEntry,
} from "@/lib/store";
import type { Post } from "@/lib/posts";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const mainLinks: SidebarLink[] = [
  { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
  { label: "Explore", href: "/?tab=explore", icon: <Compass className="h-5 w-5" /> },
  { label: "Trending", href: "/?tab=trending", icon: <Flame className="h-5 w-5" /> },
  { label: "Liked", href: "/?tab=liked", icon: <Heart className="h-5 w-5" /> },
];

const categoryLinks: SidebarLink[] = [
  { label: "Builds", href: "/?type=build", icon: <Code2 className="h-5 w-5" /> },
  { label: "Images", href: "/?type=image", icon: <ImageIcon className="h-5 w-5" /> },
  { label: "Videos", href: "/?type=video", icon: <Film className="h-5 w-5" /> },
  { label: "Text", href: "/?type=text", icon: <FileText className="h-5 w-5" /> },
  { label: "Memes", href: "/?type=meme", icon: <Smile className="h-5 w-5" /> },
];

const moreLinks: SidebarLink[] = [
  { label: "Tier Lists", href: "/tier-lists", icon: <ListOrdered className="h-5 w-5" /> },
];

const bottomLinks: SidebarLink[] = [
  { label: "About", href: "/about", icon: <Info className="h-5 w-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [pinned, setPinned] = useState<PinnedEntry[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Load pinned posts on mount
  useEffect(() => {
    setPinned(getPinnedPosts());
  }, []);

  const isActive = (href: string) => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    if (href === "/") return pathname === "/" && !search;
    if (href.includes("?")) {
      const params = new URLSearchParams(href.split("?")[1]);
      const currentParams = new URLSearchParams(search);
      const paramArray = Array.from(params);
      for (let i = 0; i < paramArray.length; i++) {
        const [key, value] = paramArray[i];
        if (currentParams.get(key) !== value) return false;
      }
      return true;
    }
    return pathname === href;
  };

  // --- Drag & drop handlers ---
  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (e.dataTransfer.types.includes("application/taksha-post")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only trigger when actually leaving the sidebar (not entering a child)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const raw = e.dataTransfer.getData("application/taksha-post");
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as { id: string; title: string; avatar: string; type: string };
      const fakePost = {
        id: data.id,
        title: data.title,
        author: { avatar: data.avatar, name: "" },
        type: data.type,
      } as Post;
      const updated = pinPost(fakePost);
      setPinned(updated);
    } catch { /* ignore bad data */ }
  }, []);

  const handleUnpin = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = unpinPost(id);
    setPinned(updated);
  }, []);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 224 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-40 bg-white border-r transition-colors duration-200 overflow-y-auto overflow-x-hidden ${
        isDragOver
          ? "border-amber-400 bg-amber-50/40"
          : "border-stone-200/60"
      }`}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-3 right-3 p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Main links */}
      <nav className="flex flex-col gap-0.5 px-3 pt-4 pb-2">
        {mainLinks.map((link) => (
          <SidebarItem
            key={link.label}
            link={link}
            collapsed={collapsed}
            active={isActive(link.href)}
          />
        ))}
      </nav>

      {/* Category divider */}
      <div className="mx-3 my-2 border-t border-stone-100" />
      {!collapsed && (
        <p className="px-5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
          Categories
        </p>
      )}

      {/* Category links */}
      <nav className="flex flex-col gap-0.5 px-3 pb-2">
        {categoryLinks.map((link) => (
          <SidebarItem
            key={link.label}
            link={link}
            collapsed={collapsed}
            active={isActive(link.href)}
          />
        ))}
      </nav>

      {/* --- Pinned / saved section --- */}
      {pinned.length > 0 && (
        <>
          <div className="mx-3 my-2 border-t border-stone-100" />
          {!collapsed && (
            <p className="px-5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-1">
              <Pin className="h-3 w-3" /> Saved
            </p>
          )}
          <nav className="flex flex-col gap-0.5 px-3 pb-2">
            {pinned.map((entry) => (
              <Link
                key={entry.id}
                href={`/post/${entry.id}`}
                className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 group/pin text-stone-500 hover:text-stone-700 hover:bg-stone-50 ${
                  collapsed ? "justify-center" : ""
                }`}
                title={collapsed ? entry.title : undefined}
              >
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 flex items-center justify-center text-[8px] font-bold text-amber-700">
                  {entry.avatar}
                </span>
                {!collapsed && (
                  <span className="truncate text-xs flex-1">{entry.title}</span>
                )}
                {!collapsed && (
                  <button
                    onClick={(e) => handleUnpin(entry.id, e)}
                    className="opacity-0 group-hover/pin:opacity-100 p-0.5 rounded text-stone-300 hover:text-red-500 transition-all"
                    aria-label="Remove pin"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Link>
            ))}
          </nav>
        </>
      )}

      {/* Drop hint when dragging */}
      <AnimatePresence>
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mx-3 mb-3 px-3 py-3 rounded-lg border-2 border-dashed border-amber-400 bg-amber-50/60 text-center"
          >
            <Pin className="h-4 w-4 mx-auto text-amber-500 mb-1" />
            <p className="text-[10px] font-semibold text-amber-600">
              {collapsed ? "" : "Drop to save"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* More section */}
      <div className="mx-3 my-2 border-t border-stone-100" />
      {!collapsed && (
        <p className="px-5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
          More
        </p>
      )}
      <nav className="flex flex-col gap-0.5 px-3 pb-2">
        {moreLinks.map((link) => (
          <SidebarItem
            key={link.label}
            link={link}
            collapsed={collapsed}
            active={isActive(link.href)}
          />
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom links */}
      <div className="mx-3 my-2 border-t border-stone-100" />
      <nav className="flex flex-col gap-0.5 px-3 pb-4">
        {bottomLinks.map((link) => (
          <SidebarItem
            key={link.label}
            link={link}
            collapsed={collapsed}
            active={isActive(link.href)}
          />
        ))}
      </nav>
    </motion.aside>
  );
}

function SidebarItem({
  link,
  collapsed,
  active,
}: {
  link: SidebarLink;
  collapsed: boolean;
  active: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${
        active
          ? "text-amber-700 bg-amber-50/80"
          : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
      } ${collapsed ? "justify-center" : ""}`}
      title={collapsed ? link.label : undefined}
    >
      <span
        className={`flex-shrink-0 transition-colors ${
          active ? "text-amber-600" : "text-stone-400 group-hover:text-stone-600"
        }`}
      >
        {link.icon}
      </span>
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
            className="whitespace-nowrap overflow-hidden"
          >
            {link.label}
          </motion.span>
        )}
      </AnimatePresence>
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-amber-500"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
    </Link>
  );
}

export function SidebarSpacer({ collapsed }: { collapsed?: boolean }) {
  return (
    <div
      className={`hidden md:block flex-shrink-0 transition-all duration-200 ${
        collapsed ? "w-[72px]" : "w-[224px]"
      }`}
    />
  );
}
