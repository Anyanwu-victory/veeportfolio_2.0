"use client";

import { usePathname, useRouter } from "next/navigation";
import { useNavHover } from "@/context/navigationHoverContext";
import { navItems as defaultNavItems } from "@/lib/navItems";
import type { NavItem } from "@/lib/navItems";

type DesktopNavProps = {
  items?: NavItem[];
};

const normalizePath = (path: string) => path.toLowerCase();

export default function DesktopNav({
  items = defaultNavItems,
}: DesktopNavProps) {
  const { showGhost, hideGhost, barVisible, expandAndNavigate } =
    useNavHover();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    const destination = normalizePath(href);
    expandAndNavigate(destination, () => router.push(destination));
  };

  return (
    <nav
      aria-label="Main navigation"
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") hideGhost();
      }}
      className="desktop-navigation pointer-events-none fixed inset-x-0 z-40 hidden -translate-y-1/2 md:block"
    >
      <div className="absolute inset-0 mx-auto flex max-w-450 xl:max-w-600 items-center justify-between px-8 lg:px-14">
        {items.map((item) => {
          const isActive =
            normalizePath(pathname ?? "") === normalizePath(item.href);

          return (
            <button
              key={item.href}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") showGhost(item.label);
              }}
              onFocus={() => showGhost(item.label)}
              onBlur={hideGhost}
              onClick={() => handleClick(item.href)}
              className="pointer-events-auto flex min-h-11 min-w-11 flex-col items-start justify-center transition-colors font-display focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{
                color: barVisible
                  ? isActive
                    ? "var(--text)"
                    : "var(--text-secondary)"
                  : "var(--text)",
              }}
            >
              <span className="text-xs opacity-50 font-display">{item.number}.</span>
              <span className="text-lg font-display">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
