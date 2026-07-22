import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import ScrambleLink from "@/components/ui/ScrambleLink";
import { getProject, projects } from "@/lib/projects";

const GRADIENTS = [
  "from-violet/30 via-background to-cyan/20",
  "from-cyan/25 via-background to-pink/20",
  "from-pink/25 via-background to-violet/25",
];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Zuraiz Anjum`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="px-6 pb-28 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Link
            href="/#work"
            data-cursor="hover"
            className="font-mono-label text-xs text-muted transition-colors hover:text-foreground"
          >
            ← All work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <span className="mt-8 block font-mono-label text-xs text-cyan">
            {project.category} · {project.year}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-6">
            <div>
              <span className="font-mono-label text-xs text-muted">Role</span>
              <p className="mt-1 max-w-xs text-sm text-foreground">
                {project.role}
              </p>
            </div>
            <div>
              <span className="font-mono-label text-xs text-muted">
                Client
              </span>
              <p className="mt-1 text-sm text-foreground">{project.client}</p>
            </div>
            {project.liveUrl ? (
              <div>
                <span className="font-mono-label text-xs text-muted">
                  Live
                </span>
                <p className="mt-1 text-sm">
                  <ScrambleLink
                    href={project.liveUrl}
                    className="text-foreground hover:text-violet"
                  >
                    View demo ↗
                  </ScrambleLink>
                </p>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {project.cover ? (
            <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 896px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div
              className={`mt-14 aspect-[16/9] rounded-2xl border border-border bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
            />
          )}
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono-label rounded-full border border-border px-3 py-1 text-[0.65rem] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <span className="font-mono-label text-xs text-muted">
              Overview
            </span>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              {project.overview}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="font-mono-label text-xs text-muted">
              The challenge
            </span>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {project.challenge}
            </p>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <span className="font-mono-label text-xs text-muted">
              Approach
            </span>
          </Reveal>
          <ul className="mt-6 flex flex-col divide-y divide-border border-t border-border">
            {project.approach.map((item, i) => (
              <Reveal key={item} delay={0.03 * i}>
                <li className="flex gap-6 py-5">
                  <span className="font-mono text-sm text-violet/60">
                    0{i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground md:text-base">
                    {item}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <span className="font-mono-label text-xs text-muted">
              Result
            </span>
          </Reveal>
          <div>
            <ul className="flex flex-col gap-4">
              {project.result.map((item, i) => (
                <Reveal key={item} delay={0.03 * i}>
                  <li className="text-sm leading-relaxed text-foreground md:text-base">
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8">
              {project.metrics.map((metric, i) => (
                <Reveal key={metric.label} delay={0.03 * i}>
                  <p className="text-2xl font-medium text-foreground md:text-3xl">
                    {metric.value}
                  </p>
                  <p className="font-mono-label mt-1 text-[0.6rem] text-muted">
                    {metric.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal>
          <div className="mt-28 border-t border-border pt-10">
            <span className="font-mono-label text-xs text-muted">
              Next project
            </span>
            <Link
              href={`/work/${next.slug}`}
              data-cursor="hover"
              className="mt-4 block text-2xl font-medium text-foreground transition-colors hover:text-violet md:text-3xl"
            >
              {next.title} →
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
