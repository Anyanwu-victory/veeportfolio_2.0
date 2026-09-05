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
import { navItems } from "@/lib/navItems";

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
   * then closes back down — ghost word first, then the bar itself — so
   * it's ready to act as a hover reveal again rather than staying stuck
   * fullscreen. `navigate` is whatever the caller wants to run to
   * actually change the page (see DesktopNav.tsx).
   */
  expandAndNavigate: (href: string, navigate: () => void) => void;
};

const NavHoverContext = createContext<NavHoverContextValue | null>(null);

// A zero-height sliver pinned to the vertical center, wiping open to the
// full box.
const CLIP_CLOSED = "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)";
const CLIP_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

// Resting height and position come from the responsive navigation CSS.
const EXPANDED_HEIGHT = "100vh";

export function NavHoverProvider({ children }: { children: ReactNode }) {
  const [ghostWord, setGhostWord] = useState("");
  const [barVisible, setBarVisible] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const transitionRef = useRef<gsap.core.Timeline | null>(null);
  const navigatingRef = useRef(false);

  useEffect(() => {
    if (!barRef.current || !ghostRef.current) return;
    const bar = barRef.current;

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
      transitionRef.current?.kill();
      gsap.killTweensOf(bar);
      tlRef.current = null;
    };
  }, []);

  const showGhost = (label: string) => {
    if (navigatingRef.current) return;
    setGhostWord(label);
    tlRef.current?.play();
  };

  const hideGhost = () => {
    if (navigatingRef.current) return;
    tlRef.current?.reverse();
  };

  const expandAndNavigate = (href: string, navigate: () => void) => {
    if (navigatingRef.current) return;
    if (!barRef.current || !ghostRef.current) {
      navigate();
      return;
    }

    navigatingRef.current = true;
    // A touch activation must not depend on an earlier mouse hover.
    setGhostWord(navItems.find((item) => item.href === href)?.label ?? "Home");
    const collapsedHeight = getComputedStyle(barRef.current).height;
    const collapsedTop = getComputedStyle(barRef.current).top;

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

    gsap.to(barRef.current, {
      height: EXPANDED_HEIGHT,
      top: "50vh",
      duration: 1.1,
      ease: "sine.inOut",
      onComplete: () => {
        navigate();

        // Closing sequence: the ghost word disappears FIRST — fading out
        // and sliding down, same direction/feel as the normal hover-out
        // reverse — and only once it's fully gone does the bar itself
        // shrink back down and clip shut. Previously both effectively
        // happened as one abrupt beat: the height tween finished, then
        // tlRef.current.progress(0) snapped clip-path and ghost opacity
        // back to their closed values instantly, with no animation at
        // all. That instant snap was the "pop" — this replaces it with
        // its own explicit close timeline instead.
        const closeTl = gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            // Visuals already match the hover timeline's own progress-0
            // state by this point, so this is purely syncing its internal
            // bookkeeping — nothing visibly changes — leaving it ready to
            // play forward normally on the next hover.
            tlRef.current?.progress(0).pause();
            gsap.set(barRef.current, { clearProps: "height,top" });
            navigatingRef.current = false;
            setBarVisible(false);
          },
        });

        transitionRef.current = closeTl;
        closeTl
          .to(ghostRef.current, {
            autoAlpha: 0,
            y: 24,
            duration: 0.5,
            ease: "power2.in",
          })
          .to(barRef.current, {
            height: collapsedHeight,
            top: collapsedTop,
            clipPath: CLIP_CLOSED,
            duration: 0.7,
            ease: "sine.inOut",
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
        className="navigation-curtain pointer-events-none fixed inset-x-0 z-40 hidden -translate-y-1/2 items-center justify-center text-center overflow-hidden bg-surface-overlay md:flex"
      >
        <span
          ref={ghostRef}
          // Ghost word color — swap `text-secondary` for any Tailwind
          // color utility (e.g. text-accent, text-white) or an exact
          // value like text-[#ff6b4a].
          className="navigation-ghost invisible font-display text-[200px] leading-none text-text-muted opacity-0 justify-center text-center md:visible"
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
