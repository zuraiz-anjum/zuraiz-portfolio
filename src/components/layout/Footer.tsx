import ScrambleLink from "@/components/ui/ScrambleLink";

export default function Footer() {
  return (
    <footer id="contact-footer" className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono-label text-xs text-muted">Lahore, Pakistan</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Built with Next.js, GSAP, three.js, and an unreasonable number of
            automated tests.
          </p>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono-label text-xs text-muted">Connect</span>
            <ScrambleLink
              href="mailto:zuraizwork@gmail.com"
              className="text-sm text-foreground hover:text-violet"
            >
              zuraizwork@gmail.com
            </ScrambleLink>
            <ScrambleLink
              href="https://github.com/zuraiz-anjum"
              className="text-sm text-foreground hover:text-violet"
            >
              github.com/zuraiz-anjum
            </ScrambleLink>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Zuraiz Anjum. All rights reserved.</p>
        <p className="font-mono-label">Designed &amp; built to ship.</p>
      </div>
    </footer>
  );
}
