import Reveal from "@/components/ui/Reveal";

const ROLES = [
  {
    period: "Nov 2025 — Jun 2026",
    role: "Software Engineer",
    org: "Mercor",
    location: "Contract · Remote",
    detail:
      "Designed and optimized database schemas, APIs, and backend services for AI model integration into ML applications on a global engineering team. Ran model evaluation on accuracy, performance, and reliability, using coding agents to speed up code generation and testing.",
  },
  {
    period: "Jan 2026 — Mar 2026",
    role: "AI/ML Intern",
    org: "Project19",
    location: "Remote · US-based",
    detail:
      "Fine-tuned and evaluated LLMs for applied use cases. Built and tested agentic workflows automating multi-step tasks alongside a remote engineering team on production-facing AI features.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono-label text-xs text-muted">Experience</span>
        </Reveal>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {ROLES.map((item, i) => (
            <Reveal key={item.role} delay={0.05 * i}>
              <div className="grid gap-3 py-8 md:grid-cols-[1fr_2fr] md:gap-10 md:py-10">
                <div>
                  <p className="font-mono-label text-xs text-muted">
                    {item.period}
                  </p>
                  <p className="mt-2 text-lg font-medium text-foreground md:text-xl">
                    {item.role}
                  </p>
                  <p className="text-sm text-cyan">{item.org}</p>
                  <p className="font-mono-label mt-1 text-[0.65rem] text-muted">
                    {item.location}
                  </p>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16">
            <span className="font-mono-label text-xs text-muted">
              Education
            </span>
            <p className="mt-4 text-sm text-foreground">
              <span className="font-medium">BS Data Science</span>
              <span className="text-muted">
                {" "}
                — FAST, National University of Computer &amp; Emerging
                Sciences, Lahore
              </span>
            </p>
            <p className="font-mono-label mt-1 text-[0.65rem] text-muted">
              2023 — 2027
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
