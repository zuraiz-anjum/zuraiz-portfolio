import Reveal from "@/components/ui/Reveal";
import ScrambleLink from "@/components/ui/ScrambleLink";
import ProofLink from "@/components/ui/ProofLink";

type Role = {
  period: string;
  role: string;
  org: string;
  href: string;
  domain: string;
  location: string;
  detail: string;
  proof?: string;
};

const ROLES: Role[] = [
  {
    period: "Jul 2026 — Present",
    role: "RL Engineer",
    org: "Tensium",
    href: "https://www.tensium.co.uk/",
    domain: "tensium.co.uk",
    location: "Remote",
    detail:
      "Building and evaluating reinforcement learning environments and reward signals used to train and stress-test frontier AI models, alongside a research team spanning software, legal reasoning, and consulting domains.",
  },
  {
    period: "Jul 2026 — Present",
    role: "Data Science Intern",
    org: "10Pearls",
    href: "https://www.10pearls.com",
    domain: "10pearls.com",
    location: "Internship",
    detail:
      "Supporting applied data science and AI engagements for enterprise clients on a global product-engineering team — data pipelines, model prototyping, and analysis work.",
    proof: "/proof/10pearls-candidate-portal.png",
  },
  {
    period: "Nov 2025 — Jun 2026",
    role: "Software Engineer",
    org: "Mercor",
    href: "https://mercor.com",
    domain: "mercor.com",
    location: "Contract · Remote",
    detail:
      "Designed and optimized database schemas, APIs, and backend services for AI model integration into ML applications on a global engineering team. Ran model evaluation on accuracy, performance, and reliability, using coding agents to speed up code generation and testing.",
  },
  {
    period: "Jun 5 — Aug 5, 2025",
    role: "AI/ML Intern",
    org: "Project19",
    href: "https://theproject19.com",
    domain: "theproject19.com",
    location: "Remote · US-based",
    detail:
      "Fine-tuned and evaluated LLMs for applied use cases. Built and tested agentic workflows automating multi-step tasks alongside a remote engineering team on production-facing AI features.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20 md:px-10 md:py-28">
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
                  <p className="mt-2 text-xl font-bold text-foreground md:text-2xl">
                    {item.role}
                  </p>
                  <ScrambleLink
                    href={item.href}
                    data-cursor="hover"
                    data-cursor-label="Visit"
                    className="inline-block text-sm text-cyan hover:text-violet"
                  >
                    {item.org}
                  </ScrambleLink>
                  <p className="font-mono-label mt-1 text-[0.65rem] text-muted">
                    {item.location} · {item.domain}
                  </p>
                </div>
                <div>
                  <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
                    {item.detail}
                  </p>
                  <ProofLink href={item.proof} />
                </div>
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
