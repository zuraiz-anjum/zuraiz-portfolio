"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

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
    window.addEventListener("mousemove", onMove);

    const hoverables = "a, button, [data-cursor='hover']";
    const onEnter = () => ring.setAttribute("data-hover", "true");
    const onLeave = () => ring.setAttribute("data-hover", "false");

    const attach = () => {
      document.querySelectorAll(hoverables).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden md:block" aria-hidden>
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
