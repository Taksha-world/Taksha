import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { toolPages, getAllTierListSlugs } from "@/lib/tier-lists";
import TierListClient from "@/components/TierListClient";

interface Props {
  params: { slug: string };
}

/** Pre-render all tier-list pages at build time */
export function generateStaticParams() {
  return getAllTierListSlugs().map((slug) => ({ slug }));
}

/** Dynamic metadata per page — unique title, description, OG, keywords */
export function generateMetadata({ params }: Props): Metadata {
  const page = toolPages[params.slug];
  if (!page) return {};

  const url = `https://taksha.dev/tier-lists/${params.slug}`;

  return {
    title: `${page.title} — Taksha`,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url,
      type: "article",
      siteName: "Taksha",
      modifiedTime: page.lastUpdated,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  };
}

export default function TierListPage({ params }: Props) {
  const page = toolPages[params.slug];
  if (!page) notFound();

  // JSON-LD: ItemList schema for rich results
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    description: page.metaDescription,
    numberOfItems: page.tools.length,
    itemListElement: page.tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.description,
      url: tool.url,
    })),
  };

  // JSON-LD: FAQPage schema for FAQ rich snippets
  const faqJsonLd =
    page.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Taksha", item: "https://taksha.dev" },
      { "@type": "ListItem", position: 2, name: "Tier Lists", item: "https://taksha.dev/tier-lists" },
      { "@type": "ListItem", position: 3, name: page.title },
    ],
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 pb-24">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/tier-lists" className="hover:text-stone-600 transition-colors">Tier Lists</Link>
              </li>
              <li>/</li>
              <li className="text-stone-600 font-medium truncate max-w-[200px]">{page.title}</li>
            </ol>
          </nav>

          {/* Cover banner */}
          <div className={`relative h-36 rounded-xl bg-gradient-to-br ${page.coverGradient} overflow-hidden mb-8`}>
            <div className="absolute inset-0 opacity-[0.07] dot-pattern" />
            <span className="absolute text-5xl left-[10%] top-[15%] -rotate-12 opacity-90 drop-shadow-sm select-none">
              {page.coverEmojis[0]}
            </span>
            <span className="absolute text-4xl right-[12%] top-[10%] rotate-6 opacity-70 drop-shadow-sm select-none">
              {page.coverEmojis[1]}
            </span>
            <span className="absolute text-4xl left-[20%] bottom-[12%] rotate-12 opacity-75 drop-shadow-sm select-none">
              {page.coverEmojis[2]}
            </span>
            <span className="absolute text-5xl right-[15%] bottom-[15%] -rotate-6 opacity-80 drop-shadow-sm select-none">
              {page.coverEmojis[3]}
            </span>
            <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/25 to-transparent">
              <p className="text-sm text-white/90 font-medium tracking-wide">{page.coverTagline}</p>
            </div>
          </div>

          {/* Header — server-rendered for SEO */}
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight font-[family-name:var(--font-cormorant)]">
              {page.title}
            </h1>
            <p className="text-sm text-stone-500 mt-2 max-w-2xl leading-relaxed">
              {page.description}
            </p>
            <time
              dateTime={page.lastUpdated}
              className="text-xs text-stone-400 mt-2 block"
            >
              Last updated: {new Date(page.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
          </header>

          {/* Intro paragraph — natural language for AI extraction */}
          <section className="mb-10 max-w-3xl">
            <p className="text-sm text-stone-600 leading-relaxed">{page.intro}</p>
          </section>

          {/* Interactive search + tools grid (client component) */}
          <TierListClient page={page} />

          {/* FAQ section — server-rendered for SEO + AI */}
          {page.faqs.length > 0 && (
            <section className="mt-16 max-w-3xl">
              <h2 className="text-lg font-bold text-stone-800 mb-6 font-[family-name:var(--font-cormorant)]">
                Frequently Asked Questions
              </h2>
              <dl className="space-y-5">
                {page.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-stone-100 pb-5 last:border-0">
                    <dt className="text-sm font-semibold text-stone-700 mb-2">
                      {faq.question}
                    </dt>
                    <dd className="text-sm text-stone-500 leading-relaxed">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
