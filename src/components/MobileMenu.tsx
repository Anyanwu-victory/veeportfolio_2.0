"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { NavItem } from "@/lib/navItems";
import { createMobileMenuTimeline, ITEM_CLOSED } from "@/lib/Menu";
import { useMobileMenu } from "@/context/mobileMenuContext";

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
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

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

  // Drives the timeline off the shared `isOpen` value instead of doing it
  // inline inside the click handler — so it stays correct even if
  // something outside this component (e.g. a route change elsewhere)
  // closes the menu via context rather than this button.
  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    onNavigateAction(href);
    closeMenu();
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`relative z-50 flex h-9 w-9 items-center justify-center md:hidden ${
          // Sidebar background is a hardcoded #192123 regardless of site
          // theme, but `text-text` still follows the theme — in light
          // mode that's a dark icon on a dark background. Switching to
          // `text-text-menu` (the same always-contrasting token used for
          // the nav item labels below) fixes it regardless of theme.
          isOpen ? "text-text-menu" : "text-text"
        }`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        <svg
          className="hamburger__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
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
          vanishing instantly. */}
      <div
        ref={overlayRef}
        aria-hidden={!isOpen}
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