# Taksha

Social platform where posts are living software.

## What This Is
Posts on Taksha aren't text or images — they're 
running software. Write HTML, Python, or JavaScript. 
Your post renders live in the feed like a web browser.

## The Insight
The AI economy has a ceiling: $20/month, English 
fluency, API literacy. Taksha removes it.

## Built With
- Next.js 14
- Monaco Editor
- Shadcn/ui
- Framer Motion

## Status
Active development. MVP live at taksha.vercel.app

---
*Taksha — the craftsman's workshop for the next 
billion builders.*
```

---

### 5. Branch Strategy From Day One
```
main          → production, what's live on Vercel
dev           → active development
feature/*     → individual features
```

Never push directly to main. Even solo. It's a habit that matters when a cofounder joins.

---

## Vercel — Do This Second

### 1. Create A Vercel Team (Not Personal Account)

Go to vercel.com → "Create Team"
```
Team name  → Taksha
Slug       → taksha (gives you taksha.vercel.app)
```

Same reason as GitHub org — signals company, not side project.

---

### 2. Import From GitHub Org
```
Vercel Dashboard → Add New → Project
→ Import from GitHub
→ Select taksha-build/taksha
→ Framework: Next.js (auto-detected)
→ Deploy
```

Your URL becomes:
```
taksha.vercel.app
```

Paste this directly into the YC Company URL field.

---

### 3. Set Up Environment Variables

In Vercel dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_APP_NAME=Taksha
NEXT_PUBLIC_APP_URL=https://taksha-build.vercel.app
```

Add more as you build — API keys, etc.

---

### 4. Enable Automatic Deployments

Vercel does this by default — every push to `main` triggers a new deployment. Every push to other branches gets a preview URL.

This means:
```
Push to dev branch  → taksha-git-dev-taksha.vercel.app
Push to main        → taksha.vercel.app (live)
```

---

## The Complete Setup Sequence
```
Step 1  → Create GitHub org: taksha-build
Step 2  → Create repo: taksha-build/taksha
Step 3  → Write org profile README
Step 4  → Create Vercel team: Taksha
Step 5  → Build the app locally using the VS Code prompt
Step 6  → Push to GitHub
Step 7  → Import to Vercel, get taksha.vercel.app
Step 8  → Paste URL into YC and a16z applications
Step 9  → Submit both applications
Step 10 → Register taksha.build on Porkbun
Step 11 → Add custom domain to Vercel