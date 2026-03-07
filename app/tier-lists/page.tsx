import { Metadata } from "next";
import Link from "next/link";
import { getAllTierListEntries } from "@/lib/tier-lists";

export const metadata: Metadata = {
  title: "Tier Lists — Taksha",
  description:
    "Curated tool recommendations across categories. Find the best free tools for PDFs, prototyping, video editing, and more.",
  alternates: { canonical: "https://taksha.dev/tier-lists" },
  openGraph: {
    title: "Tier Lists — Taksha",
    description: "Curated tool recommendations across categories.",
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
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight font-[family-name:var(--font-cormorant)]">
            Tier Lists
          </h1>
          <p className="text-sm text-stone-500 mt-2 max-w-xl leading-relaxed">
            Curated recommendations for the best tools across categories. Each list is researched, compared, and kept up to date.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/tier-lists/${entry.slug}`}
              className="group rounded-xl border border-stone-200/60 bg-white p-5 hover:border-stone-300 hover:shadow-warm-md transition-all duration-300"
            >
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
