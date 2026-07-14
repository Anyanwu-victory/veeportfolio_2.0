import React from "react";

// Fixed + elevated to z-50 so it sits ABOVE the mobile menu overlay
// (MobileMenu's ".navigation"-style panel is `fixed inset-0 z-40`).
// Without an explicit position + z-index here, this would render as a
// normal static-flow element with a default stacking level well below
// any positioned element — meaning the overlay would visually bury it
// instead of it staying visible on top, like Header already does at the
// other end of the screen (also fixed, also z-50).
const Footer = () => {
  return (
    <footer className="footer fixed inset-x-0 bottom-0 z-50 py-10 text-center">
      <div className="footer_wrapper bottom flex flex-col items-center justify-center gap-2">
        <p className="font-body text-[10px] md:text-xs text-ink-soft xl:text-[14px] leading-normal ">
          Frontend Developer, Software Engineer
        </p>
      </div>
    </footer>
  );
};

export default Footer;