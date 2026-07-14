"use client";

import React from 'react'


import { motion, type Variants } from "framer-motion";
import Illustration from "@/components/Illustration";
import { navItems } from "@/lib/navItems";

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
    <section className="relative flex flex-1 flex-col px-6 md:px-10 lg:px-12 mt-22">
      {/* ---------------- Mobile (< md) ---------------- */}
      <div className="flex flex-1 flex-col items-center justify-between pb-8 pt-6 md:hidden">
        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-center font-display text-6xl italic leading-[1.05]"
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
          className="mt-6 max-w-xs space-y-4 text-center font-body"
        >
          <p className="text-base font-medium">Frontend Developer from Nigeria.</p>
          <p className="text-sm leading-relaxed text-ink-soft">
            Passionate about motion, interactivity, 3d, and utilizing them for
            building immersive, memorable web experiences.
          </p>
        </motion.div>

        <Illustration className="mt-8 max-w-70" />

      </div>

      {/* ---------------- Tablet (md to <lg) ---------------- */}
      <div className="hidden flex-1 flex-col items-center justify-between py-10 md:flex lg:hidden">
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="text-center font-display text-7xl italic leading-none"
        >
          Good<span className="not-italic">Ness</span>
        </motion.h1>

        <Illustration className="my-10 max-w-md" />


      
      </div>

      {/* ---------------- Desktop (lg+) ---------------- */}
      <div className="hidden flex-1 flex-col items-center justify-between py-10 lg:flex">
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="text-center font-display text-[8.5rem] italic leading-none xl:text-[10rem]"
        >
          Vic<span className="not-italic">tory</span>
        </motion.h1>


      </div>
    </section>
  );
}

export default Hero;