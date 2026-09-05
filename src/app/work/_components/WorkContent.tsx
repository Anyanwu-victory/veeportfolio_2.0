"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Container from "@/components/ui/Container";
import styles from "./WorkContent.module.css";

const experiences = [
  {
    index: "01",
    company: "Frikax",
    role: "Frontend Developer",
    period: "(Mar '22 - Aug '22)",
    description:
      "Worked with talented designers and developers while transforming designs into beautiful portfolio themes. Integrated a couple of features in the web app.",
    tools: "NEXT JS, TAILWIND CSS, GIT/GITHUB",
  },
  {
    index: "02",
    company: "Independent",
    role: "Creative Developer",
    period: "(May '22 - present)",
    description:
      "Exploring different approaches to creating amazing websites while collaborating with amazing designers",
    tools: "WEBGL, GLSL, THREEJS, GSAP, WAAPI, OBJECT ORIENTED JAVASCRIPT",
  },
];

export default function WorkContent() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  // One paused hover timeline per row, only ever populated on laptop+
  // (see the isDesktop branch below). On mobile/tablet these stay null,
  // which makes the onMouseEnter/onMouseLeave handlers in the JSX safe
  // no-ops via optional chaining — no separate width-check needed there.
  const hoverTlRefs = useRef<(gsap.core.Timeline | null)[]>([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(h1Ref.current, { yPercent: 0, rotate: 0 });
      gsap.set(introRef.current, { opacity: 1, y: 0 });
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const q = gsap.utils.selector(row);
        gsap.set(row, { opacity: 1 });
        gsap.set(
          [
            q(`.${styles.headerContent}`),
            q(`.${styles.roleBlock}`),
            q(`.${styles.tools}`),
          ],
          { opacity: 1, x: 0, y: 0 },
        );
      });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobileOrTablet: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        // Heading + intro — identical either way, built fresh inside this
        // callback (rather than shared across branches) so gsap.matchMedia
        // can cleanly revert the whole thing if the viewport crosses the
        // 1024px line, instead of two branches fighting over one timeline.
        const tl = gsap.timeline();
        tl.fromTo(
          h1Ref.current,
          { yPercent: 110, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1.3, ease: "power3.out" },
        );
        tl.fromTo(
          introRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        );

        rowRefs.current.forEach((row, i) => {
          if (!row) return;
          const q = gsap.utils.selector(row);
          gsap.set(row, { opacity: 1 });

          if (isDesktop) {
            // LAPTOP+: company/role fade up on load. Description/tools
            // start hidden (also set via CSS as a pre-JS fallback) and
            // only ever appear on hover.
            gsap.set(q(`.${styles.tools}`), {
              opacity: 0,
              y: 16,
              pointerEvents: "none",
            });

            tl.fromTo(
              q(`.${styles.companyBlock}, .${styles.roleBlock}`),
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              i === 0 ? undefined : "-=0.5",
            );

            const roleBlockEl = q(`.${styles.roleBlock}`);
            const roleLines = q(`.${styles.roleBlock} > *`);
            const toolsEl = q(`.${styles.tools}`);
            const detailLines = q(`.${styles.tools} > p`);
            const descriptionEl = q(`.${styles.description}`);
            const toolsLineEl = q(`.${styles.tools} p:last-child`);

            gsap.set(detailLines, {
              opacity: 0,
              y: -20,
            });

            // Paused, built once — driven purely by play()/reverse() on
            // hover rather than rebuilt on every mouseenter, same pattern
            // used elsewhere in this project for hover reveals.
            const hoverTl = gsap
              .timeline({ paused: true })
              // 1. Role/period fades out, sliding downward.
              .to(roleLines, {
                opacity: 0,
                y: 24,
                duration: 0.4,
                stagger: 0.12,
                ease: "power2.in",
              })
              .set(roleBlockEl, { pointerEvents: "none" })
              .set(toolsEl, {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
              })
              // 2. Description slides in from below (upward motion into
              //    place) — starts only once step 1 above has finished.
              .to(descriptionEl, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
              })
              // 3. THEN the tools line — starts only once the description
              //    tween directly above has finished, so each line
              //    genuinely shows before the next one starts.
              .to(toolsLineEl, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
              });

            hoverTlRefs.current[i] = hoverTl;
          } else {
            // Mobile/tablet — UNCHANGED from before.
            hoverTlRefs.current[i] = null;

            tl.fromTo(
              q(`.${styles.headerContent}`),
              { opacity: 0, x: -40 },
              { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
              i === 0 ? undefined : "-=0.5",
            ).fromTo(
              q(`.${styles.tools}`),
              { opacity: 0, x: 40 },
              { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
            );
          }
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <Container className={styles.page}>
      <main className={styles.main}>
        {/* Experience Header */}
        <section className={styles.hero}>
          <div className={styles.titleClip}>
            <h1 ref={h1Ref} style={{ willChange: "transform" }}>
              Work
            </h1>
          </div>
          <p ref={introRef} className={styles.intro} style={{ opacity: 0 }}>
            I did gain a little experience over the past year. The less boring
            stuffs are probably in my playground.
          </p>
        </section>

        {/* Experience Content */}
        <section className={styles.experience} aria-label="Work experience">
          {experiences.map((item, position) => (
            <article
              className={styles.row}
              key={item.company}
              ref={(el) => {
                rowRefs.current[position] = el;
              }}
              style={{ opacity: 0 }}
              onMouseEnter={() => hoverTlRefs.current[position]?.play()}
              onMouseLeave={() => hoverTlRefs.current[position]?.reverse()}
            >
              <div className={styles.rule} aria-hidden="true" />
              {/*  header */}
              <div className={styles.headerContent}>
                <header className={styles.companyBlock}>
                  <span className={styles.number}>{item.index}.</span>
                  <h2>{item.company}</h2>
                </header>
                <div className={styles.roleBlock}>
                  <h3>{item.role}</h3>
                  <p>{item.period}</p>
                </div>
              </div>
              {/* Tools and description div */}
              <div className={styles.tools}>
                <p className={styles.description}>{item.description}</p>
                <p>{item.tools}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </Container>
  );
}
