import { Code2, Zap, GitFork, Globe, Rocket, Users, ArrowRight, Hammer, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Posts Are Programs",
    description:
      "Every post on Taksha is a living, running application. Not a screenshot, not a video — real code executing in the browser.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Zero Deploy Friction",
    description:
      "Write code and it's instantly running. No build step, no CI/CD, no waiting. Your creation is live the moment you write it.",
  },
  {
    icon: <GitFork className="h-5 w-5" />,
    title: "Fork Anything",
    description:
      "See something you like? Fork it in one click. The code opens in your editor, ready to remix and make it yours.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Multilingual by Design",
    description:
      'Describe what you want in English or हिन्दी. Our AI generates complete, working applications from natural language prompts.',
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Instant Deploy",
    description:
      "Deploy any creation as a standalone page with one click. Share it anywhere — it just works.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Community-Driven",
    description:
      "Discover what others are building, get inspired, and contribute back. Every fork makes the ecosystem richer.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-amber-500/[0.04] via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center relative">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/15 bg-amber-500/[0.06] px-4 py-1.5 text-xs font-medium text-amber-700 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Posts that run. Code that lives.
            </div>

            <h1 className="font-inter text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-800 mb-4 leading-[1.1]">
              Software that lives{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-terracotta-400 bg-clip-text text-transparent">
                in the feed
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-stone-500 leading-relaxed mb-8">
              Taksha is where every post is a running program. Build, share, and fork
              live applications — no deploy step, no friction. Think GitHub meets Twitter for code.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                href="/create"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-warm-lg"
              >
                <Hammer className="h-4 w-4" />
                Start Building
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-6 py-3 text-sm font-medium text-stone-600 transition-all duration-300 hover:border-amber-500/30 hover:text-amber-700 hover:bg-amber-500/5"
              >
                Explore Feed
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="flex items-center gap-2 text-stone-400">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">6 live apps</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <Users className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Growing community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <h2 className="font-inter text-2xl font-bold text-stone-800 mb-4">
            The Problem
          </h2>
          <div className="space-y-4 text-stone-600 leading-relaxed">
            <p>
              Today, sharing code means sharing <em>dead code</em>. Screenshots on Twitter.
              Gists on GitHub. CodePen links that nobody clicks. The gap between
              &quot;writing code&quot; and &quot;people using it&quot; is enormous — deploy pipelines,
              hosting, domains, configuration.
            </p>
            <p>
              For the billion people coming online in India and beyond, this friction is
              a wall. A student in Jaipur who builds a tip calculator can&apos;t share it
              the way she shares an Instagram reel.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div>
          <h2 className="font-inter text-2xl font-bold text-stone-800 mb-2 text-center">
            How Taksha Works
          </h2>
          <p className="text-stone-500 text-center mb-12 max-w-xl mx-auto">
            Three steps. No deploy. No friction.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Create", desc: "Write code or describe what you want in plain language. Our AI generates a working app instantly." },
              { step: "2", title: "Post", desc: "One click and your creation is live in the feed. No hosting, no config, no DNS." },
              { step: "3", title: "Fork", desc: "Others can fork your work in one click, remix it, and post their version. Like GitHub meets Twitter." },
            ].map((item, i) => (
              <div
                key={item.step}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-inter text-lg font-bold text-stone-800 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="font-inter text-2xl font-bold text-stone-800 mb-8 text-center">
          Built for Builders
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-6 group hover:border-amber-200/60 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 border border-amber-200/50 text-amber-600 mb-3 group-hover:bg-amber-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-stone-800 mb-1.5">{feature.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Name */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div
          className="glass-card rounded-2xl p-8 md:p-12 text-center"
        >
          <span className="font-devanagari text-5xl font-bold text-amber-600">तक्ष</span>
          <p className="mt-4 text-stone-600 max-w-xl mx-auto leading-relaxed">
            <strong>Taksha</strong> (तक्ष) comes from the Sanskrit <em>takṣ</em> — &quot;to craft, to
            carve, to shape with precision.&quot; In ancient India, Takshashila was the world&apos;s first
            university, where knowledge was created and shared freely. We&apos;re bringing
            that spirit to software.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <div>
          <h2 className="font-inter text-3xl font-bold text-stone-800 mb-4">
            Ready to build?
          </h2>
          <p className="text-stone-500 mb-8">
            Your first creation is one click away. No signup required.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/create"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-warm-lg"
            >
              <Hammer className="h-4 w-4" />
              Start Building
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-6 py-3 text-sm font-medium text-stone-600 transition-all duration-300 hover:border-amber-500/30 hover:text-amber-700"
            >
              Browse Feed
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
