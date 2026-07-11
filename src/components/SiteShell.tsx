"use client";

import Header from "@/components/Header";
import Navigation from "@/components/DesktopNav";
import Footer from "@/components/Footer";
import { NavHoverProvider } from "@/context/navigationHoverContext";
import { navItems as defaultNavItems } from "@/lib/navItems";
import type { ReactNode } from "react";
import type { NavItem } from "@/lib/navItems";

type SiteShellProps = {
  children: ReactNode;
  activePage: string;
  onNavigate: (href: string) => void;
  navItems?: NavItem[];
};

export default function SiteShell({
  children,
  activePage,
  onNavigate,
  navItems = defaultNavItems,
}: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <NavHoverProvider>
        <Header activePage={activePage} onNavigate={onNavigate} navItems={navItems} />

        <section className="home_navigation">
          <Navigation activePage={activePage} onNavigate={onNavigate} items={navItems} />
        </section>

        {children}

        <Footer />
      </NavHoverProvider>
    </div>
  );
}
