"use client";

import type { ReactNode } from "react";
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
  return (
    <div className="relative min-h-screen overflow-hidden">
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
