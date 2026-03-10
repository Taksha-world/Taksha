import { Metadata } from "next";
import Link from "next/link";
import { getAllTierListEntries } from "@/lib/tier-lists";

export const metadata: Metadata = {
  title: "Tier Lists — Taksha",
  description:
    "Visual tier lists ranking experiences, cultures, and ideas. IIT Bombay life, AI vs traditional research, coffee cultures, programming language vibes.",
  alternates: { canonical: "https://taksha.dev/tier-lists" },
  openGraph: {
    title: "Tier Lists — Taksha",
    description: "Visual tier lists ranking experiences, cultures, and ideas.",
    url: "https://taksha.dev/tier-lists",
    type: "website",
    siteName: "Taksha",
  },
};

export default function TierListsIndex() {
  const entries = getAllTierListEntries();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-24">
        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight font-inter">
            Tier Lists
          </h1>
          <p className="text-sm text-stone-500 mt-2 max-w-xl leading-relaxed">
            Visual tier lists ranking experiences, cultures, and ideas. Each list tells a story you can feel.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/tier-lists/${entry.slug}`}
              className="group rounded-xl border border-stone-200/60 bg-white overflow-hidden hover:border-stone-300 hover:shadow-warm-md transition-all duration-300"
            >
              {/* Cover visual — emoji mood board */}
              <div className={`relative h-28 bg-gradient-to-br ${entry.coverGradient} overflow-hidden`}>
                <div className="absolute inset-0 opacity-[0.07] dot-pattern" />
                <span className="absolute text-4xl left-[12%] top-[15%] -rotate-12 opacity-90 drop-shadow-sm select-none">
                  {entry.coverEmojis[0]}
                </span>
                <span className="absolute text-3xl right-[15%] top-[10%] rotate-6 opacity-70 drop-shadow-sm select-none">
                  {entry.coverEmojis[1]}
                </span>
                <span className="absolute text-3xl left-[22%] bottom-[12%] rotate-12 opacity-75 drop-shadow-sm select-none">
                  {entry.coverEmojis[2]}
                </span>
                <span className="absolute text-4xl right-[18%] bottom-[15%] -rotate-6 opacity-80 drop-shadow-sm select-none">
                  {entry.coverEmojis[3]}
                </span>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/20 to-transparent">
                  <p className="text-[11px] text-white/90 font-medium tracking-wide">
                    {entry.coverTagline}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h2 className="text-sm font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">
                  {entry.title}
                </h2>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed line-clamp-2">
                  {entry.description}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] font-medium text-stone-400 bg-stone-100 rounded-full px-2.5 py-0.5">
                    {entry.tools.length} tools
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Updated {new Date(entry.lastUpdated).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {entries.length === 0 && (
          <p className="text-center text-sm text-stone-400 mt-16">
            No tier lists yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
