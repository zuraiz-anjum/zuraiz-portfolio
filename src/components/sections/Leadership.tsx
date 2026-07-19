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
  },
  {
    role: "Logistics Head",
    org: "SOFTEC",
    context: "FAST-NUCES",
    detail: "Large-scale student-run tech festival.",
  },
  {
    role: "Head of Management",
    org: "NUCES Media Group",
    context: "FAST-NUCES",
    detail: "",
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono-label text-xs text-muted">Leadership</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Outside the codebase.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((item, i) => (
            <Reveal key={item.role} delay={0.05 * i}>
              <div className="flex h-full flex-col rounded-2xl border border-border p-8">
                <span className="font-mono-label text-xs text-pink">
                  {item.context}
                </span>
                <h3 className="mt-4 text-xl font-medium text-foreground">
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
                <ProofLink href={item.proof} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
