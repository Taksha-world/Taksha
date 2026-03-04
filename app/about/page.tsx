"use client";

import { motion } from "framer-motion";
import { Code2, Zap, GitFork, Globe, Rocket, Users, ArrowRight, Hammer } from "lucide-react";
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-amber-500/[0.05] via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-stone-800 mb-6 leading-[1.1]">
              What if every social media post{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-terracotta-400 bg-clip-text text-transparent">
                was a running program?
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-stone-500 leading-relaxed">
              Taksha reimagines the social feed. Instead of static text and images,
              every post is an interactive, living application. Build a calculator, a
              game, a data dashboard — and share it the way you&apos;d share a tweet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <h2 className="font-display text-2xl font-bold text-stone-800 mb-4">
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
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-stone-800 mb-2 text-center">
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
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-bold text-stone-800 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="font-display text-2xl font-bold text-stone-800 mb-8 text-center">
          Built for Builders
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card rounded-xl p-6 group hover:border-amber-200/60 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 border border-amber-200/50 text-amber-600 mb-3 group-hover:bg-amber-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-stone-800 mb-1.5">{feature.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Name */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center"
        >
          <span className="font-devanagari text-5xl font-bold text-amber-600">तक्षा</span>
          <p className="mt-4 text-stone-600 max-w-xl mx-auto leading-relaxed">
            <strong>Taksha</strong> (तक्षा) comes from the Sanskrit <em>takṣ</em> — &quot;to craft, to
            carve, to shape.&quot; In ancient India, Takshashila was the world&apos;s first
            university, where knowledge was created and shared freely. We&apos;re bringing
            that spirit to software.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold text-stone-800 mb-4">
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
        </motion.div>
      </section>
    </div>
  );
}
