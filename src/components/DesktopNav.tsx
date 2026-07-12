"use client";

import { navItems as defaultNavItems } from "@/lib/navItems";
import type { NavItem } from "@/lib/navItems";
import { useNavHover } from "@/context/navigationHoverContext";

type Props = {
  activePage: string;
  onNavigateAction: (href: string) => void;
  items?: NavItem[];
};

// The ghost bar/word overlay itself now lives in NavHoverProvider (see
// context/NavHoverContext.tsx) so it can be triggered from anywhere in the
// tree — this component just renders its buttons and calls showGhost /
// hideGhost from context instead of owning its own timeline.
export default function Navigation({
  activePage,
  onNavigateAction,
  items = defaultNavItems,
}: Props) {
  const { showGhost, hideGhost, barVisible } = useNavHover();

  return (
    <nav
      onMouseLeave={hideGhost}
      className="fixed inset-x-0 top-[50vh] z-40 hidden h-55 -translate-y-1/2 md:block"
    >
      <div className="absolute inset-0 mx-auto flex max-w-450 items-center justify-between px-14">
        {items.map((item) => (
          <button
            key={item.href}
            onMouseEnter={() => showGhost(item.label)}
            onClick={() => onNavigateAction(item.href)}
            className="flex flex-col items-start transition-colors"
            style={{
              // Compares against `href` (e.g. "/work") — make sure whatever
              // renders <Navigation activePage={...} /> passes an
              // href-shaped string, not a bare key like "work".
              color: barVisible
                ? activePage === item.href
                  ? "var(--text)"
                  : "var(--text-secondary)"
                : "var(--text)",
            }}
          >
            <span className="text-xs opacity-50">{item.number}.</span>
            <span className="text-lg">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}