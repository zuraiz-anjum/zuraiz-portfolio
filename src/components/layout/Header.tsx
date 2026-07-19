"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScrambleLink from "@/components/ui/ScrambleLink";
import LiveClock from "./LiveClock";
import { getLenis } from "@/lib/lenisStore";

const HEADER_OFFSET = -88;

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (pathname !== "/") return; // let Next.js navigate to "/" then land on hash
    const id = href.replace("/#", "");
    const target = document.getElementById(id);
    const lenis = getLenis();
    if (!target || !lenis) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.4 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/60 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-mono-label text-sm text-foreground"
          data-cursor="hover"
        >
          Zuraiz Anjum
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <ScrambleLink
              key={link.href}
              href={link.href}
              onClick={handleNavClick(link.href)}
              className="font-mono-label text-xs text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </ScrambleLink>
          ))}
          <LiveClock className="font-mono-label text-xs text-muted" />
          <a
            href="mailto:zuraizwork@gmail.com"
            data-cursor="hover"
            className="rounded-full border border-border px-4 py-2 font-mono-label text-xs text-foreground transition-colors hover:border-violet hover:text-violet"
          >
            Say Hello
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          data-cursor="hover"
          aria-label="Toggle menu"
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleNavClick(link.href)}
            className="font-mono-label text-lg text-foreground"
          >
            {link.label}
          </Link>
        ))}
        <a
          href="mailto:zuraizwork@gmail.com"
          onClick={() => setOpen(false)}
          className="mt-4 rounded-full border border-border px-6 py-3 font-mono-label text-sm text-foreground"
        >
          Say Hello
        </a>
      </div>
    </header>
  );
}
