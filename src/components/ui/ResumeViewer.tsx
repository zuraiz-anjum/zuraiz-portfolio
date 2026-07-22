"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

export const RESUME_MODAL_TOGGLE_EVENT = "resume-modal:toggle";

type PdfLink = {
  href: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type LinkAnnotation = {
  subtype?: string;
  url?: string;
  rect?: [number, number, number, number];
};

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [linksByPage, setLinksByPage] = useState<Record<number, PdfLink[]>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const docRef = useRef<PDFDocumentProxy | null>(null);
  const hasStartedRef = useRef(false);

  // Load the document once the viewer is opened for the first time. Gated by
  // a ref (not `status` state) so that calling setStatus inside doesn't
  // change this effect's own dependencies and cause it to restart mid-flight.
  useEffect(() => {
    if (!open || hasStartedRef.current) return;
    hasStartedRef.current = true;

    let cancelled = false;

    (async () => {
      setStatus("loading");
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      try {
        const loadingTask = pdfjsLib.getDocument({ url: "/resume.pdf" });
        const doc = await loadingTask.promise;
        if (cancelled) {
          loadingTask.destroy();
          return;
        }
        docRef.current = doc;
        setNumPages(doc.numPages);
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  // Once the page count is known and canvases exist in the DOM, render each page.
  useEffect(() => {
    const doc = docRef.current;
    if (!doc || numPages === 0) return;

    let cancelled = false;

    (async () => {
      const containerWidth = containerRef.current?.clientWidth ?? 700;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextLinks: Record<number, PdfLink[]> = {};

      for (let i = 1; i <= numPages; i++) {
        const page = await doc.getPage(i);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRefs.current[i - 1];
        if (!canvas || cancelled) return;

        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const context = canvas.getContext("2d");
        if (!context) continue;
        context.scale(dpr, dpr);

        await page.render({ canvas, canvasContext: context, viewport }).promise;

        const annotations = (await page.getAnnotations({
          intent: "display",
        })) as LinkAnnotation[];

        nextLinks[i] = annotations
          .filter((a) => a.subtype === "Link" && a.url && a.rect)
          .map((a) => {
            const [rx1, ry1, rx2, ry2] = a.rect!;
            const [vx1, vy1] = viewport.convertToViewportPoint(rx1, ry1);
            const [vx2, vy2] = viewport.convertToViewportPoint(rx2, ry2);
            return {
              href: a.url!,
              left: Math.min(vx1, vx2),
              top: Math.min(vy1, vy2),
              width: Math.abs(vx2 - vx1),
              height: Math.abs(vy2 - vy1),
            };
          });
      }

      if (!cancelled) {
        setLinksByPage(nextLinks);
        setStatus("ready");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [numPages]);

  useEffect(() => {
    const onToggle = () => setOpen((v) => !v);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(RESUME_MODAL_TOGGLE_EVENT, onToggle);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener(RESUME_MODAL_TOGGLE_EVENT, onToggle);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    return () => {
      docRef.current?.loadingTask.destroy();
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center bg-background/80 px-4 py-8 backdrop-blur-sm sm:px-8 sm:py-12"
      onClick={() => setOpen(false)}
    >
      <div
        className="flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-background-raised shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="font-mono-label text-xs text-muted">
            Resume — Zuraiz Anjum
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/resume.pdf"
              download
              data-cursor="hover"
              data-cursor-label="Download"
              className="font-mono-label text-xs text-muted transition-colors hover:text-violet"
            >
              Download
            </a>
            <button
              type="button"
              data-cursor="hover"
              data-cursor-label="Close"
              onClick={() => setOpen(false)}
              aria-label="Close resume preview"
              className="font-mono-label text-xs text-muted transition-colors hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto bg-[#525659] px-2 py-4 sm:px-6"
        >
          {status === "error" ? (
            <p className="py-20 text-center text-sm text-muted">
              Couldn&apos;t load the resume preview.{" "}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet underline"
              >
                Open it directly
              </a>{" "}
              instead.
            </p>
          ) : numPages === 0 ? (
            <p className="py-20 text-center text-sm text-muted">Loading…</p>
          ) : (
            Array.from({ length: numPages }).map((_, i) => (
              <div
                key={i}
                className="relative mx-auto mb-4 w-fit shadow-[0_8px_30px_rgba(0,0,0,0.4)] last:mb-0"
              >
                <canvas
                  ref={(el) => {
                    canvasRefs.current[i] = el;
                  }}
                  className="block"
                />
                {(linksByPage[i + 1] ?? []).map((link, li) => (
                  <a
                    key={li}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    data-cursor-label="Visit"
                    className="absolute rounded-sm outline-offset-2 hover:outline hover:outline-2 hover:outline-violet/70"
                    style={{
                      left: link.left,
                      top: link.top,
                      width: link.width,
                      height: link.height,
                    }}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
