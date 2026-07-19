"use client";

import MobileMenu from "@/components/MobileMenu";
import { useTheme } from "@/context/themeContext";
import { useNavHover } from "@/context/navigationHoverContext";
import { useMobileMenu } from "@/context/mobileMenuContext";
import type { NavItem } from "@/lib/navItems";

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
  const { isOpen } = useMobileMenu();

  return (
    <header className="fixed inset-x-0 top-0 z-50 header">
      <div className="mx-auto flex h-12 w-full items-center justify-between  md:grid md:grid-cols-[1fr_auto_1fr] 
      md:max-w-450 ">
        {/* Left title. Same overlay-vs-theme issue as the hamburger: the
            sidebar behind this is a fixed #192123 regardless of theme, so
            these need to switch to the overlay-safe token while it's
            open instead of following `bg-text` / `text-text-muted`,
            which go dark in light mode and disappear against it. */}
        <div className="flex items-center gap-3 relative z-50">
          <span
            className={`h-3 w-3 rounded-full md:h-4 md:w-4 ${
              isOpen ? "bg-text-menu" : "bg-text"
            }`}
          />

          <p
            className={`max-w-35 text-[10px] leading-tight md:text-[12px] ${
              isOpen ? "text-text-menu" : "text-text-muted"
            }`}
          >
            Open for any
            <br />
            collaborations and offers
          </p>
        </div>

        {/* Logo center on desktop/tablet — the mobile-only copy is
            below, since this one is hidden below md and therefore never
            needs the overlay-color treatment (the sidebar only opens on
            mobile widths, where this element doesn't render). */}
        <div className="hidden justify-self-center md:flex">
          <h1
            onMouseEnter={() => showGhost("Home")}
            onMouseLeave={hideGhost}
            className="cursor-pointer text-xl font-semibold tracking-[0.2em] text-text md:text-3xl"
          >
            VICKY
          </h1>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <div className="flex items-center gap-3 md:hidden s">
            <h1
              onMouseEnter={() => showGhost("Home")}
              onMouseLeave={hideGhost}
              className={`cursor-pointer text-xl font-semibold tracking-[0.2em] ${
                isOpen ? "text-text-menu relative z-50" : "text-text "
              }`}
            >
              VICKY
            </h1>
            <MobileMenu
              items={navItems}
              activePage={activePage}
              onNavigateAction={onNavigateAction}
            />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="text-right font-body leading-snug">
              <span className="block pr-2">Folio</span>
              <span className="block">&rarr; &apos;26</span>
            </div>

            <button
              onClick={toggleTheme}
              className="text-lg text-text-muted transition hover:text-text"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}