"use client";

import { useMobileMenu } from "@/context/mobileMenuContext";

export default function Footer() {
  const { isOpen } = useMobileMenu();

  return (
    <footer className="footer fixed inset-x-0 bottom-0 z-50 py-10 text-center">
      <div className="footer_wrapper bottom flex flex-col items-center justify-center gap-2">
        <p
          className={`font-body text-[10px] leading-normal md:text-xs xl:text-[14px] ${
            isOpen ? "text-text-menu" : "text-ink-soft"
          }`}
        >
          Frontend Developer, Software Engineer
        </p>
      </div>
    </footer>
  );
}
