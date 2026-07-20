"use client";

import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import Link from "next/link";
import BookPage from "./BookPage";
import { projects } from "@/lib/projects";
import "./book.css";

const TOOLCHAIN = [
  "Python",
  "TypeScript",
  "C++",
  "C#",
  "SQL",
  "LangChain",
  "LangGraph",
  "RAG",
  "PyTorch",
  "Scikit-learn",
  "TensorFlow",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "OpenAI SDK",
  "Anthropic SDK",
];

const EXPERIENCE = [
  { period: "Jul 2026 — Present", role: "RL Engineer", org: "Tensium" },
  { period: "Jul 2026 — Present", role: "Data Science Intern", org: "10Pearls" },
  { period: "Nov 2025 — Jun 2026", role: "Software Engineer", org: "Mercor" },
  { period: "Jan 2026 — Mar 2026", role: "AI/ML Intern", org: "Project19" },
];

const LEADERSHIP = [
  { role: "Aspire Leader", org: "Aspire Leaders Program — Founded at Harvard" },
  { role: "Logistics Head", org: "SOFTEC, FAST-NUCES" },
  { role: "Head of Management", org: "NUCES Media Group, FAST-NUCES" },
];

const PROCESS_STEPS = [
  { n: "01", t: "Explore", d: "Break the problem before solving it." },
  { n: "02", t: "Architect", d: "Design data flow and failure modes first." },
  { n: "03", t: "Build", d: "Production patterns from the first commit." },
  { n: "04", t: "Evaluate", d: "Tests and groundedness checks, always." },
  { n: "05", t: "Ship", d: "Deployed, monitored, iterated." },
];

function PageNumber({ n }: { n: number }) {
  return (
    <span className="font-mono-label absolute bottom-6 right-8 text-[0.6rem] text-muted">
      {String(n).padStart(2, "0")}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="font-mono-label text-[0.65rem] text-cyan">{children}</span>;
}

export default function Book() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center gap-6 overflow-hidden bg-background px-4 py-10">
      <Link
        href="/"
        className="font-mono-label self-start text-xs text-muted transition-colors hover:text-foreground sm:self-center"
      >
        ← Back to site
      </Link>

      <HTMLFlipBook
        width={380}
        height={560}
        size="stretch"
        minWidth={280}
        maxWidth={520}
        minHeight={420}
        maxHeight={760}
        startPage={0}
        drawShadow
        flippingTime={700}
        usePortrait
        startZIndex={10}
        autoSize
        maxShadowOpacity={0.5}
        showCover
        mobileScrollSupport
        clickEventForward
        useMouseEvents
        swipeDistance={30}
        showPageCorners
        disableFlipByClick={false}
        className="book-shadow"
        style={{}}
      >
        {/* Cover */}
        <BookPage cover>
          <div className="flex h-full flex-col justify-between">
            <span className="font-mono-label text-[0.65rem] text-muted">
              Portfolio — 2026
            </span>
            <div>
              <h1 className="text-4xl font-medium leading-[1.05] tracking-tight text-foreground">
                Zuraiz
                <br />
                Anjum
              </h1>
              <p className="font-mono-label mt-4 text-[0.65rem] text-violet">
                AI Engineer
              </p>
            </div>
          </div>
        </BookPage>

        {/* Intro */}
        <BookPage>
          <Eyebrow>Intro</Eyebrow>
          <h2 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-foreground">
            I build systems that think.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            AI Engineer building production-grade LLM systems, autonomous
            agents, and full-stack AI platforms — from fine-tuning to the
            plumbing that keeps it all running.
          </p>
          <div className="mt-auto grid grid-cols-3 gap-4">
            {[
              ["20", "Agents"],
              ["122", "Tests"],
              ["4", "LLM providers"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-lg font-medium text-foreground">{v}</p>
                <p className="font-mono-label text-[0.55rem] text-muted">{l}</p>
              </div>
            ))}
          </div>
          <PageNumber n={2} />
        </BookPage>

        {/* About + photo */}
        <BookPage>
          <Eyebrow>Who I am</Eyebrow>
          <div className="relative mt-4 aspect-square w-full max-w-[160px] overflow-hidden rounded-xl border border-border">
            <Image
              src="/about-photo.jpg"
              alt="Zuraiz Anjum"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            I&apos;m an AI Engineer with production experience across LLM
            systems, backend engineering, and applied ML. What holds it
            together is a habit of writing the tests before I trust the
            demo.
          </p>
          <PageNumber n={3} />
        </BookPage>

        {/* Toolchain */}
        <BookPage>
          <Eyebrow>Toolchain</Eyebrow>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOOLCHAIN.map((t) => (
              <span
                key={t}
                className="font-mono-label rounded-full border border-border px-2.5 py-1 text-[0.55rem] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <PageNumber n={4} />
        </BookPage>

        {/* Experience */}
        <BookPage>
          <Eyebrow>Experience</Eyebrow>
          <div className="mt-4 flex flex-col gap-4">
            {EXPERIENCE.map((e) => (
              <div key={e.role} className="border-b border-border pb-3">
                <p className="font-mono-label text-[0.55rem] text-muted">
                  {e.period}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {e.role}
                </p>
                <p className="text-xs text-cyan">{e.org}</p>
              </div>
            ))}
          </div>
          <PageNumber n={5} />
        </BookPage>

        {/* Leadership */}
        <BookPage>
          <Eyebrow>Leadership</Eyebrow>
          <div className="mt-4 flex flex-col gap-4">
            {LEADERSHIP.map((l) => (
              <div key={l.role}>
                <p className="text-sm font-medium text-foreground">{l.role}</p>
                <p className="text-xs text-pink">{l.org}</p>
              </div>
            ))}
          </div>
          <PageNumber n={6} />
        </BookPage>

        {/* Work intro */}
        <BookPage>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-foreground">
            Three systems. Built to survive real users.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Multi-agent research systems, full-stack AI products, and the
            applied ML research underneath them.
          </p>
          <PageNumber n={7} />
        </BookPage>

        {/* One page per project */}
        {projects.map((p, i) => (
          <BookPage key={p.slug}>
            <Eyebrow>{p.category}</Eyebrow>
            <h3 className="mt-3 text-lg font-medium leading-tight text-foreground">
              {p.title}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {p.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 5).map((s) => (
                <span
                  key={s}
                  className="font-mono-label rounded-full border border-border px-2 py-0.5 text-[0.5rem] text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
            <PageNumber n={8 + i} />
          </BookPage>
        ))}

        {/* Process */}
        <BookPage>
          <Eyebrow>How I work</Eyebrow>
          <div className="mt-4 flex flex-col gap-3">
            {PROCESS_STEPS.map((s) => (
              <div key={s.n} className="flex gap-3">
                <span className="font-mono text-sm text-violet/60">{s.n}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{s.t}</p>
                  <p className="text-xs text-muted">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <PageNumber n={11} />
        </BookPage>

        {/* Back cover / contact */}
        <BookPage cover>
          <div className="flex h-full flex-col justify-between">
            <span className="font-mono-label text-[0.65rem] text-muted">
              Get in touch
            </span>
            <div>
              <h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground">
                Have a system worth building?
              </h2>
              <p className="mt-4 text-sm text-violet">zuraizwork@gmail.com</p>
              <p className="font-mono-label mt-6 text-[0.6rem] text-muted">
                github.com/zuraiz-anjum
                <br />
                linkedin.com/in/zuraiz-anjum
              </p>
            </div>
          </div>
        </BookPage>
      </HTMLFlipBook>
    </div>
  );
}
