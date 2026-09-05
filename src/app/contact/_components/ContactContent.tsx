"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Container from "@/components/ui/Container";
import styles from "./ContactContent.module.css";

const contactLinks = [
  { label: "Github", value: "/Anyanwu-victory", href: "https://github.com/Anyanwu-victory" },
  { label: "Gmail", value: "victanyanwu306@gmail.com", href: "mailto:victanyanwu306@gmail.com" },
];

export default function ContactContent() {
  const pageRef = useRef<HTMLElement>(null);

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
            <span className={styles.clip}><span className={`${styles.word} ${styles.serif}`}>Say</span></span>
            <span className={styles.clip}><span className={`${styles.word} ${styles.sans}`}>Hi</span></span>
          </h1>

          <div className={styles.details} aria-label="Contact details">
            {contactLinks.map((item) => (
              <a className={`${styles.detail} ${styles.contactLink}`} href={item.href} key={item.label} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                <span>{item.label}</span><strong>{item.value}</strong>
              </a>
            ))}
          </div>

          <video className={styles.visual} src="/assets/Portfolio_contact_image.mp4" autoPlay loop muted playsInline aria-label="A developer relaxing with a laptop" />

          <aside className={styles.credits} aria-label="Credits">
            <p className={styles.detail}>Built by <strong>Vicky</strong></p>
            <p className={styles.detail}>Type: <strong>Clash Display, Manuscribe</strong></p>
          </aside>
        </section>
      </main>
    </Container>
  );
}
