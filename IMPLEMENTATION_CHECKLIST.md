# Taksha v2 — Implementation Checklist

## 🎯 What We're Building

1. **YouTube-style desktop layout** — sidebar nav + thumbnail grid
2. **Mixed media feed** — code, text, images, videos, memes in one feed
3. **Inline build prompt** — "Describe what you want to build" at top of feed
4. **Multi-storage backend** — Supabase (DB + code), Cloudinary (media), URL embeds

---

## 👤 YOUR Tasks (Account Setup — Do These First)

### Supabase (you already have this partially set up)
- [ ] Fill in `.env.local` with your Supabase URL and anon key
- [ ] In Supabase Dashboard → SQL Editor, run the schema migration I'll provide (creates `posts`, `profiles`, `media` tables)
- [ ] Enable Supabase Storage bucket for code thumbnails
- [ ] Enable Row-Level Security policies (I'll provide the SQL)

### Cloudinary (new — for images/videos/memes)
- [ ] Create free account at [cloudinary.com](https://cloudinary.com)
- [ ] Go to Dashboard → copy **Cloud Name**, **API Key**, **API Secret**
- [ ] Add to `.env.local`:
  ```env
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
  CLOUDINARY_API_KEY=your-api-key
  CLOUDINARY_API_SECRET=your-api-secret
  ```
- [ ] In Settings → Upload → Upload Presets: Create an **unsigned** preset named `taksha_uploads`
  - Folder: `taksha/`
  - Allowed formats: jpg, png, gif, webp, mp4, webm, mov
  - Max file size: 50MB (video), 10MB (image)
  - Enable eager transformations: `c_limit,w_1280` (auto-resize)

### Vercel (for deployment links)
- [ ] Already deployed? Add new env vars to Vercel project settings
- [ ] Enable Vercel API access if we want one-click deploy for code posts

### GitHub Integration (optional — for repo linking)
- [ ] Create GitHub OAuth app for "Connect Repo" feature
- [ ] Or: Just allow users to paste GitHub URLs (simpler, no OAuth needed)

---

## 🛠 MY Tasks (Code Implementation)

### Phase 1: Layout Overhaul (YouTube-style)
- [ ] **Sidebar component** — collapsible left nav with:
  - Home / Trending / Following / Liked
  - Categories: Builds, Memes, Art, Videos, Text
  - Collapsed = icon-only mode (like YouTube mini sidebar)
- [ ] **Grid layout** — Replace single-column feed with responsive thumbnail grid
  - Desktop: 3-4 columns
  - Tablet: 2 columns
  - Mobile: 1 column (no sidebar, bottom nav or hamburger)
- [ ] **Thumbnail cards** — Compact cards showing:
  - Preview thumbnail (auto-generated for code, uploaded for media)
  - Title, author avatar, likes count, time ago
  - Post type badge (Build, Meme, Video, etc.)
- [ ] **Update Navbar** — Slim top bar (search + user menu only, nav moves to sidebar)
- [ ] **Update layout.tsx** — Add sidebar to page structure

### Phase 2: Build Prompt (Inline CTA)
- [ ] **Prompt bar at top of feed** — "Describe what you want to build..."
  - Expands on focus
  - Submit → navigates to `/create` with the prompt pre-filled
  - Uses existing PromptBar AI or just passes text
- [ ] **Quick action buttons** — Below prompt: "HTML App", "Game", "Dashboard", "Animation"

### Phase 3: Extended Post Types
- [ ] **Update Post type** — Add new fields:
  ```typescript
  type PostType = "build" | "text" | "image" | "video" | "meme";
  
  interface Post {
    id: string;
    type: PostType;
    title: string;
    description: string;
    author: { name: string; avatar: string; id?: string; };
    tag: string;
    likes: number;
    forks: number;
    // Code posts
    code?: string;
    // Media posts
    mediaUrl?: string;
    mediaType?: "image" | "video" | "gif";
    thumbnailUrl?: string;
    // Text posts
    body?: string;
    // GitHub link
    repoUrl?: string;
    deployUrl?: string;
    createdAt?: number;
  }
  ```
- [ ] **Sample posts** — Add sample image, video, text, and meme posts
- [ ] **Post card variants** — Different card layouts per type:
  - Build: Code preview thumbnail + run button
  - Image/Meme: Full image display
  - Video: Thumbnail + play button + duration
  - Text: Rich text preview

### Phase 4: Media Upload
- [ ] **Cloudinary upload widget** — Drag & drop / click to upload
  - Image: jpg, png, gif, webp (max 10MB)
  - Video: mp4, webm, mov (max 50MB)
  - Show upload progress bar
  - Return Cloudinary URL on success
- [ ] **URL embed support** — Paste YouTube/Vimeo/Twitter URL → auto-embed
- [ ] **Image viewer** — Lightbox for full-size image viewing
- [ ] **Video player** — Embedded player with controls (Cloudinary video player or HTML5)

### Phase 5: Create Page Updates
- [ ] **Post type selector** — Choose: Build, Text, Image, Video, Meme
- [ ] **Build mode** — Existing Monaco editor (unchanged)
- [ ] **Text mode** — Rich text / markdown editor
- [ ] **Image/Meme mode** — Upload + caption + optional text overlay
- [ ] **Video mode** — Upload or paste URL + title + description
- [ ] **GitHub link** — Optional "Connect Repo" field for build posts

### Phase 6: Database Migration (when Supabase is configured)
- [ ] **Supabase schema** — Create tables:
  - `posts` — All post data
  - `profiles` — User profiles (extends Supabase auth)
  - `likes` — User likes (many-to-many)
  - `comments` — Future: commenting
- [ ] **API layer** — Replace localStorage with Supabase queries
- [ ] **RLS policies** — Users can only edit/delete their own posts

---

## 📋 Implementation Order

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
(Layout)   (Prompt)  (Types)   (Upload)  (Create)  (Database)
```

Phase 1-3 can ship immediately (no external services needed).
Phases 4-6 require your Cloudinary + Supabase setup.

---

## ⚡ What We Can Build RIGHT NOW (No External Setup)

Even without Cloudinary/Supabase configured:
1. ✅ YouTube sidebar layout
2. ✅ Thumbnail grid feed
3. ✅ Inline build prompt
4. ✅ Extended post types (text, image URL, video URL, meme URL)
5. ✅ Sample media posts with placeholder URLs
6. ✅ Post type selector on create page

These all work with the current localStorage + sample data approach.

---

## 🔧 Files That Will Change

| File | Changes |
|------|---------|
| `components/Sidebar.tsx` | **NEW** — YouTube-style sidebar |
| `components/ThumbnailCard.tsx` | **NEW** — Grid card component |
| `components/MediaUpload.tsx` | **NEW** — Cloudinary upload widget |
| `components/VideoPlayer.tsx` | **NEW** — Video embed/player |
| `components/ImageViewer.tsx` | **NEW** — Lightbox image viewer |
| `components/FeedPrompt.tsx` | **NEW** — Inline build prompt |
| `app/page.tsx` | **REWRITE** — Grid layout + sidebar |
| `app/layout.tsx` | **UPDATE** — Add sidebar structure |
| `app/create/page.tsx` | **UPDATE** — Post type selector + media modes |
| `components/Navbar.tsx` | **UPDATE** — Slim mode (search + user) |
| `components/PostCard.tsx` | **UPDATE** — Support media post types |
| `lib/posts.ts` | **UPDATE** — Extended Post type + media samples |
| `lib/store.ts` | **UPDATE** — Media post storage |
| `lib/cloudinary.ts` | **NEW** — Cloudinary client utilities |
| `.env.local` | **UPDATE** — Cloudinary env vars |
