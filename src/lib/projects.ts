export type Project = {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  cover?: string;
  stack: string[];
  liveUrl?: string;
  role: string;
  overview: string;
  challenge: string;
  approach: string[];
  result: string[];
  metrics: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "ares",
    client: "Personal R&D",
    title: "ARES — Autonomous Research & Evidence System",
    category: "Multi-Agent LLM System",
    year: "2026",
    summary:
      "A 26-agent LangGraph research assistant running 14 coordinated workflows, turning a natural-language query into a structured research report, complete with citations, comparison matrices, and visualizations.",
    cover: "/projects/ares/cover.png",
    stack: [
      "Python",
      "LangGraph",
      "FastAPI",
      "RAG",
      "ChromaDB",
      "Docker",
      "Railway",
    ],
    liveUrl: "https://web-production-41acc.up.railway.app",
    role: "Sole engineer — architecture, agent design, evals, deployment",
    overview:
      "ARES is what happens when you stop trusting a single LLM call to do research and instead build a system of specialists that check each other's work. Ask it a question and twenty-six coordinated agents, spread across fourteen workflows, go plan, retrieve, write, critique, and revise until the output survives its own fact-check.",
    challenge:
      "Generic LLM answers to research questions are fast, fluent, and frequently wrong — ungrounded claims, no citations, no way to verify anything. The goal was a system that produces reports a researcher could actually cite, with the reasoning and evidence trail to back it up.",
    approach: [
      "Designed a 26-agent LangGraph pipeline across 14 workflows, with distinct planning, retrieval, writing, and critic roles instead of one monolithic prompt.",
      "Built multi-file RAG over PDF/DOCX/TXT sources using ChromaDB with FlashRank reranking, plus persistent entity memory across a session.",
      "Wired in real-time web research through the Tavily API so the system isn't limited to whatever was in a static corpus.",
      "Implemented multi-provider LLM fallback across Groq, Cerebras, Gemini, and OpenRouter with automatic failover and live cost/budget tracking.",
      "Added a self-recalibrating confidence score and a critic-agent revision loop that rejects and rewrites output failing groundedness checks.",
      "Wrote 123 automated tests — unit, integration, and groundedness/citation checks — before calling any of it production-ready.",
    ],
    result: [
      "Shipped as a Dockerized REST + SSE-streaming API on Railway, with Slack/email integrations and LangSmith tracing for observability.",
      "System self-corrects: outputs that fail groundedness thresholds get revised automatically instead of shipped to the user.",
      "Runs across four LLM providers with automatic failover — a single provider outage doesn't take the system down.",
    ],
    metrics: [
      { label: "Agents in pipeline", value: "26" },
      { label: "Workflows", value: "14" },
      { label: "Automated tests", value: "123" },
      { label: "LLM providers with failover", value: "4" },
    ],
  },
  {
    slug: "ai-agent-saas",
    client: "Personal R&D",
    title: "AI Agent SaaS Platform",
    category: "Full-Stack SaaS",
    year: "2026",
    summary:
      "A platform where anyone can spin up an AI agent that joins live video meetings, talks in real time, and hands back a summary and transcript when it's over.",
    stack: [
      "Next.js",
      "TypeScript",
      "Groq",
      "Stream SDK",
      "Drizzle ORM",
      "Neon DB",
      "Stripe",
    ],
    role: "Full-stack engineer — product, backend, billing, UI",
    overview:
      "Video meetings generate a lot of talk and very little record of it. This platform lets a user create a custom AI agent, drop it into a live meeting alongside real participants, and let it respond, take part in chat, and produce a clean summary and transcript afterward — no manual note-taking.",
    challenge:
      "Real-time video + real-time LLM responses + billing + auth is four hard problems stacked on top of each other, and each one has to feel instant or the product feels broken.",
    approach: [
      "Built the meeting/agent core on the Stream Video SDK with an LLM-backed participant powered by Groq for low-latency responses.",
      "Modeled agents, meetings, transcripts, and billing state with Drizzle ORM against Neon Postgres.",
      "Added full auth (email + OAuth), protected routes, and per-user agent/meeting dashboards with history and video playback.",
      "Integrated Stripe subscription billing end to end — plans, checkout, webhooks, and gated feature access.",
    ],
    result: [
      "Users can create an agent, name its personality, and have it join a live call within seconds of starting a meeting.",
      "Post-meeting summaries and transcripts generate automatically, no manual step required.",
      "Subscription billing, auth, and dashboards are fully wired — this isn't a demo, it's a shippable product.",
    ],
    metrics: [
      { label: "Core flows", value: "Auth · Billing · Live AI" },
      { label: "LLM latency target", value: "Real-time" },
      { label: "Stack layers owned", value: "Frontend → DB" },
    ],
  },
  {
    slug: "small-vs-large-llms",
    client: "Academic / Independent Research",
    title: "Small vs. Large LLMs: A Crisis Detection Benchmark",
    category: "NLP Research",
    year: "2025",
    summary:
      "A benchmark asking how much model you actually need: how closely small, cheap language models can approximate large-scale performance on a sensitive, high-stakes classification task.",
    stack: ["NLP", "DistilBERT", "MentalBERT", "Flan-T5", "TF-IDF", "Scikit-learn"],
    role: "Sole researcher — data, modeling, evaluation",
    overview:
      "Crisis detection on social media is a task where false negatives are dangerous and false positives erode trust. This study benchmarks small transformer models against a classical baseline to find out exactly how much performance you give up by going small — and whether it's worth it.",
    challenge:
      "Large general-purpose models perform well on crisis detection but are expensive to run at scale. The open question was whether smaller, domain-specific models could close enough of the gap to be a viable, cheaper alternative in production.",
    approach: [
      "Benchmarked DistilBERT, MentalBERT, and Flan-T5 against a TF-IDF + Logistic Regression baseline on social-media crisis-detection data.",
      "Analyzed precision/recall tradeoffs across all four approaches to quantify exactly how much performance small models were leaving on the table.",
      "Evaluated where domain-specific pretraining (MentalBERT) closed the gap versus general-purpose small models (DistilBERT).",
    ],
    result: [
      "Quantified the real performance gap between lightweight domain-specific models and large general-purpose ones on a safety-critical task.",
      "Produced a concrete answer to \"how much model do you need\" for teams weighing cost against accuracy on sensitive classification tasks.",
    ],
    metrics: [
      { label: "Models benchmarked", value: "4" },
      { label: "Task", value: "Crisis detection" },
      { label: "Baseline", value: "TF-IDF + LogReg" },
    ],
  },
  {
    slug: "ml-fitness-tracker",
    client: "Academic / Independent Research",
    title: "ML Fitness Tracker",
    category: "Applied ML",
    year: "2025",
    summary:
      "A from-scratch exercise-recognition and rep-counting system built entirely from raw, unlabeled accelerometer and gyroscope data.",
    stack: ["Python", "Scikit-learn", "SVM", "Random Forest", "Signal Processing"],
    role: "Sole engineer — data pipeline, modeling, algorithm design",
    overview:
      "Raw motion sensor data has no labels and no easy signal boundaries — it's just a continuous stream of numbers. This project turns that stream into something useful: recognizing which exercise is being performed and counting reps accurately, without any manual annotation of the raw signal.",
    challenge:
      "Accelerometer and gyroscope data is noisy and continuous, with no obvious boundaries between reps or exercises. The system had to both classify the exercise and segment the signal into discrete, countable repetitions.",
    approach: [
      "Engineered features from raw accelerometer/gyroscope signals — no pre-built activity-recognition library.",
      "Trained and compared SVM, Random Forest, and Neural Network classifiers for exercise recognition.",
      "Designed a custom rep-counting algorithm on top of the classifier output, turning a continuous motion stream into a discrete, trustworthy count.",
    ],
    result: [
      "Built a working exercise-recognition and rep-counting pipeline entirely from raw, unlabeled sensor data.",
      "Validated which classifier generalized best across exercise types before committing to a final model.",
    ],
    metrics: [
      { label: "Classifiers trained", value: "3" },
      { label: "Data source", value: "Raw sensor streams" },
      { label: "Output", value: "Live rep count" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
