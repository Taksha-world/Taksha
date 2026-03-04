"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Menu, X, LogOut, Search, Bell, Upload } from "lucide-react";
import { useAuth } from "./AuthProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Create", href: "/create" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, isLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-stone-200/60 shadow-sm"
          : "bg-white border-b border-stone-100"
      }`}
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left: Logo + Mobile hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -ml-2 rounded-lg text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-terracotta-400 transition-transform duration-300 group-hover:scale-105">
              <span className="font-devanagari text-sm font-bold text-white leading-none">
                त
              </span>
            </div>
            <span className="hidden sm:inline font-devanagari text-xl font-bold tracking-tight text-stone-800 transition-colors group-hover:text-amber-700">
              तक्ष
            </span>
          </Link>
        </div>

        {/* Center: Search bar (YouTube-style) */}
        <div className="hidden sm:flex flex-1 max-w-xl mx-4 lg:mx-8">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search posts..."
              className="flex-1 h-9 rounded-l-full border border-stone-200 bg-white px-4 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
            />
            <button className="h-9 px-4 rounded-r-full border border-l-0 border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors">
              <Search className="h-4 w-4 text-stone-500" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="sm:hidden p-2 rounded-full text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Upload / Create */}
          <Link
            href="/create"
            className="hidden sm:flex items-center gap-1.5 p-2 rounded-full text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            title="Create"
          >
            <Upload className="h-5 w-5" />
          </Link>

          {!isLoading && user ? (
            <>
              {/* Notifications */}
              <button className="p-2 rounded-full text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors">
                <Bell className="h-5 w-5" />
              </button>

              {/* User Avatar Menu */}
              <div className="relative ml-1">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white text-xs font-bold hover:ring-2 hover:ring-amber-300 transition-all"
                >
                  {user.email?.[0].toUpperCase()}
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-stone-200 shadow-lg overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-stone-100">
                        <p className="text-sm font-medium text-stone-800 truncate">
                          {user.email?.split("@")[0]}
                        </p>
                        <p className="text-xs text-stone-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/create"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
                      >
                        <Plus className="h-4 w-4" />
                        Create Post
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : !isLoading ? (
            <div className="flex items-center gap-2 ml-1">
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                Sign in
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden border-b border-stone-200/60"
          >
            <div className="px-4 py-2">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search posts..."
                  autoFocus
                  className="flex-1 h-9 rounded-l-lg border border-stone-200 bg-white px-3 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-amber-400"
                />
                <button className="h-9 px-3 rounded-r-lg border border-l-0 border-stone-200 bg-stone-50">
                  <Search className="h-4 w-4 text-stone-500" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-stone-200/60"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-amber-700 bg-amber-50"
                        : "text-stone-500 hover:text-amber-600 hover:bg-stone-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {user && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
