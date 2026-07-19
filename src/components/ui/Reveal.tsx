"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span";
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

export default function Reveal({
  children,
  className,
  as = "div",
  y = 40,
  delay = 0,
  duration = 1,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [y, delay, duration, start]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
