import { NextResponse } from "next/server";
import { getAllTierListEntries } from "@/lib/tier-lists";

/**
 * /llms.txt — Machine-readable site summary for AI crawlers.
 * Emerging standard: https://llmstxt.org
 * Helps ChatGPT, Perplexity, Gemini, and other AI systems understand your site.
 */
export async function GET() {
  const tierLists = getAllTierListEntries();

  const lines = [
    "# Taksha",
    "",
    "> Taksha is a platform where posts are living software. Build, share, and fork running applications in your feed.",
    "",
    "## Tier Lists",
    "",
    "Curated tool recommendations across various categories:",
    "",
    ...tierLists.map(
      (entry) =>
        `- [${entry.title}](https://taksha.dev/tier-lists/${entry.slug}): ${entry.description}`
    ),
    "",
    "## Links",
    "",
    "- [Home](https://taksha.dev)",
    "- [About](https://taksha.dev/about)",
    "- [Create](https://taksha.dev/create)",
    "",
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
