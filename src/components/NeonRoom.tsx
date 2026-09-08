"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Pause, Play, PawPrint } from "lucide-react";
import { gsap } from "gsap";
import { useTheme } from "@/context/themeContext";
import styles from "./NeonRoom.module.css";

/** Image-based scene: overlays share the artwork's coordinates, even when cropped.
 * Character poses and Neon are baked into the two source images. Swap them under
 * the lighting dip; independent body/curtain motion needs layered source art.
 */
export default function NeonRoom() {
  const { theme } = useTheme();
  const root = useRef<HTMLDivElement>(null);
  const previousTheme = useRef<string | null>(null);
  const [loaded, setLoaded] = useState({ light: false, dark: false });
  const [paused, setPaused] = useState(false);
  const ready = loaded.light && loaded.dark;

  useLayoutEffect(() => {
    const room = root.current;
    if (!room || !ready) return;
    const select = gsap.utils.selector(room);
    const night = theme === "dark";
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeline: gsap.core.Timeline | undefined;
    const settle = () => {
      gsap.set(select('[data-layer="night"]'), { opacity: night ? 1 : 0 });
      gsap.set(select('[data-layer="veil"]'), { opacity: 0 });
      gsap.set(select('[data-layer="sky"]'), { opacity: 0 });
      gsap.set(select('[data-layer="smoke"], [data-paw]'), { opacity: 0 });
      gsap.set(select('[data-night-effect]'), { opacity: 1 });
      gsap.set(select('[data-note="light"]'), { opacity: night ? 0 : 1, y: 0 });
      gsap.set(select('[data-note="dark"]'), { opacity: night ? 1 : 0, y: 0 });
      gsap.set(room, { "--daylight": night ? 0 : 1, "--nightlight": night ? 1 : 0 });
    };
    const run = () => {
      timeline?.kill();
      if (paused || media.matches || previousTheme.current === null || previousTheme.current === theme) {
        settle();
      } else {
        // Kill on cleanup, then tween from current values so rapid toggles cannot
        // leave a delayed character swap or annotation from the previous story.
        timeline = gsap.timeline({ defaults: { ease: "sine.inOut" } });
        timeline.to(select("[data-note]"), { opacity: 0, duration: 0.15 }, 0)
          .set(select("[data-paw]"), { opacity: 0 }, 0)
          .set(select('[data-layer="smoke"]'), { opacity: 0 }, 0);
        const sky = select('[data-layer="sky"]');
        const veil = select('[data-layer="veil"]');
        const nightImage = select('[data-layer="night"]');
        if (night) {
          timeline.set(select('[data-night-effect]'), { opacity: 0 }, 0)
            .to(room, { "--daylight": 0, duration: 0.6 }, 0)
            .set(sky, { backgroundColor: "#91b9d5" }, 0)
            .to(sky, { opacity: 0.16, duration: 0.2 }, 0)
            .to(sky, { backgroundColor: "#e5bc76", duration: 0.15 }, 0.2)
            .to(sky, { backgroundColor: "#bd784c", duration: 0.15 }, 0.35)
            .to(sky, { backgroundColor: "#6b527d", duration: 0.15 }, 0.5)
            .to(sky, { backgroundColor: "#152239", duration: 0.15 }, 0.65)
            .to(veil, { opacity: 0.94, duration: 0.18 }, 0.6)
            .set(nightImage, { opacity: 1 }, 0.78)
            .to(veil, { opacity: 0, duration: 0.42 }, 0.9)
            .to(sky, { opacity: 0, duration: 0.3 }, 0.9)
            .to(room, { "--nightlight": 1, duration: 0.4 }, 0.95)
            .to(select('[data-night-effect="candle"]'), { opacity: 1, duration: 0.2 }, 0.95)
            .to(select('[data-night-effect="leds"]'), { opacity: 1, duration: 0.3 }, 1.05)
            .to(select('[data-night-effect="monitor"]'), { opacity: 1, duration: 0.3 }, 1.15)
            .to(select("[data-paw]"), { opacity: 0.7, duration: 0.16, stagger: 0.13 }, 1.8)
            .to(select("[data-paw]"), { opacity: 0, duration: 0.35, stagger: 0.13 }, 2.45)
            .fromTo(select('[data-note="dark"]'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.45 }, 2.7);
        } else {
          // A separate morning story: extinguish, dawn, then Neon's return.
          timeline.to(room, { "--nightlight": 0, duration: 0.35 }, 0)
            .fromTo(select('[data-layer="smoke"]'), { opacity: 0, y: 0 }, { opacity: 0.4, y: -8, duration: 0.25 }, 0.1)
            .to(select('[data-layer="smoke"]'), { opacity: 0, y: -24, duration: 0.5 }, 0.35)
            .set(sky, { backgroundColor: "#152239" }, 0)
            .to(sky, { opacity: 0.18, duration: 0.15 }, 0)
            .to(sky, { backgroundColor: "#6b527d", duration: 0.2 }, 0.15)
            .to(sky, { backgroundColor: "#dba06c", duration: 0.2 }, 0.35)
            .to(sky, { backgroundColor: "#a8cbdc", duration: 0.25 }, 0.55)
            .to(veil, { opacity: 0.94, duration: 0.18 }, 0.6)
            .set(nightImage, { opacity: 0 }, 0.78)
            .to(veil, { opacity: 0, duration: 0.55 }, 0.85)
            .to(sky, { opacity: 0, duration: 0.5 }, 0.85)
            .to(room, { "--daylight": 1, duration: 0.65 }, 0.85)
            .fromTo(select('[data-note="light"]'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.5 }, 1.65);
        }
      }
      previousTheme.current = theme;
    };
    run();
    media.addEventListener("change", run);
    return () => {
      timeline?.kill();
      media.removeEventListener("change", run);
    };
  }, [theme, ready, paused]);

  useLayoutEffect(() => {
    const room = root.current;
    if (!room) return;
    let visible = true;
    const update = () => { room.dataset.sleeping = String(!visible || document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(room);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return (
    <div ref={root} className={styles.room} data-theme={theme} data-ready={ready} data-paused={paused}>
      <div className={styles.artwork} role="img" aria-label={theme === "dark" ? "Night in my room. I’m seated at my desk, and Neon’s bean bag is empty." : "Morning in my room. I’m standing at my desk while Neon sleeps on her bean bag."}>
        <Image src="/assets/images/Light-About-image.png" alt="" fill sizes="(max-width: 767px) 92vw, 80vw" loading="eager" onLoad={() => setLoaded((value) => ({ ...value, light: true }))} />
        <Image data-layer="night" className={styles.night} src="/assets/images/Dark-About-image.png" alt="" fill sizes="(max-width: 767px) 92vw, 80vw" loading="eager" onLoad={() => setLoaded((value) => ({ ...value, dark: true }))} />
        <div className={styles.effects} aria-hidden="true">
          <div data-layer="sky" className={styles.sky} />
          <div className={styles.sunlight} />
          <div className={styles.dust}>{Array.from({ length: 9 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}</div>
          <svg className={styles.steam} viewBox="0 0 60 100"><path d="M23 95 C4 73 47 65 26 44 S38 16 29 2" /><path d="M38 95 C57 71 16 59 37 37 S27 15 40 2" /></svg>
          <div className={styles.lighting}>
            <div data-night-effect="candle"><div className={styles.candle} /></div>
            <div data-night-effect="leds"><div className={styles.leds} /></div>
            <div data-night-effect="monitor"><div className={styles.monitor} /><span className={styles.cursor} /></div>
          </div>
          <svg data-layer="smoke" className={styles.smoke} viewBox="0 0 60 100"><path d="M30 95 C7 62 50 52 28 25 S35 9 38 2" /></svg>
          <div data-layer="veil" className={styles.veil} />
        </div>
        <div className={styles.paws} aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <PawPrint data-paw key={index} size={17} style={{ "--i": index } as CSSProperties} />)}</div>
        <div className={styles.annotation} aria-hidden="true">
          <p data-note="light">This is Neon.<br /><span>Got her in 2021. ♡</span></p>
          <p data-note="dark">Neon was here.<br /><span>Probably on patrol.</span></p>
          <svg viewBox="0 0 65 65"><path d="M8 3 Q6 44 62 61 M50 48 L62 61 L45 61" /></svg>
        </div>
      </div>
      <button className={styles.pause} type="button" aria-label={paused ? "Play room animation" : "Pause room animation"} aria-pressed={paused} onClick={() => setPaused((value) => !value)} title={paused ? "Play room animation" : "Pause room animation"}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
      <span className="sr-only" aria-live="polite">{theme === "dark" ? "Neon was here. Probably on patrol." : "This is Neon. Got her in 2021."}</span>
    </div>
  );
}
