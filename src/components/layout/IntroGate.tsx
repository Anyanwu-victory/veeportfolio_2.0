"use client";

import { useCallback, useState, type ReactNode } from "react";
import VictoryIntro from "@/components/ui/VictoryIntro";
import styles from "./IntroGate.module.css";

type IntroGateProps = {
  children: ReactNode;
};

export default function IntroGate({ children }: IntroGateProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  const revealContent = useCallback(() => setIsRevealed(true), []);
  const finishIntro = useCallback(() => setIsIntroVisible(false), []);

  return (
    <>
      {isIntroVisible && (
        <VictoryIntro
          onReveal={revealContent}
          onComplete={finishIntro}
        />
      )}

      {isRevealed && <div className={styles.content}>{children}</div>}
    </>
  );
}
