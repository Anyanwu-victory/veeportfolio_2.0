"use client";

import React from 'react'


import { motion, type Variants } from "framer-motion";
import Illustration from "@/components/Illustration";
import { useHomeIntro } from "@/components/layout/IntroGate";
import introStyles from "@/components/layout/IntroGate.module.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

function NavColumn({
  number,
  label,
  align = "left",
}: {
  number: string;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      className={`group flex flex-col ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
    >
      <span className="font-body text-xs text-ink-soft">{number}.</span>
      <span className="font-display text-lg italic transition-colors group-hover:text-accent lg:text-xl">
        {label}
      </span>
    </a>
  );
}

const Hero = () => {
  const introPhase = useHomeIntro();
  const isLetterRevealActive = introPhase === "letters";
  const isIntroInProgress = introPhase !== "complete";
  const isGreetingVisible = introPhase !== "letters";
  const isIllustrationVisible =
    introPhase === "illustration" || introPhase === "complete";

  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] max-h-screen flex-col justify-between px-6 pt-28 pb-28 md:px-10 md:pt-50 lg:px-12 lg:pt-36 xl:pt-40 overflow-hidden">
      <div className="flex flex-col items-center gap-4 text-center">
        <span
          className={`text-md font-semibold tracking-[0.2em] transition-opacity duration-700 ease-out motion-reduce:transition-none md:text-2xl ${isGreetingVisible ? "opacity-100" : "opacity-0"}`}
        >
          Hello, I'm
        </span>

        <h1 className="font-display italic leading-[0.95] text-[3.35rem] md:text-[4.5rem] lg:text-[6.5rem] xl:text-[8.5rem]">
          <span className="block font-display italic leading-[0.95]">
            <span
              className={
                isLetterRevealActive
                  ? introStyles.leadLetter
                  : introStyles.leadLetterSettled
              }
            >
              V
            </span>
            <span
              className={
                isIntroInProgress
                  ? introStyles.remainingFrame
                  : introStyles.remainingFrameSettled
              }
            >
              <span
                className={
                  isIntroInProgress
                    ? introStyles.remainingLetters
                    : introStyles.remainingLettersSettled
                }
              >
                ictory
              </span>
            </span>
          </span>
        </h1>

        <motion.div
          initial={isLetterRevealActive ? { opacity: 0 } : "hidden"}
          animate={isLetterRevealActive ? { opacity: 0 } : "visible"}
          custom={0.36}
          variants={fadeUp}
          transition={isLetterRevealActive ? { duration: 0 } : undefined}
          className={`mx-auto flex max-w-xl flex-col items-center gap-5 font-body text-base md:text-lg ${isLetterRevealActive ? "pointer-events-none" : ""}`}
        >
          <div className="space-y-3 lg:hidden">
            <p className="font-medium text-[10px]">
              Frontend Engineer based in Abuja.
            </p>
            <p className="leading-relaxed text-ink-soft text-[12px]">
              I build web products people enjoy using, I turn designs into
              interfaces that actually feel like something with motion.
            </p>
          </div>
        </motion.div>
      </div>

      <div
        className={`flex w-full flex-col items-center justify-end mt-8 md:mt-48 lg:mt-15 transition-opacity duration-[1400ms] ease-out ${isIllustrationVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <Illustration className="w-full max-w-190 max-h-[44vh] md:max-h-[48vh] lg:max-h-[54vh] " />
      </div>
    </section>
  );
}

export default Hero;
