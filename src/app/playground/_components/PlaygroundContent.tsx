"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { gsap } from "gsap";
import Container from "@/components/ui/Container";
import { projects } from "./projects";
import styles from "./PlaygroundContent.module.css";

export default function PlaygroundContent() {
  const pageRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLSpanElement>(null);
  const draggedRef = useRef(false);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const gallery = galleryRef.current;
    if (!page || !gallery) return;

    // MatchMedia owns every tween and reverts them on resize, preference change,
    // or route exit. The phone marquee never runs behind the desktop heading.
    const media = gsap.matchMedia();
    media.add({
      phone: "(max-width: 767px)",
      larger: "(min-width: 768px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { phone, reduced } = context.conditions as Record<string, boolean>;
      const select = gsap.utils.selector(page);

      if (!reduced) {
        gsap.timeline()
          .fromTo(select(`.${styles.heading}`),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
          .fromTo(select(`.${styles.intro}`),
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
          .fromTo(select(`.${styles.project}`),
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }, "-=0.35");

        if (phone) {
          // Two identical groups make a seamless loop at exactly half the width.
          gsap.fromTo(marqueeRef.current, { xPercent: 0 }, {
            xPercent: -50, duration: 22, repeat: -1, ease: "none",
          });
        }
      }

      let target = gallery.scrollLeft;
      let pointer: { id: number; x: number; scroll: number } | null = null;
      const limit = () => Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      const moveTo = (value: number) => {
        target = gsap.utils.clamp(0, limit(), value);
        if (reduced) gallery.scrollLeft = target;
        else gsap.to(gallery, {
          scrollLeft: target, duration: 0.65, ease: "power3.out", overwrite: true,
        });
      };

      // Convert vertical wheel input into horizontal gallery travel. Touch stays
      // native, retaining momentum and pinch zoom; Ctrl+wheel remains browser zoom.
      const onWheel = (event: WheelEvent) => {
        if (event.ctrlKey) return;
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? gallery.clientWidth : 1;
        const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
        if (!delta || !limit()) return;
        event.preventDefault();
        if (!gsap.isTweening(gallery)) target = gallery.scrollLeft;
        moveTo(target + delta * unit);
      };

      // Mouse dragging supplements wheel, trackpad, touch, and keyboard input.
      // Capture begins only after movement so an ordinary project click still opens.
      const onPointerDown = (event: PointerEvent) => {
        draggedRef.current = false;
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        gsap.killTweensOf(gallery);
        pointer = { id: event.pointerId, x: event.clientX, scroll: gallery.scrollLeft };
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!pointer || pointer.id !== event.pointerId) return;
        const distance = pointer.x - event.clientX;
        if (!draggedRef.current && Math.abs(distance) < 6) return;
        draggedRef.current = true;
        gallery.dataset.dragging = "true";
        gallery.setPointerCapture(event.pointerId);
        gallery.scrollLeft = gsap.utils.clamp(0, limit(), pointer.scroll + distance);
        target = gallery.scrollLeft;
      };
      const onPointerEnd = () => {
        if (pointer && gallery.hasPointerCapture(pointer.id)) gallery.releasePointerCapture(pointer.id);
        pointer = null;
        delete gallery.dataset.dragging;
      };
      const onKeyDown = (event: KeyboardEvent) => {
        const step = gallery.clientWidth * 0.75;
        const destinations: Record<string, number> = {
          ArrowRight: gallery.scrollLeft + step,
          ArrowLeft: gallery.scrollLeft - step,
          Home: 0,
          End: limit(),
        };
        if (!(event.key in destinations)) return;
        event.preventDefault();
        moveTo(destinations[event.key]);
      };
      const onNativeScroll = () => {
        if (!gsap.isTweening(gallery)) target = gallery.scrollLeft;
      };
      const resize = new ResizeObserver(() => {
        gsap.killTweensOf(gallery);
        target = Math.min(gallery.scrollLeft, limit());
        gallery.scrollLeft = target;
      });
      resize.observe(gallery);
      page.addEventListener("wheel", onWheel, { passive: false });
      gallery.addEventListener("pointerdown", onPointerDown);
      gallery.addEventListener("pointermove", onPointerMove);
      gallery.addEventListener("pointerup", onPointerEnd);
      gallery.addEventListener("pointercancel", onPointerEnd);
      gallery.addEventListener("keydown", onKeyDown);
      gallery.addEventListener("scroll", onNativeScroll, { passive: true });

      return () => {
        resize.disconnect();
        onPointerEnd();
        gsap.killTweensOf(gallery);
        page.removeEventListener("wheel", onWheel);
        gallery.removeEventListener("pointerdown", onPointerDown);
        gallery.removeEventListener("pointermove", onPointerMove);
        gallery.removeEventListener("pointerup", onPointerEnd);
        gallery.removeEventListener("pointercancel", onPointerEnd);
        gallery.removeEventListener("keydown", onKeyDown);
        gallery.removeEventListener("scroll", onNativeScroll);
      };
    });
    return () => media.revert();
  }, []);

  return (
    <Container>
      <main className={styles.page} ref={pageRef}>
        <section className={styles.hero} aria-labelledby="playground-heading">
          <h1 className={styles.heading} id="playground-heading">
            <span className="sr-only">Playground</span>
            <span className={styles.staticWord} aria-hidden="true">Playground</span>
            <span className={styles.marquee} aria-hidden="true">
              <span className={styles.marqueeTrack} ref={marqueeRef}>
                {[0, 1].map((group) => (
                  <span className={styles.marqueeGroup} key={group}>
                    <span>Playground</span><span>Playground</span>
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <p className={styles.intro}>From blood, sweat and experimentations to beautiful websites</p>
        </section>

        <p id="gallery-help" className="sr-only">
          Swipe, drag, or scroll to browse projects. Use the left and right arrow
          keys, Home, or End when the gallery is focused. Project links open in a new tab.
        </p>
        <div
          className={styles.gallery}
          ref={galleryRef}
          role="region"
          aria-label="Playground projects"
          aria-describedby="gallery-help"
          tabIndex={0}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            // A completed drag must not accidentally follow the link under it.
            if (draggedRef.current && event.detail !== 0) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        >
          <ul className={styles.track}>
            {projects.map((project, projectIndex) => (
              <li className={styles.projectItem} key={project.id}>
                <a
                  className={styles.project}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} — open live project in a new tab`}
                  draggable={false}
                >
                  <div className={styles.projectInfo}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.description}>{project.description}</p>
                    <ul className={styles.tools} aria-label="Tools used">
                      {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                    </ul>
                    <span className={styles.live}><Eye aria-hidden="true" />Live</span>
                  </div>
                  <div className={styles.previews}>
                    {project.previews.map((preview, previewIndex) => (
                      <figure className={styles.preview} key={preview}>
                        <Image
                          src={`/assets/playground/${preview}.webp`}
                          alt={`${project.title} — preview ${previewIndex + 1}`}
                          width={1512}
                          height={982}
                          sizes="(max-width: 767px) 75vw, 22.43vw"
                          loading={projectIndex === 0 ? "eager" : "lazy"}
                          draggable={false}
                        />
                      </figure>
                    ))}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Container>
  );
}
