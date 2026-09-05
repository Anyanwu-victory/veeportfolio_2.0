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

      {isLoaded && children}
    </>
  );
}
