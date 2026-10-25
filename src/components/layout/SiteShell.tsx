"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import journalStyles from "./JournalShell.module.css";
import illustratedStyles from "./IllustratedShell.module.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import DesktopNav from "@/components/navigation/DesktopNav";
import { MobileMenuProvider } from "@/context/mobileMenuContext";
import { NavHoverProvider } from "@/context/navigationHoverContext";
import { navItems } from "@/lib/navItems";
import { useHomeIntro } from "@/components/layout/IntroGate";

type SiteShellProps = {
  children: ReactNode;
  resumeHref: string | null;
};

export default function SiteShell({ children, resumeHref }: SiteShellProps) {
  const pathname = usePathname();
  const introPhase = useHomeIntro();
  const isDesktopNavHidden =
    introPhase === "letters" || introPhase === "greeting";
  const isJournal = pathname === "/playground-journal";
  const isIllustrated = pathname === "/about-illustrated";
  return (
    <div className={`relative min-h-screen overflow-hidden ${isJournal ? journalStyles.shell : ""} ${isIllustrated ? illustratedStyles.shell : ""}`}>
     {/* Mobile Nav Provider */}
      <MobileMenuProvider>
        <NavHoverProvider>
          {/* Header */}
          <div className="opacity-100">
            <Header navItems={navItems} resumeHref={resumeHref} animateEntrance={pathname === "/"} />
          </div>

{/* Desktop andlaptop Navigaton */}
          <section className={`home_navigation transition-opacity duration-[800ms] ease-out ${isDesktopNavHidden ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <DesktopNav items={navItems} />
          </section>

          {children}

{/* Footer */}
          <Footer />
        </NavHoverProvider>
      </MobileMenuProvider>
    </div>
  );
}
