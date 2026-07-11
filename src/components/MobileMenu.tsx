"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import type { NavItem } from "@/lib/navItems";

type MobileMenuProps = {
  items: NavItem[];
  activePage: string;
  onNavigate: (href: string) => void;
};

export default function MobileMenu({
  items,
  activePage,
  onNavigate,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative z-50 flex h-9 w-9 items-center justify-center md:hidden"
        aria-label="Toggle navigation menu"
      >
        <Menu size={28} />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-surface flex flex-col justify-center gap-10 p-10">
          {items.map((item: NavItem) => (
            <button
              key={item.href}
              onClick={() => {
                onNavigate(item.href);
                setOpen(false);
              }}
              className={`text-left text-3xl ${
                activePage === item.href ? "text-accent" : "text-text"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
