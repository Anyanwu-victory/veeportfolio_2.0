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
  const hoverTlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeRowRef = useRef<number | null>(null);
  const pinnedRowRef = useRef<number | null>(null);
  const revealRef = useRef<(index: number | null) => void>(() => {});

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isInteractive: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px), (min-width: 1024px) and (max-width: 1399px) and (hover: none) and (pointer: coarse)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isInteractive, reduceMotion } = context.conditions as {
          isInteractive: boolean;
          reduceMotion: boolean;
        };

        // Rebuild and reset when crossing the mobile breakpoint or changing
        // motion preferences, including after tablet rotation.
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

          if (isInteractive) {
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

            // Slide with the reveal on tablet taps and laptop/desktop hover.
            hoverTl.fromTo(q(`.${styles.companyBlock}`), {
              x: 0,
              xPercent: 0,
            }, {
              x: 0,
              xPercent: -28,
              duration: 0.9,
              ease: "power3.inOut",
            }, 0);

            hoverTlRefs.current[i] = hoverTl;
          } else {
            // Phones retain the entrance animation and always-visible details.
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

        if (reduceMotion) tl.progress(1).pause();

        revealRef.current = (index) => {
          if (!isInteractive) return;
          // Finish the entrance before interacting to avoid competing tweens.
          tl.progress(1).pause();
          activeRowRef.current = index;
          rowRefs.current.forEach((row, i) => {
            if (!row) return;
            const open = i === index;
            row.dataset.expanded = String(open);
            row.querySelector("button")?.setAttribute("aria-expanded", String(open));
            row.querySelector(`.${styles.tools}`)?.setAttribute("aria-hidden", String(!open));
            const animation = hoverTlRefs.current[i];
            if (reduceMotion) animation?.progress(open ? 1 : 0).pause();
            else if (open) animation?.play();
            else animation?.reverse();
          });
        };

        rowRefs.current.forEach((row) => {
          row?.querySelector(`.${styles.tools}`)?.setAttribute("aria-hidden", String(isInteractive));
        });

        return () => {
          revealRef.current = () => {};
          activeRowRef.current = null;
          pinnedRowRef.current = null;
          hoverTlRefs.current = [];
          rowRefs.current.forEach((row) => {
            if (!row) return;
            delete row.dataset.expanded;
            row.querySelector("button")?.setAttribute("aria-expanded", "false");
            row.querySelector(`.${styles.tools}`)?.removeAttribute("aria-hidden");
          });
        };
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
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                pinnedRowRef.current = null;
                revealRef.current(position);
              }}
              onPointerLeave={(event) => {
                if (
                  event.pointerType === "mouse" &&
                  pinnedRowRef.current !== position &&
                  activeRowRef.current === position
                ) {
                  revealRef.current(null);
                }
              }}
            >
              <button
                type="button"
                className={styles.revealButton}
                aria-label={`${item.company} details`}
                aria-expanded="false"
                aria-controls={`work-details-${item.index}`}
                onClick={() => {
                  const next = activeRowRef.current === position ? null : position;
                  pinnedRowRef.current = next;
                  revealRef.current(next);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    pinnedRowRef.current = null;
                    revealRef.current(null);
                  }
                }}
                onBlur={() => {
                  if (activeRowRef.current === position) {
                    pinnedRowRef.current = null;
                    revealRef.current(null);
                  }
                }}
              >
                <span className={styles.hoverLabel}>Tap to view details</span>
              </button>
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
              <div className={styles.tools} id={`work-details-${item.index}`}>
                <p className={styles.description}>{item.description}</p>
                <p>
                  <span>{item.tools}</span>
                  <span className={styles.revealPeriod}>{item.role} {item.period}</span>
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </Container>
  );
}
