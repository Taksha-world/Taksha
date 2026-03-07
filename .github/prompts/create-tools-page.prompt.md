---
description: "Create a new tier-list page under /tier-lists/. Use when: adding a curated tool list, best-of page, resource collection."
argument-hint: "Topic (e.g. 'editing PDFs for free', 'prototyping', 'video editing')"
agent: "agent"
---

# Create a Tier List Page

Create a new curated tool tier-list page for the Taksha platform. Each page lives at `/tier-lists/<slug>` and is defined as a data entry in `lib/tier-lists.ts`.

## Input

The user will provide a **topic** — e.g. "editing PDFs for free", "prototyping", "video editing".

## Steps

1. **Generate a URL slug** from the topic (e.g. `best-free-pdf-editors`, `best-video-editing-tools`). Use lowercase, hyphens, no special characters.

2. **Open [lib/tier-lists.ts](lib/tier-lists.ts)** and add a new entry to the `toolPages` object with:

   ### Page metadata
   - `title`: Keyword-rich page title ending with year (e.g. "Best Free PDF Editors in 2026")
   - `description`: 1-2 sentences explaining what the page covers
   - `metaDescription`: 150-160 character SEO meta description — keyword-rich, compelling
   - `keywords`: Array of 5-8 target search phrases people actually search for
   - `intro`: Natural-language paragraph (2-3 sentences) that AI search engines can quote directly. Write it as if answering "what are the best tools for X?"
   - `faqs`: Array of 3 FAQ objects `{ question, answer }` — must be questions real people search for. Answers should be direct and factual
   - `lastUpdated`: ISO date string (e.g. "2026-03-07")

   ### Tools array
   - `tools`: An array of 6–10 curated tools, each with:
     - `name`: Tool name
     - `description`: One-sentence description of what it does
     - `url`: Official website URL
     - `icon`: A single emoji representing the tool
     - `color`: Tailwind gradient string (e.g. `"from-blue-500 to-indigo-600"`)
     - `category`: Short category label (e.g. "Editor", "All-in-one", "Open Source")
     - `pricing`: Optional — pricing info like "Free", "Free tier available", "$9/mo"

3. **SEO guidelines**:
   - Title should include the year and target keyword (e.g. "Best Free PDF Editors in 2026")
   - `metaDescription` must be 150-160 chars, include the primary keyword near the start
   - `keywords` should be phrases people search — check Google autocomplete patterns
   - `intro` should read naturally and answer the user's search intent directly
   - FAQs should target "People Also Ask" style questions
   - Each FAQ answer should be 1-2 sentences — concise and quotable

4. **Tool selection criteria**:
   - Prefer **free or freemium** tools unless the topic specifically calls for paid ones
   - Include a mix of well-known and lesser-known quality options
   - Verify the tool is still active and maintained
   - Use diverse categories to cover different approaches to the task
   - Include at least one **open-source** option when available

5. **Do NOT** modify:
   - `app/tier-lists/[slug]/page.tsx` — the dynamic route handles all pages automatically
   - The feed page or any feed components — tier-list pages are standalone

## Existing pages reference

Check [lib/tier-lists.ts](lib/tier-lists.ts) for existing entries to match the style and avoid duplicates.

## Output format

Add the new entry directly to `toolPages` in `lib/tier-lists.ts`. The page will be automatically available at `/tier-lists/<slug>`.

Confirm the page slug and URL once done.
