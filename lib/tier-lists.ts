export interface ToolEntry {
  name: string;
  description: string;
  url?: string;
  icon: string;
  color: string;
  category: string;
  pricing?: string;
  /** 3-4 emojis composing a visual scene for this item */
  scene: string[];
  /** What makes this item special */
  bestFor?: string;
}

export interface ToolPage {
  title: string;
  description: string;
  /** SEO meta description — 150-160 chars, keyword-rich */
  metaDescription: string;
  /** Target keywords for this page */
  keywords: string[];
  /** Natural-language intro paragraph for AI extraction */
  intro: string;
  /** FAQ pairs — great for featured snippets + AI answers */
  faqs: Array<{ question: string; answer: string }>;
  /** ISO date string of last update */
  lastUpdated: string;
  /** 4 emojis capturing the list's core experience */
  coverEmojis: string[];
  /** Tailwind gradient for the cover visual */
  coverGradient: string;
  /** Short experiential tagline */
  coverTagline: string;
  tools: ToolEntry[];
}

/**
 * Registry of all tier-list pages.
 * Key = URL slug → /tier-lists/{slug}
 */
export const toolPages: Record<string, ToolPage> = {
  "things-to-experience-around-iit-bombay": {
    title: "Things to Experience Around IIT Bombay",
    description:
      "The definitive tier list of experiences in and around IIT Bombay — from Powai Lake sunrises to late-night canteen Maggi.",
    metaDescription:
      "Discover the best things to do around IIT Bombay in 2026. Powai Lake, Hiranandani street food, Aarey Colony trails, campus culture, and more — ranked.",
    keywords: [
      "iit bombay things to do",
      "powai lake",
      "iit bombay campus",
      "hiranandani food",
      "mumbai student life",
      "aarey colony",
    ],
    intro:
      "IIT Bombay isn't just a campus — it's a world. Nestled between Powai Lake and Aarey Colony, surrounded by Hiranandani's food scene and Mumbai's energy, every corner has a story. Here's our tier list of the experiences that define life around IITB.",
    faqs: [
      {
        question: "What is the best thing to do near IIT Bombay?",
        answer:
          "A sunrise jog around Powai Lake is the quintessential IITB experience — the lake, the skyline, the peace before a chaotic day.",
      },
      {
        question: "Where should I eat near IIT Bombay?",
        answer:
          "Hiranandani walkway has incredible street food — from pav bhaji to shawarma. Inside campus, the late-night canteen Maggi is a rite of passage.",
      },
      {
        question: "Is Aarey Colony worth visiting from IITB?",
        answer:
          "Absolutely. It's a 10-minute ride from campus and feels like you've left Mumbai entirely — lush forest trails, tribal hamlets, and fresh air.",
      },
    ],
    lastUpdated: "2026-03-10",
    coverEmojis: ["🌅", "🏫", "🍜", "🌳"],
    coverGradient: "from-amber-400 via-orange-400 to-rose-400",
    coverTagline: "Campus life, lake mornings, midnight Maggi",
    tools: [
      {
        name: "Powai Lake Sunrise Run",
        description:
          "The golden hour over Powai Lake with the IIT Bombay campus silhouette behind you. The best alarm clock you'll never need.",
        icon: "🌅",
        color: "from-amber-400 to-orange-500",
        category: "S-Tier",
        scene: ["🌅", "🏃‍♂️", "🌊", "🏙️"],
        bestFor: "The quintessential IITB morning",
      },
      {
        name: "Late-Night Canteen Maggi",
        description:
          "2 AM. Exam tomorrow. The canteen uncle hands you a plate of Maggi and chai. This is where startups are born and friendships are forged.",
        icon: "🍜",
        color: "from-yellow-400 to-amber-500",
        category: "S-Tier",
        scene: ["🍜", "🌙", "☕", "💡"],
        bestFor: "Where all great ideas begin",
      },
      {
        name: "Hiranandani Street Food Trail",
        description:
          "The walkway outside Hiranandani is a food paradise — pav bhaji, dosa, shawarma, fresh juice. Every IITB student's second canteen.",
        icon: "🥘",
        color: "from-red-400 to-rose-500",
        category: "A-Tier",
        scene: ["🥘", "🛣️", "🔥", "😋"],
        bestFor: "The best street food within walking distance",
      },
      {
        name: "Main Building at Golden Hour",
        description:
          "The heritage main building glowing in late afternoon light. Architecture that says 'nation-builder' in every stone. Perfect for photos.",
        icon: "🏛️",
        color: "from-stone-400 to-stone-600",
        category: "A-Tier",
        scene: ["🏛️", "📸", "🌇", "🎓"],
        bestFor: "That iconic campus photo",
      },
      {
        name: "Aarey Colony Nature Trail",
        description:
          "Ten minutes from campus and you're in a forest. Tribal hamlets, butterflies, streams — a Mumbai that most people don't know exists.",
        icon: "🌳",
        color: "from-green-400 to-emerald-500",
        category: "A-Tier",
        scene: ["🌳", "🦋", "🥾", "🌿"],
        bestFor: "Escaping the campus bubble",
      },
      {
        name: "Insti Night Cultural Fest",
        description:
          "The open-air amphitheatre packed with thousands. Live bands, dance battles, stand-up comedy. The energy could power Powai for a week.",
        icon: "🎭",
        color: "from-purple-400 to-violet-500",
        category: "A-Tier",
        scene: ["🎭", "🎵", "🔥", "🌃"],
        bestFor: "The electric festival energy",
      },
      {
        name: "Powai Lake Boating",
        description:
          "Rent a paddleboat on a weekend afternoon. Watch crocodiles sunbathe (yes, really) and the skyline shimmer. Surprisingly meditative.",
        icon: "🚣",
        color: "from-sky-400 to-blue-500",
        category: "B-Tier",
        scene: ["🚣‍♂️", "🐊", "🌅", "💧"],
        bestFor: "Chill weekend escape",
      },
      {
        name: "Cutting Chai at the Gate",
        description:
          "The chai stall outside the main gate. ₹10 for a tiny glass of sweet, milky perfection. The unofficial currency of campus conversations.",
        icon: "☕",
        color: "from-orange-300 to-amber-400",
        category: "B-Tier",
        scene: ["☕", "🫖", "🚪", "💬"],
        bestFor: "The ₹10 social network",
      },
    ],
  },

  "ai-research-vs-traditional-research": {
    title: "AI Research vs Traditional Research",
    description:
      "How does AI research differ from traditional academic research? Speed, funding, culture, celebrity — everything is different.",
    metaDescription:
      "AI research vs traditional research compared: compute, funding, publication speed, collaboration, celebrity culture, and real-world impact — ranked and visualized.",
    keywords: [
      "ai research",
      "traditional research",
      "machine learning academia",
      "research funding",
      "arxiv preprints",
      "ai vs academia",
    ],
    intro:
      "AI research has rewritten the rules of academia. Papers drop on Arxiv at midnight, GPU clusters cost millions, researchers have Twitter followings bigger than some universities, and the gap between paper and product is measured in months, not decades. Here's how the two worlds compare.",
    faqs: [
      {
        question: "Why is AI research so different from traditional research?",
        answer:
          "Scale of compute, speed of iteration, industry funding, and the direct path to products all make AI research feel more like a tech startup than a lab.",
      },
      {
        question: "Is traditional research still important in the age of AI?",
        answer:
          "Absolutely. Foundational work in mathematics, physics, and biology provides the theoretical bedrock that AI builds on. Many AI breakthroughs came from decades-old research.",
      },
      {
        question: "Do AI researchers need a PhD?",
        answer:
          "Not necessarily. Many top AI researchers at companies like OpenAI and Google came through non-traditional paths. But a strong mathematical foundation is essential.",
      },
    ],
    lastUpdated: "2026-03-10",
    coverEmojis: ["🤖", "🔬", "⚡", "📚"],
    coverGradient: "from-cyan-400 via-blue-500 to-violet-500",
    coverTagline: "Two worlds of research, one future",
    tools: [
      {
        name: "The Compute Gap",
        description:
          "AI labs train models on thousands of H100 GPUs costing $100M+. Traditional labs run simulations on university clusters. The resource gap is staggering.",
        icon: "🖥️",
        color: "from-cyan-400 to-blue-500",
        category: "S-Tier Difference",
        scene: ["🖥️", "⚡", "💰", "🔥"],
        bestFor: "The most visible divide",
      },
      {
        name: "Publication Speed",
        description:
          "AI: post to Arxiv tonight, trending tomorrow. Traditional: submit to journal, wait 8 months for peer review, revise, wait again. A paper's half-life is measured differently.",
        icon: "📄",
        color: "from-violet-400 to-purple-500",
        category: "S-Tier Difference",
        scene: ["📄", "💨", "🐌", "📚"],
        bestFor: "Arxiv vs journals — two different galaxies",
      },
      {
        name: "The Celebrity Factor",
        description:
          "Karpathy has 1M+ followers. Hinton won the Nobel Prize AND went viral. AI researchers are the new rock stars. Traditional researchers publish quietly and cite quietly.",
        icon: "🌟",
        color: "from-amber-400 to-yellow-500",
        category: "A-Tier Difference",
        scene: ["🌟", "📱", "🎓", "🔇"],
        bestFor: "Twitter fame vs quiet expertise",
      },
      {
        name: "Industry vs Academia Funding",
        description:
          "AI research gets VC rounds, $10B compute commitments, and corporate labs with unlimited budgets. Traditional research competes for shrinking government grants.",
        icon: "💰",
        color: "from-green-400 to-emerald-500",
        category: "A-Tier Difference",
        scene: ["💰", "🏗️", "📊", "🎓"],
        bestFor: "The money tells the story",
      },
      {
        name: "Collaboration Culture",
        description:
          "AI: open-source, global Discord servers, Hugging Face repos. Traditional: small lab teams, closed-door collaborations, conference hallways. The scale of collaboration is fundamentally different.",
        icon: "🌐",
        color: "from-blue-400 to-indigo-500",
        category: "A-Tier Difference",
        scene: ["🌐", "👥", "🤝", "🔬"],
        bestFor: "Open-source vs closed-door discovery",
      },
      {
        name: "Idea-to-Impact Timeline",
        description:
          "Attention Is All You Need (2017) → ChatGPT (2022) → transforming every industry (2024). Traditional breakthroughs can take decades to leave the lab.",
        icon: "🚀",
        color: "from-rose-400 to-pink-500",
        category: "B-Tier Difference",
        scene: ["🚀", "📅", "🐢", "🌍"],
        bestFor: "Months to market vs decades to citation",
      },
      {
        name: "The Reproducibility Question",
        description:
          "AI: 'here's our 70B model, good luck reproducing without $10M in compute.' Traditional: careful methodology designed for replication. Both have problems, but different ones.",
        icon: "🔄",
        color: "from-orange-400 to-red-500",
        category: "B-Tier Difference",
        scene: ["🔄", "❓", "💸", "🧪"],
        bestFor: "Different flavors of the replication crisis",
      },
    ],
  },

  "coffee-cultures-around-the-world": {
    title: "Coffee Cultures Around the World",
    description:
      "From Ethiopian ceremonies to Indian cutting chai — every culture has its own sacred relationship with caffeine. A visual journey.",
    metaDescription:
      "Explore the world's most unique coffee cultures: Ethiopian ceremony, Italian espresso, Japanese kissaten, Turkish fortune-telling, Indian cutting chai, and more.",
    keywords: [
      "coffee culture",
      "world coffee",
      "ethiopian coffee ceremony",
      "italian espresso",
      "japanese pour over",
      "turkish coffee",
      "cutting chai",
    ],
    intro:
      "Coffee isn't just a drink — it's a ritual, a social contract, an identity. Every culture has carved its own relationship with the bean, and each one reveals something profound about the people who drink it. Here's our tier list of the world's most compelling coffee cultures.",
    faqs: [
      {
        question: "Which country has the best coffee culture?",
        answer:
          "Ethiopia, where coffee originated, has the most profound coffee culture — the ceremony is a multi-hour social ritual involving roasting, grinding, and three rounds of brewing.",
      },
      {
        question: "What is a flat white and where did it originate?",
        answer:
          "A flat white is a coffee drink with micro-foamed milk, originating in Australia/New Zealand in the 1980s. It's now a global staple.",
      },
      {
        question: "What makes Japanese coffee culture unique?",
        answer:
          "Japanese kissaten (coffee houses) focus on precision pour-over brewing, aesthetic presentation, and a meditative atmosphere that's unlike any café experience elsewhere.",
      },
    ],
    lastUpdated: "2026-03-10",
    coverEmojis: ["☕", "🌍", "🫖", "✨"],
    coverGradient: "from-amber-600 via-orange-700 to-stone-700",
    coverTagline: "One bean, a thousand rituals",
    tools: [
      {
        name: "Ethiopian Coffee Ceremony",
        description:
          "Where coffee was born. Green beans roasted on the spot, ground by hand, brewed in a jebena. Three rounds. Two hours. An act of community, not consumption.",
        icon: "🇪🇹",
        color: "from-green-600 to-amber-600",
        category: "S-Tier",
        scene: ["☕", "🫖", "🔥", "🤝"],
        bestFor: "The origin story of coffee itself",
      },
      {
        name: "Italian Espresso Bar",
        description:
          "Stand at the counter. Order. One shot. 30 seconds. Leave. No laptops, no lingering. Coffee as a punctuation mark in the day, not a paragraph.",
        icon: "🇮🇹",
        color: "from-red-500 to-green-600",
        category: "S-Tier",
        scene: ["☕", "🏃", "💨", "🇮🇹"],
        bestFor: "Coffee as pure efficiency",
      },
      {
        name: "Japanese Kissaten Pour-Over",
        description:
          "Aged wood counters. A master brewer with a gooseneck kettle. Each cup takes 4 minutes. Silence. Precision. Coffee elevated to meditation.",
        icon: "🇯🇵",
        color: "from-stone-500 to-stone-700",
        category: "A-Tier",
        scene: ["☕", "🫖", "🎎", "🧘"],
        bestFor: "Coffee as meditation",
      },
      {
        name: "Turkish Coffee & Fortune Telling",
        description:
          "Thick, unfiltered, sweet. When you finish, flip the cup and read the grounds. Your future is in the sediment. Coffee and destiny, served together.",
        icon: "🇹🇷",
        color: "from-red-600 to-amber-700",
        category: "A-Tier",
        scene: ["☕", "🔮", "✨", "🌙"],
        bestFor: "Coffee meets mysticism",
      },
      {
        name: "Australian Flat White Scene",
        description:
          "Melbourne invented the modern café. Flat whites. Latte art competitions. Baristas with tattoos and opinions about extraction ratios. Coffee as lifestyle.",
        icon: "🇦🇺",
        color: "from-sky-400 to-amber-400",
        category: "A-Tier",
        scene: ["☕", "🎨", "☀️", "🏄"],
        bestFor: "Coffee as lifestyle identity",
      },
      {
        name: "Indian Cutting Chai",
        description:
          "Not coffee, technically — but the tapri chai stall is India's answer to the espresso bar. ₹10. Shared. Sweet. Strong. The great equalizer.",
        icon: "🇮🇳",
        color: "from-orange-400 to-amber-500",
        category: "A-Tier",
        scene: ["🫖", "🔥", "🤲", "🇮🇳"],
        bestFor: "Caffeine democracy at ₹10",
      },
      {
        name: "Vietnamese Egg Coffee",
        description:
          "Whipped egg yolk, condensed milk, strong robusta. It shouldn't work. It absolutely does. Invented in 1940s Hanoi when milk was scarce. Necessity is the mother of deliciousness.",
        icon: "🇻🇳",
        color: "from-yellow-400 to-amber-600",
        category: "B-Tier",
        scene: ["☕", "🥚", "🍮", "🇻🇳"],
        bestFor: "The most unexpected coffee you'll love",
      },
    ],
  },

  "programming-languages-as-vibes": {
    title: "Programming Languages as Vibes",
    description:
      "Every language has a personality. Python is the friendly genius. Rust is the safety-obsessed engineer. Here's the definitive vibe check.",
    metaDescription:
      "Programming languages ranked by personality and vibe: Python, Rust, JavaScript, Go, C, Haskell, TypeScript — the definitive developer tier list.",
    keywords: [
      "programming languages",
      "best programming language",
      "python vs rust",
      "javascript memes",
      "developer humor",
      "coding languages ranked",
    ],
    intro:
      "You can tell a lot about a developer by their language of choice. Not because of technical differences — because of vibes. Every language carries a philosophy, a community personality, and a particular relationship with chaos. Here's how they stack up.",
    faqs: [
      {
        question: "What is the best programming language to learn in 2026?",
        answer:
          "Python remains the best first language due to its readability and vast ecosystem. For systems programming, Rust is increasingly the language of choice.",
      },
      {
        question: "Why do developers argue about programming languages?",
        answer:
          "Because language choice reflects philosophy — simplicity vs control, safety vs speed, convention vs freedom. It's less about syntax and more about values.",
      },
      {
        question: "Is JavaScript really that chaotic?",
        answer:
          "Yes. '0' == false is true, but '0' is truthy. NaN !== NaN. typeof null === 'object'. And yet it powers the entire web. The chaos is the feature.",
      },
    ],
    lastUpdated: "2026-03-10",
    coverEmojis: ["🐍", "🦀", "🌐", "⚡"],
    coverGradient: "from-violet-500 via-fuchsia-500 to-cyan-400",
    coverTagline: "Every language has a personality",
    tools: [
      {
        name: "Python — The Friendly Genius",
        description:
          "Readable. Versatile. Everyone's first language and many people's last. Powers AI, web, science, and scripting. The Swiss Army knife that actually makes sense.",
        icon: "🐍",
        color: "from-blue-500 to-yellow-500",
        category: "S-Tier",
        scene: ["🐍", "🎓", "🤗", "🧪"],
        bestFor: "The universal language",
      },
      {
        name: "Rust — The Safety Obsessed Engineer",
        description:
          "Zero-cost abstractions. Memory safety without garbage collection. The compiler is your strictest teacher. If it compiles, it's probably correct. Probably.",
        icon: "🦀",
        color: "from-orange-500 to-red-600",
        category: "S-Tier",
        scene: ["🦀", "🔒", "⚡", "🛡️"],
        bestFor: "Zero bugs or zero compile",
      },
      {
        name: "JavaScript — The Chaotic Creative",
        description:
          "It runs in browsers, servers, phones, toasters, and probably Mars rovers. The type system is a suggestion. The ecosystem changes weekly. Somehow, it won.",
        icon: "🌐",
        color: "from-yellow-400 to-amber-500",
        category: "A-Tier",
        scene: ["🌐", "🎨", "🔥", "😅"],
        bestFor: "The language that runs everything (badly)",
      },
      {
        name: "Go — The Minimalist Pragmatist",
        description:
          "25 keywords. No generics (well, now there are). No exceptions. No magic. Just goroutines and vibes. Google built it because C++ meetings were too long.",
        icon: "🐹",
        color: "from-cyan-400 to-sky-500",
        category: "A-Tier",
        scene: ["🐹", "💨", "🛠️", "🧘"],
        bestFor: "Simple. Fast. Done.",
      },
      {
        name: "C — The Ancient Warrior",
        description:
          "Close to the metal. Manual memory. Segfaults at 3 AM. It built Unix, Linux, and most of the infrastructure you're using right now. Respect your elders.",
        icon: "⚔️",
        color: "from-stone-500 to-stone-700",
        category: "A-Tier",
        scene: ["⚔️", "🏛️", "💀", "🔧"],
        bestFor: "When you need to talk to the hardware",
      },
      {
        name: "TypeScript — JavaScript's Therapist",
        description:
          "Everything JavaScript is, but with types. Microsoft's gift to developers who got tired of 'undefined is not a function' at 2 AM. JS, but you can sleep at night.",
        icon: "🛡️",
        color: "from-blue-500 to-blue-700",
        category: "A-Tier",
        scene: ["🛡️", "📐", "✨", "😌"],
        bestFor: "JavaScript, but make it professional",
      },
      {
        name: "Haskell — The Philosopher",
        description:
          "Monads. Functors. Lazy evaluation. A language so pure it makes side effects feel like a moral failing. Theoretically perfect. Practically lonely.",
        icon: "🧠",
        color: "from-purple-500 to-indigo-600",
        category: "B-Tier",
        scene: ["🧠", "📖", "🔮", "🏔️"],
        bestFor: "Enlightenment through compilation errors",
      },
      {
        name: "PHP — The Survivor",
        description:
          "Everyone laughs at PHP. PHP powers 77% of the web and doesn't care. WordPress, Laravel, Facebook (originally). The cockroach of programming languages.",
        icon: "🪳",
        color: "from-indigo-400 to-violet-500",
        category: "B-Tier",
        scene: ["🪳", "💪", "🌍", "😤"],
        bestFor: "The language that refuses to die",
      },
    ],
  },
};

/** Returns all slugs for static generation or listing */
export function getAllTierListSlugs(): string[] {
  return Object.keys(toolPages);
}

/** Returns a flat list of all tier-list pages with their slugs for search/listing */
export function getAllTierListEntries(): Array<{ slug: string } & ToolPage> {
  return Object.entries(toolPages).map(([slug, page]) => ({ slug, ...page }));
}
