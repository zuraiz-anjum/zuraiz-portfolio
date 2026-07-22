"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLenis } from "@/lib/lenisStore";
import { projects } from "@/lib/projects";
import { RESUME_MODAL_TOGGLE_EVENT } from "@/components/ui/ResumeViewer";

const HEADER_OFFSET = -88;

export const COMMAND_PALETTE_TOGGLE_EVENT = "command-palette:toggle";

type Command = {
  id: string;
  label: string;
  group: string;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const toggle = () => {
      setOpen((v) => {
        const next = !v;
        if (next) {
          setQuery("");
          setActiveIndex(0);
        }
        return next;
      });
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_TOGGLE_EVENT, toggle);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_TOGGLE_EVENT, toggle);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const goToSection = (id: string) => {
      const lenis = getLenis();
      if (pathname === "/" && lenis) {
        const target = document.getElementById(id);
        if (target) lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.4 });
      } else {
        router.push(`/#${id}`);
      }
    };

    const sectionCommands: Command[] = [
      { id: "sec-work", label: "Go to Work", group: "Section", run: () => goToSection("work") },
      { id: "sec-about", label: "Go to About", group: "Section", run: () => goToSection("about") },
      { id: "sec-process", label: "Go to Process", group: "Section", run: () => goToSection("process") },
      { id: "sec-contact", label: "Go to Contact", group: "Section", run: () => goToSection("contact") },
    ];

    const projectCommands: Command[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: `Open ${project.title}`,
      group: "Project",
      run: () => router.push(`/work/${project.slug}`),
    }));

    const linkCommands: Command[] = [
      {
        id: "link-resume",
        label: "View Resume",
        group: "Resume",
        run: () => window.dispatchEvent(new CustomEvent(RESUME_MODAL_TOGGLE_EVENT)),
      },
      {
        id: "link-email",
        label: "Email zuraizwork@gmail.com",
        group: "Connect",
        run: () => {
          window.location.href = "mailto:zuraizwork@gmail.com";
        },
      },
      {
        id: "link-github",
        label: "Open GitHub",
        group: "Connect",
        run: () => window.open("https://github.com/zuraiz-anjum", "_blank", "noopener,noreferrer"),
      },
      {
        id: "link-linkedin",
        label: "Open LinkedIn",
        group: "Connect",
        run: () =>
          window.open("https://www.linkedin.com/in/zuraiz-anjum/", "_blank", "noopener,noreferrer"),
      },
    ];

    return [...sectionCommands, ...projectCommands, ...linkCommands];
  }, [pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(q));
  }, [commands, query]);

  const activate = (cmd: Command) => {
    cmd.run();
    setOpen(false);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) activate(cmd);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-background/70 px-6 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background-raised shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <span className="font-mono-label text-xs text-muted">/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Jump to a section, project, or link..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          <span className="font-mono-label text-[0.6rem] text-muted">ESC</span>
        </div>
        <ul className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-5 py-6 text-center text-sm text-muted">No matches</li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.id}>
                <button
                  type="button"
                  data-cursor="hover"
                  onClick={() => activate(cmd)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm transition-colors ${
                    i === activeIndex
                      ? "bg-violet/15 text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span>{cmd.label}</span>
                  <span className="font-mono-label text-[0.6rem] text-muted">
                    {cmd.group}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
