"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap } from "@/lib/gsap";
import Magnetic from "@/components/ui/Magnetic";

export default function SectionDivider() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const gsapInstance = registerGsap();
    const root = rootRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!root || !left || !right) return;

    const ctx = gsapInstance.context(() => {
      gsapInstance.set([left, right], { scaleX: 0 });
      gsapInstance.to([left, right], {
        scaleX: 1,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="px-6 py-3 md:px-10 md:py-4" aria-hidden>
      <div className="mx-auto flex max-w-6xl items-center gap-4 md:gap-6">
        <span
          ref={leftRef}
          className="h-px flex-1 origin-right bg-gradient-to-r from-transparent via-border to-border"
        />
        <Magnetic strength={0.5}>
          <span
            data-cursor="hover"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative flex h-24 w-24 shrink-0 items-center justify-center md:h-32 md:w-32"
          >
            <span className="motion-safe:animate-ping absolute h-full w-full rounded-full border border-violet/30 [animation-duration:2.8s]" />
            <span className="motion-safe:animate-ping absolute h-[68%] w-[68%] rounded-full border border-cyan/20 [animation-delay:0.9s] [animation-duration:2.8s]" />
            <span
              style={{ animationDuration: hovered ? "2.2s" : "9s" }}
              className="motion-safe:animate-spin absolute inset-2 rounded-full border border-dashed border-border/70 transition-colors duration-500 group-hover:border-violet/70"
            />
            <span
              style={{ animationDuration: hovered ? "1.6s" : "6s" }}
              className="motion-safe:animate-spin absolute inset-6 rounded-full border border-dotted border-border/50 [animation-direction:reverse] transition-colors duration-500 group-hover:border-cyan/70"
            />
            <span className="divider-dot relative h-3 w-3 rounded-full transition-transform duration-500 ease-out group-hover:scale-[1.8]" />
          </span>
        </Magnetic>
        <span
          ref={rightRef}
          className="h-px flex-1 origin-left bg-gradient-to-l from-transparent via-border to-border"
        />
      </div>
    </div>
  );
}
