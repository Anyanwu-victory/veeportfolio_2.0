"use client";

import { useState } from "react";
import ButterflyLoader from "@/components/ButterflyLoader";
import HomePage from "@/pages/homePage";
import SiteShell from "@/components/SiteShell";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState("/home");

  const handleNavigate = (href: string) => {
    setActivePage(href);
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
        <SiteShell activePage={activePage} onNavigateAction={handleNavigate}>
          <HomePage activePage={activePage} onNavigate={handleNavigate} />
        </SiteShell>
      </main>
    </div>
  );
}
