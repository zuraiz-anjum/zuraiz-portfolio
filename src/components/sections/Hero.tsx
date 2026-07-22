"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { registerGsap, SplitText } from "@/lib/gsap";
import LiveClock from "@/components/layout/LiveClock";
import { INTRO_COMPLETE_EVENT } from "@/components/ui/Intro";
import { projects } from "@/lib/projects";
import { projectGradient } from "@/lib/theme";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

const STATS = [
  { value: "3", label: "Production systems shipped" },
  { value: "4", label: "Teams collaborated with" },
  { value: "20+", label: "Tools in active use" },
];

function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % projects.length);
        setVisible(true);
      }, 350);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const project = projects[index];

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="hover"
      data-cursor-label="View"
      data-hero-fade
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      className="absolute right-6 top-28 z-10 hidden w-80 overflow-hidden rounded-2xl border border-violet/30 shadow-[0_0_70px_-20px_rgba(167,139,250,0.5)] xl:block xl:w-[26rem]"
    >
      <div
        className={`relative aspect-[4/3] transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${projectGradient(index)}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
        <span className="font-mono-label absolute left-5 top-5 text-xs text-muted">
          Recent work
        </span>
        <div className="absolute inset-x-5 bottom-5">
          <span className="font-mono-label text-xs text-cyan">
            {project.category}
          </span>
          <p className="mt-1.5 text-xl font-semibold leading-tight text-foreground">
            {project.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

function ScrollCue() {
  return (
    <div
      data-hero-fade
      className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
    >
      <span className="font-mono-label text-[0.65rem] text-muted">Scroll</span>
      <span className="h-8 w-px animate-bounce bg-gradient-to-b from-violet to-transparent" />
    </div>
  );
}

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsapInstance = registerGsap();
    if (!headlineRef.current) return;

    const split = new SplitText(headlineRef.current, {
      type: "lines,words",
      linesClass: "overflow-hidden",
    });

    let started = false;
    let ctx: ReturnType<typeof gsapInstance.context> | undefined;

    const play = () => {
      if (started) return;
      started = true;
      ctx = gsapInstance.context(() => {
        gsapInstance.set(split.words, { y: "110%" });
        gsapInstance
          .timeline({ delay: 0.1 })
          .to(split.words, {
            y: "0%",
            duration: 1.1,
            stagger: 0.06,
            ease: "expo.out",
          })
          .from(
            "[data-hero-fade]",
            { opacity: 0, y: 16, duration: 0.8, stagger: 0.1, ease: "power2.out" },
            "-=0.6"
          );
      }, rootRef);
    };

    window.addEventListener(INTRO_COMPLETE_EVENT, play);
    const fallback = setTimeout(play, 2400);

    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, play);
      clearTimeout(fallback);
      ctx?.revert();
      split.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-14 md:px-10 md:pb-16"
    >
      <div className="absolute inset-0">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/55" />
      </div>

      <HeroShowcase />
      <ScrollCue />

      <div className="relative z-10 flex items-center justify-between pb-6" data-hero-fade>
        <span className="font-mono-label text-xs text-muted">
          AI Engineer — Systems That Ship
        </span>
        <LiveClock className="font-mono-label hidden text-xs text-muted sm:inline" />
      </div>

      <h1
        ref={headlineRef}
        className="relative z-10 max-w-5xl text-[13vw] font-bold leading-[0.95] tracking-tight text-foreground sm:text-[9vw] md:text-[6.5vw]"
      >
        I build systems that think.
      </h1>

      <div
        className="relative z-10 mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        data-hero-fade
      >
        <p className="max-w-md text-sm text-muted md:text-base">
          AI Engineer building production-grade LLM systems, autonomous
          agents, and full-stack AI platforms — from fine-tuning to the
          unglamorous plumbing that keeps it all running.
        </p>

        <dl className="flex gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="text-2xl font-bold text-foreground md:text-4xl">
                {stat.value}
              </dt>
              <dd className="font-mono-label mt-1 max-w-[9rem] text-[0.65rem] text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
