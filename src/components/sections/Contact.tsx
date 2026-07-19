import Reveal from "@/components/ui/Reveal";
import ScrambleLink from "@/components/ui/ScrambleLink";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono-label text-xs text-muted">
            Get in touch
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Have a system worth building?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ScrambleLink
            href="mailto:zuraizwork@gmail.com"
            className="mt-10 inline-block text-2xl font-medium text-foreground underline decoration-border underline-offset-8 transition-colors hover:text-violet hover:decoration-violet sm:text-3xl md:text-4xl"
          >
            zuraizwork@gmail.com
          </ScrambleLink>
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
                GitHub
              </span>
              <p className="mt-2">
                <ScrambleLink
                  href="https://github.com/zuraiz-anjum"
                  className="text-sm text-foreground hover:text-violet"
                >
                  github.com/zuraiz-anjum
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
