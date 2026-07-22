import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Intro from "@/components/ui/Intro";
import CommandPalette from "@/components/ui/CommandPalette";
import AiChat from "@/components/ui/AiChat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zuraiz Anjum — AI Engineer",
  description:
    "AI Engineer building production-grade LLM systems, autonomous agents, and full-stack AI platforms — from fine-tuning to deployment.",
  metadataBase: new URL("https://zuraiz-anjum.vercel.app"),
  openGraph: {
    title: "Zuraiz Anjum — AI Engineer",
    description:
      "AI Engineer building production-grade LLM systems, autonomous agents, and full-stack AI platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SmoothScroll>
          <Intro />
          <CustomCursor />
          <CommandPalette />
          <AiChat />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
