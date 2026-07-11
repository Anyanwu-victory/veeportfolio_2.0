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
  onNavigateAction: (href: string) => void;
  navItems?: NavItem[];
};

export default function SiteShell({
  children,
  activePage,
  onNavigateAction,
  navItems = defaultNavItems,
}: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <NavHoverProvider>
        <Header activePage={activePage} onNavigateAction={onNavigateAction} navItems={navItems} />

        <section className="home_navigation">
          <Navigation activePage={activePage} onNavigate={onNavigateAction} items={navItems} />
        </section>

        {children}

        <Footer />
      </NavHoverProvider>
    </div>
  );
}
