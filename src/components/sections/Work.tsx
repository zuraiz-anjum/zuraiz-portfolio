import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";

export default function Work() {
  return (
    <section id="work" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="font-mono-label text-xs text-muted">
                Selected work
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-xl text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Three systems. Built to survive real users.
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

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={i === 0 ? "md:col-span-2" : undefined}
            >
              <Reveal delay={0.05 * i}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
