"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const HOVERABLE_SELECTOR = "a, button, [data-cursor='hover']";

// A trailing accent ring layered on top of the native cursor (never a
// replacement for it) — the real OS cursor is always visible as a
// guaranteed fallback, so there's no code path where the user has no
// visible cursor at all.
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    gsap.set(ring, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    let shown = false;
    const onMove = (e: MouseEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(ring, { autoAlpha: 1, duration: 0.3 });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onOver = (e: MouseEvent) => {
      const hoverTarget = (e.target as Element)?.closest?.(HOVERABLE_SELECTOR);
      if (hoverTarget) {
        ring.setAttribute("data-hover", "true");
        const labelText = hoverTarget.getAttribute("data-cursor-label");
        if (labelText) {
          label.textContent = labelText;
          gsap.to(label, { autoAlpha: 1, duration: 0.25 });
        }
      }
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest?.(HOVERABLE_SELECTOR)) {
        ring.setAttribute("data-hover", "false");
        gsap.to(label, { autoAlpha: 0, duration: 0.15 });
      }
    };
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    const onLeaveWindow = () => gsap.to(ring, { autoAlpha: 0, duration: 0.2 });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden>
      <div
        ref={ringRef}
        data-hover="false"
        className="fixed left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-violet/50 transition-[width,height] duration-200 data-[hover=true]:h-12 data-[hover=true]:w-12 data-[hover=true]:border-violet"
      >
        <span
          ref={labelRef}
          className="font-mono-label pointer-events-none whitespace-nowrap text-[0.6rem] tracking-wide text-foreground opacity-0"
        />
      </div>
    </div>
  );
}
