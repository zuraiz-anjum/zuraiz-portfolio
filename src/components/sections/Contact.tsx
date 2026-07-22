"use client";

import Reveal from "@/components/ui/Reveal";
import ScrambleLink from "@/components/ui/ScrambleLink";
import Magnetic from "@/components/ui/Magnetic";
import { RESUME_MODAL_TOGGLE_EVENT } from "@/components/ui/ResumeViewer";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div
        className="ambient-glow ambient-glow-pink top-1/2 -translate-y-1/2"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono-label text-xs text-muted">
            Get in touch
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Have a system worth building?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Magnetic strength={0.25} className="mt-10">
            <ScrambleLink
              href="mailto:zuraizwork@gmail.com"
              data-cursor="hover"
              data-cursor-label="Email"
              className="inline-block text-3xl font-bold text-foreground underline decoration-border underline-offset-8 transition-colors hover:text-violet hover:decoration-violet sm:text-4xl md:text-5xl"
            >
              zuraizwork@gmail.com
            </ScrambleLink>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <span className="font-mono-label text-xs text-muted">
                Based in
              </span>
              <p className="mt-2 text-sm text-foreground">Lahore, Pakistan</p>
            </div>
            <div>
              <span className="font-mono-label text-xs text-muted">
                Resume
              </span>
              <div className="mt-2">
                <Magnetic strength={0.35} className="inline-block">
                  <button
                    type="button"
                    data-cursor="hover"
                    data-cursor-label="View"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent(RESUME_MODAL_TOGGLE_EVENT))
                    }
                    className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-foreground transition-all duration-300 hover:border-violet hover:text-violet hover:shadow-[0_0_20px_-8px_rgba(167,139,250,0.7)]"
                  >
                    View Resume
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </button>
                </Magnetic>
              </div>
            </div>
            <div>
              <span className="font-mono-label text-xs text-muted">
                GitHub
              </span>
              <p className="mt-2">
                <ScrambleLink
                  href="https://github.com/zuraiz-anjum"
                  data-cursor="hover"
                  data-cursor-label="Visit"
                  className="text-sm text-foreground hover:text-violet"
                >
                  github.com/zuraiz-anjum
                </ScrambleLink>
              </p>
            </div>
            <div>
              <span className="font-mono-label text-xs text-muted">
                LinkedIn
              </span>
              <p className="mt-2">
                <ScrambleLink
                  href="https://www.linkedin.com/in/zuraiz-anjum/"
                  data-cursor="hover"
                  data-cursor-label="Visit"
                  className="text-sm text-foreground hover:text-violet"
                >
                  linkedin.com/in/zuraiz-anjum
                </ScrambleLink>
              </p>
            </div>
            <div>
              <span className="font-mono-label text-xs text-muted">
                Currently
              </span>
              <p className="mt-2 text-sm text-foreground">
                Open to AI engineering roles &amp; collaborations
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
