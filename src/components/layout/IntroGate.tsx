"use client";

import { useState, type ReactNode } from "react";
import ButterflyLoader from "@/components/ui/ButterflyLoader";

type IntroGateProps = {
  children: ReactNode;
};

export default function IntroGate({ children }: IntroGateProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <ButterflyLoader onComplete={() => setIsLoaded(true)} />}

      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? "visible" : "hidden",
          transition: "opacity 1s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {children}
      </div>
    </>
  );
}
