"use client";

import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import FeedPrompt from "@/components/FeedPrompt";
import ToolsSection from "@/components/ToolsSection";
import DebateSection from "@/components/DebateSection";

function FeedContent() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar — desktop only */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-[224px] transition-all duration-200">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-6 pb-24">
          {/* Build prompt */}
          <FeedPrompt />

          {/* Tools & Websites */}
          <ToolsSection />

          {/* Debates */}
          <DebateSection />
        </div>
      </div>
    </div>
  );
}

export default function FeedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
        </div>
      }
    >
      <FeedContent />
    </Suspense>
  );
}
