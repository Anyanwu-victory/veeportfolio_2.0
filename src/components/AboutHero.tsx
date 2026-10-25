"use client";

import styles from "./about.module.css";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import type { AboutPageData, SiteImageData } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const ease = [0.22, 1, 0.36, 1] as const;

const statementComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
  },
  marks: {
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="about-hero__em">{children}</em>
    ),
  },
};

function getArtworkSource(artwork: SiteImageData) {
  if (artwork.source === "site") return artwork.path;
  if (!artwork.image?.asset) return undefined;

  return urlFor(artwork.image).width(1560).fit("max").auto("format").url();
}

type AboutHeroProps = {
  data: AboutPageData;
};

export default function AboutHero({ data }: AboutHeroProps) {
  const artworkSource = getArtworkSource(data.artwork);
  const shouldReduceMotion = useReducedMotion();
  const introStartX = shouldReduceMotion ? 0 : "-100vw";
  const outroStartX = shouldReduceMotion ? 0 : "100vw";
  const textDuration = shouldReduceMotion ? 0 : 1.2;

  return (
    <div className="about-hero__stage">
      <div className={`about-hero ${styles.hero}`}>
        <motion.div
          className="about-hero__intro indent-14 lg:indent-26 font-display"
          initial={{ opacity: 0, x: introStartX }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: textDuration,
            delay: shouldReduceMotion ? 0 : 0.1,
            ease,
          }}
        >
          <PortableText
            value={data.statement}
            components={statementComponents}
          />
        </motion.div>

        <motion.div
          className="about-hero__banner"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.55, ease }}
        >
          {artworkSource && (
            <Image
              src={artworkSource}
              alt={data.artwork.alt}
              fill
              className="about-hero__banner-img"
              priority
              sizes="(min-width: 1024px) 78rem, 100vw"
            />
          )}
        </motion.div>

        <div className="about-hero__footer">
          <p className="about-hero__caption">{data.artworkCaption}</p>

          <motion.p
            className="about-hero__outro font-clash"
            initial={{ opacity: 0, x: outroStartX }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: textDuration,
              delay: shouldReduceMotion ? 0 : 0.4,
              ease,
            }}
          >
            {data.introduction}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
