import type { Metadata } from "next";
import BookLoader from "@/components/book/BookLoader";

export const metadata: Metadata = {
  title: "Zuraiz Anjum — Portfolio (Book)",
  description: "An interactive, page-turning version of the portfolio.",
};

export default function BookPageRoute() {
  return <BookLoader />;
}
