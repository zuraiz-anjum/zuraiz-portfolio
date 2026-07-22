const ROW_1 = [
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
];

const ROW_2 = [
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "REST + SSE",
  "OpenAI SDK",
  "Anthropic SDK",
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-4 pr-4 ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono-label whitespace-nowrap rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-violet hover:text-foreground md:text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      aria-label="Toolchain"
      className="border-y border-border py-14"
    >
      <div className="flex flex-col gap-6">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>
    </section>
  );
}
