import ScrambleLink from "@/components/ui/ScrambleLink";

export default function ProofLink({ href }: { href?: string }) {
  if (!href) return null;
  return (
    <ScrambleLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono-label mt-3 inline-flex w-fit items-center gap-1.5 text-[0.65rem] text-muted hover:text-violet"
    >
      View proof ↗
    </ScrambleLink>
  );
}
