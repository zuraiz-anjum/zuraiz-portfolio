"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { registerGsap, SplitText } from "@/lib/gsap";
import LiveClock from "@/components/layout/LiveClock";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

const STATS = [
  { value: "26", label: "Agents in one pipeline" },
  { value: "123", label: "Automated tests shipped" },
  { value: "4", label: "LLM providers, zero downtime" },
];

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

    const ctx = gsapInstance.context(() => {
      gsapInstance.set(split.words, { y: "110%" });
      gsapInstance
        .timeline({ delay: 0.3 })
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

    return () => {
      ctx.revert();
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
      </div>

      <div className="relative z-10 flex items-center justify-between pb-6" data-hero-fade>
        <span className="font-mono-label text-xs text-muted">
          AI Engineer — Systems That Ship
        </span>
        <LiveClock className="font-mono-label hidden text-xs text-muted sm:inline" />
      </div>

      <h1
        ref={headlineRef}
        className="relative z-10 max-w-5xl text-[13vw] font-medium leading-[0.95] tracking-tight text-foreground sm:text-[9vw] md:text-[6.5vw]"
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
              <dt className="text-2xl font-medium text-foreground md:text-3xl">
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
