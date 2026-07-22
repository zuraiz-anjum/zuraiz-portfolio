"use client";

import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/ui/Magnetic";

type ChatMessage = { role: "user" | "assistant"; content: string };

const STARTERS = ["What's ARES?", "What stack do you use?", "Open to work?"];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const assembledRef = useRef("");

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || isStreaming) return;

    setError(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      assembledRef.current = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assembledRef.current += decoder.decode(value, { stream: true });
        const assembled = assembledRef.current;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: assembled };
          return copy;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <Magnetic strength={0.45} className="fixed bottom-6 right-6 z-[150]">
        <button
          type="button"
          data-cursor="hover"
          data-cursor-label={open ? "Close" : "Chat"}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle AI chat"
          className="group relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0_10px_50px_-12px_rgba(167,139,250,0.75)] transition-transform duration-300 ease-out hover:scale-110"
        >
          <span className="motion-safe:animate-ping absolute inset-0 rounded-full bg-violet/30 [animation-duration:2.4s]" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet via-cyan to-pink transition-transform duration-500 ease-out group-hover:rotate-45" />
          <span className="relative flex flex-col items-center leading-none text-background">
            {open ? (
              <span className="text-xl font-bold">×</span>
            ) : (
              <>
                <span className="text-base">✦</span>
                <span className="font-mono-label mt-0.5 text-[0.5rem] font-bold">
                  ASK AI
                </span>
              </>
            )}
          </span>
        </button>
      </Magnetic>

      {open ? (
        <div className="fixed bottom-24 right-6 z-[150] flex h-[32rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background-raised shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="border-b border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Ask my AI</p>
            <p className="font-mono-label text-[0.6rem] text-muted">
              Trained on my resume &amp; projects
            </p>
          </div>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted">
                  Ask me anything about Zuraiz&apos;s work, stack, or experience.
                </p>
                <div className="flex flex-wrap gap-2">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-cursor="hover"
                      onClick={() => send(s)}
                      className="font-mono-label rounded-full border border-border px-3 py-1.5 text-[0.65rem] text-muted transition-colors hover:border-violet hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-violet/20 text-foreground"
                      : "mr-auto bg-background text-foreground"
                  }`}
                >
                  {m.content || (isStreaming && i === messages.length - 1 ? "…" : "")}
                </div>
              ))
            )}
            {error ? <p className="text-xs text-pink">{error}</p> : null}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isStreaming}
              className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted focus:border-violet focus:outline-none"
            />
            <button
              type="submit"
              data-cursor="hover"
              disabled={isStreaming || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet text-background disabled:opacity-40"
              aria-label="Send"
            >
              ↑
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
