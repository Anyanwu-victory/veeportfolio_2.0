"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Pause, Play, RotateCcw } from "lucide-react";
import { gsap } from "gsap";
import { DeskPortrait, NeonSketch, ProcessSketch } from "./Illustrations";
import styles from "./IllustratedAbout.module.css";

export default function IllustratedAbout() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const reveals = useRef<gsap.core.Tween[]>([]);
  const [paused, setPaused] = useState(false);
  const [revision, setRevision] = useState(0);
  const [activeChapter, setActiveChapter] = useState("opening");

  useLayoutEffect(() => {
    const page = root.current;
    if (!page) return;
    const media = gsap.matchMedia();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
        const chapter = (entry.target as HTMLElement).dataset.chapter;
        if (entry.isIntersecting && chapter) setActiveChapter(chapter);
      });
    }, { threshold: 0.12 });
    page.querySelectorAll('[data-scene], [data-chapter]').forEach((scene) => observer.observe(scene));
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const entrance = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (page.dataset.paused === 'true') {
            entrance.unobserve(entry.target);
            return;
          }
          const items = entry.target.querySelectorAll('[data-reveal-item]');
          const targets = items.length ? items : entry.target;
          const tween = gsap.fromTo(targets, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', paused: page.dataset.paused === 'true' });
          reveals.current.push(tween);
          entrance.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      page.querySelectorAll('[data-reveal]').forEach((section) => entrance.observe(section));
      return () => { entrance.disconnect(); reveals.current.forEach((tween) => tween.revert()); reveals.current = []; };
    });
    const visibility = () => { page.dataset.sleeping = String(document.hidden); };
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); media.revert(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => { reveals.current.forEach((tween) => tween.paused(paused)); }, [paused]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const amount = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progress.current) progress.current.style.transform = `scaleY(${amount})`;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return (
    <main ref={root} className={styles.page} data-paused={paused}>
      <aside className={styles.chapterRail} aria-label="About story chapters">
        <span className={styles.railTrack} aria-hidden="true"><span ref={progress} /></span>
        {[["opening", "Opening"], ["story", "Story"], ["process", "Process"], ["life", "Beyond"]].map(([id, label], index) => (
          <a key={id} href={`#${id}`} aria-current={activeChapter === id ? "location" : undefined}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>
        ))}
      </aside>
      <div className={styles.topline}>
        <Link href="/about" className={styles.original}>Vicky—About / <span>Illustrated edition</span></Link>
        <p className={styles.issue}>Independent developer · Issue 02 · 2026</p>
        <button className={styles.motionToggle} type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? 'Play illustrations' : 'Pause illustrations'}
        </button>
      </div>

      <section id="opening" className={styles.hero} aria-labelledby="illustrated-heading" data-reveal data-chapter="opening">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-reveal-item>Profile / Vicky</p>
          <h1 id="illustrated-heading"><span data-reveal-item>Hi, I’m Vicky.</span><span data-reveal-item>I make things</span><span data-reveal-item>feel a little <em>human.</em></span></h1>
          <p className={styles.lead} data-reveal-item>A frontend developer with a soft spot for thoughtful interfaces, expressive motion, and the little details you can feel.</p>
          <a className={styles.storyLink} href="#story" data-reveal-item>A little more about me <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <figure className={styles.heroArt} data-scene data-reveal-item><DeskPortrait /><figcaption><span>Fig. 01</span> At my desk, turning small ideas into interfaces.</figcaption></figure>
      </section>

      <section id="story" className={styles.story} aria-labelledby="story-heading" data-reveal data-chapter="story">
        <div data-reveal-item><p className={styles.eyebrow}>Chapter one / The backstory</p><h2 id="story-heading">There’s a person<br />in every <em>pixel.</em></h2></div>
        <div className={styles.prose} data-reveal-item>
          <p className={styles.dropcap}>I’m based in Ho Chi Minh City, working independently since July 2022. My work brings together ideas, visual elements, motion, and typography.</p>
          <p>I like the space where design meets development: taking something you can imagine and making something you can actually use. The playground is where I give those small ideas room to grow.</p>
          <Link className={styles.textLink} href="/playground-journal">A few things I’ve been making <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <blockquote className={styles.pullQuote} data-reveal><span aria-hidden="true">“</span><p data-reveal-item>Good interfaces don’t ask for attention.<br />They return it.</p><cite data-reveal-item>— A principle I keep close</cite></blockquote>

      <section id="process" className={styles.process} aria-labelledby="process-heading" data-reveal data-chapter="process">
        <figure className={styles.processArt} data-scene>
          <ProcessSketch revision={revision} />
          <figcaption><span>Fig. 02</span> From first marks to a working interface.</figcaption>
          <button className={styles.replay} type="button" onClick={() => setRevision((value) => value + 1)}><RotateCcw size={14} aria-hidden="true" /> Replay the sketch</button>
        </figure>
        <div className={styles.processCopy} data-reveal-item>
          <p className={styles.eyebrow}>Chapter two / The process</p>
          <h2 id="process-heading">A little curiosity.<br />A lot of <em>care.</em></h2>
          <dl className={styles.principles}>
            <div><dt>Start with the person.</dt><dd>What do they need to do? Make that clear, comfortable, and easy to reach.</dd></div>
            <div><dt>Make the details count.</dt><dd>A considered typeface. Space to breathe. Motion that helps an interaction make sense.</dd></div>
            <div><dt>Leave room to explore.</dt><dd>Sketch, build, try it, refine it. Small experiments often lead to the most interesting answers.</dd></div>
          </dl>
        </div>
      </section>

      <section id="life" className={styles.personal} aria-labelledby="personal-heading" data-reveal data-chapter="life">
        <div className={styles.personalCopy} data-reveal-item><p className={styles.eyebrow}>Chapter three / Beyond the screen</p><h2 id="personal-heading">Meet my quietest<br /><em>collaborator.</em></h2><p>This is Neon. She’s been part of my world since 2021. You may have spotted her in the other About page. Here, she has a little more room to herself.</p><p className={styles.handwritten}>Very good company. Very little code review.</p></div>
        <figure className={styles.neonArt} data-scene data-reveal-item><NeonSketch /><figcaption><span>Fig. 03</span> Neon, head of taking breaks.</figcaption></figure>
      </section>

      <section className={styles.currently} aria-labelledby="currently-heading" data-reveal>
        <h2 id="currently-heading">On my desk,<br /><em>lately.</em></h2>
        <dl>
          <div><dt>Exploring</dt><dd>Small interactions.<br />A little more motion.</dd></div>
          <div><dt>Making</dt><dd><Link href="/playground-journal">Experiments for<br />the playground <ArrowUpRight size={15} aria-hidden="true" /></Link></dd></div>
          <div><dt>Keeping close</dt><dd>Curiosity, attention,<br />and a sleeping cat.</dd></div>
        </dl>
      </section>

      <section className={styles.contact} aria-labelledby="contact-heading" data-reveal>
        <p className={styles.eyebrow}>Your idea could be next</p><h2 id="contact-heading">Let’s make something<br /><em>worth spending time with.</em></h2>
        <Link href="/contact" className={styles.contactLink}>Tell me what you’re thinking <ArrowUpRight size={21} aria-hidden="true" /></Link>
      </section>
      <nav className={styles.bottomNav} aria-label="Portfolio pages"><Link href="/work">Selected work</Link><Link href="/about">Original About</Link><Link href="/playground-journal">Playground</Link><Link href="/contact">Contact</Link></nav>
    </main>
  );
}
