"use client";

import MobileMenu from "@/components/MobileMenu";
import { useTheme } from "@/context/themeContext";
import { useNavHover } from "@/context/navigationHoverContext";
import type { NavItem } from "@/lib/navItems";
// NOTE: this used to redeclare its own local `NavItem` type with a `num`
// field, but the actual shared list in lib/navItems.ts uses `number`. If
// MobileMenu was built against the old `num` shape, it'll need updating too
// — flagging this since it's easy for the two to quietly drift apart.

type HeaderProps = {
  activePage: string;
  onNavigateAction: (page: string) => void;
  navItems: NavItem[];
};

export default function Header({
  activePage,
  onNavigateAction,
  navItems,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { showGhost, hideGhost } = useNavHover();

  return (
    <header className="fixed inset-x-0 top-0 z-50 header">
      <div className="mx-auto grid h-12 max-w-450 grid-cols-[1fr_auto_1fr] items-center ">
        {/* Left title */}
        <div className="flex items-center gap-3 justify-self-start">
          <span className="h-2 w-2 rounded-full bg-text md:h-4 md:w-4" />

          <p className="max-w-35 text-[10px] leading-tight text-text-muted md:text-[12px]">
            Open for any
            <br />
            collaborations and offers
          </p>
        </div>

        {/* Logo - middle name. Hovering it reuses the exact same ghost
            bar/word reveal as the nav items below (via NavHoverContext),
            just triggered from here with a fixed "Home" label instead of
            whatever nav item is under the cursor. */}
        <h1
          onMouseEnter={() => showGhost("Home")}
          onMouseLeave={hideGhost}
          className="cursor-pointer justify-self-center text-xl font-semibold tracking-[0.2em] text-text md:text-3xl"
        >
          VICKY
        </h1>

        {/* Right */}
        <div className="flex items-center justify-self-end gap-3">
          <div className="hidden text-right font-body leading-snug md:block">
            <span className="block pr-2">Folio</span>
            <span className="block">&rarr; &apos;26</span>
          </div>

          {/* Mobile phone menu */}
          <button
            onClick={toggleTheme}
            className="hidden text-lg text-text-muted transition hover:text-text md:block"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          <div className="md:hidden">
            <MobileMenu
              items={navItems}
              activePage={activePage}
              onNavigateAction={onNavigateAction}
            />
          </div>
        </div>
      </div>
    </header>
  );
}