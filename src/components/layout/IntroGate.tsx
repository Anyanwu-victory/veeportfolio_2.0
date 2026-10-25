"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type IntroGateProps = {
  children: ReactNode;
};

type HomeIntroPhase = "letters" | "greeting" | "navigation" | "illustration" | "complete";

const HOME_LETTER_REVEAL_MS = 3300;
const HOME_GREETING_HOLD_MS = 900;
const HOME_NAVIGATION_REVEAL_MS = 900;
const HomeIntroContext = createContext<HomeIntroPhase>("complete");

export const useHomeIntro = () => useContext(HomeIntroContext);

export default function IntroGate({ children }: IntroGateProps) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<HomeIntroPhase>(
    pathname === "/" ? "letters" : "complete",
  );

  useEffect(() => {
    if (phase !== "letters" && phase !== "greeting" && phase !== "navigation") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(() => {
      if (phase === "letters") setPhase("greeting");
      else if (phase === "greeting") setPhase("navigation");
      else setPhase("illustration");
    },
    reduceMotion
      ? 0
      : phase === "letters"
        ? HOME_LETTER_REVEAL_MS
        : phase === "greeting"
          ? HOME_GREETING_HOLD_MS
          : HOME_NAVIGATION_REVEAL_MS,
    );

    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <HomeIntroContext.Provider value={phase}>
      {children}
    </HomeIntroContext.Provider>
  );
}
