import Reveal from "@/components/ui/Reveal";

const LEADERSHIP = [
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {LEADERSHIP.map((item, i) => (
            <Reveal key={item.role} delay={0.05 * i}>
              <div className="rounded-2xl border border-border p-8">
                <span className="font-mono-label text-xs text-pink">
                  {item.context}
                </span>
                <h3 className="mt-4 text-xl font-medium text-foreground">
                  {item.role}
                </h3>
                <p className="text-sm text-cyan">{item.org}</p>
                {item.detail ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
