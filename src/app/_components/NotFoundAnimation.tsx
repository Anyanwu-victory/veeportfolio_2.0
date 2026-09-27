"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

type NotFoundAnimationProps = {
  className?: string;
};

export default function NotFoundAnimation({
  className,
}: NotFoundAnimationProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <DotLottieReact
      className={className}
      src="/assets/animations/404 error page with cat.json"
      autoplay={!prefersReducedMotion}
      loop={!prefersReducedMotion}
      renderConfig={{ autoResize: true }}
      role="img"
      aria-label="An animated cat searching for the missing page"
    />
  );
}
