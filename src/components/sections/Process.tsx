"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Explore",
    detail:
      "I start by trying to break the problem, not solve it. What's the actual failure mode a user will hit — and what does the data really look like?",
  },
  {
    number: "02",
    title: "Architect",
    detail:
      "Data flow, agent boundaries, and failure modes get designed before a single prompt is written. The architecture decides what's easy to fix later.",
  },
  {
    number: "03",
    title: "Build",
    detail:
      "Typed APIs, structured logging, and production patterns from the first commit — not bolted on after the demo works.",
  },
  {
    number: "04",
    title: "Evaluate",
    detail:
      "Automated tests and groundedness checks catch regressions before a user does. If it isn't tested, it isn't done.",
  },
  {
    number: "05",
    title: "Ship",
    detail:
      "Docker, CI, and observability. Deployed, monitored, and iterated on — not just demoed once and forgotten.",
  },
];

function wrapWords(el: HTMLElement) {
  const text = el.textContent?.trim() ?? "";
  el.innerHTML = text
    .split(/\s+/)
    .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block will-change-transform">${word}</span></span>`)
    .join(" ");
}

export default function Process() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const stage = stageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const titles = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-step-title]")
      );
      const numbers = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-step-number]")
      );
      const details = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-step-detail]")
      );

      titles.forEach(wrapWords);

      gsap.set(titles.slice(1), { autoAlpha: 0 });
      gsap.set(numbers.slice(1), { autoAlpha: 0 });
      gsap.set(details.slice(1), { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({ paused: true });
      tl.to({}, { duration: 0.4 });

      titles.forEach((title, step) => {
        const nextTitle = titles[step + 1];
        if (!nextTitle) return;

        const words = title.querySelectorAll("span > span");
        const nextWords = nextTitle.querySelectorAll("span > span");

        tl.to(words, { y: "-110%", stagger: 0.05, duration: 0.7, ease: "power4.in" });
        tl.set(title, { autoAlpha: 0 }, "<+=0.6");
        tl.set(nextTitle, { autoAlpha: 1 }, "<");
        tl.fromTo(
          nextWords,
          { y: "110%" },
          { y: "0%", stagger: 0.05, duration: 0.7, ease: "power4.out" },
          "<"
        );

        if (numbers[step] && numbers[step + 1]) {
          tl.to(numbers[step], { autoAlpha: 0, duration: 0.3 }, "<");
          tl.to(numbers[step + 1], { autoAlpha: 1, duration: 0.3 }, "<");
        }

        if (details[step] && details[step + 1]) {
          tl.to(details[step], { autoAlpha: 0, y: -12, duration: 0.3 }, "<");
          tl.to(
            details[step + 1],
            { autoAlpha: 1, y: 0, duration: 0.4 },
            "<+=0.1"
          );
        }

        tl.to({}, { duration: 0.5 });
      });

      const st = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => tl.progress(self.progress),
      });

      return () => {
        st.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" className="relative">
      <div className="px-6 pt-28 md:px-10 md:pt-40">
        <Reveal>
          <span className="font-mono-label text-xs text-muted">How I work</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Five steps between an idea and something that survives production.
          </h2>
        </Reveal>
      </div>

      {/* Desktop: pinned scroll-linked narrative */}
      <div ref={stageRef} className="relative mt-16 hidden h-screen overflow-hidden px-6 md:block md:px-10">
        <div className="flex h-full items-center">
          <div className="grid w-full grid-cols-[auto_1fr] items-center gap-16">
            <div className="relative h-24 w-40">
              {STEPS.map((step) => (
                <span
                  key={step.number}
                  data-step-number
                  className="absolute inset-0 font-mono text-7xl text-violet/40"
                >
                  {step.number}
                </span>
              ))}
            </div>
            <div>
              <div className="relative h-[8.5rem]">
                {STEPS.map((step) => (
                  <h3
                    key={step.title}
                    data-step-title
                    className="absolute left-0 top-0 text-5xl font-medium tracking-tight text-foreground lg:text-6xl"
                  >
                    {step.title}
                  </h3>
                ))}
              </div>
              <div className="relative mt-6 h-16 max-w-xl">
                {STEPS.map((step) => (
                  <p
                    key={step.detail}
                    data-step-detail
                    className="absolute left-0 top-0 text-base leading-relaxed text-muted"
                  >
                    {step.detail}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: static stacked list */}
      <div className="mt-16 flex flex-col divide-y divide-border border-t border-border px-6 md:hidden">
        {STEPS.map((step) => (
          <Reveal key={step.number} className="py-8">
            <span className="font-mono text-3xl text-violet/60">
              {step.number}
            </span>
            <h3 className="mt-3 text-2xl font-medium text-foreground">
              {step.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              {step.detail}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
