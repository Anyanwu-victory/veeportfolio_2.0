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
  /**
   * Click-triggered variant: grows the already-open bar from its small
   * hover band into a fullscreen curtain (ghost word and background stay
   * visible throughout), then calls `navigate` once the expand finishes,
   * then shrinks back down to the normal hover-band size shortly after
   * — so it's ready to act as a hover reveal again rather than staying
   * stuck fullscreen. `navigate` is whatever the caller wants to run to
   * actually change the page (see DesktopNav.tsx).
   */
  expandAndNavigate: (href: string, navigate: () => void) => void;
};

const NavHoverContext = createContext<NavHoverContextValue | null>(null);

// A zero-height sliver pinned to the vertical center, wiping open to the
// full box.
const CLIP_CLOSED = "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)";
const CLIP_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

// Matches the bar's Tailwind `h-55` (55 * 0.25rem = 13.75rem = 220px).
// If you change `h-55` on the bar's className, update this to match, or
// the collapse-back-down step will land at the wrong size.
const COLLAPSED_HEIGHT = "13.75rem";
const EXPANDED_HEIGHT = "100vh";

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

  const expandAndNavigate = (href: string, navigate: () => void) => {
    if (!barRef.current || !ghostRef.current) {
      navigate();
      return;
    }

    // Pause the hover timeline so a stray mouseleave (e.g. as the click
    // fires and the cursor's position becomes ambiguous mid-navigation)
    // can't call hideGhost()'s reverse() at the same time and fight this
    // tween over clip-path/opacity while THIS tween is growing height.
    tlRef.current?.pause();

    // A click must not depend on the hover reveal having enough time to
    // finish. VICKY is a small target and can be clicked immediately after
    // mouseenter, which previously paused the curtain while it was still
    // clipped shut. Force the click transition into a fully revealed state
    // before expanding it to fullscreen.
    gsap.killTweensOf(barRef.current, "height");
    gsap.set(barRef.current, { clipPath: CLIP_OPEN });
    gsap.set(ghostRef.current, { autoAlpha: 1, y: 0 });
    setBarVisible(true);

    void href; // not used directly here — `navigate` already has it bound

    gsap.to(barRef.current, {
      height: EXPANDED_HEIGHT,
      duration: 1.1,
      ease: "sine.inOut",
      onComplete: () => {
        navigate();

        gsap.to(barRef.current, {
          height: COLLAPSED_HEIGHT,
          duration: 0.9,
          ease: "sine.inOut",
          delay: 0.3,
          onComplete: () => {
            // Return both the curtain and ghost word to the hover timeline's
            // closed starting state so the next hover can play normally.
            tlRef.current?.progress(0).pause();
            setBarVisible(false);
          },
        });
      },
    });
  };

  return (
    <NavHoverContext.Provider
      value={{ showGhost, hideGhost, barVisible, expandAndNavigate }}
    >
      {/* Mounted before `children` so it paints underneath whatever sits
          in the same fixed position (e.g. Navigation's button row) —
          otherwise a later DOM node with equal z-index would draw on top
          and hide the nav labels once the bar opens. */}
      <div
        ref={barRef}
        style={{ clipPath: CLIP_CLOSED }}
        className="pointer-events-none fixed inset-x-0 top-[50vh] z-40 hidden h-55 -translate-y-1/2 items-center justify-center overflow-hidden bg-surface-overlay md:flex"
      >
        <span
          ref={ghostRef}
          // Ghost word color — swap `text-secondary` for any Tailwind
          // color utility (e.g. text-accent, text-white) or an exact
          // value like text-[#ff6b4a].
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
