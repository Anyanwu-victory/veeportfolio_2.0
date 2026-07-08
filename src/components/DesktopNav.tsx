"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

export const NAV_ITEMS = [
  { num: "01.", label: "Work", page: "work" },
  { num: "02.", label: "About", page: "about" },
  { num: "03.", label: "Experience", page: "experience" },
  { num: "04.", label: "Contact", page: "contact" },
];

type Props = {
  activePage: string;
  onNavigate: (page: string) => void;
};

export default function Navigation({
  activePage,
  onNavigate,
}: Props) {
  const [ghostWord, setGhostWord] = useState("");
  const [barVisible, setBarVisible] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);

  const enter = (label: string) => {
    setGhostWord(label);
    setBarVisible(true);

    gsap.to(barRef.current, {
      scaleY: 1,
      duration: 0.4,
    });

    gsap.fromTo(
      ghostRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 0.12,
        y: 0,
      }
    );
  };

  const leave = () => {
    gsap.to(barRef.current, {
      scaleY: 0,
      duration: 0.3,
    });

    gsap.to(ghostRef.current, {
      opacity: 0,
      y: -10,
      onComplete: () => setBarVisible(false),
    });
  };

  return (
    <nav
      onMouseLeave={leave}
      className="fixed inset-x-0 top-[46vh] z-40 hidden -translate-y-1/2 px-6 md:block md:px-10"
    >
      <div
        ref={barRef}
        className="absolute inset-0 -z-10 flex items-center justify-center bg-surface-overlay"
        style={{
          transform: "scaleY(0)",
          transformOrigin: "top",
        }}
      >
        <span
          ref={ghostRef}
          className="font-display text-[240px] text-text opacity-0"
        >
          {ghostWord}
        </span>
      </div>

      <div className="mx-auto mt-50 flex max-w-450 items-center justify-between px-10">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onMouseEnter={() => enter(item.label)}
            onClick={() => onNavigate(item.page)}
            className="flex flex-col items-start transition-colors"
            style={{
              color: barVisible
                ? activePage === item.page
                  ? "var(--text)"
                  : "var(--text-secondary)"
                : "var(--text)",
            }}
          >
            <span className="text-xs opacity-50">{item.num}</span>
            <span className="text-lg">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// There should be a smooth transition when the ghost word appears and disappears, and the bar should scale up and down smoothly as well.
// The navigation should be responsive, with a different layout for mobile devices.
// The ghost background should be 1 sec fast than the f=ghost word. The ghost background should open first and the ghost word should appear after 1 sec. The ghost word should disappear first and the ghost background should close after 1 sec.