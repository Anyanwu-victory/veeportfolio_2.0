import { gsap } from "gsap";

export type MobileMenuRefs = {
  hamburgerTopPath: SVGPathElement | null;
  hamburgerBottomPath: SVGPathElement | null;
  overlay: HTMLDivElement | null;
  items: (HTMLElement | null)[];
};

// Exported so the component can apply the same closed-state values as an
// inline-style fallback for the very first paint, before this module's
// gsap.set() calls below have run (avoids a one-frame flash of the open
// state on initial mount / during SSR hydration).
export const ITEM_CLOSED = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
export const ITEM_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

/**
 * Builds a paused GSAP timeline for the mobile nav overlay. Call
 * `.play()` to open, `.reverse()` to close — reversing replays the exact
 * same sequence backward (items wipe shut, then hamburger un-crosses,
 * overlay fades out), so there's no separate "close" timeline to author
 * or keep in sync.
 */
export function createMobileMenuTimeline({
  hamburgerTopPath,
  hamburgerBottomPath,
  overlay,
  items,
}: MobileMenuRefs): gsap.core.Timeline | null {
  if (!hamburgerTopPath || !hamburgerBottomPath || !overlay) return null;

  const validItems = items.filter((el): el is HTMLElement => el !== null);
  if (validItems.length === 0) return null;

  // Resting/closed state, set once up front.
  gsap.set(overlay, { autoAlpha: 0, display: "none" });
  gsap.set(validItems, { clipPath: ITEM_CLOSED, y: "100%" });
  // `transformOrigin: "center"` is the actual fix for the "crosses at the
  // end, not the center" bug. SVG elements default their transform-origin
  // to (0,0) — the top-left corner of the WHOLE SVG viewport — unlike HTML
  // elements, which default to 50% 50% of themselves. Without this, the
  // `rotate` below pivots each bar around that distant corner instead of
  // its own center, throwing the crossing point off to one side no matter
  // how correct the y-offset math is.
  gsap.set([hamburgerTopPath, hamburgerBottomPath], {
    rotate: 0,
    y: 0,
    transformOrigin: "center",
  });

  const tl = gsap.timeline({ paused: true });

  // Hamburger -> X. Each path's own bounding-box center sits 3 SVG
  // user-units off from the icon's true center (y=12 in the 24x24
  // viewBox): the top line's center is at y=9, the bottom line's at
  // y=15. Previously these translated AWAY from center (top: -250%,
  // bottom: +250%), which pushed them toward the top/bottom edges of the
  // icon instead of crossing in the middle — that's the "closes at the
  // end, not the center" bug. Fixed by moving each one TOWARD 12 by
  // exactly its own offset, using plain units instead of percentages so
  // there's no ambiguity about what the percentage is relative to.
  const HALF_GAP = 3;

  tl.fromTo(
    hamburgerTopPath,
    { rotate: 0, y: 0 },
    { rotate: 30, y: HALF_GAP, duration: 0.4, ease: "power2.inOut" },
    0
  );
  tl.fromTo(
    hamburgerBottomPath,
    { rotate: 0, y: 0 },
    { rotate: -30, y: -HALF_GAP, duration: 0.4, ease: "power2.inOut" },
    0
  );

  // Full-screen overlay switches on. "flex" (not "block") since the
  // overlay is laid out with flex utility classes.
  tl.fromTo(
    overlay,
    { autoAlpha: 0, display: "none" },
    { autoAlpha: 1, display: "flex", duration: 0.5, ease: "expo.out" },
    0.1
  );

  // Nav items wipe open top-to-bottom, staggered — this is the part the
  // reference's typo'd clip-path value would have silently killed.
  tl.fromTo(
    validItems,
    { clipPath: ITEM_CLOSED, y: "100%" },
    {
      clipPath: ITEM_OPEN,
      y: "0%",
      duration: 0.5,
      ease: "expo.out",
      stagger: 0.1,
    },
    0.2
  );

  return tl;
}