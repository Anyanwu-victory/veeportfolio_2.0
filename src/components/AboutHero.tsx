"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

// Layout for this component now lives in globals.css under the
// `.about-hero` classes (see about-hero.css.txt) — one set of markup,
// positioned differently per breakpoint via media queries, rather than
// duplicating the whole block for mobile vs desktop like before.
export default function AboutHero() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!photoRef.current) return;

    // Only one tween needed now that there's only one photo element
    // (previously this ran twice, once per duplicated DOM block).
    const tween = gsap.to(photoRef.current, {
      y: -10,
      duration: 3.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="about-hero__stage">
    <div className="about-hero mt-4 md:mt-24 lg:mt-20 xl:mt-20 px-4 md:px-0 justify-center relative align-middle">
      {/* <span className="about-hero__dot" /> */}

      <p className="about-hero__intro indent-14 lg:indent-28 font-display">
        In the game for over 6 years, I&apos;m currently based in Ho Chi
        Minh city, working as an independent designer since July, 2022.
      </p>

      <div 
      //ref={photoRef}
       className="about-hero__photo">
        <Image
          src="/assets/images/Dark-About-image.png"
          alt="Vicky at her desk"
          fill
          className="about-hero__photo-img"
          priority
        />
      </div>

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