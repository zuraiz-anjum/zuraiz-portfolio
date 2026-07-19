"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const HOVERABLE_SELECTOR = "a, button, [data-cursor='hover']";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Event delegation instead of per-element listeners: works for any
    // element added/removed later (SplitText, ScrollTrigger pin-spacers,
    // etc.) with exactly one listener pair, ever.
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(HOVERABLE_SELECTOR)) {
        ring.setAttribute("data-hover", "true");
      }
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest?.(HOVERABLE_SELECTOR)) {
        ring.setAttribute("data-hover", "false");
      }
    };
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden>
      <div
        ref={ringRef}
        data-hover="false"
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-foreground/40 transition-[width,height,opacity] duration-200 data-[hover=true]:h-12 data-[hover=true]:w-12 data-[hover=true]:border-violet"
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-foreground"
      />
    </div>
  );
}
