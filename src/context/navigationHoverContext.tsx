"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";

type NavHoverContextValue = {
  /** Swaps in `label` as the ghost word and plays the reveal forward. */
  showGhost: (label: string) => void;
  /** Reverses the same timeline — word fades out, then bar closes. */
  hideGhost: () => void;
  /** True from the moment the bar starts opening until it's fully closed. */
  barVisible: boolean;
};

const NavHoverContext = createContext<NavHoverContextValue | null>(null);

// A zero-height sliver pinned to the vertical center, wiping open to the
// full box.
const CLIP_CLOSED = "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)";
const CLIP_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

export function NavHoverProvider({ children }: { children: ReactNode }) {
  const [ghostWord, setGhostWord] = useState("");
  const [barVisible, setBarVisible] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!barRef.current || !ghostRef.current) return;

    gsap.set(barRef.current, { clipPath: CLIP_CLOSED });
    gsap.set(ghostRef.current, { autoAlpha: 0, y: 20 });

    // Built once, paused, then driven purely with play()/reverse() —
    // reversing replays the same sequence backward, so "bar opens, then
    // word fades in" becomes "word fades out, then bar closes" for free.
    const tl = gsap
      .timeline({ paused: true })
      .to(barRef.current, {
        clipPath: CLIP_OPEN,
        duration: 0.5,
        ease: "power3.out",
      })
      .to(
        ghostRef.current,
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "+=0.1" // delay after the bar finishes opening, before the word starts
      )
      .eventCallback("onStart", () => setBarVisible(true))
      .eventCallback("onReverseComplete", () => setBarVisible(false));

    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const showGhost = (label: string) => {
    setGhostWord(label);
    tlRef.current?.play();
  };

  const hideGhost = () => {
    tlRef.current?.reverse();
  };

  return (
    <NavHoverContext.Provider value={{ showGhost, hideGhost, barVisible }}>
      {/* Mounted before `children` so it paints underneath whatever sits
          in the same fixed position (e.g. Navigation's button row) —
          otherwise a later DOM node with equal z-index would draw on top
          and hide the nav labels once the bar opens. */}
      <div
        ref={barRef}
        style={{ clipPath: CLIP_CLOSED }}
        className="pointer-events-none fixed inset-x-0 top-[50vh] z-40 hidden h-[220px] -translate-y-1/2 items-center justify-center overflow-hidden bg-surface-overlay md:flex"
      >
        <span
          ref={ghostRef}
          className="invisible font-display text-[240px] leading-none text-secondary opacity-0"
        >
          {ghostWord}
        </span>
      </div>

      {children}
    </NavHoverContext.Provider>
  );
}

export function useNavHover() {
  const ctx = useContext(NavHoverContext);
  if (!ctx) {
    throw new Error("useNavHover must be used within a <NavHoverProvider>");
  }
  return ctx;
}