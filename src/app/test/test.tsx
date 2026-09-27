"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "./test.css";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutHero() {
  return (
    // z-30 keeps this below the fixed nav's z-40, same convention as the
    // rest of the site's page content.
    <div className="about-hero">
      <motion.div
        className="about-hero__eyebrow"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        <span />
        <p>02 — About</p>
      </motion.div>

      <motion.h1
        className="about-hero__heading"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease }}
      >
        Focused, unhurried,
        <br />
        <span className="about-hero__heading-accent">mostly caffeinated.</span>
      </motion.h1>

      <motion.p
        className="about-hero__intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease }}
      >
        {/* Draft copy — swap for your own voice. Kept it close to your
            real profile (frontend dev, Lagos, Dotmac) rather than generic
            portfolio filler. */}
        Frontend developer based in Lagos, building motion-driven,
        editorial-leaning interfaces. Most days that means a laptop, a cold cup
        of coffee, and a cat who&apos;s asleep before I&apos;ve had my first
        idea.
      </motion.p>

      <motion.div
        className="about-hero__banner"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.55, ease }}
      >
        <Image
          src="/assets/images/About_Image_page.png"
          alt="Illustration of Victory floating with a laptop, a sleeping cat, a coffee mug reading 'Good Code Better Coffee,' and a trailing plant"
          fill
          className="about-hero__banner-img"
          priority
        />
      </motion.div>

      <motion.div
        className="about-hero__details"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75, ease }}
      >
        <div>
          <p className="about-hero__details-label">Currently</p>
          <p className="about-hero__details-value">
            Frontend Developer at Dotmac Technologies
          </p>
        </div>
        <div>
          <p className="about-hero__details-label">Stack</p>
          <p className="about-hero__details-value">
            React &middot; Next.js &middot; TypeScript &middot; GSAP &middot;
            Tailwind
          </p>
        </div>
        <div>
          <p className="about-hero__details-label">Read more</p>
          <a href="#" className="about-hero__details-link">
            Folio &apos;26 /{" "}
            <span className="about-hero__details-link-accent">Résumé</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
