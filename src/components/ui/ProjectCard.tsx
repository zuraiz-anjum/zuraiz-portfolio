"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/lib/projects";

const GRADIENTS = [
  "from-violet/30 via-background to-cyan/20",
  "from-cyan/25 via-background to-pink/20",
  "from-pink/25 via-background to-violet/25",
];

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: py * -8,
      rotateY: px * 8,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="hover"
      className="group block"
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border [transform-style:preserve-3d]"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} transition-transform duration-700 group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
        <span className="absolute left-6 top-6 font-mono-label text-xs text-muted">
          0{index + 1}
        </span>
        <span className="absolute right-6 top-6 font-mono-label text-xs text-muted">
          {project.year}
        </span>
        <div className="absolute inset-x-6 bottom-6">
          <span className="font-mono-label text-xs text-cyan">
            {project.category}
          </span>
          <h3 className="mt-2 text-2xl font-medium leading-tight text-foreground md:text-3xl">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
