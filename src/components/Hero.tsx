"use client";

import React from 'react'


import { motion, type Variants } from "framer-motion";
import Illustration from "@/components/Illustration";

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
  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] max-h-screen flex-col justify-between px-6 pt-28 pb-28 md:px-10 md:pt-32 lg:px-12 lg:pt-36 xl:pt-40 overflow-hidden">
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="font-display italic leading-[0.95] text-[3.35rem] md:text-[4.5rem] lg:text-[6.5rem] xl:text-[8.5rem]"
        >
          <motion.span custom={0.1} variants={fadeUp} className="block">
            Goody
          </motion.span>
          <motion.span custom={0.22} variants={fadeUp} className="block not-italic">
            Boy
          </motion.span>
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.36}
          variants={fadeUp}
          className="mx-auto max-w-xl space-y-4 font-body text-base md:text-lg lg:hidden block"
        >
          <p className="font-medium">Frontend Developer from Nigeria.</p>
          <p className="leading-relaxed text-ink-soft">
            Passionate about motion, interactivity, 3d, and utilizing them for
            building immersive, memorable web experiences.
          </p>
        </motion.div>
      </div>

      <div className="flex w-full flex-col items-center justify-end mt-8 md:mt-50 lg:mt-15">
        <Illustration className="w-full max-w-190 max-h-[44vh] md:max-h-[48vh] lg:max-h-[54vh]" />
      </div>
    </section>
  );
}

export default Hero;
