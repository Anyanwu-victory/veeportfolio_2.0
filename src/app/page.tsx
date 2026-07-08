"use client";

import { useState } from "react";
import ButterflyLoader from "@/components/ButterflyLoader";
import Header from "@/components/Header";
import { NAV_ITEMS } from "@/components/DesktopNav";
import HomePage from "@/pages/home";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {!isLoaded && <ButterflyLoader onComplete={() => setIsLoaded(true)} />}

      <main
        style={{
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? "visible" : "hidden",
          transition: "opacity 1s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="m-0 p-0"
      >
        <Header
          activePage={activePage}
          onNavigate={handleNavigate}
          navItems={NAV_ITEMS}
        />

        <HomePage activePage={activePage} onNavigate={handleNavigate} />
      </main>
    </div>
  );
}

