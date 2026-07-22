"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Magnetic({
  children,
  className,
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const quickRef = useRef<{
    x: (v: number) => void;
    y: (v: number) => void;
  } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    quickRef.current = {
      x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" }),
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !quickRef.current) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    quickRef.current.x(relX * strength);
    quickRef.current.y(relY * strength);
  };

  const onMouseLeave = () => {
    quickRef.current?.x(0);
    quickRef.current?.y(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block will-change-transform ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
