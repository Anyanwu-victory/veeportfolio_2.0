"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { gsap } from "gsap";
import { projects, type PlaygroundProject } from "@/app/playground/_components/projects";
import styles from "./PlaygroundJournal.module.css";

const studies: Record<string, { category: string; note: string }> = {
  vsl: { category: "People & connection", note: "A dating interface with a very specific setting: Lagos. Profiles, discovery, and the possibility of a match." },
  untitled01: { category: "Recreation study", note: "A closer look at karinasirqueira.com, recreated with the fundamentals: HTML, CSS, and JavaScript." },
  untitled02: { category: "Interaction study", note: "A small question with room to play: how else could a rating feel? An exploration with Rive and RAF." },
  howdy: { category: "Web application", note: "A space for conversation. An instant messaging experiment bringing Vue, Express, GSAP, and TypeScript together." },
  endl: { category: "React exploration", note: "Exploring React through Kadet’s EndSars. A study built around an existing idea and a different set of tools." },
};

function Experiment({ project, index, featured = false }: {
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
    <article className={`${styles.experiment} ${featured ? styles.featured : ""}`} data-project={project.id} aria-labelledby={`journal-${project.id}`}>
      <div className={styles.entryLabel}>
        <span>Experiment / {String(index + 1).padStart(2, "0")}</span>
        <span>{featured ? "In the spotlight" : study.category}</span>
      </div>
      <button
        className={styles.preview}
        type="button"
        aria-label={`Next preview of ${project.title}`}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPreviewing(true);
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
          sizes={featured ? "(max-width: 767px) 44vw, 88vw" : "(max-width: 767px) 44vw, 55vw"}
          loading={featured ? "eager" : "lazy"}
        />
        <span className={styles.previewControl} aria-hidden="true">Next preview <ArrowRight size={16} /></span>
        <span className={styles.frameCount} aria-hidden="true">0{frame + 1} / 0{project.previews.length}</span>
      </button>
      <div className={styles.caption}>
        <div>
          <h2 id={`journal-${project.id}`}><a href={project.href} target="_blank" rel="noopener noreferrer">{project.title}<ArrowUpRight aria-hidden="true" /></a></h2>
          <p className={styles.description}>{project.description}</p>
        </div>
        <a className={styles.visit} href={project.href} target="_blank" rel="noopener noreferrer">Visit experiment <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
      <div className={styles.study}>
        <span className={styles.noteLabel}>Study note</span>
        <p>{study.note}</p>
      </div>
      <ul className={styles.tools} aria-label={`Tools used for ${project.title}`}>
        {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
      </ul>
    </article>
  );
}

export default function PlaygroundJournal() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const select = gsap.utils.selector(pageRef);
      gsap.timeline()
        .fromTo(select(`.${styles.title}`), { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.3, ease: "power3.out" })
        .fromTo(select(`.${styles.introduction}`), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
        .fromTo(select(`.${styles.content}`), { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" });
    });
    return () => media.revert();
  }, []);

  return (
    <main ref={pageRef} className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.masthead}><span>A journal of experiments</span><span>Vol. 01 / {String(projects.length).padStart(2, "0")} entries</span></div>
        <div className={styles.titleClip}><h1 className={styles.title}>Playground<span aria-hidden="true">*</span></h1></div>
        <div className={styles.introduction}>
          <p className={styles.lead}>Things I built because I wanted<br className={styles.desktopBreak} /> to see what would happen.</p>
          <div className={styles.heroAside}><p>From blood, sweat and experimentations to beautiful websites</p><a href="#experiments">Take a look around <ArrowDown size={16} aria-hidden="true" /></a></div>
          <ArrowDown className={styles.mobileArrow} size={28} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </header>

      <div className={styles.content} id="experiments">
        <div className={styles.portfolio}>
        <Experiment project={projects[0]} index={0} featured />
        <div className={styles.interlude}><span className={styles.asterisk} aria-hidden="true">*</span><p>Small ideas.<br /><em>Room to play.</em></p><span className={styles.marginNote}>Recreations, interactions,<br />and a few curious detours.</span></div>
        <section className={styles.grid} aria-label="More experiments">
          {projects.slice(1).map((project, index) => <Experiment key={project.id} project={project} index={index + 1} />)}
        </section>
        </div>
        <section className={styles.endnote} aria-label="Keep exploring">
          <Plus size={24} strokeWidth={1} aria-hidden="true" />
          <p>Always room for<br /><em>one more idea.</em></p>
          <Link href="/contact">Let’s make something <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </section>
        <div className={styles.colophon}><span>End of this page. Not the experiments.</span><Link href="/playground">Original playground <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
      </div>
    </main>
  );
}
