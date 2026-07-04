"use client";

import { useTheme } from "@/context/themeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header ">
      <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-3">

          <span className="h-2 w-2 rounded-full bg-text" />

          <p className="max-w-[140px] text-[11px] leading-tight text-text-muted">
            Open for any collaborations and offers
          </p>

        </div>

        {/* Logo */}

        <h1 className="text-3xl font-semibold tracking-[0.2em] text-text">
         VICKY
        </h1>

        {/* Right */}

        <div className="flex items-center gap-5">

          <span className="text-[11px] text-text-muted">
            Folio → '25
          </span>

          <button
            onClick={toggleTheme}
            className="text-lg text-text-muted transition hover:text-text"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

        </div>

      </div>
    </header>
  );
}