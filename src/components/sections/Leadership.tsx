import Reveal from "@/components/ui/Reveal";
import ScrambleLink from "@/components/ui/ScrambleLink";
import ProofLink from "@/components/ui/ProofLink";

type LeadershipItem = {
  role: string;
  org: string;
  href?: string;
  context: string;
  period?: string;
  detail: string;
  proof?: string;
  timeline?: { role: string; period: string }[];
};

const LEADERSHIP: LeadershipItem[] = [
  {
    role: "Aspire Leader",
    org: "Aspire Leaders Program",
    href: "https://www.aspireleaders.org/program/aspire-leaders-program/",
    context: "Founded at Harvard",
    period: "Jul 22 — Sep 20, 2026",
    detail:
      "A nine-week leadership program with a curriculum designed and taught by Harvard faculty, selected from a global cohort spanning 195 countries.",
    proof: "/proof/aspire-leaders-program.png",
  },
  {
    role: "Event Coordinator",
    org: "SOFTEC",
    href: "https://softecnu.org/",
    context: "FAST-NUCES · Executive Committee",
    period: "Jul 2026 — Present",
    detail:
      "Sits on SOFTEC's executive committee (EXE) with authority over the festival's execution end to end — effectively the acting president during SOFTEC, owning decisions that used to route through logistics.",
    timeline: [
      { role: "Deputy Decor & Logistics", period: "Aug 2024 — Jul 2025" },
      { role: "Head of Logistics", period: "Aug 2025 — Jun 2026" },
      { role: "Event Coordinator", period: "Jul 2026 — Present" },
    ],
  },
  {
    role: "SVP (Senior Vice President)",
    org: "NUCES Media Group",
    href: "https://www.instagram.com/nucesmediagroup/?hl=en",
    context: "FAST-NUCES",
    period: "Jul 2026 — Present",
    detail:
      "Manages the university's media wing — coordinating a team covering campus events, content strategy, and the photo/video output published across the group's social channels.",
    timeline: [
      { role: "Logistic Deputy", period: "Aug 2024 — Jun 2025" },
      { role: "Head of Management", period: "Jul 2025 — Jun 2026" },
      { role: "SVP (Senior Vice President)", period: "Jul 2026 — Present" },
    ],
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono-label text-xs text-muted">Leadership</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Outside the codebase.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((item, i) => (
            <Reveal key={item.role} delay={0.05 * i}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-background-raised/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-violet/40 hover:bg-background-raised/80 hover:shadow-[0_0_40px_-15px_rgba(167,139,250,0.35)]">
                <span className="font-mono-label text-xs text-pink">
                  {item.context}
                </span>
                <h3 className="mt-4 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-violet">
                  {item.role}
                </h3>
                {item.href ? (
                  <ScrambleLink
                    href={item.href}
                    className="inline-block w-fit text-sm text-cyan hover:text-violet"
                  >
                    {item.org}
                  </ScrambleLink>
                ) : (
                  <p className="text-sm text-cyan">{item.org}</p>
                )}
                {item.period ? (
                  <p className="font-mono-label mt-1 text-[0.65rem] text-muted">
                    {item.period}
                  </p>
                ) : null}
                {item.detail ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                ) : null}
                {item.timeline ? (
                  <ol className="mt-5 flex flex-col gap-2 border-l border-border pl-4">
                    {item.timeline.map((step, idx) => {
                      const isCurrent = idx === item.timeline!.length - 1;
                      return (
                        <li key={step.role} className="relative">
                          <span
                            className={`absolute -left-[1.32rem] top-1.5 h-1.5 w-1.5 rounded-full ${
                              isCurrent ? "bg-violet" : "bg-border"
                            }`}
                          />
                          <p
                            className={`text-xs ${
                              isCurrent
                                ? "font-medium text-foreground"
                                : "text-muted"
                            }`}
                          >
                            {step.role}
                          </p>
                          <p className="font-mono-label text-[0.55rem] text-muted">
                            {step.period}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
                <ProofLink href={item.proof} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
