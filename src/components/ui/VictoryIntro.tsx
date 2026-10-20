"use client";

import { useEffect } from "react";
import styles from "./VictoryIntro.module.css";

const CONTENT_REVEAL_MS = 2250;
const INTRO_EXIT_MS = 700;

type VictoryIntroProps = {
  onReveal: () => void;
  onComplete: () => void;
};

export default function VictoryIntro({
  onReveal,
  onComplete,
}: VictoryIntroProps) {
  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.style.overflow = "hidden";

    const revealTimer = window.setTimeout(
      onReveal,
      reduceMotion ? 0 : CONTENT_REVEAL_MS,
    );
    const completeTimer = window.setTimeout(
      onComplete,
      reduceMotion ? 40 : CONTENT_REVEAL_MS + INTRO_EXIT_MS,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
      root.style.overflow = previousOverflow;
    };
  }, [onComplete, onReveal]);

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-label="Opening Victory's portfolio"
    >
      <div className={styles.wordFrame} aria-hidden="true">
        <span className={styles.word}>
          <span className={styles.leadLetter}>V</span>
          <span className={styles.remainingFrame}>
            <span className={styles.remainingLetters}>ictory</span>
          </span>
        </span>
      </div>
      <span className="sr-only">Opening Victory&apos;s portfolio</span>
    </div>
  );
}
