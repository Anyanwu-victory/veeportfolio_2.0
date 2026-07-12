"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { NavItem } from "@/lib/navItems";
import { createMobileMenuTimeline, ITEM_CLOSED } from "@/lib/Menu";

type MobileMenuProps = {
  items: NavItem[];
  activePage: string;
  onNavigateAction: (href: string) => void;
};

export default function MobileMenu({
  items,
  activePage,
  onNavigateAction,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const topPathRef = useRef<SVGPathElement>(null);
  const bottomPathRef = useRef<SVGPathElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    tlRef.current = createMobileMenuTimeline({
      hamburgerTopPath: topPathRef.current,
      hamburgerBottomPath: bottomPathRef.current,
      overlay: overlayRef.current,
      items: itemRefs.current,
    });

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  };

  const handleNavigate = (href: string) => {
    onNavigateAction(href);
    setOpen(false);
    tlRef.current?.reverse();
  };

  return (
    <>
      <button
        onClick={toggle}
        className={`relative z-50 flex h-9 w-9 items-center justify-center text-text md:hidden  ${open ? "text-text-menu" : "text-text"}`}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        <svg
          className="hamburger__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* currentColor so the icon follows the button's text color
              (and your dark/light theme toggle) instead of being hardcoded
              black. The `data-svg-origin` / matrix transform / inline
              "translate: none; rotate: none;..." className string from the
              original snippet were leftover artifacts GSAP writes into the
              DOM at runtime — they don't belong in hand-authored source and
              have been dropped. */}
          <path ref={topPathRef} d="M1 10H-4V8H28V10Z" fill="currentColor" />
          <path
            ref={bottomPathRef}
            d="M1 16H-4V14H28V16Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Always mounted — visibility is entirely GSAP-driven (autoAlpha +
          display via the timeline), so closing can animate out instead of
          vanishing instantly the way conditional {open && ...} rendering
          would. The inline style below is only the pre-hydration fallback
          for the very first paint. */}
      <div
        ref={overlayRef}
        aria-hidden={!open}
        style={{ display: "none", visibility: "hidden", opacity: 0 }}
        className="fixed inset-0 z-40 flex-col justify-start bg-[#192123] px-10 pb-10 pt-35"
      >
        <div className="flex flex-col gap-10">
          {items.map((item, index) => (
            <button
              key={item.href}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleNavigate(item.href)}
              style={{ clipPath: ITEM_CLOSED, transform: "translateY(100%)" }}
              className={`overflow-hidden text-right text-5xl ${
                activePage === item.href ? "text-accent" : "text-text-menu"
              }`}
            >
              <span className="">{item.number}.</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* TODO: replace both href="#" placeholders with the real
            destination URLs (an about/inspiration page and your actual
            résumé link/file). */}
        <div className="mt-24 flex flex-col items-end gap-3 text-right text-sm text-text-menu">
          <p>
            Inspired By:{" "}
            <a
              href="#"
              className="font-semibold underline-offset-4 hover:underline"
            >
              Goody
            </a>
          </p>
          <p>
            Folio &apos;26 /{" "}
            <a
              href="#"
              className="font-semibold underline-offset-4 hover:underline"
            >
              Résumé
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
