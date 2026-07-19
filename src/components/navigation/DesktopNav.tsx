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
      onMouseLeave={hideGhost}
      className="fixed inset-x-0 top-[50vh] z-40 hidden h-55 -translate-y-1/2 lg:block"
    >
      <div className="absolute inset-0 mx-auto flex max-w-450 items-center justify-between px-14">
        {items.map((item) => {
          const isActive =
            normalizePath(pathname ?? "") === normalizePath(item.href);

          return (
            <button
              key={item.href}
              type="button"
              onMouseEnter={() => showGhost(item.label)}
              onClick={() => handleClick(item.href)}
              className="flex flex-col items-start transition-colors"
              style={{
                color: barVisible
                  ? isActive
                    ? "var(--text)"
                    : "var(--text-secondary)"
                  : "var(--text)",
              }}
            >
              <span className="text-xs opacity-50">{item.number}.</span>
              <span className="text-lg">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
