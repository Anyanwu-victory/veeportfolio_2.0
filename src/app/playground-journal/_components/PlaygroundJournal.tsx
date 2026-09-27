"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { gsap } from "gsap";
import {
  projects,
  type PlaygroundProject,
} from "./projects";
import styles from "./PlaygroundJournal.module.css";

const studies: Record<string, { category: string; note: string }> = {
  vsl: {
    category: "People & connection",
    note: "A dating interface with a very specific setting: Lagos. Profiles, discovery, and the possibility of a match.",
  },
  untitled01: {
    category: "Recreation study",
    note: "A closer look at karinasirqueira.com, recreated with the fundamentals: HTML, CSS, and JavaScript.",
  },
  untitled02: {
    category: "Interaction study",
    note: "A small question with room to play: how else could a rating feel? An exploration with Rive and RAF.",
  },
  howdy: {
    category: "Web application",
    note: "A space for conversation. An instant messaging experiment bringing Vue, Express, GSAP, and TypeScript together.",
  },
  endl: {
    category: "React exploration",
    note: "Exploring React through Kadet’s EndSars. A study built around an existing idea and a different set of tools.",
  },
};

function Experiment({
  project,
  index,
  featured = false,
}: {
  project: PlaygroundProject;
  index: number;
  featured?: boolean;
}) {
  const [frame, setFrame] = useState(0);
  const [previewing, setPreviewing] = useState(false);
  const study = studies[project.id];

  useEffect(() => {
    if (!previewing) return;
    let advances = 0;
    // One short pass through the screenshots per hover, with no perpetual loop.
    const timer = window.setInterval(() => {
      setFrame((current) => (current + 1) % project.previews.length);
      advances += 1;
      if (advances >= project.previews.length - 1) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [previewing, project.previews.length]);

  return (
    <article
      className={`${styles.experiment} ${featured ? styles.featured : ""}`}
      data-project={project.id}
      aria-labelledby={`journal-${project.id}`}
    >
      <div className={styles.entryLabel}>
        <span>Experiment / {String(index + 1).padStart(2, "0")}</span>
        <span>{featured ? "In the spotlight" : study.category}</span>
      </div>
      <button
        className={styles.preview}
        type="button"
        aria-label={`Next preview of ${project.title}`}
        onPointerEnter={(event) => {
          if (
            event.pointerType === "mouse" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          )
            setPreviewing(true);
        }}
        onPointerLeave={() => setPreviewing(false)}
        onBlur={() => setPreviewing(false)}
        onClick={() => {
          setPreviewing(false);
          setFrame((current) => (current + 1) % project.previews.length);
        }}
      >
        <Image
          key={frame}
          className={styles.previewImage}
          src={`/assets/playground/${project.previews[frame]}.webp`}
          alt={`${project.title}, screen ${frame + 1} of ${project.previews.length}`}
          width={1512}
          height={982}
          sizes={
            featured
              ? "(max-width: 767px) 44vw, 88vw"
              : "(max-width: 767px) 44vw, 55vw"
          }
          loading={featured ? "eager" : "lazy"}
        />
        <span className={styles.previewControl} aria-hidden="true">
          Next preview <ArrowRight size={16} />
        </span>
        <span className={styles.frameCount} aria-hidden="true">
          0{frame + 1} / 0{project.previews.length}
        </span>
      </button>
      <div className={styles.previewStrip} aria-hidden="true">
        {project.previews.map((preview, previewIndex) => (
          <figure className={styles.previewFrame} key={preview}>
            <Image
              src={`/assets/playground/${preview}.webp`}
              alt=""
              width={1512}
              height={982}
              sizes="22.43vw"
              loading={featured && previewIndex === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </figure>
        ))}
      </div>
      <div className={styles.caption}>
        <div>
          <h2 id={`journal-${project.id}`}>
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              {project.title}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </h2>
          <p className={styles.description}>{project.description}</p>
        </div>
        <a
          className={styles.visit}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit experiment <ArrowUpRight size={15} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className={styles.study}>
        <span className={styles.noteLabel}>Study note</span>
        <p>{study.note}</p>
      </div>
      <ul
        className={styles.tools}
        aria-label={`Tools used for ${project.title}`}
      >
        {project.tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </article>
  );
}

export default function PlaygroundJournal() {
  const pageRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const draggedRef = useRef(false);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const gallery = galleryRef.current;
    if (!page || !gallery) return;

    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 1025px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduced } = context.conditions as Record<
          string,
          boolean
        >;
        const select = gsap.utils.selector(page);

        if (!reduced) {
          gsap
            .timeline()
            .fromTo(
              select(`.${styles.title}`),
              { yPercent: 110, rotate: 2 },
              { yPercent: 0, rotate: 0, duration: 1.3, ease: "power3.out" },
            )
            .fromTo(
              select(`.${styles.introduction}`),
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            )
            .fromTo(
              select(`.${styles.content}`),
              { autoAlpha: 0, y: 32 },
              { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
            );
        }

        if (!desktop) return;

        let target = gallery.scrollLeft;
        let pointer: { id: number; x: number; scroll: number } | null = null;
        const limit = () =>
          Math.max(0, gallery.scrollWidth - gallery.clientWidth);
        const moveTo = (value: number) => {
          target = gsap.utils.clamp(0, limit(), value);
          if (reduced) gallery.scrollLeft = target;
          else
            gsap.to(gallery, {
              scrollLeft: target,
              duration: 0.65,
              ease: "power3.out",
              overwrite: true,
            });
        };
        const onWheel = (event: WheelEvent) => {
          if (event.ctrlKey) return;
          const unit =
            event.deltaMode === 1
              ? 16
              : event.deltaMode === 2
                ? gallery.clientWidth
                : 1;
          const delta =
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
              ? event.deltaX
              : event.deltaY;
          if (!delta || !limit()) return;
          event.preventDefault();
          if (!gsap.isTweening(gallery)) target = gallery.scrollLeft;
          moveTo(target + delta * unit);
        };
        const onPointerDown = (event: PointerEvent) => {
          draggedRef.current = false;
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          gsap.killTweensOf(gallery);
          pointer = {
            id: event.pointerId,
            x: event.clientX,
            scroll: gallery.scrollLeft,
          };
        };
        const onPointerMove = (event: PointerEvent) => {
          if (!pointer || pointer.id !== event.pointerId) return;
          const distance = pointer.x - event.clientX;
          if (!draggedRef.current && Math.abs(distance) < 6) return;
          draggedRef.current = true;
          gallery.dataset.dragging = "true";
          gallery.setPointerCapture(event.pointerId);
          gallery.scrollLeft = gsap.utils.clamp(
            0,
            limit(),
            pointer.scroll + distance,
          );
          target = gallery.scrollLeft;
        };
        const onPointerEnd = () => {
          if (pointer && gallery.hasPointerCapture(pointer.id))
            gallery.releasePointerCapture(pointer.id);
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
      },
    );
    return () => media.revert();
  }, []);

  return (
    <main ref={pageRef} className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.masthead}>
          <span>A journal of experiments</span>
          <span>
            Vol. 01 / {String(projects.length).padStart(2, "0")} entries
          </span>
        </div>
        <div className={styles.titleClip}>
          <h1 className={styles.title}>
            Playground<span aria-hidden="true">*</span>
          </h1>
        </div>
        <div className={styles.introduction}>
          <p className={styles.lead}>
            Things I built because I wanted
            <br className={styles.desktopBreak} /> to see what would happen.
          </p>
          <div className={styles.heroAside}>
            <p>From blood, sweat and experimentations to beautiful websites</p>
            <a href="#experiments">
              Take a look around <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <ArrowDown
            className={styles.mobileArrow}
            size={28}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </header>

      <div
        className={styles.content}
        id="experiments"
        ref={galleryRef}
        role="region"
        aria-label="Playground experiments"
        tabIndex={0}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (draggedRef.current && event.detail !== 0) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        <div className={styles.portfolio}>
          <Experiment project={projects[0]} index={0} featured />
          <div className={styles.interlude}>
            <span className={styles.asterisk} aria-hidden="true">
              *
            </span>
            <p>
              Small ideas.
              <br />
              <em>Room to play.</em>
            </p>
            <span className={styles.marginNote}>
              Recreations, interactions,
              <br />
              and a few curious detours.
            </span>
          </div>
          <section className={styles.grid} aria-label="More experiments">
            {projects.slice(1).map((project, index) => (
              <Experiment
                key={project.id}
                project={project}
                index={index + 1}
              />
            ))}
          </section>
        </div>
        <section className={styles.endnote} aria-label="Keep exploring">
          <Plus size={24} strokeWidth={1} aria-hidden="true" />
          <p>
            Always room for
            <br />
            <em>one more idea.</em>
          </p>
          <Link href="/contact">
            Let’s make something <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <div className={styles.colophon}>
          <span>End of this page. Not the experiments.</span>
          <Link href="/playground">
            Original playground <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
