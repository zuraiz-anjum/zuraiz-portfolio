"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/gsap";

const CHARS = "!<>-_\\/[]{}—=+*^?#";

export default function ScrambleLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    registerGsap();
    if (!ref.current) return;
    gsap.to(ref.current, {
      duration: 0.6,
      scrambleText: { text: children, chars: CHARS, speed: 0.6 },
      overwrite: true,
    });
  };

  return (
    <Link href={href} className={className} onMouseEnter={onEnter} onClick={onClick}>
      <span ref={ref}>{children}</span>
    </Link>
  );
}
