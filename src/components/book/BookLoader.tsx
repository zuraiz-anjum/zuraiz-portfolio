"use client";

import dynamic from "next/dynamic";

const Book = dynamic(() => import("./Book"), { ssr: false });

export default function BookLoader() {
  return <Book />;
}
