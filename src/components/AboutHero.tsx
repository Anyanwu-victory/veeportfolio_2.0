"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

export default function AboutHero() {
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!floatRef.current) return;

    // Subtle idle loop while the illustration just sits there — GSAP
    // handles infinite yoyo loops more naturally than Framer Motion's
    // one-shot entrance below, so the two libraries are each doing the
    // part they're better at rather than picking one for everything.
    const floatTween = gsap.to(floatRef.current, {
      y: -12,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      floatTween.kill();
    };
  }, []);

  return (
    <div className="relative min-h-screen px-14">
      {/* Upper zone */}
      <div
        className="absolute inset-x-14  top-16 flex flex-col justify-center"
        style={{ bottom: "calc(50vh + 80px)" }}
      >
        <h1 className="max-w-2xl font-display text-4xl italic leading-tight md:text-5xl">
          Interfaces should feel{" "}
          <span className="not-italic text-accent">as considered</span> as
          they look.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-text-muted">
          Frontend developer based in Lagos, building motion-driven,
          editorial-leaning web experiences.
        </p>
      </div>

      {/* Centered illustration — sits in the SAME vertical band the fixed
          nav occupies. z-30 keeps it below the nav's z-40, so hovering a
          nav item (or clicking, triggering the fullscreen expand) still
          draws on top of it exactly like on the homepage. Swap the src
          for your own asset — /about-illustration.png is a placeholder. */}
      <motion.div
        ref={floatRef}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 z-30 w-[280px] -translate-x-1/2 -translate-y-1/2 md:w-[360px] lg:w-[800px]"
      >
        <Image
          src="/assets/images/white mustang 2.jpg"
          alt="Illustration of Vicky at her desk"
          width={1000}
          height={1000}
          className="h-auto w-full object-cover"
          priority
        />
      </motion.div>

      {/* Lower zone */}
      <div
        className="absolute inset-x-14 flex justify-end "
        style={{ top: "calc(50vh + 80px)", bottom: "6rem" }}
      >
        <div className="flex max-w-xs flex-col gap-7 text-right">
          <div>
            <p className="mb-2 text-[11px] tracking-wider text-text-muted">
              Currently
            </p>
            <p className="text-sm leading-relaxed">
              Frontend Developer at Dotmac Technologies
            </p>
          </div>
          <div>
            <p className="mb-2 text-[11px] tracking-wider text-text-muted">
              Stack
            </p>
            <p className="text-sm leading-relaxed">
              React &middot; Next.js &middot; TypeScript &middot; GSAP &middot;
              Tailwind
            </p>
          </div>
          <div>
            <p className="mb-2 text-[11px] tracking-wider text-text-muted">
              Read more
            </p>
            <a
              href="#"
              className="inline-block border-b border-white/10 text-sm"
            >
              Folio &apos;26 /{" "}
              <span className="font-semibold text-accent">Résumé</span>
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
}