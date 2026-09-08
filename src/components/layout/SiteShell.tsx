"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import journalStyles from "./JournalShell.module.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import DesktopNav from "@/components/navigation/DesktopNav";
import { MobileMenuProvider } from "@/context/mobileMenuContext";
import { NavHoverProvider } from "@/context/navigationHoverContext";
import { navItems } from "@/lib/navItems";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const isJournal = usePathname() === "/playground-journal";
  return (
    <div className={`relative min-h-screen overflow-hidden ${isJournal ? journalStyles.shell : ""}`}>
      <MobileMenuProvider>
        <NavHoverProvider>
          <Header navItems={navItems} />

          <section className="home_navigation">
            <DesktopNav items={navItems} />
          </section>

          {children}

          <Footer />
        </NavHoverProvider>
      </MobileMenuProvider>
    </div>
  );
}
