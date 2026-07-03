"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Loader.module.css";

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const counter = useRef({ val: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial entrance states
    gsap.set([loaderRef.current, textRef.current], {
      opacity: 0,
      y: 20,
    });

    const masterTimeline = gsap.timeline();

    // 2. Entrance Animation
    masterTimeline.to([loaderRef.current, textRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });

    // 3. Counter Animation
    masterTimeline.to(counter.current, {
      val: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(counter.current.val));
      },
      onComplete: () => {
        // 4. Exit Animation
        const exitTimeline = gsap.timeline({
          onComplete: () => {
            if (onComplete) {
              onComplete();
            }
          }
        });

        exitTimeline.to([loaderRef.current, textRef.current], {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: "power3.in"
        })
        .to(overlayRef.current, {
          y: "-100%",
          duration: 0.8,
          ease: "power4.inOut"
        }, "-=0.2");
      }
    });

    return () => {
      masterTimeline.kill();
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className={styles.overlay} id="portfolio-loader">
      <div className={styles.loaderContent}>
        {/* User's custom HTML loader */}
        <div ref={loaderRef} className={styles.loader} aria-label="Loading animation"></div>
        
        <div ref={textRef} className={styles.textWrapper}>
          <div className={styles.progress}>{progress}%</div>
          <div className={styles.title}>Vee Portfolio</div>
          <div className={styles.statusBar}>
            <div 
              className={styles.statusIndicator} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
