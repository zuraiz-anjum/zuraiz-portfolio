"use client";

import { useEffect, useRef } from "react";
import { registerGsap, SplitText } from "@/lib/gsap";

export const INTRO_COMPLETE_EVENT = "intro:complete";

export default function Intro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const name = nameRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    const content = contentRef.current;
    if (!overlay || !name || !counter || !bar || !content) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const release = () => {
      document.documentElement.style.overflow = prevOverflow;
      overlay.style.display = "none";
      window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const t = setTimeout(release, 50);
      return () => clearTimeout(t);
    }

    const gsapInstance = registerGsap();
    const split = new SplitText(name, { type: "chars" });
    const counterProxy = { value: 0 };

    gsapInstance.set(split.chars, { y: "110%" });
    gsapInstance.set(bar, { scaleX: 0, transformOrigin: "left center" });

    const tl = gsapInstance.timeline();

    tl.to(split.chars, {
      y: "0%",
      duration: 0.8,
      stagger: 0.02,
      ease: "expo.out",
    })
      .to(
        counterProxy,
        {
          value: 100,
          duration: 1.1,
          ease: "power1.inOut",
          onUpdate: () => {
            counter.textContent = String(
              Math.round(counterProxy.value)
            ).padStart(3, "0");
          },
        },
        "<"
      )
      .to(bar, { scaleX: 1, duration: 1.1, ease: "power1.inOut" }, "<")
      .to(content, { autoAlpha: 0, duration: 0.3 }, "+=0.1")
      .call(release)
      .to(overlay, { yPercent: -100, duration: 0.9, ease: "swift" }, "<");

    return () => {
      tl.kill();
      split.revert();
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background"
      aria-hidden
    >
      <div ref={contentRef} className="flex flex-col items-center gap-8">
        <div
          ref={nameRef}
          className="overflow-hidden text-[10vw] font-medium leading-none tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Zuraiz Anjum
        </div>
        <div className="flex w-48 flex-col items-center gap-3 sm:w-64">
          <div className="h-px w-full overflow-hidden bg-border">
            <div ref={barRef} className="h-full w-full bg-violet" />
          </div>
          <span
            ref={counterRef}
            className="font-mono-label text-xs text-muted"
          >
            000
          </span>
        </div>
      </div>
    </div>
  );
}
