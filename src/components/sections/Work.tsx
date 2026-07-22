import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";

export default function Work() {
  const [flagship, ...rest] = projects;

  return (
    <section id="work" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div
        className="ambient-glow ambient-glow-pink top-1/2 -translate-y-1/2"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="font-mono-label text-xs text-muted">
                Selected work
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Four systems. Built to survive real users.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted">
              Multi-agent research systems, full-stack AI products, and the
              applied ML research underneath them.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          <Reveal>
            <ProjectCard
              project={flagship}
              index={0}
              sizes="(min-width: 1024px) 1152px, 100vw"
            />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={0.05 * (i + 1)}>
                <ProjectCard project={project} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
