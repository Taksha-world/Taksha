"use client";

import { useState } from "react";
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
} from "lucide-react";

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

const bottomLinks: SidebarLink[] = [
  { label: "About", href: "/about", icon: <Info className="h-5 w-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !window.location.search;
    if (href.includes("?")) {
      const params = new URLSearchParams(href.split("?")[1]);
      const currentParams = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      );
      const paramArray = Array.from(params);
      for (let i = 0; i < paramArray.length; i++) {
        const [key, value] = paramArray[i];
        if (currentParams.get(key) !== value) return false;
      }
      return true;
    }
    return pathname === href;
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 224 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-stone-200/60 overflow-y-auto overflow-x-hidden"
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
