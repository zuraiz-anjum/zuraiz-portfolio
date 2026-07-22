"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/lib/projects";
import { projectGradient } from "@/lib/theme";

export default function ProjectCard({
  project,
  index,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  project: Project;
  index: number;
  sizes?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<{
    x: (v: number) => void;
    y: (v: number) => void;
  } | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.set(card, { transformPerspective: 900 });
    quickRef.current = {
      x: gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" }),
      y: gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" }),
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || !quickRef.current) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quickRef.current.x(px * 8);
    quickRef.current.y(py * -8);
  };

  const onMouseLeave = () => {
    quickRef.current?.x(0);
    quickRef.current?.y(0);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="hover"
      data-cursor-label="View"
      className="group block"
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border [transform-style:preserve-3d]"
      >
        {project.cover ? (
          <>
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          </>
        ) : (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${projectGradient(index)} transition-transform duration-700 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
          </>
        )}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        <span className="absolute left-6 top-6 font-mono-label text-xs text-muted">
          0{index + 1}
        </span>
        <span className="absolute right-6 top-6 flex items-center gap-2 font-mono-label text-xs text-muted">
          {project.liveUrl ? (
            <span className="flex items-center gap-1.5 text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Live
            </span>
          ) : null}
          {project.year}
        </span>
        <div className="absolute inset-x-6 bottom-6">
          <span className="font-mono-label text-xs text-cyan">
            {project.category}
          </span>
          <h3 className="mt-2 text-2xl font-bold leading-tight text-foreground md:text-4xl">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
