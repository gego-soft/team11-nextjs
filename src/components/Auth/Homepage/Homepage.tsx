"use client";

import Hero from "./Hero";
import Highlights from "./Highlights";
import HowToPlay from "./HowToPlay";
import Winners from "./Winners";
import RefHandler from "./RefHandler";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <RefHandler />
      </Suspense>

      <Hero />
      <Highlights />
      <Winners />
      <HowToPlay />
    </>
  );
}
