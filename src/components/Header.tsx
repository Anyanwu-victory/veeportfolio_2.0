"use client";

import MobileMenu from "@/components/MobileMenu";
import { useTheme } from "@/context/themeContext";

type NavItem = {
  num: string;
  label: string;
  page: string;
};

type HeaderProps = {
  activePage: string;
  onNavigate: (page: string) => void;
  navItems: NavItem[];
};

export default function Header({
  activePage,
  onNavigate,
  navItems,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 header">
      <div className="mx-auto flex h-20 max-w-450 items-center justify-between
       ">
        {/* Left title */}

        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-text" />

          <p className="max-w-35 text-[10px] leading-tight text-text-muted md:text-[11px]">
            Open for any
            <br /> collaborations and offers
          </p>
        </div>

        {/* Logo -miid*/}

        <h1 className="text-xl font-semibold tracking-[0.2em] text-text md:text-3xl">
          VICKY
        </h1>

        {/* Right */}

        <div className="flex items-center gap-3">
          <div className="hidden text-right font-body text-xs leading-snug md:block">
            <span className="block pr-2">Folio</span>
            <span className="block">&rarr; &apos;26</span>
          </div>

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
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
