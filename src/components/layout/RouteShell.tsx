"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/context/themeContext";
import IntroGate from "@/components/layout/IntroGate";
import SiteShell from "@/components/layout/SiteShell";

type RouteShellProps = {
  children: ReactNode;
};

export default function RouteShell({ children }: RouteShellProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return children;
  }

  return (
    <ThemeProvider>
      <IntroGate>
        <SiteShell>{children}</SiteShell>
      </IntroGate>
    </ThemeProvider>
  );
}
