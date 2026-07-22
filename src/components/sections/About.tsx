import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const FOCUS_AREAS = [
  {
    title: "LLM & Agentic Systems",
    detail:
      "Multi-agent orchestration with LangGraph, RAG pipelines, prompt engineering and evaluation, fine-tuning.",
  },
  {
    title: "Backend & Infrastructure",
    detail:
      "FastAPI, Node.js, REST + SSE streaming APIs, PostgreSQL/MySQL, Docker, CI-driven deployment.",
  },
  {
    title: "Full-Stack Product",
    detail:
      "React, Next.js, TypeScript, Tailwind — shipping the interface, not just the model behind it.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div
        className="ambient-glow ambient-glow-pink top-1/2 -translate-y-1/2"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[240px_1fr] md:gap-16">
          <Reveal>
            <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl border-2 border-violet/40 shadow-[0_0_60px_-20px_rgba(167,139,250,0.55)]">
              <Image
                src="/about-photo.jpg"
                alt="Zuraiz Anjum"
                fill
                sizes="240px"
                className="object-cover"
                priority={false}
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="font-mono-label text-xs text-muted">Who I am</span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                I don&apos;t trust a model until I&apos;ve watched it fail —
                then I build the system that catches it.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                I&apos;m an AI Engineer with production experience across LLM
                systems, backend engineering, and applied ML — from agentic
                pipelines to full-stack SaaS platforms. I&apos;m comfortable
                across the whole applied-AI stack: prompt engineering, RAG,
                evaluation, API and database design, and deployment. What
                holds it together is a habit of writing the tests before I
                trust the demo.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {FOCUS_AREAS.map((area, i) => (
            <Reveal
              key={area.title}
              delay={0.05 * i}
              className="group bg-background/70 p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-background-raised/90"
            >
              <span className="font-mono-label text-xs text-cyan">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-violet">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {area.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
