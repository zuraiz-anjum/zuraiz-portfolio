import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://zuraiz-portfolio.vercel.app"),
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
        {children}
      </body>
    </html>
  );
}
