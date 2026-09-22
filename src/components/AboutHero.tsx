"use client";

import NeonRoom from "./NeonRoom";
import styles from "./NeonRoom.module.css";

import Image from "next/image";
import { motion } from "framer-motion";




const ease = [0.22, 1, 0.36, 1] as const;


// Desktop composition lives in backup.css; NeonRoom.module.css keeps the
// complete scene visible in the phone and tablet layouts.
export default function AboutHero() {
  return (
    <div className="about-hero__stage">
    <div className={`about-hero mt-4 md:mt-24 lg:mt-20 xl:mt-20 px-4 md:px-0 justify-center relative align-middle ${styles.hero}`}>
      <p className="about-hero__intro indent-14 lg:indent-28 font-display">
        In the game for over 6 years, I&apos;m currently based in Ho Chi
        Minh city, working as an independent designer since July, 2022.
      </p>
{/* 
      <div className="about-hero__photo">
        <NeonRoom />
      </div> */}


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

      <p className="about-hero__outro font-clash ">
        Enthusiastic about crafting{" "}
        <span className="about-hero__em">
          ideas, visual elements, motion
        </span>{" "}
        and <span className="about-hero__em">typography</span> into
        memorable creations.
      </p>

      <p className="about-hero__caption">
        This is me, doing
        <br />
        my daily things
      </p>
    </div>
    </div>
  );
}
