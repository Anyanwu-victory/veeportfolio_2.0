"use client";

import { useRouter } from "next/navigation";
import MobileMenu from "@/components/navigation/MobileMenu";
import { useTheme } from "@/context/themeContext";
import { useNavHover } from "@/context/navigationHoverContext";
import { useMobileMenu } from "@/context/mobileMenuContext";
import type { NavItem } from "@/lib/navItems";

type HeaderProps = {
  navItems: NavItem[];
};

export default function Header({ navItems }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { showGhost, hideGhost, expandAndNavigate } = useNavHover();
  const { isOpen } = useMobileMenu();
  const router = useRouter();

  // Previously the VICKY logo only had onMouseEnter/onMouseLeave wired up
  // — hovering triggered the ghost reveal, but nothing ever called
  // expandAndNavigate, so clicking did nothing. Same expand-then-navigate
  // pattern as DesktopNav's items, just hardcoded to "/" since this is
  // the logo/home link rather than a lib/navItems entry.
  const goHome = () => {
    expandAndNavigate("/", () => {
      router.push("/");
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 header">
      <div className="mx-auto flex h-12 w-full items-center justify-between  md:grid md:grid-cols-[1fr_auto_1fr] 
      md:max-w-450 xl:max-w-full">
        {/* Left title. Same overlay-vs-theme issue as the hamburger: the
            sidebar behind this is a fixed #192123 regardless of theme, so
            these need to switch to the overlay-safe token while it's
            open instead of following `bg-text` / `text-text-muted`,
            which go dark in light mode and disappear against it. */}
        <div className="header-status flex items-center gap-3 relative z-50">
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
        <div className="header-logo hidden justify-self-center md:flex">
          <button
            type="button"
            aria-label="Go to home page"
            onMouseEnter={() => showGhost("Home")}
            onMouseLeave={hideGhost}
            onClick={goHome}
            onFocus={() => showGhost("Home")}
            onBlur={hideGhost}
            className={`cursor-pointer text-xl font-semibold tracking-[0.2em] lg:text-text md:text-3xl ${
                isOpen ? "text-text-menu relative z-50" : "text-text "
              }`}
          >
            <span className="text-xl font-semibold tracking-[0.2em] md:text-3xl">VICKY</span>
          </button>
        </div>

        <div className="flex items-center gap-3 justify-end">
          
          {/* Mobile Meun + Title */}
          <div className="flex items-center gap-3 md:hidden">
            
            {/* Mobile Menu Title */}
            <h1
              onClick={goHome}
              className={`cursor-pointer text-xl font-semibold tracking-[0.2em] md:hidden ${
                isOpen ? "text-text-menu relative z-50" : "text-text "
              }`}
            >
              VICKY
            </h1>
            <MobileMenu items={navItems} />
          </div>

          <div className="hidden items-center gap-3 md:flex lg:gap-5">
            <div className="header-edition text-right font-body leading-snug text-xl lg:text-3xl">
              <span className="block pr-2">Folio</span>
              <span className="block">&rarr; &apos;26</span>
            </div>

            <button
              type="button"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              onClick={toggleTheme}
              className="flex min-h-11 min-w-11 items-center justify-center text-lg text-text-muted transition hover:text-text"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
