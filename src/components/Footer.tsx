"use client";

import React from "react";
import { useMobileMenu } from "@/context/mobileMenuContext";

// Fixed + elevated to z-50 so it sits ABOVE the mobile menu overlay
// (z-40). Text color switches to the overlay-safe token while the menu
// is open, for the same reason as Header — `text-ink-soft` follows the
// site theme and goes dark-on-dark against the sidebar's fixed #192123
// background in light mode otherwise.
const Footer = () => {
  const { isOpen } = useMobileMenu();

  return (
    <footer className="footer fixed inset-x-0 bottom-0 z-50 py-10 text-center">
      <div className="footer_wrapper bottom flex flex-col items-center justify-center gap-2">
        <p
          className={`font-body text-[10px] md:text-xs xl:text-[14px] leading-normal ${
            isOpen ? "text-text-menu" : "text-ink-soft"
          }`}
        >
          Frontend Developer, Software Engineer
        </p>
      </div>
    </footer>
  );
};

export default Footer;