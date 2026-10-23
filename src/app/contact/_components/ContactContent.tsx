"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Container from "@/components/ui/Container";
import type { ContactPageData } from "@/sanity/lib/queries";
import styles from "./ContactContent.module.css";

type ContactContentProps = {
  data: ContactPageData;
};

export default function ContactContent({ data }: ContactContentProps) {
  const pageRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // One measured entrance keeps the contact screen calm and leaves the
    // shared navigation motion as the only other animation in the viewport.
    const context = gsap.context(() => {
      gsap.timeline()
        .fromTo(`.${styles.word}`, { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.12, ease: "power3.out" })
        .fromTo(`.${styles.detail}`, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out" }, "-=0.5")
        .fromTo(`.${styles.visual}`, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, "<");
    }, page);
    return () => context.revert();
  }, []);

  return (
    <Container>
      <main className={styles.page} ref={pageRef}>
        <section className={styles.hero} aria-labelledby="contact-heading">
          <h1 className={styles.heading} id="contact-heading">
            <span className={styles.clip}><span className={`${styles.word} ${styles.serif}`}>{data.heading}</span></span>
            {/* <span className={styles.clip}><span className={`${styles.word} ${styles.sans}`}>Hi</span></span> */}
          </h1>

          {/* Contact details */}
          <div className={styles.details} aria-label="Contact details">
            {data.links.map((item) => (
              <a className={`${styles.detail} ${styles.contactLink}`} href={item.href} key={item._key} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
               {/*contact Label */}
                <span>{item.label}</span>
                {/* contact Value */}
                <strong>{item.displayValue}</strong>
              </a>
            ))}
          </div>
          {/* Visual */}
          <DotLottieReact
            className={styles.visual}
            src={data.animationPath}
            autoplay={!prefersReducedMotion}
            loop={!prefersReducedMotion}
            renderConfig={{ autoResize: true }}
            role="img"
            aria-label={data.animationAlt}
          />

          {/* Credits */}
          <aside className={styles.credits} aria-label="Credits">
            <p className={styles.detail}>Inspired by: <strong>Goodness</strong></p>
            <p className={styles.detail}>Built by: <strong>Victory</strong></p>
            <p className={styles.detail}>Type: <strong>Clash Display, Manuscribe</strong></p>
          </aside>
        </section>
      </main>
    </Container>
  );
}
